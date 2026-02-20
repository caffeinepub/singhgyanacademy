import { useParams } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plane, FileText, ClipboardList, Activity } from 'lucide-react';
import { useGetCoursesByCategory } from '../hooks/useQueries';
import { CourseCategory } from '../backend';
import { Skeleton } from '@/components/ui/skeleton';

const examNames: Record<string, string> = {
  nda: 'NDA - National Defence Academy',
  cds: 'CDS - Combined Defence Services',
  afcat: 'AFCAT - Air Force Common Admission Test',
  agniveer: 'Agniveer - Agnipath Scheme',
  navy: 'Indian Navy Recruitment',
  airforce: 'Indian Air Force Recruitment',
};

export default function DefenceExamDetail() {
  const { examType } = useParams({ strict: false });
  const category = examType as CourseCategory;
  const { data: courses = [], isLoading } = useGetCoursesByCategory(category);

  const examName = examNames[examType || ''] || 'Defence Exam';

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Plane className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">{examName}</h1>
          <p className="text-lg text-muted-foreground">
            Complete preparation material for {examName}
          </p>
        </div>

        {isLoading ? (
          <Skeleton className="h-96 w-full" />
        ) : courses.length > 0 ? (
          <Tabs defaultValue="syllabus" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
              <TabsTrigger value="physical">Physical Standards</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="test-series">Test Series</TabsTrigger>
            </TabsList>

            {courses.map((course) => (
              <div key={course.id.toString()}>
                <TabsContent value="syllabus">
                  <Card>
                    <CardHeader>
                      <CardTitle>Exam Syllabus</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {course.syllabus.length > 0 ? (
                        <div className="space-y-4">
                          {course.syllabus.map((item, index) => (
                            <div key={index} className="p-4 bg-muted/50 rounded-lg">
                              <p className="whitespace-pre-wrap">{item}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Alert>
                          <AlertDescription>Syllabus will be added soon.</AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="physical">
                  <Card>
                    <CardHeader>
                      <CardTitle>Physical Standards & Medical Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Alert>
                        <Activity className="h-4 w-4" />
                        <AlertDescription>
                          Physical fitness requirements and medical standards will be added soon.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notes">
                  <Card>
                    <CardHeader>
                      <CardTitle>Study Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {course.notes.length > 0 ? (
                        <div className="grid gap-4">
                          {course.notes.map((note, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-primary" />
                                <span>Notes {index + 1}</span>
                              </div>
                              <a
                                href={note.getDirectURL()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                Download
                              </a>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Alert>
                          <AlertDescription>Study notes will be added soon.</AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="test-series">
                  <Card>
                    <CardHeader>
                      <CardTitle>Test Series</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {course.testSeries.length > 0 ? (
                        <div className="grid gap-4">
                          {course.testSeries.map((test, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <ClipboardList className="h-5 w-5 text-primary" />
                                <span>Test {index + 1}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Alert>
                          <AlertDescription>Test series will be added soon.</AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            ))}
          </Tabs>
        ) : (
          <Alert>
            <AlertDescription>
              Content for {examName} is being prepared. Please check back soon!
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
