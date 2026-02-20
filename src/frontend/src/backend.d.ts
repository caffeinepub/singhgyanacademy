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
export interface Test {
    id: bigint;
    assessmentType: AssessmentType;
    questions: Array<string>;
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
    ssc = "ssc",
    railway = "railway",
    upsc = "upsc",
    banking = "banking",
    university_geography = "university_geography",
    uppcs = "uppcs",
    tet_ctet = "tet_ctet",
    nda_cds = "nda_cds",
    police = "police"
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
    addNote(subject: Subject, file: ExternalBlob): Promise<void>;
    addTest(assessmentType: AssessmentType, questions: Array<string>): Promise<void>;
    addVideo(title: string, category: string, description: string, youtubeLink: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteCourse(id: bigint): Promise<void>;
    deleteCurrentAffair(id: bigint): Promise<void>;
    deleteNote(id: bigint): Promise<void>;
    deleteTest(id: bigint): Promise<void>;
    deleteVideo(id: bigint): Promise<void>;
    enrollCourse(studentId: bigint, courseId: bigint): Promise<void>;
    getAllCurrentAffairs(): Promise<Array<CurrentAffair>>;
    getAllNotes(): Promise<Array<Note>>;
    getAllStudents(): Promise<Array<StudentProfile>>;
    getAllVideos(): Promise<Array<Video>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCoursesByCategory(category: CourseCategory): Promise<Array<Course>>;
    getCurrentAffairsByType(type: CurrentAffairsType): Promise<Array<CurrentAffair>>;
    getLogo(): Promise<Logo | null>;
    getNotesBySubject(subject: Subject): Promise<Array<Note>>;
    getSortedCoursesByCategory(): Promise<Array<Course>>;
    getSortedCoursesByNumLectures(): Promise<Array<Course>>;
    getStudent(id: bigint): Promise<StudentProfile>;
    getTestsByType(assessmentType: AssessmentType): Promise<Array<Test>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    registerStudent(name: string, email: string): Promise<bigint>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateCourse(id: bigint, category: CourseCategory, syllabus: Array<string>, videoLectures: Array<string>, notesFiles: Array<ExternalBlob>, pyqFiles: Array<ExternalBlob>, testSeries: Array<string>): Promise<void>;
    updateCurrentAffair(id: bigint, type: CurrentAffairsType, content: string, file: ExternalBlob | null): Promise<void>;
    updateLogo(newLogo: Logo): Promise<void>;
    updateNote(id: bigint, subject: Subject, file: ExternalBlob): Promise<void>;
    updateTest(id: bigint, assessmentType: AssessmentType, questions: Array<string>): Promise<void>;
    updateVideo(id: bigint, title: string, category: string, description: string, youtubeLink: string): Promise<void>;
}
