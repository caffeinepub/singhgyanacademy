import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Video {
    id: bigint;
    title: string;
    youtubeLink: string;
    description: string;
    category: string;
}
export interface LeadershipImage {
    name: string;
    description: string;
    image: ExternalBlob;
    position: string;
}
export interface Test {
    id: bigint;
    assessmentType: AssessmentType;
    questions: Array<string>;
}
export interface StaticContent {
    contactInfo: string;
    aboutUs: string;
    footerText: string;
}
export interface Course {
    id: bigint;
    pyq: Array<ExternalBlob>;
    testSeries: Array<string>;
    notes: Array<ExternalBlob>;
    category: CourseCategory;
    videoLectures: Array<string>;
    syllabus: Array<string>;
}
export interface StudentProfile {
    id: bigint;
    name: string;
    email: string;
    enrolledCourses: Array<bigint>;
}
export type Logo = Uint8Array;
export interface CurrentAffair {
    id: bigint;
    content: string;
    file?: ExternalBlob;
    type: CurrentAffairsType;
}
export interface UserProfile {
    studentId?: bigint;
    name: string;
    email: string;
}
export interface Note {
    id: bigint;
    subject: Subject;
    file: ExternalBlob;
}
export enum AssessmentType {
    dailyQuiz = "dailyQuiz",
    weeklyTest = "weeklyTest",
    fullLengthTest = "fullLengthTest"
}
export enum CourseCategory {
    cds = "cds",
    kvs = "kvs",
    nda = "nda",
    nvs = "nvs",
    otherStatesPolice = "otherStatesPolice",
    mppcs = "mppcs",
    mptet = "mptet",
    tnpsc = "tnpsc",
    nabard = "nabard",
    tspsc = "tspsc",
    otherStatesPCS = "otherStatesPCS",
    afcat = "afcat",
    appsc = "appsc",
    agniveer = "agniveer",
    rbiGradeB = "rbiGradeB",
    rpfConstable = "rpfConstable",
    bpsc = "bpsc",
    capf = "capf",
    ctet = "ctet",
    biharPolice = "biharPolice",
    gpsc = "gpsc",
    hpsc = "hpsc",
    cgpsc = "cgpsc",
    htet = "htet",
    jpsc = "jpsc",
    kpsc = "kpsc",
    mpsc = "mpsc",
    navy = "navy",
    reet = "reet",
    rpsc = "rpsc",
    upsc = "upsc",
    airforce = "airforce",
    rajasthanPolice = "rajasthanPolice",
    stateTET = "stateTET",
    ibpsClerk = "ibpsClerk",
    sscCGL = "sscCGL",
    sscCPO = "sscCPO",
    sscMTS = "sscMTS",
    sbiClerk = "sbiClerk",
    university_geography = "university_geography",
    sbiPO = "sbiPO",
    keralaPSC = "keralaPSC",
    rrbALP = "rrbALP",
    upPolice = "upPolice",
    sscGD = "sscGD",
    sscJE = "sscJE",
    rrbGroupD = "rrbGroupD",
    ukpsc = "ukpsc",
    uppcs = "uppcs",
    uptet = "uptet",
    delhiPolice = "delhiPolice",
    sscConstable = "sscConstable",
    rrbTechnician = "rrbTechnician",
    ibpsPO = "ibpsPO",
    mpPolice = "mpPolice",
    rrbNTPC = "rrbNTPC",
    wbpsc = "wbpsc",
    punjabPSC = "punjabPSC",
    sscStenographer = "sscStenographer",
    sscCHSL = "sscCHSL",
    dsssb = "dsssb",
    licAAO = "licAAO",
    rpfSI = "rpfSI",
    superTET = "superTET",
    rrbJE = "rrbJE",
    sscSelectionPost = "sscSelectionPost",
    haryanaPolice = "haryanaPolice"
}
export enum CurrentAffairsType {
    monthlyMagazine = "monthlyMagazine",
    dailyUpdate = "dailyUpdate",
    weeklyPDF = "weeklyPDF"
}
export enum Subject {
    economy = "economy",
    history = "history",
    geography = "geography",
    currentAffairs = "currentAffairs",
    polity = "polity",
    science = "science"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCourse(category: CourseCategory, syllabus: Array<string>, videoLectures: Array<string>, notesFiles: Array<ExternalBlob>, pyqFiles: Array<ExternalBlob>, testSeries: Array<string>): Promise<void>;
    addCurrentAffair(type: CurrentAffairsType, content: string, file: ExternalBlob | null): Promise<void>;
    addLeadershipImage(name: string, image: ExternalBlob, position: string, description: string): Promise<void>;
    addNote(subject: Subject, file: ExternalBlob): Promise<void>;
    addTest(assessmentType: AssessmentType, questions: Array<string>): Promise<void>;
    addVideo(title: string, category: string, description: string, youtubeLink: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteCourse(id: bigint): Promise<void>;
    deleteCurrentAffair(id: bigint): Promise<void>;
    deleteLeadershipImage(name: string): Promise<void>;
    deleteNote(id: bigint): Promise<void>;
    deleteTest(id: bigint): Promise<void>;
    deleteVideo(id: bigint): Promise<void>;
    enrollCourse(studentId: bigint, courseId: bigint): Promise<void>;
    getAllCurrentAffairs(): Promise<Array<CurrentAffair>>;
    getAllLeadershipImages(): Promise<Array<LeadershipImage>>;
    getAllNotes(): Promise<Array<Note>>;
    getAllStudents(): Promise<Array<StudentProfile>>;
    getAllVideos(): Promise<Array<Video>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCourseById(id: bigint): Promise<Course | null>;
    getCoursesByCategory(category: CourseCategory): Promise<Array<Course>>;
    getCurrentAffairsByType(type: CurrentAffairsType): Promise<Array<CurrentAffair>>;
    getLeadershipImage(name: string): Promise<LeadershipImage | null>;
    getLogo(): Promise<Logo | null>;
    getNotesBySubject(subject: Subject): Promise<Array<Note>>;
    getSortedCoursesByCategory(): Promise<Array<Course>>;
    getSortedCoursesByNumLectures(): Promise<Array<Course>>;
    getStaticContent(): Promise<StaticContent>;
    getStudent(id: bigint): Promise<StudentProfile>;
    getTestsByType(assessmentType: AssessmentType): Promise<Array<Test>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    registerStudent(name: string, email: string): Promise<bigint>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateCourse(id: bigint, category: CourseCategory, syllabus: Array<string>, videoLectures: Array<string>, notesFiles: Array<ExternalBlob>, pyqFiles: Array<ExternalBlob>, testSeries: Array<string>): Promise<void>;
    updateCurrentAffair(id: bigint, type: CurrentAffairsType, content: string, file: ExternalBlob | null): Promise<void>;
    updateLeadershipImage(name: string, image: ExternalBlob, position: string, description: string): Promise<void>;
    updateLogo(newLogo: Logo): Promise<void>;
    updateNote(id: bigint, subject: Subject, file: ExternalBlob): Promise<void>;
    updateStaticContent(aboutUs: string, contactInfo: string, footerText: string): Promise<void>;
    updateTest(id: bigint, assessmentType: AssessmentType, questions: Array<string>): Promise<void>;
    updateVideo(id: bigint, title: string, category: string, description: string, youtubeLink: string): Promise<void>;
}
