import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type {
  Course,
  CourseCategory,
  Note,
  Subject,
  Test,
  AssessmentType,
  CurrentAffair,
  CurrentAffairsType,
  UserProfile,
  StudentProfile,
  Video,
  Logo,
  LeadershipImage,
  StaticContent,
} from '../backend';
import { ExternalBlob } from '../backend';

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Admin Check
export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

// Course Queries
export function useGetSortedCoursesByCategory() {
  const { actor, isFetching } = useActor();

  return useQuery<Course[]>({
    queryKey: ['courses', 'sorted'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSortedCoursesByCategory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCoursesByCategory(category: CourseCategory) {
  const { actor, isFetching } = useActor();

  return useQuery<Course[]>({
    queryKey: ['courses', 'category', category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCoursesByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddCourse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      category: CourseCategory;
      syllabus: string[];
      videoLectures: string[];
      notesFiles: ExternalBlob[];
      pyqFiles: ExternalBlob[];
      testSeries: string[];
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addCourse(
        params.category,
        params.syllabus,
        params.videoLectures,
        params.notesFiles,
        params.pyqFiles,
        params.testSeries
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
}

export function useUpdateCourse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      id: bigint;
      category: CourseCategory;
      syllabus: string[];
      videoLectures: string[];
      notesFiles: ExternalBlob[];
      pyqFiles: ExternalBlob[];
      testSeries: string[];
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateCourse(
        params.id,
        params.category,
        params.syllabus,
        params.videoLectures,
        params.notesFiles,
        params.pyqFiles,
        params.testSeries
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
}

export function useDeleteCourse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteCourse(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
}

// Notes Queries
export function useGetNotesBySubject(subject: Subject) {
  const { actor, isFetching } = useActor();

  return useQuery<Note[]>({
    queryKey: ['notes', 'subject', subject],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNotesBySubject(subject);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllNotes() {
  const { actor, isFetching } = useActor();

  return useQuery<Note[]>({
    queryKey: ['notes', 'all'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllNotes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddNote() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { subject: Subject; file: ExternalBlob }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addNote(params.subject, params.file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}

export function useUpdateNote() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { id: bigint; subject: Subject; file: ExternalBlob }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateNote(params.id, params.subject, params.file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}

export function useDeleteNote() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteNote(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}

// Test Queries
export function useGetTestsByType(assessmentType: AssessmentType) {
  const { actor, isFetching } = useActor();

  return useQuery<Test[]>({
    queryKey: ['tests', 'type', assessmentType],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTestsByType(assessmentType);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddTest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { assessmentType: AssessmentType; questions: string[] }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addTest(params.assessmentType, params.questions);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tests'] });
    },
  });
}

export function useUpdateTest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { id: bigint; assessmentType: AssessmentType; questions: string[] }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateTest(params.id, params.assessmentType, params.questions);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tests'] });
    },
  });
}

export function useDeleteTest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteTest(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tests'] });
    },
  });
}

// Current Affairs Queries
export function useGetCurrentAffairsByType(type: CurrentAffairsType) {
  const { actor, isFetching } = useActor();

  return useQuery<CurrentAffair[]>({
    queryKey: ['currentAffairs', 'type', type],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCurrentAffairsByType(type);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllCurrentAffairs() {
  const { actor, isFetching } = useActor();

  return useQuery<CurrentAffair[]>({
    queryKey: ['currentAffairs', 'all'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCurrentAffairs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddCurrentAffair() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      type: CurrentAffairsType;
      content: string;
      file: ExternalBlob | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addCurrentAffair(params.type, params.content, params.file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentAffairs'] });
    },
  });
}

export function useUpdateCurrentAffair() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      id: bigint;
      type: CurrentAffairsType;
      content: string;
      file: ExternalBlob | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateCurrentAffair(params.id, params.type, params.content, params.file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentAffairs'] });
    },
  });
}

export function useDeleteCurrentAffair() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteCurrentAffair(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentAffairs'] });
    },
  });
}

// Video Queries
export function useGetAllVideos() {
  const { actor, isFetching } = useActor();

  return useQuery<Video[]>({
    queryKey: ['videos', 'all'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllVideos();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddVideo() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      title: string;
      category: string;
      description: string;
      youtubeLink: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addVideo(params.title, params.category, params.description, params.youtubeLink);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
  });
}

export function useUpdateVideo() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      id: bigint;
      title: string;
      category: string;
      description: string;
      youtubeLink: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateVideo(params.id, params.title, params.category, params.description, params.youtubeLink);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
  });
}

export function useDeleteVideo() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteVideo(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
  });
}

// Student Queries
export function useGetAllStudents() {
  const { actor, isFetching } = useActor();

  return useQuery<StudentProfile[]>({
    queryKey: ['students', 'all'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllStudents();
    },
    enabled: !!actor && !isFetching,
  });
}

// Student Registration
export function useRegisterStudent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { name: string; email: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.registerStudent(params.name, params.email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useEnrollCourse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { studentId: bigint; courseId: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.enrollCourse(params.studentId, params.courseId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student'] });
    },
  });
}

export function useGetStudent(id: bigint | undefined) {
  const { actor, isFetching } = useActor();

  return useQuery<StudentProfile | null>({
    queryKey: ['student', id?.toString()],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getStudent(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

// Logo Queries
export function useGetLogo() {
  const { actor, isFetching } = useActor();

  return useQuery<Logo | null>({
    queryKey: ['logo'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getLogo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateLogo() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (logo: Logo) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateLogo(logo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logo'] });
    },
  });
}

// Leadership Images Queries
export function useGetAllLeadershipImages() {
  const { actor, isFetching } = useActor();

  return useQuery<LeadershipImage[]>({
    queryKey: ['leadershipImages'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllLeadershipImages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetLeadershipImage(name: string) {
  const { actor, isFetching } = useActor();

  return useQuery<LeadershipImage | null>({
    queryKey: ['leadershipImages', name],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getLeadershipImage(name);
    },
    enabled: !!actor && !isFetching && !!name,
  });
}

export function useAddLeadershipImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      name: string;
      image: ExternalBlob;
      position: string;
      description: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addLeadershipImage(params.name, params.image, params.position, params.description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leadershipImages'] });
    },
  });
}

export function useUpdateLeadershipImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      name: string;
      image: ExternalBlob;
      position: string;
      description: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateLeadershipImage(params.name, params.image, params.position, params.description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leadershipImages'] });
    },
  });
}

export function useDeleteLeadershipImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteLeadershipImage(name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leadershipImages'] });
    },
  });
}

// Static Content Queries
export function useGetStaticContent() {
  const { actor, isFetching } = useActor();

  return useQuery<StaticContent>({
    queryKey: ['staticContent'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getStaticContent();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateStaticContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { aboutUs: string; contactInfo: string; footerText: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateStaticContent(params.aboutUs, params.contactInfo, params.footerText);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staticContent'] });
    },
  });
}
