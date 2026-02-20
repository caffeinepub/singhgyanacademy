import { useState } from 'react';
import {
  useIsCallerAdmin,
  useAddNote,
  useGetAllNotes,
  useUpdateNote,
  useDeleteNote,
} from '../../hooks/useQueries';
import AccessDeniedScreen from '../../components/AccessDeniedScreen';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Edit, Trash2, X, Download } from 'lucide-react';
import { toast } from 'sonner';
import FileUploadWithProgress from '../../components/FileUploadWithProgress';
import { Subject, ExternalBlob } from '../../backend';
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

const subjectLabels: Record<Subject, string> = {
  [Subject.history]: 'History',
  [Subject.geography]: 'Geography',
  [Subject.polity]: 'Polity',
  [Subject.economy]: 'Economy',
  [Subject.science]: 'Science',
  [Subject.currentAffairs]: 'Current Affairs',
};

export default function ManageNotes() {
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: allNotes = [] } = useGetAllNotes();
  const addNote = useAddNote();
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();

  const [editingNote, setEditingNote] = useState<bigint | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<bigint | null>(null);

  const [subject, setSubject] = useState<Subject>(Subject.history);
  const [file, setFile] = useState<ExternalBlob | null>(null);

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
    setSubject(Subject.history);
    setFile(null);
    setEditingNote(null);
  };

  const handleEdit = (note: any) => {
    setEditingNote(note.id);
    setSubject(note.subject);
    setFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async () => {
    if (!noteToDelete) return;

    try {
      await deleteNote.mutateAsync(noteToDelete);
      toast.success('Note deleted successfully!');
      setDeleteDialogOpen(false);
      setNoteToDelete(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete note');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error('Please upload a file');
      return;
    }

    try {
      if (editingNote !== null) {
        await updateNote.mutateAsync({ id: editingNote, subject, file });
        toast.success('Note updated successfully!');
      } else {
        await addNote.mutateAsync({ subject, file });
        toast.success('Note added successfully!');
      }

      resetForm();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save note');
    }
  };

  const notesBySubject = Object.values(Subject).reduce((acc, subj) => {
    acc[subj] = allNotes.filter((note) => note.subject === subj);
    return acc;
  }, {} as Record<Subject, typeof allNotes>);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Manage Notes</h1>
          <p className="text-muted-foreground">Upload and manage study notes</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{editingNote !== null ? 'Edit Note' : 'Add New Note'}</CardTitle>
              {editingNote !== null && (
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
                <Label>Subject</Label>
                <Select value={subject} onValueChange={(v) => setSubject(v as Subject)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(subjectLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Upload PDF</Label>
                <FileUploadWithProgress onFileSelect={setFile} label="Upload Note" />
                {file && <p className="text-sm text-green-600">✓ File selected</p>}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={addNote.isPending || updateNote.isPending || !file}
              >
                {addNote.isPending || updateNote.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {editingNote !== null ? 'Updating...' : 'Adding...'}
                  </>
                ) : editingNote !== null ? (
                  'Update Note'
                ) : (
                  'Add Note'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Notes ({allNotes.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={Subject.history}>
              <TabsList className="grid grid-cols-3 lg:grid-cols-6">
                {Object.entries(subjectLabels).map(([value, label]) => (
                  <TabsTrigger key={value} value={value}>
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(subjectLabels).map(([subjectKey, label]) => (
                <TabsContent key={subjectKey} value={subjectKey} className="space-y-4 mt-4">
                  {notesBySubject[subjectKey as Subject].length > 0 ? (
                    <div className="space-y-3">
                      {notesBySubject[subjectKey as Subject].map((note) => (
                        <div key={note.id.toString()} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Badge>{subjectLabels[note.subject]}</Badge>
                              <span className="text-sm text-muted-foreground">Note #{note.id.toString()}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(note.file.getDirectURL(), '_blank')}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleEdit(note)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setNoteToDelete(note.id);
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
                    <p className="text-center py-8 text-muted-foreground">No notes for {label} yet</p>
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
              This action cannot be undone. This will permanently delete the note.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteNote.isPending}>
              {deleteNote.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
