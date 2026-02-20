import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useGetSortedCoursesByCategory, useAddCourse, useUpdateCourse, useDeleteCourse } from '../../hooks/useQueries';
import { CourseCategory } from '../../backend';
import { ExternalBlob } from '../../backend';
import { toast } from 'sonner';
import { Trash2, Edit, Plus } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

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

export default function ManageCourses() {
  const { data: courses = [] } = useGetSortedCoursesByCategory();
  const addCourseMutation = useAddCourse();
  const updateCourseMutation = useUpdateCourse();
  const deleteCourseMutation = useDeleteCourse();

  const [category, setCategory] = useState<CourseCategory>(CourseCategory.upsc);
  const [syllabus, setSyllabus] = useState('');
  const [videoLectures, setVideoLectures] = useState('');
  const [notesFiles, setNotesFiles] = useState<File[]>([]);
  const [pyqFiles, setPyqFiles] = useState<File[]>([]);
  const [testSeries, setTestSeries] = useState('');
  const [editingId, setEditingId] = useState<bigint | null>(null);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const syllabusArray = syllabus.split('\n').filter((line) => line.trim());
    const videoArray = videoLectures.split('\n').filter((line) => line.trim());
    const testArray = testSeries.split('\n').filter((line) => line.trim());

    const notesBlobs = await Promise.all(
      notesFiles.map(async (file) => {
        const bytes = new Uint8Array(await file.arrayBuffer());
        return ExternalBlob.fromBytes(bytes);
      })
    );

    const pyqBlobs = await Promise.all(
      pyqFiles.map(async (file) => {
        const bytes = new Uint8Array(await file.arrayBuffer());
        return ExternalBlob.fromBytes(bytes);
      })
    );

    try {
      if (editingId !== null) {
        await updateCourseMutation.mutateAsync({
          id: editingId,
          category,
          syllabus: syllabusArray,
          videoLectures: videoArray,
          notesFiles: notesBlobs,
          pyqFiles: pyqBlobs,
          testSeries: testArray,
        });
        toast.success('Course updated successfully');
        setEditingId(null);
      } else {
        await addCourseMutation.mutateAsync({
          category,
          syllabus: syllabusArray,
          videoLectures: videoArray,
          notesFiles: notesBlobs,
          pyqFiles: pyqBlobs,
          testSeries: testArray,
        });
        toast.success('Course added successfully');
      }

      setSyllabus('');
      setVideoLectures('');
      setNotesFiles([]);
      setPyqFiles([]);
      setTestSeries('');
    } catch (error) {
      toast.error('Failed to save course');
    }
  };

  const handleEdit = (course: any) => {
    setEditingId(course.id);
    setCategory(course.category);
    setSyllabus(course.syllabus.join('\n'));
    setVideoLectures(course.videoLectures.join('\n'));
    setTestSeries(course.testSeries.join('\n'));
  };

  const handleDelete = async () => {
    if (deleteId === null) return;

    try {
      await deleteCourseMutation.mutateAsync(deleteId);
      toast.success('Course deleted successfully');
      setDeleteId(null);
    } catch (error) {
      toast.error('Failed to delete course');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Manage Courses</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Course' : 'Add New Course'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Category</Label>
                <Select value={category} onValueChange={(value) => setCategory(value as CourseCategory)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(categoryLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Syllabus (one item per line)</Label>
                <Textarea
                  value={syllabus}
                  onChange={(e) => setSyllabus(e.target.value)}
                  placeholder="Enter syllabus items, one per line"
                  rows={6}
                />
              </div>

              <div>
                <Label>Video Lectures (YouTube IDs, one per line)</Label>
                <Textarea
                  value={videoLectures}
                  onChange={(e) => setVideoLectures(e.target.value)}
                  placeholder="Enter YouTube video IDs, one per line"
                  rows={4}
                />
              </div>

              <div>
                <Label>Notes Files (PDF)</Label>
                <Input
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={(e) => setNotesFiles(Array.from(e.target.files || []))}
                />
              </div>

              <div>
                <Label>PYQ Files (PDF)</Label>
                <Input
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={(e) => setPyqFiles(Array.from(e.target.files || []))}
                />
              </div>

              <div>
                <Label>Test Series (one per line)</Label>
                <Textarea
                  value={testSeries}
                  onChange={(e) => setTestSeries(e.target.value)}
                  placeholder="Enter test series links or names, one per line"
                  rows={4}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={addCourseMutation.isPending || updateCourseMutation.isPending}>
                  {editingId ? (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Update Course
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Course
                    </>
                  )}
                </Button>
                {editingId && (
                  <Button type="button" variant="outline" onClick={() => setEditingId(null)}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Existing Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id.toString()} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{categoryLabels[course.category]}</h3>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Syllabus items: {course.syllabus.length}</p>
                        <p>Video lectures: {course.videoLectures.length}</p>
                        <p>Notes: {course.notes.length}</p>
                        <p>PYQ: {course.pyq.length}</p>
                        <p>Tests: {course.testSeries.length}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(course)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => setDeleteId(course.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the course.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
