import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Video, FileText } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { CourseCategory } from '../backend';

interface CourseCardProps {
  category: CourseCategory;
  courseCount: number;
}

const categoryLabels: Record<CourseCategory, string> = {
  [CourseCategory.upsc]: 'UPSC',
  [CourseCategory.uppcs]: 'UPPCS',
  [CourseCategory.ssc]: 'SSC',
  [CourseCategory.railway]: 'Railway',
  [CourseCategory.banking]: 'Banking',
  [CourseCategory.tet_ctet]: 'TET / CTET',
  [CourseCategory.police]: 'Police',
  [CourseCategory.nda_cds]: 'NDA / CDS',
  [CourseCategory.university_geography]: 'University Geography',
};

export default function CourseCard({ category, courseCount }: CourseCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate({ to: `/courses/${category}` })}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <img src="/assets/generated/exam-icons.dim_64x64.png" alt={categoryLabels[category]} className="h-12 w-12" />
          <BookOpen className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-xl">{categoryLabels[category]}</CardTitle>
        <CardDescription>{courseCount} course{courseCount !== 1 ? 's' : ''} available</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Video className="h-4 w-4" />
            <span>Videos</span>
          </div>
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>Notes</span>
          </div>
        </div>
        <Button className="w-full" variant="outline">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
