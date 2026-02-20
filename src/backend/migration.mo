import Map "mo:core/Map";
import Array "mo:core/Array";
import File "blob-storage/Storage";
import Nat "mo:core/Nat";

module {
  public type OldCourseCategory = {
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

  public type OldCourse = {
    id : Nat;
    category : OldCourseCategory;
    syllabus : [Text];
    videoLectures : [Text];
    notes : [File.ExternalBlob];
    pyq : [File.ExternalBlob];
    testSeries : [Text];
  };

  public type OldActor = {
    courses : Map.Map<Nat, OldCourse>;
  };

  public type NewCourseCategory = {
    #upsc;
    #university_geography;
    #uppcs;
    #bpsc;
    #mppcs;
    #rpsc;
    #hpsc;
    #ukpsc;
    #jpsc;
    #cgpsc;
    #mpsc;
    #gpsc;
    #appsc;
    #tspsc;
    #wbpsc;
    #tnpsc;
    #kpsc;
    #keralaPSC;
    #punjabPSC;
    #otherStatesPCS;
    #sscCGL;
    #sscCHSL;
    #sscGD;
    #sscMTS;
    #sscCPO;
    #sscStenographer;
    #sscJE;
    #sscSelectionPost;
    #sscConstable;
    #rrbNTPC;
    #rrbGroupD;
    #rrbALP;
    #rrbTechnician;
    #rrbJE;
    #rpfConstable;
    #rpfSI;
    #upPolice;
    #biharPolice;
    #mpPolice;
    #delhiPolice;
    #rajasthanPolice;
    #haryanaPolice;
    #capf;
    #otherStatesPolice;
    #ctet;
    #uptet;
    #htet;
    #reet;
    #mptet;
    #superTET;
    #kvs;
    #nvs;
    #dsssb;
    #stateTET;
    #ibpsPO;
    #ibpsClerk;
    #sbiPO;
    #sbiClerk;
    #rbiGradeB;
    #nabard;
    #licAAO;
    #nda;
    #cds;
    #afcat;
    #agniveer;
    #navy;
    #airforce;
  };

  public type NewCourse = {
    id : Nat;
    category : NewCourseCategory;
    syllabus : [Text];
    videoLectures : [Text];
    notes : [File.ExternalBlob];
    pyq : [File.ExternalBlob];
    testSeries : [Text];
  };

  public type NewActor = {
    courses : Map.Map<Nat, NewCourse>;
  };

  func convertOldCourseCategory(old : OldCourseCategory) : NewCourseCategory {
    switch (old) {
      case (#upsc) { #upsc };
      case (#uppcs) { #uppcs };
      case (#ssc) { #sscGD };
      case (#railway) { #rrbNTPC };
      case (#banking) { #ibpsPO };
      case (#tet_ctet) { #ctet };
      case (#police) { #upPolice };
      case (#nda_cds) { #nda };
      case (#university_geography) { #university_geography };
    };
  };

  func convertOldCourse(old : OldCourse) : NewCourse {
    {
      id = old.id;
      category = convertOldCourseCategory(old.category);
      syllabus = old.syllabus;
      videoLectures = old.videoLectures;
      notes = old.notes;
      pyq = old.pyq;
      testSeries = old.testSeries;
    };
  };

  public func run(old : OldActor) : NewActor {
    let newCourses = old.courses.map<Nat, OldCourse, NewCourse>(
      func(_id, oldCourse) {
        convertOldCourse(oldCourse);
      }
    );
    { courses = newCourses };
  };
};
