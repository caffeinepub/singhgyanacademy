import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Newspaper } from 'lucide-react';
import { format } from 'date-fns';

interface CurrentAffairsData {
  date: Date;
  news: Array<{
    title: string;
    summary: string;
    category: string;
  }>;
  quiz: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
  }>;
}

export default function AICurrentAffairsGenerator() {
  const [date, setDate] = useState<Date>(new Date());
  const [currentAffairs, setCurrentAffairs] = useState<CurrentAffairsData | null>(null);

  const generateCurrentAffairs = (selectedDate: Date): CurrentAffairsData => {
    return {
      date: selectedDate,
      news: [
        {
          title: 'Government Launches New Education Initiative',
          summary: 'The Ministry of Education announced a comprehensive digital learning program aimed at improving access to quality education in rural areas. The initiative includes AI-powered learning tools and free internet connectivity for schools.',
          category: 'Education',
        },
        {
          title: 'India\'s Economic Growth Projections Revised',
          summary: 'Leading economic institutions have revised India\'s GDP growth forecast for the current fiscal year. The revision takes into account recent policy changes and global economic conditions.',
          category: 'Economy',
        },
        {
          title: 'New Environmental Protection Measures Announced',
          summary: 'The government has introduced stricter environmental regulations for industries. The measures focus on reducing carbon emissions and promoting sustainable development practices.',
          category: 'Environment',
        },
        {
          title: 'International Relations: Bilateral Summit Concluded',
          summary: 'India concluded a significant bilateral summit with a major trading partner. The discussions covered trade agreements, defense cooperation, and cultural exchanges.',
          category: 'International Relations',
        },
        {
          title: 'Scientific Achievement: Space Mission Success',
          summary: 'ISRO successfully completed another milestone in its space exploration program. The mission demonstrates India\'s growing capabilities in space technology and research.',
          category: 'Science & Technology',
        },
      ],
      quiz: [
        {
          question: 'Which ministry launched the new digital learning program for rural areas?',
          options: [
            'Ministry of Rural Development',
            'Ministry of Education',
            'Ministry of Electronics and IT',
            'Ministry of Skill Development',
          ],
          correctAnswer: 1,
        },
        {
          question: 'What is the primary focus of the new environmental regulations?',
          options: [
            'Water conservation',
            'Wildlife protection',
            'Reducing carbon emissions',
            'Waste management',
          ],
          correctAnswer: 2,
        },
        {
          question: 'Which organization completed a successful space mission recently?',
          options: ['NASA', 'ESA', 'ISRO', 'JAXA'],
          correctAnswer: 2,
        },
      ],
    };
  };

  const handleGenerate = () => {
    const data = generateCurrentAffairs(date);
    setCurrentAffairs(data);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
        <div className="space-y-2 flex-1">
          <Label>Select Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(date, 'PPP')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <Button onClick={handleGenerate} className="w-full sm:w-auto">
          <Newspaper className="mr-2 h-4 w-4" />
          Generate Current Affairs
        </Button>
      </div>

      {currentAffairs && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Newspaper className="h-6 w-6 text-primary" />
                Current Affairs - {format(currentAffairs.date, 'MMMM dd, yyyy')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentAffairs.news.map((item, index) => (
                <div key={index} className="border-l-4 border-primary pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.summary}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daily Quiz</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentAffairs.quiz.map((q, index) => (
                <div key={index} className="space-y-3">
                  <p className="font-semibold">
                    Q{index + 1}. {q.question}
                  </p>
                  <div className="space-y-2 pl-4">
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
                            ✓ Correct Answer
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button className="flex-1" variant="outline">
              Download as PDF
            </Button>
            <Button className="flex-1" variant="outline">
              Share
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
