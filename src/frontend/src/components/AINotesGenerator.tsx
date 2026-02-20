import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Download, FileText } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Subject } from '../backend';

interface GeneratedNotes {
  title: string;
  content: string;
  revisionPoints: string[];
}

export default function AINotesGenerator() {
  const [subject, setSubject] = useState<string>('');
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNotes, setGeneratedNotes] = useState<GeneratedNotes | null>(null);

  const subjectLabels: Record<Subject, string> = {
    [Subject.history]: 'History',
    [Subject.geography]: 'Geography',
    [Subject.polity]: 'Polity',
    [Subject.economy]: 'Economy',
    [Subject.science]: 'Science',
    [Subject.currentAffairs]: 'Current Affairs',
  };

  const generateNotes = (subj: string, top: string): GeneratedNotes => {
    const templates: Record<string, GeneratedNotes> = {
      geography: {
        title: `${top} - Geography Notes`,
        content: `# ${top}\n\n## Introduction\n${top} is an important topic in Geography for competitive exams. Understanding this concept is crucial for both prelims and mains preparation.\n\n## Key Concepts\n\n### Physical Aspects\n• Geographical location and extent\n• Climate and weather patterns\n• Natural resources and vegetation\n• Topographical features\n\n### Human Geography\n• Population distribution\n• Economic activities\n• Cultural significance\n• Development indicators\n\n## Detailed Explanation\n\nThe study of ${top} involves understanding both physical and human geographical aspects. Physical geography focuses on natural features, climate patterns, and environmental characteristics. Human geography examines how people interact with and modify their environment.\n\n### Important Points for Exams\n1. Location-based questions are frequently asked\n2. Map-based questions require thorough understanding\n3. Current environmental issues related to this topic\n4. Government initiatives and policies\n\n## Diagrams and Maps\n[Visual representation would include: Location map, Climate zones, Resource distribution, Population density map]\n\n## Related Topics\n• Regional geography\n• Environmental geography\n• Economic geography\n• Geopolitics\n\n## Exam Perspective\nThis topic has appeared in previous year questions multiple times. Focus on factual accuracy, map locations, and current developments.`,
        revisionPoints: [
          'Remember key geographical coordinates and locations',
          'Understand climate patterns and their impact',
          'Know major physical features and their significance',
          'Study population distribution and economic activities',
          'Review recent government policies and initiatives',
          'Practice map-based questions regularly',
          'Connect with current affairs and environmental issues',
        ],
      },
      polity: {
        title: `${top} - Indian Polity Notes`,
        content: `# ${top}\n\n## Constitutional Provisions\n${top} is governed by specific articles in the Indian Constitution. Understanding these provisions is essential for UPSC and other competitive exams.\n\n## Key Articles and Provisions\n\n### Constitutional Framework\n• Relevant constitutional articles\n• Fundamental rights connections\n• Directive principles linkage\n• Constitutional amendments\n\n### Powers and Functions\n• Legislative powers\n• Executive functions\n• Judicial oversight\n• Emergency provisions\n\n## Detailed Analysis\n\nThe constitutional framework of ${top} establishes clear guidelines for governance and administration. The founding fathers designed this system to ensure democratic principles and federal structure.\n\n### Historical Background\n• Pre-independence context\n• Constituent Assembly debates\n• Evolution through amendments\n• Landmark judgments\n\n### Current Scenario\n• Recent developments\n• Government initiatives\n• Challenges and reforms\n• Future prospects\n\n## Important Cases and Judgments\n1. Landmark Supreme Court cases\n2. Constitutional bench decisions\n3. Recent judicial interpretations\n\n## Comparison with Other Countries\n• UK system\n• US system\n• Other federal structures\n\n## Exam Strategy\nFocus on article numbers, landmark cases, and recent amendments. Practice answer writing with constitutional backing.`,
        revisionPoints: [
          'Memorize relevant article numbers and their provisions',
          'Understand the historical context and evolution',
          'Know landmark Supreme Court judgments',
          'Study recent amendments and their implications',
          'Compare with other democratic systems',
          'Link with current political developments',
          'Practice writing constitutional answers',
        ],
      },
      default: {
        title: `${top} - Comprehensive Notes`,
        content: `# ${top}\n\n## Overview\nComprehensive notes on ${top} for competitive exam preparation.\n\n## Introduction\nThis topic is important for various competitive examinations including UPSC, SSC, Railway, and Banking exams.\n\n## Main Content\n\n### Fundamental Concepts\n• Basic definitions and terminology\n• Historical background\n• Current relevance\n• Exam importance\n\n### Detailed Explanation\n\n#### Part 1: Foundation\nUnderstanding the basics of ${top} is crucial. This includes knowing the fundamental principles, key definitions, and historical development.\n\n#### Part 2: Advanced Concepts\nBuilding on the foundation, advanced concepts include:\n• Theoretical frameworks\n• Practical applications\n• Case studies\n• Recent developments\n\n#### Part 3: Exam Perspective\n• Previous year questions analysis\n• Important topics for prelims\n• Mains answer writing approach\n• Interview questions\n\n## Key Points to Remember\n1. Focus on conceptual clarity\n2. Connect with current affairs\n3. Practice answer writing\n4. Revise regularly\n\n## Related Topics\n• Connected subjects\n• Cross-topic linkages\n• Interdisciplinary aspects\n\n## Study Resources\n• NCERT textbooks\n• Standard reference books\n• Online resources\n• Previous year papers`,
        revisionPoints: [
          'Understand core concepts thoroughly',
          'Make short notes for quick revision',
          'Practice previous year questions',
          'Connect with current affairs',
          'Create mind maps for better retention',
          'Regular revision is key to success',
          'Focus on exam-oriented preparation',
        ],
      },
    };

    const subjectKey = subj.toLowerCase();
    return templates[subjectKey] || templates.default;
  };

  const handleGenerate = () => {
    if (!subject || !topic.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const notes = generateNotes(subject, topic);
      setGeneratedNotes(notes);
      setIsGenerating(false);
    }, 2000);
  };

  const handleDownload = () => {
    if (!generatedNotes) return;

    const content = `${generatedNotes.title}\n\n${generatedNotes.content}\n\n## Revision Points\n${generatedNotes.revisionPoints.map((point, i) => `${i + 1}. ${point}`).join('\n')}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedNotes.title.replace(/[^a-z0-9]/gi, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="subject">Select Subject</Label>
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger id="subject">
              <SelectValue placeholder="Choose a subject" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(subjectLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="topic">Enter Topic</Label>
          <Input
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Indian Monsoon, Fundamental Rights"
          />
        </div>
      </div>

      <Button
        onClick={handleGenerate}
        disabled={!subject || !topic.trim() || isGenerating}
        className="w-full"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Notes...
          </>
        ) : (
          <>
            <FileText className="mr-2 h-4 w-4" />
            Generate Notes
          </>
        )}
      </Button>

      {generatedNotes && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">{generatedNotes.title}</h3>
              <Button onClick={handleDownload} variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>

            <ScrollArea className="h-[400px] border rounded-lg p-4">
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm">
                  {generatedNotes.content}
                </pre>
              </div>
            </ScrollArea>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">📝 Revision Points</h4>
              <ul className="space-y-2">
                {generatedNotes.revisionPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary font-semibold">{index + 1}.</span>
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
