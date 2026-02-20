import { useParams } from '@tanstack/react-router';
import { useGetCoursesByCategory } from '../hooks/useQueries';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BookOpen, Video, FileText, ClipboardList, FileQuestion } from 'lucide-react';
import { CourseCategory } from '../backend';
import YouTubeEmbed from '../components/YouTubeEmbed';
import { Skeleton } from '@/components/ui/skeleton';

const categoryLabels: Record<CourseCategory, string> = {
  [CourseCategory.upsc]: 'UPSC',
  [CourseCategory.uppcs]: 'UPPCS',
  [CourseCategory.university_geography]: 'University Geography',
  [CourseCategory.bpsc]: 'BPSC',
  [CourseCategory.mppcs]: 'MPPCS',
  [CourseCategory.rpsc]: 'RPSC',
  [CourseCategory.hpsc]: 'HPSC',
  [CourseCategory.ukpsc]: 'UKPSC',
  [CourseCategory.jpsc]: 'JPSC',
  [CourseCategory.cgpsc]: 'CGPSC',
  [CourseCategory.mpsc]: 'MPSC',
  [CourseCategory.gpsc]: 'GPSC',
  [CourseCategory.appsc]: 'APPSC',
  [CourseCategory.tspsc]: 'TSPSC',
  [CourseCategory.wbpsc]: 'WBPSC',
  [CourseCategory.tnpsc]: 'TNPSC',
  [CourseCategory.kpsc]: 'KPSC',
  [CourseCategory.keralaPSC]: 'Kerala PSC',
  [CourseCategory.punjabPSC]: 'Punjab PSC',
  [CourseCategory.otherStatesPCS]: 'Other States PCS',
  [CourseCategory.sscCGL]: 'SSC CGL',
  [CourseCategory.sscCHSL]: 'SSC CHSL',
  [CourseCategory.sscGD]: 'SSC GD',
  [CourseCategory.sscMTS]: 'SSC MTS',
  [CourseCategory.sscCPO]: 'SSC CPO',
  [CourseCategory.sscStenographer]: 'SSC Stenographer',
  [CourseCategory.sscJE]: 'SSC JE',
  [CourseCategory.sscSelectionPost]: 'SSC Selection Post',
  [CourseCategory.sscConstable]: 'SSC Constable',
  [CourseCategory.rrbNTPC]: 'RRB NTPC',
  [CourseCategory.rrbGroupD]: 'RRB Group D',
  [CourseCategory.rrbALP]: 'RRB ALP',
  [CourseCategory.rrbTechnician]: 'RRB Technician',
  [CourseCategory.rrbJE]: 'RRB JE',
  [CourseCategory.rpfConstable]: 'RPF Constable',
  [CourseCategory.rpfSI]: 'RPF SI',
  [CourseCategory.upPolice]: 'UP Police',
  [CourseCategory.biharPolice]: 'Bihar Police',
  [CourseCategory.mpPolice]: 'MP Police',
  [CourseCategory.delhiPolice]: 'Delhi Police',
  [CourseCategory.rajasthanPolice]: 'Rajasthan Police',
  [CourseCategory.haryanaPolice]: 'Haryana Police',
  [CourseCategory.capf]: 'CAPF',
  [CourseCategory.otherStatesPolice]: 'Other States Police',
  [CourseCategory.ctet]: 'CTET',
  [CourseCategory.uptet]: 'UPTET',
  [CourseCategory.htet]: 'HTET',
  [CourseCategory.reet]: 'REET',
  [CourseCategory.mptet]: 'MPTET',
  [CourseCategory.superTET]: 'Super TET',
  [CourseCategory.kvs]: 'KVS',
  [CourseCategory.nvs]: 'NVS',
  [CourseCategory.dsssb]: 'DSSSB',
  [CourseCategory.stateTET]: 'State TET',
  [CourseCategory.ibpsPO]: 'IBPS PO',
  [CourseCategory.ibpsClerk]: 'IBPS Clerk',
  [CourseCategory.sbiPO]: 'SBI PO',
  [CourseCategory.sbiClerk]: 'SBI Clerk',
  [CourseCategory.rbiGradeB]: 'RBI Grade B',
  [CourseCategory.nabard]: 'NABARD',
  [CourseCategory.licAAO]: 'LIC AAO',
  [CourseCategory.nda]: 'NDA',
  [CourseCategory.cds]: 'CDS',
  [CourseCategory.afcat]: 'AFCAT',
  [CourseCategory.agniveer]: 'Agniveer',
  [CourseCategory.navy]: 'Navy',
  [CourseCategory.airforce]: 'Air Force',
};

export default function CourseDetail() {
  const { category } = useParams({ strict: false });
  const { data: courses = [], isLoading } = useGetCoursesByCategory(category as CourseCategory);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-3xl font-bold mb-4">No courses available</h1>
          <p className="text-muted-foreground">
            Courses for {categoryLabels[category as CourseCategory] || category} will be added soon.
          </p>
        </div>
      </div>
    );
  }

  const course = courses[0];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <BookOpen className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">{categoryLabels[category as CourseCategory] || category}</h1>
          <p className="text-lg text-muted-foreground">
            Complete preparation material for {categoryLabels[category as CourseCategory] || category}
          </p>
        </div>

        <Tabs defaultValue="syllabus" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="pyq">PYQ</TabsTrigger>
            <TabsTrigger value="tests">Tests</TabsTrigger>
          </TabsList>

          <TabsContent value="syllabus">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Course Syllabus
                </CardTitle>
              </CardHeader>
              <CardContent>
                {course.syllabus.length > 0 ? (
                  <div className="space-y-4">
                    {course.syllabus.map((item, index) => (
                      <div key={index} className="p-4 bg-muted/50 rounded-lg">
                        <p className="whitespace-pre-wrap leading-relaxed">{item}</p>
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

          <TabsContent value="videos">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
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
                  <Alert>
                    <AlertDescription>Video lectures will be added soon.</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Study Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                {course.notes.length > 0 ? (
                  <div className="grid gap-4">
                    {course.notes.map((note, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="font-medium">Notes {index + 1}</span>
                        </div>
                        <a
                          href={note.getDirectURL()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium"
                        >
                          Download PDF
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

          <TabsContent value="pyq">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileQuestion className="h-5 w-5" />
                  Previous Year Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {course.pyq.length > 0 ? (
                  <div className="grid gap-4">
                    {course.pyq.map((paper, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileQuestion className="h-5 w-5 text-primary" />
                          <span className="font-medium">PYQ Paper {index + 1}</span>
                        </div>
                        <a
                          href={paper.getDirectURL()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium"
                        >
                          Download PDF
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Alert>
                    <AlertDescription>Previous year questions will be added soon.</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tests">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5" />
                  Test Series
                </CardTitle>
              </CardHeader>
              <CardContent>
                {course.testSeries.length > 0 ? (
                  <div className="grid gap-4">
                    {course.testSeries.map((test, index) => (
                      <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <ClipboardList className="h-5 w-5 text-primary" />
                          <span className="font-medium">Test {index + 1}</span>
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
        </Tabs>
      </div>
    </div>
  );
}
