import { useGetSortedCoursesByCategory } from '../hooks/useQueries';
import CourseCard from '../components/CourseCard';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen } from 'lucide-react';
import { CourseCategory } from '../backend';

export default function Courses() {
  const { data: courses = [], isLoading } = useGetSortedCoursesByCategory();

  const coursesByCategory = courses.reduce((acc, course) => {
    acc[course.category] = (acc[course.category] || 0) + 1;
    return acc;
  }, {} as Record<CourseCategory, number>);

  const categories: CourseCategory[] = [
    CourseCategory.upsc,
    CourseCategory.uppcs,
    CourseCategory.sscCGL,
    CourseCategory.rrbNTPC,
    CourseCategory.ibpsPO,
    CourseCategory.ctet,
    CourseCategory.upPolice,
    CourseCategory.nda,
    CourseCategory.university_geography,
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <BookOpen className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">All Courses</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive preparation material for all major competitive exams. Choose your exam category to get started.
          </p>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CourseCard key={category} category={category} courseCount={coursesByCategory[category] || 0} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
