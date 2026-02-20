import { Globe } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function GeographySpecial() {
  const topics = [
    { id: 'physical', name: 'Physical Geography', description: 'Landforms, climate, and natural processes' },
    { id: 'human', name: 'Human Geography', description: 'Population, settlements, and cultural aspects' },
    { id: 'indian', name: 'Indian Geography', description: 'Comprehensive coverage of Indian geography' },
    { id: 'climatology', name: 'Climatology', description: 'Weather patterns and climate systems' },
    { id: 'oceanography', name: 'Oceanography', description: 'Ocean currents, marine life, and coastal features' },
    { id: 'models', name: 'Models & Theories', description: 'Geographical models and theoretical frameworks' },
    { id: 'upsc-optional', name: 'UPSC Optional', description: 'Complete UPSC Geography Optional coverage' },
    { id: 'university', name: 'University', description: 'Academic-level geography content' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Globe className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Geography Special</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive geography coverage with detailed articles, visual diagrams, and expert video content
          </p>
        </div>

        <Tabs defaultValue="physical" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-2">
            {topics.map((topic) => (
              <TabsTrigger key={topic.id} value={topic.id} className="text-xs lg:text-sm py-3">
                {topic.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {topics.map((topic) => (
            <TabsContent key={topic.id} value={topic.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{topic.name}</CardTitle>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert>
                    <Globe className="h-4 w-4" />
                    <AlertDescription>
                      Detailed content for {topic.name} including articles, diagrams, and video lectures will be added soon. This section will provide comprehensive coverage suitable for competitive exams and academic studies.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
