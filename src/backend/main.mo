import Array "mo:core/Array";
import File "blob-storage/Storage";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  public type CourseCategory = {
    #upsc;
    #uppcs;
    #ssc;
    #railway;
    #banking;
    #tet_ctet;
    #police;
    #nda_cds;
    #university_geography;
  };

  module CourseCategory {
    public func compare(a : CourseCategory, b : CourseCategory) : Order.Order {
      let rank = func(cat : CourseCategory) : Nat {
        switch (cat) {
          case (#upsc) { 0 };
          case (#uppcs) { 1 };
          case (#ssc) { 2 };
          case (#railway) { 3 };
          case (#banking) { 4 };
          case (#tet_ctet) { 5 };
          case (#police) { 6 };
          case (#nda_cds) { 7 };
          case (#university_geography) { 8 };
        };
      };
      Nat.compare(rank(a), rank(b));
    };
  };

  public type Subject = {
    #history;
    #geography;
    #polity;
    #economy;
    #science;
    #currentAffairs;
  };

  public type AssessmentType = {
    #dailyQuiz;
    #weeklyTest;
    #fullLengthTest;
  };

  public type CurrentAffairsType = {
    #dailyUpdate;
    #weeklyPDF;
    #monthlyMagazine;
  };

  public type Course = {
    id : Nat;
    category : CourseCategory;
    syllabus : [Text];
    videoLectures : [Text]; // Links to videos
    notes : [File.ExternalBlob]; // Links to notes files
    pyq : [File.ExternalBlob]; // Previous Year Questions files
    testSeries : [Text]; // Links to test series or related files
  };

  module Course {
    public func compareByCategory(a : Course, b : Course) : Order.Order {
      CourseCategory.compare(a.category, b.category);
    };

    public func compareByNumLectures(a : Course, b : Course) : Order.Order {
      Nat.compare(a.videoLectures.size(), b.videoLectures.size());
    };
  };

  public type Note = {
    id : Nat;
    subject : Subject;
    file : File.ExternalBlob;
  };

  public type Test = {
    id : Nat;
    assessmentType : AssessmentType;
    questions : [Text];
  };

  public type CurrentAffair = {
    id : Nat;
    type_ : CurrentAffairsType;
    content : Text;
    file : ?File.ExternalBlob; // For PDFs and magazines
  };

  public type StudentProfile = {
    id : Nat;
    name : Text;
    email : Text;
    enrolledCourses : [Nat];
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    studentId : ?Nat;
  };

  public type Video = {
    id : Nat;
    title : Text;
    category : Text;
    description : Text;
    youtubeLink : Text;
  };

  public type Logo = File.ExternalBlob;

  // State management
  var nextCourseId = 0;
  var nextNoteId = 0;
  var nextTestId = 0;
  var nextCurrentAffairId = 0;
  var nextStudentId = 0;
  var nextVideoId = 0;

  // Access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Persistent storage using Map.empty
  let courses = Map.empty<Nat, Course>();
  let notes = Map.empty<Nat, Note>();
  let tests = Map.empty<Nat, Test>();
  let currentAffairs = Map.empty<Nat, CurrentAffair>();
  let students = Map.empty<Nat, StudentProfile>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let principalToStudentId = Map.empty<Principal, Nat>();
  let videoLibrary = Map.empty<Nat, Video>();

  var logo : ?Logo = null;

  // User Profile Management (Required by frontend)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Course Management
  public shared ({ caller }) func addCourse(category : CourseCategory, syllabus : [Text], videoLectures : [Text], notesFiles : [File.ExternalBlob], pyqFiles : [File.ExternalBlob], testSeries : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add courses");
    };

    let course : Course = {
      id = nextCourseId;
      category;
      syllabus;
      videoLectures;
      notes = notesFiles;
      pyq = pyqFiles;
      testSeries;
    };

    courses.add(nextCourseId, course);
    nextCourseId += 1;
  };

  public query ({ caller }) func getCoursesByCategory(category : CourseCategory) : async [Course] {
    courses.values().toArray().filter(func(c) { c.category == category });
  };

  public query ({ caller }) func getSortedCoursesByCategory() : async [Course] {
    courses.values().toArray().sort(Course.compareByCategory);
  };

  public query ({ caller }) func getSortedCoursesByNumLectures() : async [Course] {
    courses.values().toArray().sort(Course.compareByNumLectures);
  };

  public shared ({ caller }) func updateCourse(id : Nat, category : CourseCategory, syllabus : [Text], videoLectures : [Text], notesFiles : [File.ExternalBlob], pyqFiles : [File.ExternalBlob], testSeries : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update courses");
    };

    if (not courses.containsKey(id)) {
      Runtime.trap("Course does not exist");
    };

    let course : Course = {
      id;
      category;
      syllabus;
      videoLectures;
      notes = notesFiles;
      pyq = pyqFiles;
      testSeries;
    };

    courses.add(id, course);
  };

  public shared ({ caller }) func deleteCourse(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete courses");
    };

    if (not courses.containsKey(id)) {
      Runtime.trap("Course does not exist");
    };

    courses.remove(id);
  };

  // Notes Management
  public shared ({ caller }) func addNote(subject : Subject, file : File.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add notes");
    };

    let note : Note = {
      id = nextNoteId;
      subject;
      file;
    };

    notes.add(nextNoteId, note);
    nextNoteId += 1;
  };

  public query ({ caller }) func getNotesBySubject(subject : Subject) : async [Note] {
    notes.values().toArray().filter(func(n) { n.subject == subject });
  };

  public query ({ caller }) func getAllNotes() : async [Note] {
    notes.values().toArray();
  };

  public shared ({ caller }) func updateNote(id : Nat, subject : Subject, file : File.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update notes");
    };

    if (not notes.containsKey(id)) {
      Runtime.trap("Note does not exist");
    };

    let note : Note = {
      id;
      subject;
      file;
    };

    notes.add(id, note);
  };

  public shared ({ caller }) func deleteNote(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete notes");
    };

    if (not notes.containsKey(id)) {
      Runtime.trap("Note does not exist");
    };

    notes.remove(id);
  };

  // Test Series Management
  public shared ({ caller }) func addTest(assessmentType : AssessmentType, questions : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add tests");
    };

    let test : Test = {
      id = nextTestId;
      assessmentType;
      questions;
    };

    tests.add(nextTestId, test);
    nextTestId += 1;
  };

  public query ({ caller }) func getTestsByType(assessmentType : AssessmentType) : async [Test] {
    tests.values().toArray().filter(func(t) { t.assessmentType == assessmentType });
  };

  public shared ({ caller }) func updateTest(id : Nat, assessmentType : AssessmentType, questions : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update tests");
    };

    if (not tests.containsKey(id)) {
      Runtime.trap("Test does not exist");
    };

    let test : Test = {
      id;
      assessmentType;
      questions;
    };

    tests.add(id, test);
  };

  public shared ({ caller }) func deleteTest(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete tests");
    };

    if (not tests.containsKey(id)) {
      Runtime.trap("Test does not exist");
    };

    tests.remove(id);
  };

  // Current Affairs Management
  public shared ({ caller }) func addCurrentAffair(type_ : CurrentAffairsType, content : Text, file : ?File.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add current affairs");
    };

    let affair : CurrentAffair = {
      id = nextCurrentAffairId;
      type_;
      content;
      file;
    };

    currentAffairs.add(nextCurrentAffairId, affair);
    nextCurrentAffairId += 1;
  };

  public query ({ caller }) func getCurrentAffairsByType(type_ : CurrentAffairsType) : async [CurrentAffair] {
    currentAffairs.values().toArray().filter(func(ca) { ca.type_ == type_ });
  };

  public query ({ caller }) func getAllCurrentAffairs() : async [CurrentAffair] {
    currentAffairs.values().toArray();
  };

  public shared ({ caller }) func updateCurrentAffair(id : Nat, type_ : CurrentAffairsType, content : Text, file : ?File.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update current affairs");
    };

    if (not currentAffairs.containsKey(id)) {
      Runtime.trap("Current affair does not exist");
    };

    let affair : CurrentAffair = {
      id;
      type_;
      content;
      file;
    };

    currentAffairs.add(id, affair);
  };

  public shared ({ caller }) func deleteCurrentAffair(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete current affairs");
    };

    if (not currentAffairs.containsKey(id)) {
      Runtime.trap("Current affair does not exist");
    };

    currentAffairs.remove(id);
  };

  // Student Registration
  public shared ({ caller }) func registerStudent(name : Text, email : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can register as students");
    };

    // Check if caller already has a student profile
    switch (principalToStudentId.get(caller)) {
      case (?existingId) {
        Runtime.trap("User already registered as a student");
      };
      case null {
        let student : StudentProfile = {
          id = nextStudentId;
          name;
          email;
          enrolledCourses = [];
        };

        students.add(nextStudentId, student);
        principalToStudentId.add(caller, nextStudentId);

        // Update user profile with student ID
        let profile : UserProfile = {
          name;
          email;
          studentId = ?nextStudentId;
        };
        userProfiles.add(caller, profile);

        nextStudentId += 1;
        nextStudentId - 1;
      };
    };
  };

  public query ({ caller }) func getStudent(id : Nat) : async StudentProfile {
    // Users can only view their own student profile, admins can view any
    let studentIdOpt = principalToStudentId.get(caller);
    let isOwnProfile = switch (studentIdOpt) {
      case (?studentId) { studentId == id };
      case null { false };
    };

    if (not isOwnProfile and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own student profile");
    };

    switch (students.get(id)) {
      case (null) { Runtime.trap("Student not found") };
      case (?student) { student };
    };
  };

  public shared ({ caller }) func enrollCourse(studentId : Nat, courseId : Nat) : async () {
    // Users can only enroll themselves, admins can enroll anyone
    let studentIdOpt = principalToStudentId.get(caller);
    let isOwnProfile = switch (studentIdOpt) {
      case (?id) { id == studentId };
      case null { false };
    };

    if (not isOwnProfile and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only enroll yourself in courses");
    };

    let student = switch (students.get(studentId)) {
      case (null) { Runtime.trap("Student not found") };
      case (?student) { student };
    };

    if (not courses.containsKey(courseId)) {
      Runtime.trap("Course does not exist");
    };

    let updatedCourses = student.enrolledCourses.concat([courseId]);
    let updatedStudent = {
      student with enrolledCourses = updatedCourses
    };

    students.add(studentId, updatedStudent);
  };

  public query ({ caller }) func getAllStudents() : async [StudentProfile] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all students");
    };
    students.values().toArray();
  };

  // Video Library Management
  public shared ({ caller }) func addVideo(title : Text, category : Text, description : Text, youtubeLink : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add videos");
    };

    let video : Video = {
      id = nextVideoId;
      title;
      category;
      description;
      youtubeLink;
    };

    videoLibrary.add(nextVideoId, video);
    nextVideoId += 1;
  };

  public shared ({ caller }) func updateVideo(id : Nat, title : Text, category : Text, description : Text, youtubeLink : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update videos");
    };

    if (not videoLibrary.containsKey(id)) {
      Runtime.trap("Video does not exist");
    };

    let video : Video = {
      id;
      title;
      category;
      description;
      youtubeLink;
    };

    videoLibrary.add(id, video);
  };

  public shared ({ caller }) func deleteVideo(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete videos");
    };

    if (not videoLibrary.containsKey(id)) {
      Runtime.trap("Video does not exist");
    };

    videoLibrary.remove(id);
  };

  public query ({ caller }) func getAllVideos() : async [Video] {
    videoLibrary.values().toArray();
  };

  // Branding Management
  public shared ({ caller }) func updateLogo(newLogo : Logo) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update logo");
    };
    logo := ?newLogo;
  };

  public query ({ caller }) func getLogo() : async ?Logo {
    logo;
  };
};
