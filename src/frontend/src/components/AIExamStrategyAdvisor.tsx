import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, BookOpen, Clock, Target } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CourseCategory } from '../backend';

interface Strategy {
  studyPlan: string;
  books: string[];
  timeTable: string;
}

export default function AIExamStrategyAdvisor() {
  const [examType, setExamType] = useState<string>('');
  const [question, setQuestion] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [strategy, setStrategy] = useState<Strategy | null>(null);

  const examLabels: Record<CourseCategory, string> = {
    [CourseCategory.upsc]: 'UPSC Civil Services',
    [CourseCategory.uppcs]: 'UPPCS',
    [CourseCategory.ssc]: 'SSC (CGL/CHSL/MTS)',
    [CourseCategory.railway]: 'Railway Exams',
    [CourseCategory.banking]: 'Banking (IBPS/SBI)',
    [CourseCategory.tet_ctet]: 'TET / CTET',
    [CourseCategory.police]: 'Police Exams',
    [CourseCategory.nda_cds]: 'NDA / CDS',
    [CourseCategory.university_geography]: 'University Geography',
  };

  const generateStrategy = (exam: string): Strategy => {
    const strategies: Record<string, Strategy> = {
      [CourseCategory.upsc]: {
        studyPlan: `# UPSC Civil Services Preparation Strategy\n\n## Phase 1: Foundation (3-4 months)\n• Complete NCERT books (Class 6-12)\n• Focus on understanding concepts\n• Make notes for quick revision\n• Start reading newspapers daily\n\n## Phase 2: Standard Books (4-5 months)\n• Subject-wise standard reference books\n• Previous year question analysis\n• Current affairs compilation\n• Answer writing practice begins\n\n## Phase 3: Prelims Focus (2-3 months)\n• Intensive revision\n• Mock tests (at least 20-25)\n• Time management practice\n• Weak areas improvement\n\n## Phase 4: Mains Preparation (4-5 months)\n• Answer writing practice daily\n• Optional subject completion\n• Essay writing practice\n• Test series enrollment\n\n## Phase 5: Interview Preparation (1-2 months)\n• Current affairs mastery\n• Mock interviews\n• Personality development\n• DAF preparation`,
        books: [
          'NCERT Books (Class 6-12) - All subjects',
          'Indian Polity - M. Laxmikanth',
          'Indian Economy - Ramesh Singh',
          'Certificate Physical and Human Geography - G.C. Leong',
          'India\'s Struggle for Independence - Bipan Chandra',
          'Indian Art and Culture - Nitin Singhania',
          'Environment and Ecology - Shankar IAS Academy',
          'Science and Technology - Ravi P. Agrahari',
          'The Hindu / Indian Express - Daily newspaper',
          'Yojana and Kurukshetra - Monthly magazines',
        ],
        timeTable: `## Daily Study Schedule (10-12 hours)\n\n### Morning (6:00 AM - 9:00 AM)\n• Newspaper reading (1 hour)\n• Current affairs notes (30 min)\n• Previous day revision (1.5 hours)\n\n### Mid-Morning (9:30 AM - 1:00 PM)\n• Subject 1 - New topics (3.5 hours)\n• Short break every 90 minutes\n\n### Afternoon (2:00 PM - 5:00 PM)\n• Subject 2 - New topics (3 hours)\n• Include answer writing practice\n\n### Evening (5:30 PM - 8:00 PM)\n• Revision of the day (1.5 hours)\n• Optional subject / Weak areas (1 hour)\n\n### Night (8:30 PM - 10:00 PM)\n• Light reading / Current affairs\n• Next day planning\n• Relaxation\n\n### Weekly Schedule\n• Monday-Friday: Regular study\n• Saturday: Revision + Mock test\n• Sunday: Test analysis + Recreation`,
      },
      [CourseCategory.ssc]: {
        studyPlan: `# SSC Exam Preparation Strategy\n\n## Phase 1: Basics (1-2 months)\n• Mathematics fundamentals\n• English grammar basics\n• Reasoning patterns\n• General awareness foundation\n\n## Phase 2: Advanced (2-3 months)\n• Speed mathematics\n• Advanced reasoning\n• English comprehension\n• Current affairs daily\n\n## Phase 3: Practice (1-2 months)\n• Previous year papers (10 years)\n• Mock tests (minimum 30)\n• Speed and accuracy focus\n• Weak topic improvement\n\n## Key Focus Areas\n• Speed is crucial - practice timed tests\n• Accuracy matters - negative marking\n• Current affairs - last 6 months\n• Regular revision essential`,
        books: [
          'Quantitative Aptitude - R.S. Aggarwal',
          'Fast Track Objective Arithmetic - Rajesh Verma',
          'English Grammar - Wren & Martin',
          'Word Power Made Easy - Norman Lewis',
          'Analytical Reasoning - M.K. Pandey',
          'Lucent\'s General Knowledge',
          'Manorama Yearbook - Current Affairs',
          'Previous Year Papers - Kiran Publication',
          'SSC Mathematics - Rakesh Yadav',
          'General Science - Lucent Publication',
        ],
        timeTable: `## Daily Study Schedule (6-8 hours)\n\n### Morning (7:00 AM - 10:00 AM)\n• Mathematics practice (2 hours)\n• Previous day revision (1 hour)\n\n### Mid-Day (11:00 AM - 2:00 PM)\n• Reasoning practice (1.5 hours)\n• English practice (1.5 hours)\n\n### Evening (4:00 PM - 7:00 PM)\n• General Awareness (1.5 hours)\n• Current Affairs (1 hour)\n• Mock test / Previous papers (30 min)\n\n### Night (8:00 PM - 9:00 PM)\n• Revision and doubt clearing\n• Next day planning\n\n### Weekly Pattern\n• Daily: 1 hour current affairs\n• Alternate days: Full mock test\n• Sunday: Weekly revision + analysis`,
      },
      default: {
        studyPlan: `# General Exam Preparation Strategy\n\n## Foundation Phase\n• Understand exam pattern thoroughly\n• Collect study materials\n• Create a realistic study schedule\n• Join test series\n\n## Preparation Phase\n• Subject-wise preparation\n• Regular practice and revision\n• Mock tests weekly\n• Current affairs daily\n\n## Final Phase\n• Intensive revision\n• Multiple mock tests\n• Time management practice\n• Confidence building\n\n## Important Tips\n• Consistency is key\n• Quality over quantity\n• Regular self-assessment\n• Stay motivated and healthy`,
        books: [
          'NCERT Books - Foundation',
          'Standard reference books for each subject',
          'Previous year question papers',
          'Current affairs magazines',
          'Test series material',
        ],
        timeTable: `## Daily Study Schedule\n\n### Morning Session (3-4 hours)\n• New topic learning\n• Concept building\n\n### Afternoon Session (2-3 hours)\n• Practice and problem solving\n• Previous year questions\n\n### Evening Session (2-3 hours)\n• Revision\n• Current affairs\n• Mock tests\n\n### Weekly Pattern\n• 6 days study\n• 1 day revision and recreation`,
      },
    };

    return strategies[exam] || strategies.default;
  };

  const handleGenerate = () => {
    if (!examType) return;

    setIsGenerating(true);
    setTimeout(() => {
      const strat = generateStrategy(examType);
      setStrategy(strat);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="examType">Select Exam</Label>
          <Select value={examType} onValueChange={setExamType}>
            <SelectTrigger id="examType">
              <SelectValue placeholder="Choose exam type" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(examLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="question">Your Question (Optional)</Label>
          <Textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., मुझे 6 महीने में तैयारी करनी है..."
            rows={3}
          />
        </div>
      </div>

      <Button
        onClick={handleGenerate}
        disabled={!examType || isGenerating}
        className="w-full"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Strategy...
          </>
        ) : (
          <>
            <Target className="mr-2 h-4 w-4" />
            Get Exam Strategy
          </>
        )}
      </Button>

      {strategy && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">Study Plan</h3>
              </div>
              <ScrollArea className="h-[300px] border rounded-lg p-4">
                <pre className="whitespace-pre-wrap font-sans text-sm">
                  {strategy.studyPlan}
                </pre>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">Recommended Books</h3>
              </div>
              <ul className="space-y-2">
                {strategy.books.map((book, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary font-semibold">{index + 1}.</span>
                    <span className="text-sm">{book}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">Time Table</h3>
              </div>
              <ScrollArea className="h-[300px] border rounded-lg p-4">
                <pre className="whitespace-pre-wrap font-sans text-sm">
                  {strategy.timeTable}
                </pre>
              </ScrollArea>
            </CardContent>
          </Card>

          <Button className="w-full" variant="outline">
            Download Complete Strategy
          </Button>
        </div>
      )}
    </div>
  );
}
