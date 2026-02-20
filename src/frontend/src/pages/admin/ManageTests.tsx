import { useState } from 'react';
import {
  useIsCallerAdmin,
  useAddTest,
  useGetTestsByType,
  useUpdateTest,
  useDeleteTest,
} from '../../hooks/useQueries';
import AccessDeniedScreen from '../../components/AccessDeniedScreen';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Plus, Trash2, Edit, X } from 'lucide-react';
import { toast } from 'sonner';
import { AssessmentType } from '../../backend';
import { Badge } from '@/components/ui/badge';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const assessmentLabels: Record<AssessmentType, string> = {
  [AssessmentType.dailyQuiz]: 'Daily Quiz',
  [AssessmentType.weeklyTest]: 'Weekly Test',
  [AssessmentType.fullLengthTest]: 'Full Length Test',
};

export default function ManageTests() {
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: dailyQuizzes = [] } = useGetTestsByType(AssessmentType.dailyQuiz);
  const { data: weeklyTests = [] } = useGetTestsByType(AssessmentType.weeklyTest);
  const { data: fullLengthTests = [] } = useGetTestsByType(AssessmentType.fullLengthTest);
  const addTest = useAddTest();
  const updateTest = useUpdateTest();
  const deleteTest = useDeleteTest();

  const [editingTest, setEditingTest] = useState<bigint | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [testToDelete, setTestToDelete] = useState<bigint | null>(null);

  const [assessmentType, setAssessmentType] = useState<AssessmentType>(AssessmentType.dailyQuiz);
  const [questions, setQuestions] = useState<string[]>(['']);

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
    setAssessmentType(AssessmentType.dailyQuiz);
    setQuestions(['']);
    setEditingTest(null);
  };

  const handleEdit = (test: any) => {
    setEditingTest(test.id);
    setAssessmentType(test.assessmentType);
    setQuestions(test.questions.length > 0 ? test.questions : ['']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async () => {
    if (!testToDelete) return;

    try {
      await deleteTest.mutateAsync(testToDelete);
      toast.success('Test deleted successfully!');
      setDeleteDialogOpen(false);
      setTestToDelete(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete test');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const filteredQuestions = questions.filter((q) => q.trim() !== '');
    if (filteredQuestions.length === 0) {
      toast.error('Please add at least one question');
      return;
    }

    try {
      if (editingTest !== null) {
        await updateTest.mutateAsync({
          id: editingTest,
          assessmentType,
          questions: filteredQuestions,
        });
        toast.success('Test updated successfully!');
      } else {
        await addTest.mutateAsync({
          assessmentType,
          questions: filteredQuestions,
        });
        toast.success('Test added successfully!');
      }

      resetForm();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save test');
    }
  };

  const testsByType = {
    [AssessmentType.dailyQuiz]: dailyQuizzes,
    [AssessmentType.weeklyTest]: weeklyTests,
    [AssessmentType.fullLengthTest]: fullLengthTests,
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Manage Tests</h1>
          <p className="text-muted-foreground">Create and manage test series</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{editingTest !== null ? 'Edit Test' : 'Add New Test'}</CardTitle>
              {editingTest !== null && (
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
                <Label>Assessment Type</Label>
                <Select value={assessmentType} onValueChange={(v) => setAssessmentType(v as AssessmentType)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(assessmentLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Questions</Label>
                {questions.map((question, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={question}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[index] = e.target.value;
                        setQuestions(newQuestions);
                      }}
                      placeholder={`Question ${index + 1}`}
                    />
                    {questions.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setQuestions(questions.filter((_, i) => i !== index))}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => setQuestions([...questions, ''])}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </div>

              <Button type="submit" className="w-full" disabled={addTest.isPending || updateTest.isPending}>
                {addTest.isPending || updateTest.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {editingTest !== null ? 'Updating...' : 'Adding...'}
                  </>
                ) : editingTest !== null ? (
                  'Update Test'
                ) : (
                  'Add Test'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              All Tests ({dailyQuizzes.length + weeklyTests.length + fullLengthTests.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={AssessmentType.dailyQuiz}>
              <TabsList className="grid grid-cols-3">
                {Object.entries(assessmentLabels).map(([value, label]) => (
                  <TabsTrigger key={value} value={value}>
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(assessmentLabels).map(([typeKey, label]) => (
                <TabsContent key={typeKey} value={typeKey} className="space-y-4 mt-4">
                  {testsByType[typeKey as AssessmentType].length > 0 ? (
                    <div className="space-y-3">
                      {testsByType[typeKey as AssessmentType].map((test) => (
                        <div key={test.id.toString()} className="p-4 border rounded-lg space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Badge>{assessmentLabels[test.assessmentType]}</Badge>
                                <span className="text-sm text-muted-foreground">
                                  {test.questions.length} questions
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">Test ID: {test.id.toString()}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleEdit(test)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setTestToDelete(test.id);
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
                    <p className="text-center py-8 text-muted-foreground">No {label.toLowerCase()}s yet</p>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the test.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteTest.isPending}>
              {deleteTest.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
