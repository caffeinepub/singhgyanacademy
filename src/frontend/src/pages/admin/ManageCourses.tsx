import { useState } from 'react';
import {
  useIsCallerAdmin,
  useAddCourse,
  useGetSortedCoursesByCategory,
  useUpdateCourse,
  useDeleteCourse,
} from '../../hooks/useQueries';
import AccessDeniedScreen from '../../components/AccessDeniedScreen';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Plus, Trash2, Edit, X } from 'lucide-react';
import { toast } from 'sonner';
import FileUploadWithProgress from '../../components/FileUploadWithProgress';
import { CourseCategory, ExternalBlob } from '../../backend';
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
import { Badge } from '@/components/ui/badge';

const categoryLabels: Record<CourseCategory, string> = {
  [CourseCategory.upsc]: 'UPSC',
  [CourseCategory.uppcs]: 'UPPCS',
  [CourseCategory.ssc]: 'SSC',
  [CourseCategory.railway]: 'Railway',
  [CourseCategory.banking]: 'Banking',
  [CourseCategory.tet_ctet]: 'TET / CTET',
  [CourseCategory.police]: 'Police',
  [CourseCategory.nda_cds]: 'NDA / CDS',
  [CourseCategory.university_geography]: 'University Geography',
};

export default function ManageCourses() {
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: courses = [] } = useGetSortedCoursesByCategory();
  const addCourse = useAddCourse();
  const updateCourse = useUpdateCourse();
  const deleteCourse = useDeleteCourse();

  const [editingCourse, setEditingCourse] = useState<bigint | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<bigint | null>(null);

  const [category, setCategory] = useState<CourseCategory>(CourseCategory.upsc);
  const [syllabus, setSyllabus] = useState<string[]>(['']);
  const [videoLectures, setVideoLectures] = useState<string[]>(['']);
  const [notesFiles, setNotesFiles] = useState<ExternalBlob[]>([]);
  const [pyqFiles, setPyqFiles] = useState<ExternalBlob[]>([]);
  const [testSeries, setTestSeries] = useState<string[]>(['']);

  if (adminLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return <AccessDeniedScreen />;
  }

  const resetForm = () => {
    setCategory(CourseCategory.upsc);
    setSyllabus(['']);
    setVideoLectures(['']);
    setNotesFiles([]);
    setPyqFiles([]);
    setTestSeries(['']);
    setEditingCourse(null);
  };

  const handleEdit = (course: any) => {
    setEditingCourse(course.id);
    setCategory(course.category);
    setSyllabus(course.syllabus.length > 0 ? course.syllabus : ['']);
    setVideoLectures(course.videoLectures.length > 0 ? course.videoLectures : ['']);
    setNotesFiles(course.notes);
    setPyqFiles(course.pyq);
    setTestSeries(course.testSeries.length > 0 ? course.testSeries : ['']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async () => {
    if (!courseToDelete) return;

    try {
      await deleteCourse.mutateAsync(courseToDelete);
      toast.success('Course deleted successfully!');
      setDeleteDialogOpen(false);
      setCourseToDelete(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete course');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const params = {
        category,
        syllabus: syllabus.filter((s) => s.trim() !== ''),
        videoLectures: videoLectures.filter((v) => v.trim() !== ''),
        notesFiles,
        pyqFiles,
        testSeries: testSeries.filter((t) => t.trim() !== ''),
      };

      if (editingCourse !== null) {
        await updateCourse.mutateAsync({ id: editingCourse, ...params });
        toast.success('Course updated successfully!');
      } else {
        await addCourse.mutateAsync(params);
        toast.success('Course added successfully!');
      }

      resetForm();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save course');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Manage Courses</h1>
          <p className="text-muted-foreground">Add and manage course content</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{editingCourse !== null ? 'Edit Course' : 'Add New Course'}</CardTitle>
              {editingCourse !== null && (
                <Button variant="ghost" size="sm" onClick={resetForm}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel Edit
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>Course Category</Label>
                <Select value={category} onValueChange={(v) => setCategory(v as CourseCategory)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(categoryLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Syllabus Items</Label>
                {syllabus.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => {
                        const newSyllabus = [...syllabus];
                        newSyllabus[index] = e.target.value;
                        setSyllabus(newSyllabus);
                      }}
                      placeholder="Enter syllabus item"
                    />
                    {syllabus.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setSyllabus(syllabus.filter((_, i) => i !== index))}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => setSyllabus([...syllabus, ''])}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Video Lecture IDs (YouTube)</Label>
                {videoLectures.map((video, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={video}
                      onChange={(e) => {
                        const newVideos = [...videoLectures];
                        newVideos[index] = e.target.value;
                        setVideoLectures(newVideos);
                      }}
                      placeholder="Enter YouTube video ID"
                    />
                    {videoLectures.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setVideoLectures(videoLectures.filter((_, i) => i !== index))}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setVideoLectures([...videoLectures, ''])}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Video
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Notes Files (PDF)</Label>
                <FileUploadWithProgress
                  onFileSelect={(blob) => setNotesFiles([...notesFiles, blob])}
                  label="Upload Notes"
                />
                {notesFiles.length > 0 && (
                  <p className="text-sm text-muted-foreground">{notesFiles.length} file(s) uploaded</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>PYQ Files (PDF)</Label>
                <FileUploadWithProgress
                  onFileSelect={(blob) => setPyqFiles([...pyqFiles, blob])}
                  label="Upload PYQ"
                />
                {pyqFiles.length > 0 && (
                  <p className="text-sm text-muted-foreground">{pyqFiles.length} file(s) uploaded</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Test Series Links</Label>
                {testSeries.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={link}
                      onChange={(e) => {
                        const newLinks = [...testSeries];
                        newLinks[index] = e.target.value;
                        setTestSeries(newLinks);
                      }}
                      placeholder="Enter test series link"
                    />
                    {testSeries.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setTestSeries(testSeries.filter((_, i) => i !== index))}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => setTestSeries([...testSeries, ''])}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Link
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={addCourse.isPending || updateCourse.isPending}
              >
                {addCourse.isPending || updateCourse.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {editingCourse !== null ? 'Updating...' : 'Adding...'}
                  </>
                ) : editingCourse !== null ? (
                  'Update Course'
                ) : (
                  'Add Course'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Existing Courses ({courses.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {courses.length > 0 ? (
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id.toString()} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge>{categoryLabels[course.category]}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {course.videoLectures.length} videos • {course.notes.length} notes • {course.pyq.length}{' '}
                          PYQs
                        </p>
                        {course.syllabus.length > 0 && (
                          <p className="text-sm text-muted-foreground">
                            Syllabus: {course.syllabus.slice(0, 2).join(', ')}
                            {course.syllabus.length > 2 && '...'}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(course)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setCourseToDelete(course.id);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-muted-foreground">No courses added yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the course and all its content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteCourse.isPending}>
              {deleteCourse.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
