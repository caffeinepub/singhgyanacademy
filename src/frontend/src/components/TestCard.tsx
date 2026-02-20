import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardList } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import type { Test } from '../backend';
import { AssessmentType } from '../backend';

interface TestCardProps {
  test: Test;
  assessmentType: AssessmentType;
}

const typeLabels: Record<AssessmentType, string> = {
  [AssessmentType.dailyQuiz]: 'Daily Quiz',
  [AssessmentType.weeklyTest]: 'Weekly Test',
  [AssessmentType.fullLengthTest]: 'Full Length Test',
};

export default function TestCard({ test, assessmentType }: TestCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-3">
          <ClipboardList className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="text-lg">{typeLabels[assessmentType]} #{test.id.toString()}</CardTitle>
            <CardDescription>{test.questions.length} questions</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button
          className="w-full"
          onClick={() => navigate({ to: `/test-series/${assessmentType}/${test.id.toString()}` })}
        >
          Start Test
        </Button>
      </CardContent>
    </Card>
  );
}
