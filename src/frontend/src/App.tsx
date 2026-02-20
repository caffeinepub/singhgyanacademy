import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Layout from './components/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import VideoClasses from './pages/VideoClasses';
import Notes from './pages/Notes';
import TestSeries from './pages/TestSeries';
import TakeTest from './pages/TakeTest';
import CurrentAffairs from './pages/CurrentAffairs';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import AILearningZone from './pages/AILearningZone';
import AdminDashboard from './pages/admin/Dashboard';
import ManageCourses from './pages/admin/ManageCourses';
import ManageNotes from './pages/admin/ManageNotes';
import ManageTests from './pages/admin/ManageTests';
import ManageCurrentAffairs from './pages/admin/ManageCurrentAffairs';
import ManageVideos from './pages/admin/ManageVideos';
import BrandingSettings from './pages/admin/BrandingSettings';
import StudentManagement from './pages/admin/StudentManagement';
import ProfileSetup from './components/ProfileSetup';

const rootRoute = createRootRoute({
  component: Layout,
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

const videoClassesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/video-classes',
  component: VideoClasses,
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

const takeTestRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/test-series/$type/$testId',
  component: TakeTest,
});

const currentAffairsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/current-affairs',
  component: CurrentAffairs,
});

const aiLearningZoneRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai-learning-zone',
  component: AILearningZone,
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

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminDashboard,
});

const adminCoursesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/manage-courses',
  component: ManageCourses,
});

const adminNotesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/manage-notes',
  component: ManageNotes,
});

const adminTestsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/manage-tests',
  component: ManageTests,
});

const adminCurrentAffairsRoute = createRoute({
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

const routeTree = rootRoute.addChildren([
  indexRoute,
  coursesRoute,
  courseDetailRoute,
  videoClassesRoute,
  notesRoute,
  testSeriesRoute,
  takeTestRoute,
  currentAffairsRoute,
  aiLearningZoneRoute,
  aboutRoute,
  contactRoute,
  adminDashboardRoute,
  adminCoursesRoute,
  adminNotesRoute,
  adminTestsRoute,
  adminCurrentAffairsRoute,
  adminVideosRoute,
  adminBrandingRoute,
  adminStudentsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <ProfileSetup />
      <Toaster />
    </ThemeProvider>
  );
}
