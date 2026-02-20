import { useParams } from '@tanstack/react-router';
import { useGetCoursesByCategory } from '../hooks/useQueries';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, Video, FileText, Download, ClipboardList } from 'lucide-react';
import YouTubeEmbed from '../components/YouTubeEmbed';
import { CourseCategory } from '../backend';

const categoryLabels: Record<CourseCategory, string> = {
  upsc: 'UPSC',
  uppcs: 'UPPCS',
  ssc: 'SSC',
  railway: 'Railway',
  banking: 'Banking',
  tet_ctet: 'TET / CTET',
  police: 'Police',
  nda_cds: 'NDA / CDS',
  university_geography: 'University Geography',
};

export default function CourseDetail() {
  const { category } = useParams({ from: '/courses/$category' });
  const { data: courses = [], isLoading } = useGetCoursesByCategory(category as CourseCategory);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-12 w-64 mb-8" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-16">
          <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h2 className="text-2xl font-bold mb-2">No Courses Available</h2>
          <p className="text-muted-foreground">
            Courses for {categoryLabels[category as CourseCategory]} will be added soon.
          </p>
        </div>
      </div>
    );
  }

  const course = courses[0];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{categoryLabels[category as CourseCategory]}</h1>
          <p className="text-lg text-muted-foreground">Complete preparation material for your exam</p>
        </div>

        <Tabs defaultValue="syllabus" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="pyq">PYQ</TabsTrigger>
            <TabsTrigger value="tests">Tests</TabsTrigger>
          </TabsList>

          <TabsContent value="syllabus" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                  Course Syllabus
                </CardTitle>
              </CardHeader>
              <CardContent>
                {course.syllabus.length > 0 ? (
                  <ul className="space-y-2">
                    {course.syllabus.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary font-semibold">{index + 1}.</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">Syllabus will be updated soon.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-6 w-6 text-primary" />
                  Video Lectures
                </CardTitle>
              </CardHeader>
              <CardContent>
                {course.videoLectures.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {course.videoLectures.map((videoId, index) => (
                      <YouTubeEmbed key={index} videoId={videoId} title={`Lecture ${index + 1}`} />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Video lectures will be added soon.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-primary" />
                  Study Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                {course.notes.length > 0 ? (
                  <div className="grid gap-4">
                    {course.notes.map((note, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-primary" />
                          <div>
                            <p className="font-medium">Notes {index + 1}</p>
                            <p className="text-sm text-muted-foreground">PDF Document</p>
                          </div>
                        </div>
                        <Button asChild>
                          <a href={note.getDirectURL()} download target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Study notes will be added soon.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pyq" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-6 w-6 text-primary" />
                  Previous Year Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {course.pyq.length > 0 ? (
                  <div className="grid gap-4">
                    {course.pyq.map((pyq, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <ClipboardList className="h-8 w-8 text-primary" />
                          <div>
                            <p className="font-medium">PYQ Set {index + 1}</p>
                            <p className="text-sm text-muted-foreground">PDF Document</p>
                          </div>
                        </div>
                        <Button asChild>
                          <a href={pyq.getDirectURL()} download target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Previous year questions will be added soon.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-6 w-6 text-primary" />
                  Test Series
                </CardTitle>
              </CardHeader>
              <CardContent>
                {course.testSeries.length > 0 ? (
                  <div className="space-y-3">
                    {course.testSeries.map((link, index) => (
                      <Button key={index} asChild variant="outline" className="w-full justify-start">
                        <a href={link} target="_blank" rel="noopener noreferrer">
                          Test {index + 1}
                        </a>
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Test series will be added soon.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
