import { useState } from 'react';
import { useGetSortedCoursesByCategory } from '../hooks/useQueries';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Video } from 'lucide-react';
import YouTubeEmbed from '../components/YouTubeEmbed';

type VideoCategory = 'geography' | 'currentAffairs' | 'gs' | 'strategy';

export default function VideoClasses() {
  const { data: courses = [] } = useGetSortedCoursesByCategory();
  const [activeCategory, setActiveCategory] = useState<VideoCategory>('geography');

  const allVideos = courses.flatMap((course) => course.videoLectures);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Video className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">Video Classes</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch expert-led video lectures organized by subject categories.
          </p>
        </div>

        <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as VideoCategory)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="geography">Geography</TabsTrigger>
            <TabsTrigger value="currentAffairs">Current Affairs</TabsTrigger>
            <TabsTrigger value="gs">GS Classes</TabsTrigger>
            <TabsTrigger value="strategy">Exam Strategy</TabsTrigger>
          </TabsList>

          <TabsContent value="geography">
            <Card>
              <CardHeader>
                <CardTitle>Geography Classes</CardTitle>
              </CardHeader>
              <CardContent>
                {allVideos.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {allVideos.slice(0, 4).map((videoId, index) => (
                      <YouTubeEmbed key={index} videoId={videoId} title={`Geography Lecture ${index + 1}`} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-12 text-muted-foreground">
                    Geography video lectures will be added soon.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="currentAffairs">
            <Card>
              <CardHeader>
                <CardTitle>Current Affairs Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center py-12 text-muted-foreground">
                  Current Affairs video lectures will be added soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gs">
            <Card>
              <CardHeader>
                <CardTitle>General Studies Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center py-12 text-muted-foreground">
                  General Studies video lectures will be added soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategy">
            <Card>
              <CardHeader>
                <CardTitle>Exam Strategy Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center py-12 text-muted-foreground">
                  Exam Strategy video lectures will be added soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
