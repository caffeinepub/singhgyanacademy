import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ClipboardList } from 'lucide-react';
import { AssessmentType } from '../backend';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function AITestGenerator() {
  const [testType, setTestType] = useState<string>('');
  const [topic, setTopic] = useState('');
  const [questionCount, setQuestionCount] = useState('10');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);

  const testTypeLabels: Record<AssessmentType, string> = {
    [AssessmentType.dailyQuiz]: 'Daily Quiz (MCQ)',
    [AssessmentType.weeklyTest]: 'Weekly Test',
    [AssessmentType.fullLengthTest]: 'Full Length Mock Test',
  };

  const generateQuestions = (type: string, top: string, count: number): Question[] => {
    const questions: Question[] = [];
    
    for (let i = 0; i < count; i++) {
      questions.push({
        question: `Question ${i + 1}: Which of the following statements about ${top} is correct?`,
        options: [
          `${top} is primarily related to physical geography`,
          `${top} has significant implications for competitive exams`,
          `${top} was first introduced in the Indian Constitution`,
          `All of the above statements are correct`,
        ],
        correctAnswer: 1,
        explanation: `This question tests your understanding of ${top}. The correct answer focuses on the exam relevance of this topic. Understanding ${top} is crucial for competitive exam preparation.`,
      });
    }

    return questions;
  };

  const handleGenerate = () => {
    if (!testType || !topic.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const count = parseInt(questionCount) || 10;
      const questions = generateQuestions(testType, topic, count);
      setGeneratedQuestions(questions);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="testType">Test Type</Label>
          <Select value={testType} onValueChange={setTestType}>
            <SelectTrigger id="testType">
              <SelectValue placeholder="Choose test type" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(testTypeLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="topic">Topic</Label>
          <Input
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Indian Geography"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="count">Number of Questions</Label>
          <Select value={questionCount} onValueChange={setQuestionCount}>
            <SelectTrigger id="count">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 Questions</SelectItem>
              <SelectItem value="10">10 Questions</SelectItem>
              <SelectItem value="15">15 Questions</SelectItem>
              <SelectItem value="20">20 Questions</SelectItem>
              <SelectItem value="25">25 Questions</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        onClick={handleGenerate}
        disabled={!testType || !topic.trim() || isGenerating}
        className="w-full"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Test...
          </>
        ) : (
          <>
            <ClipboardList className="mr-2 h-4 w-4" />
            Generate Test
          </>
        )}
      </Button>

      {generatedQuestions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Generated Test Preview</h3>
            <p className="text-sm text-muted-foreground">
              {generatedQuestions.length} questions on {topic}
            </p>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {generatedQuestions.map((q, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-base">{q.question}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    {q.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-lg border ${
                          optIndex === q.correctAnswer
                            ? 'bg-green-50 border-green-300 dark:bg-green-950 dark:border-green-800'
                            : 'bg-muted/30'
                        }`}
                      >
                        <span className="font-medium mr-2">
                          {String.fromCharCode(65 + optIndex)}.
                        </span>
                        {option}
                        {optIndex === q.correctAnswer && (
                          <span className="ml-2 text-green-600 dark:text-green-400 text-sm font-semibold">
                            ✓ Correct
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">Explanation:</span> {q.explanation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex gap-3">
            <Button className="flex-1">Save Test</Button>
            <Button variant="outline" className="flex-1">
              Start Practice
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
