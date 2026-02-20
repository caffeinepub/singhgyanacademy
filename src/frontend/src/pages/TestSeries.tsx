import { ClipboardList } from 'lucide-react';
import { useGetTestsByType } from '../hooks/useQueries';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TestCard from '../components/TestCard';
import { AssessmentType } from '../backend';
import { useState } from 'react';

export default function TestSeries() {
  const [activeType, setActiveType] = useState<AssessmentType>(AssessmentType.dailyQuiz);

  const { data: dailyQuizzes = [] } = useGetTestsByType(AssessmentType.dailyQuiz);
  const { data: weeklyTests = [] } = useGetTestsByType(AssessmentType.weeklyTest);
  const { data: fullLengthTests = [] } = useGetTestsByType(AssessmentType.fullLengthTest);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <ClipboardList className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">Test Series</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practice with our comprehensive test series. Track your progress and improve your performance.
          </p>
        </div>

        <Tabs value={activeType} onValueChange={(v) => setActiveType(v as AssessmentType)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value={AssessmentType.dailyQuiz}>Daily Quiz</TabsTrigger>
            <TabsTrigger value={AssessmentType.weeklyTest}>Weekly Test</TabsTrigger>
            <TabsTrigger value={AssessmentType.fullLengthTest}>Full Length Test</TabsTrigger>
          </TabsList>

          <TabsContent value={AssessmentType.dailyQuiz}>
            {dailyQuizzes.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {dailyQuizzes.map((test) => (
                  <TestCard key={test.id.toString()} test={test} assessmentType={AssessmentType.dailyQuiz} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <ClipboardList className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No daily quizzes available yet.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value={AssessmentType.weeklyTest}>
            {weeklyTests.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {weeklyTests.map((test) => (
                  <TestCard key={test.id.toString()} test={test} assessmentType={AssessmentType.weeklyTest} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <ClipboardList className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No weekly tests available yet.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value={AssessmentType.fullLengthTest}>
            {fullLengthTests.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {fullLengthTests.map((test) => (
                  <TestCard key={test.id.toString()} test={test} assessmentType={AssessmentType.fullLengthTest} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <ClipboardList className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No full length tests available yet.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
