import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Calendar, Clock } from 'lucide-react';
import { CourseCategory } from '../backend';

export default function AIExamStrategyAdvisor() {
  const [selectedExam, setSelectedExam] = useState<string>('');
  const [strategy, setStrategy] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const examOptions = [
    { value: CourseCategory.upsc, label: 'UPSC Civil Services' },
    { value: CourseCategory.sscCGL, label: 'SSC CGL' },
    { value: CourseCategory.sscCHSL, label: 'SSC CHSL' },
    { value: CourseCategory.rrbNTPC, label: 'Railway NTPC' },
    { value: CourseCategory.ibpsPO, label: 'Banking IBPS PO' },
    { value: CourseCategory.ctet, label: 'CTET' },
    { value: CourseCategory.upPolice, label: 'Police Exams' },
    { value: CourseCategory.nda, label: 'NDA' },
  ];

  const generateStrategy = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const examLabel = examOptions.find(e => e.value === selectedExam)?.label || 'Selected Exam';
      
      setStrategy({
        exam: examLabel,
        duration: '6-12 months',
        phases: [
          { name: 'Foundation Phase', duration: '2-3 months', focus: 'Basic concepts and NCERT books' },
          { name: 'Advanced Phase', duration: '3-4 months', focus: 'Standard books and current affairs' },
          { name: 'Revision Phase', duration: '2-3 months', focus: 'Mock tests and previous papers' },
          { name: 'Final Phase', duration: '1 month', focus: 'Quick revision and confidence building' },
        ],
        books: [
          'NCERT Books (Class 6-12)',
          'Standard Reference Books for each subject',
          'Previous Year Question Papers',
          'Current Affairs Monthly Compilations',
        ],
        timeTable: {
          morning: '6:00 AM - 9:00 AM: Core subjects study',
          afternoon: '2:00 PM - 5:00 PM: Practice and revision',
          evening: '7:00 PM - 9:00 PM: Current affairs and notes making',
        },
      });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Select Exam</label>
          <Select value={selectedExam} onValueChange={setSelectedExam}>
            <SelectTrigger>
              <SelectValue placeholder="Choose your target exam" />
            </SelectTrigger>
            <SelectContent>
              {examOptions.map((exam) => (
                <SelectItem key={exam.value} value={exam.value}>
                  {exam.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={generateStrategy} disabled={!selectedExam || isGenerating} className="w-full">
          {isGenerating ? 'Generating Strategy...' : 'Generate Study Plan'}
        </Button>
      </div>

      {strategy && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Study Plan for {strategy.exam}
              </h3>
              <p className="text-muted-foreground mb-4">
                Recommended Duration: <span className="font-semibold text-foreground">{strategy.duration}</span>
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">Preparation Phases:</h4>
                  <div className="space-y-3">
                    {strategy.phases.map((phase: any, index: number) => (
                      <div key={index} className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold">{phase.name}</h5>
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {phase.duration}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{phase.focus}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Recommended Books:
                  </h4>
                  <ul className="space-y-2">
                    {strategy.books.map((book: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{book}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Daily Time Table:</h4>
                  <div className="space-y-2">
                    {Object.entries(strategy.timeTable).map(([period, schedule]) => (
                      <div key={period} className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm">
                          <span className="font-semibold capitalize">{period}: </span>
                          {String(schedule)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
