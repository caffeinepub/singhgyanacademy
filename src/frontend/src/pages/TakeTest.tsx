import { useState, useEffect } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetTestsByType } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { AssessmentType } from '../backend';

export default function TakeTest() {
  const { type, testId } = useParams({ from: '/test-series/$type/$testId' });
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: tests = [] } = useGetTestsByType(type as AssessmentType);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const test = tests.find((t) => t.id.toString() === testId);

  useEffect(() => {
    if (test) {
      setAnswers(new Array(test.questions.length).fill(''));
    }
  }, [test]);

  if (!identity) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert>
          <AlertDescription>Please login to take tests.</AlertDescription>
        </Alert>
        <Button className="mt-4" onClick={() => navigate({ to: '/test-series' })}>
          Back to Test Series
        </Button>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert>
          <AlertDescription>Test not found.</AlertDescription>
        </Alert>
        <Button className="mt-4" onClick={() => navigate({ to: '/test-series' })}>
          Back to Test Series
        </Button>
      </div>
    );
  }

  const handleAnswerChange = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const progress = ((currentQuestion + 1) / test.questions.length) * 100;
  const answeredCount = answers.filter((a) => a.trim() !== '').length;

  if (showResults) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-chart-2" />
                Test Completed!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-8">
                <p className="text-4xl font-bold text-primary mb-2">
                  {answeredCount} / {test.questions.length}
                </p>
                <p className="text-muted-foreground">Questions Answered</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Your Answers:</h3>
                {test.questions.map((question, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <p className="font-medium mb-2">
                      Q{index + 1}. {question}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Your answer: {answers[index] || <span className="text-destructive">Not answered</span>}
                    </p>
                  </div>
                ))}
              </div>

              <Button className="w-full" onClick={() => navigate({ to: '/test-series' })}>
                Back to Test Series
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {test.questions.length}
            </span>
            <span className="text-sm text-muted-foreground">
              Answered: {answeredCount} / {test.questions.length}
            </span>
          </div>
          <Progress value={progress} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Question {currentQuestion + 1}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg">{test.questions[currentQuestion]}</p>

            <div className="space-y-2">
              <label className="block text-sm font-medium mb-2">Your Answer:</label>
              <textarea
                className="w-full min-h-[120px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Type your answer here..."
                value={answers[currentQuestion]}
                onChange={(e) => handleAnswerChange(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentQuestion === test.questions.length - 1 ? (
                <Button onClick={handleSubmit}>Submit Test</Button>
              ) : (
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
