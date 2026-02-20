import { useNavigate } from '@tanstack/react-router';
import {
  useIsCallerAdmin,
  useGetSortedCoursesByCategory,
  useGetAllVideos,
  useGetAllNotes,
  useGetTestsByType,
  useGetAllCurrentAffairs,
  useGetAllStudents,
} from '../../hooks/useQueries';
import AccessDeniedScreen from '../../components/AccessDeniedScreen';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  FileText,
  ClipboardList,
  Newspaper,
  Loader2,
  Video,
  Palette,
  Users,
  UserCircle,
  FileEdit,
} from 'lucide-react';
import { AssessmentType } from '../../backend';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { data: isAdmin, isLoading } = useIsCallerAdmin();

  // Fetch counts for dashboard cards
  const { data: courses = [] } = useGetSortedCoursesByCategory();
  const { data: videos = [] } = useGetAllVideos();
  const { data: notes = [] } = useGetAllNotes();
  const { data: dailyQuizzes = [] } = useGetTestsByType(AssessmentType.dailyQuiz);
  const { data: weeklyTests = [] } = useGetTestsByType(AssessmentType.weeklyTest);
  const { data: fullLengthTests = [] } = useGetTestsByType(AssessmentType.fullLengthTest);
  const { data: currentAffairs = [] } = useGetAllCurrentAffairs();
  const { data: students = [] } = useGetAllStudents();

  const totalTests = dailyQuizzes.length + weeklyTests.length + fullLengthTests.length;

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return <AccessDeniedScreen />;
  }

  const adminSections = [
    {
      icon: BookOpen,
      title: 'Course Management',
      description: 'Add, edit, and delete courses',
      path: '/admin/manage-courses',
      count: courses.length,
    },
    {
      icon: Video,
      title: 'Video Management',
      description: 'Manage YouTube video library',
      path: '/admin/videos',
      count: videos.length,
    },
    {
      icon: FileText,
      title: 'Notes Management',
      description: 'Upload and manage study notes',
      path: '/admin/manage-notes',
      count: notes.length,
    },
    {
      icon: ClipboardList,
      title: 'Test Management',
      description: 'Create and manage test series',
      path: '/admin/manage-tests',
      count: totalTests,
    },
    {
      icon: Newspaper,
      title: 'Current Affairs',
      description: 'Publish current affairs updates',
      path: '/admin/manage-current-affairs',
      count: currentAffairs.length,
    },
    {
      icon: Palette,
      title: 'Branding Settings',
      description: 'Customize logo and branding',
      path: '/admin/branding',
      count: null,
    },
    {
      icon: Users,
      title: 'Student Management',
      description: 'View and manage students',
      path: '/admin/students',
      count: students.length,
    },
    {
      icon: UserCircle,
      title: 'Manage Leadership',
      description: 'Upload leadership profile images',
      path: '/admin/leadership',
      count: null,
    },
    {
      icon: FileEdit,
      title: 'Static Content',
      description: 'Edit About Us, contact info, footer',
      path: '/admin/static-content',
      count: null,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground">Manage all platform content from here</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section) => (
            <Card key={section.path} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <section.icon className="h-8 w-8 text-primary" />
                  {section.count !== null && (
                    <span className="text-2xl font-bold text-primary">{section.count}</span>
                  )}
                </div>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => navigate({ to: section.path })} className="w-full">
                  Manage
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
