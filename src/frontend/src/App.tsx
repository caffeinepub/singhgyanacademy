import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Notes from './pages/Notes';
import TestSeries from './pages/TestSeries';
import CurrentAffairs from './pages/CurrentAffairs';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import AILearningZone from './pages/AILearningZone';
import CompetitiveExams from './pages/CompetitiveExams';
import CivilServicesExams from './pages/CivilServicesExams';
import StatePCSDetail from './pages/StatePCSDetail';
import SSCExams from './pages/SSCExams';
import SSCExamDetail from './pages/SSCExamDetail';
import RailwayExams from './pages/RailwayExams';
import RailwayExamDetail from './pages/RailwayExamDetail';
import PoliceExams from './pages/PoliceExams';
import PoliceExamDetail from './pages/PoliceExamDetail';
import TeachingExams from './pages/TeachingExams';
import TeachingExamDetail from './pages/TeachingExamDetail';
import BankingExams from './pages/BankingExams';
import BankingExamDetail from './pages/BankingExamDetail';
import DefenceExams from './pages/DefenceExams';
import DefenceExamDetail from './pages/DefenceExamDetail';
import SchoolEducation from './pages/SchoolEducation';
import ClassDetail from './pages/ClassDetail';
import StudyMaterial from './pages/StudyMaterial';
import VideoClasses from './pages/VideoClasses';
import GeographySpecial from './pages/GeographySpecial';
import AdminDashboard from './pages/admin/Dashboard';
import ManageCourses from './pages/admin/ManageCourses';
import ManageNotes from './pages/admin/ManageNotes';
import ManageTests from './pages/admin/ManageTests';
import ManageCurrentAffairs from './pages/admin/ManageCurrentAffairs';
import ManageVideos from './pages/admin/ManageVideos';
import BrandingSettings from './pages/admin/BrandingSettings';
import StudentManagement from './pages/admin/StudentManagement';
import ManageLeadership from './pages/admin/ManageLeadership';
import StaticContentSettings from './pages/admin/StaticContentSettings';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Navigation />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const coursesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/courses',
  component: Courses,
});

const courseDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/courses/$category',
  component: CourseDetail,
});

const notesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/notes',
  component: Notes,
});

const testSeriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/test-series',
  component: TestSeries,
});

const currentAffairsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/current-affairs',
  component: CurrentAffairs,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutUs,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: Contact,
});

const aiLearningZoneRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai-learning',
  component: AILearningZone,
});

const competitiveExamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/competitive-exams',
  component: CompetitiveExams,
});

const civilServicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/competitive-exams/civil-services',
  component: CivilServicesExams,
});

const statePCSDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/competitive-exams/civil-services/$state',
  component: StatePCSDetail,
});

const sscExamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/competitive-exams/ssc',
  component: SSCExams,
});

const sscExamDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/competitive-exams/ssc/$examType',
  component: SSCExamDetail,
});

const railwayExamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/competitive-exams/railway',
  component: RailwayExams,
});

const railwayExamDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/competitive-exams/railway/$examType',
  component: RailwayExamDetail,
});

const policeExamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/competitive-exams/police',
  component: PoliceExams,
});

const policeExamDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/competitive-exams/police/$examType',
  component: PoliceExamDetail,
});

const teachingExamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/competitive-exams/teaching',
  component: TeachingExams,
});

const teachingExamDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/competitive-exams/teaching/$examType',
  component: TeachingExamDetail,
});

const bankingExamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/competitive-exams/banking',
  component: BankingExams,
});

const bankingExamDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/competitive-exams/banking/$examType',
  component: BankingExamDetail,
});

const defenceExamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/competitive-exams/defence',
  component: DefenceExams,
});

const defenceExamDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/competitive-exams/defence/$examType',
  component: DefenceExamDetail,
});

const schoolEducationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/school-education',
  component: SchoolEducation,
});

const classDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/school-education/class/$classNumber',
  component: ClassDetail,
});

const studyMaterialRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/study-material',
  component: StudyMaterial,
});

const videoClassesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/video-classes',
  component: VideoClasses,
});

const geographySpecialRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/geography-special',
  component: GeographySpecial,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminDashboard,
});

const adminManageCoursesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/manage-courses',
  component: ManageCourses,
});

const adminManageNotesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/manage-notes',
  component: ManageNotes,
});

const adminManageTestsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/manage-tests',
  component: ManageTests,
});

const adminManageCurrentAffairsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/manage-current-affairs',
  component: ManageCurrentAffairs,
});

const adminVideosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/videos',
  component: ManageVideos,
});

const adminBrandingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/branding',
  component: BrandingSettings,
});

const adminStudentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/students',
  component: StudentManagement,
});

const adminLeadershipRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/leadership',
  component: ManageLeadership,
});

const adminStaticContentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/static-content',
  component: StaticContentSettings,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  coursesRoute,
  courseDetailRoute,
  notesRoute,
  testSeriesRoute,
  currentAffairsRoute,
  aboutRoute,
  contactRoute,
  aiLearningZoneRoute,
  competitiveExamsRoute,
  civilServicesRoute,
  statePCSDetailRoute,
  sscExamsRoute,
  sscExamDetailRoute,
  railwayExamsRoute,
  railwayExamDetailRoute,
  policeExamsRoute,
  policeExamDetailRoute,
  teachingExamsRoute,
  teachingExamDetailRoute,
  bankingExamsRoute,
  bankingExamDetailRoute,
  defenceExamsRoute,
  defenceExamDetailRoute,
  schoolEducationRoute,
  classDetailRoute,
  studyMaterialRoute,
  videoClassesRoute,
  geographySpecialRoute,
  adminDashboardRoute,
  adminManageCoursesRoute,
  adminManageNotesRoute,
  adminManageTestsRoute,
  adminManageCurrentAffairsRoute,
  adminVideosRoute,
  adminBrandingRoute,
  adminStudentsRoute,
  adminLeadershipRoute,
  adminStaticContentRoute,
]);

const router = createRouter({ routeTree });

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
