import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Map, Globe } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';

interface GeographyContent {
  concept: string;
  keyFeatures: string[];
  visualDescription: string;
  relatedTopics: string[];
}

export default function AIGeographyExpert() {
  const [category, setCategory] = useState('');
  const [topic, setTopic] = useState('');
  const [universityLevel, setUniversityLevel] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [content, setContent] = useState<GeographyContent | null>(null);

  const categories = [
    'Physical Geography',
    'Human Geography',
    'Economic Geography',
    'Environmental Geography',
    'Regional Geography',
    'Geomorphology',
    'Climatology',
    'Biogeography',
  ];

  const generateContent = (cat: string, top: string, advanced: boolean): GeographyContent => {
    const level = advanced ? 'University Level' : 'Competitive Exam Level';
    
    return {
      concept: `# ${top} (${cat})\n\n## ${level} Explanation\n\n${top} is a fundamental concept in ${cat}. ${
        advanced
          ? 'At the university level, this involves detailed theoretical frameworks, advanced spatial analysis, and research methodologies.'
          : 'For competitive exams, focus on factual knowledge, map locations, and practical applications.'
      }\n\n### Definition\n${top} refers to the study and analysis of geographical phenomena related to ${cat.toLowerCase()}. Understanding this concept requires knowledge of both theoretical principles and practical applications.\n\n### Importance\n• Critical for ${
        advanced ? 'research and academic studies' : 'UPSC, State PSC, and other competitive exams'
      }\n• Helps understand spatial patterns and relationships\n• Essential for environmental and developmental planning\n• Connects physical and human aspects of geography\n\n### Detailed Analysis\n\nThe study of ${top} involves multiple dimensions:\n\n1. **Spatial Distribution**: Understanding where and why geographical features occur\n2. **Temporal Changes**: How patterns evolve over time\n3. **Causal Relationships**: Factors influencing geographical phenomena\n4. **Human-Environment Interaction**: Impact on and by human activities\n\n${
        advanced
          ? '### Research Perspectives\n• Quantitative analysis using GIS and remote sensing\n• Qualitative field studies and surveys\n• Theoretical model development\n• Interdisciplinary approaches'
          : '### Exam Focus Areas\n• Map-based questions and location identification\n• Cause-effect relationships\n• Current developments and government initiatives\n• Previous year question patterns'
      }`,
      keyFeatures: [
        `Primary characteristics of ${top}`,
        'Geographical distribution and extent',
        'Climate and environmental factors',
        'Human activities and economic significance',
        'Recent developments and changes',
        advanced ? 'Advanced theoretical frameworks' : 'Exam-relevant facts and figures',
        advanced ? 'Research methodologies' : 'Previous year question analysis',
      ],
      visualDescription: `## Visual Representation Guide\n\n### Map Description\nImagine a detailed map showing:\n• **Location**: Precise geographical coordinates and boundaries\n• **Scale**: Regional to global perspective as applicable\n• **Features**: Key physical and human geographical elements\n• **Symbols**: Standard cartographic symbols for clarity\n\n### Diagram Elements\n1. **Main Components**\n   - Central feature: ${top}\n   - Supporting elements: Related geographical factors\n   - Connecting lines: Showing relationships and flows\n\n2. **Color Coding**\n   - Blue: Water bodies and hydrological features\n   - Green: Vegetation and agricultural areas\n   - Brown: Elevation and topographical features\n   - Red/Orange: Urban areas and human settlements\n\n3. **Annotations**\n   - Labels for major features\n   - Directional indicators (N-S-E-W)\n   - Scale and legend\n   - Data sources and year\n\n### Cross-Section View\n${
        advanced
          ? 'Detailed vertical profile showing geological layers, elevation changes, and subsurface features with precise measurements and scientific annotations.'
          : 'Simple cross-section showing major elevation changes, key features, and their relative positions for easy understanding.'
      }\n\n### Comparative Charts\n• Bar graphs for quantitative comparisons\n• Pie charts for proportional distributions\n• Line graphs for temporal trends\n• Flow diagrams for process understanding`,
      relatedTopics: [
        `Other aspects of ${cat}`,
        'Climate patterns and weather systems',
        'Natural resources and their distribution',
        'Population and settlement patterns',
        'Environmental challenges and solutions',
        'Government policies and initiatives',
        advanced ? 'Advanced research topics' : 'Other exam-relevant topics',
      ],
    };
  };

  const handleGenerate = () => {
    if (!category || !topic.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const geographyContent = generateContent(category, topic, universityLevel);
      setContent(geographyContent);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Geography Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Choose category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
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
            placeholder="e.g., Indian Monsoon, Himalayan Rivers"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="university-level"
          checked={universityLevel}
          onCheckedChange={setUniversityLevel}
        />
        <Label htmlFor="university-level" className="cursor-pointer">
          University Level Content (Advanced)
        </Label>
      </div>

      <Button
        onClick={handleGenerate}
        disabled={!category || !topic.trim() || isGenerating}
        className="w-full"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Geography Content...
          </>
        ) : (
          <>
            <Globe className="mr-2 h-4 w-4" />
            Generate Geography Content
          </>
        )}
      </Button>

      {content && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Map className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">Concept Explanation</h3>
              </div>
              <ScrollArea className="h-[400px] border rounded-lg p-4">
                <pre className="whitespace-pre-wrap font-sans text-sm">
                  {content.concept}
                </pre>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Key Features</h3>
              <ul className="space-y-2">
                {content.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary font-semibold">•</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Visual Description</h3>
              <p className="text-sm text-muted-foreground mb-4">
                (Text-based description of diagrams and maps for understanding)
              </p>
              <ScrollArea className="h-[300px] border rounded-lg p-4">
                <pre className="whitespace-pre-wrap font-sans text-sm">
                  {content.visualDescription}
                </pre>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Related Topics</h3>
              <div className="flex flex-wrap gap-2">
                {content.relatedTopics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
