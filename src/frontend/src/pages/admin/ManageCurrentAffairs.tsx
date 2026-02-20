import { useState } from 'react';
import {
  useIsCallerAdmin,
  useAddCurrentAffair,
  useGetAllCurrentAffairs,
  useUpdateCurrentAffair,
  useDeleteCurrentAffair,
} from '../../hooks/useQueries';
import AccessDeniedScreen from '../../components/AccessDeniedScreen';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Edit, Trash2, X, Download } from 'lucide-react';
import { toast } from 'sonner';
import FileUploadWithProgress from '../../components/FileUploadWithProgress';
import { CurrentAffairsType, ExternalBlob } from '../../backend';
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

const typeLabels: Record<CurrentAffairsType, string> = {
  [CurrentAffairsType.dailyUpdate]: 'Daily Update',
  [CurrentAffairsType.weeklyPDF]: 'Weekly PDF',
  [CurrentAffairsType.monthlyMagazine]: 'Monthly Magazine',
};

export default function ManageCurrentAffairs() {
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: allCurrentAffairs = [] } = useGetAllCurrentAffairs();
  const addCurrentAffair = useAddCurrentAffair();
  const updateCurrentAffair = useUpdateCurrentAffair();
  const deleteCurrentAffair = useDeleteCurrentAffair();

  const [editingAffair, setEditingAffair] = useState<bigint | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [affairToDelete, setAffairToDelete] = useState<bigint | null>(null);
  const [filterType, setFilterType] = useState<CurrentAffairsType | 'all'>('all');

  const [type, setType] = useState<CurrentAffairsType>(CurrentAffairsType.dailyUpdate);
  const [content, setContent] = useState('');
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
    setType(CurrentAffairsType.dailyUpdate);
    setContent('');
    setFile(null);
    setEditingAffair(null);
  };

  const handleEdit = (affair: any) => {
    setEditingAffair(affair.id);
    setType(affair.type);
    setContent(affair.content);
    setFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async () => {
    if (!affairToDelete) return;

    try {
      await deleteCurrentAffair.mutateAsync(affairToDelete);
      toast.success('Current affair deleted successfully!');
      setDeleteDialogOpen(false);
      setAffairToDelete(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete current affair');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error('Please enter content');
      return;
    }

    try {
      const params = {
        type,
        content: content.trim(),
        file,
      };

      if (editingAffair !== null) {
        await updateCurrentAffair.mutateAsync({ id: editingAffair, ...params });
        toast.success('Current affair updated successfully!');
      } else {
        await addCurrentAffair.mutateAsync(params);
        toast.success('Current affair added successfully!');
      }

      resetForm();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save current affair');
    }
  };

  const sortedAffairs = [...allCurrentAffairs].sort((a, b) => Number(b.id - a.id));
  const filteredAffairs =
    filterType === 'all' ? sortedAffairs : sortedAffairs.filter((affair) => affair.type === filterType);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Manage Current Affairs</h1>
          <p className="text-muted-foreground">Publish current affairs updates</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{editingAffair !== null ? 'Edit Current Affair' : 'Add New Current Affair'}</CardTitle>
              {editingAffair !== null && (
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
                <Label>Type</Label>
                <Select value={type} onValueChange={(v) => setType(v as CurrentAffairsType)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(typeLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Content</Label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter current affairs content"
                  rows={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Upload PDF (Optional)</Label>
                <FileUploadWithProgress onFileSelect={setFile} label="Upload PDF" />
                {file && <p className="text-sm text-green-600">✓ File selected</p>}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={addCurrentAffair.isPending || updateCurrentAffair.isPending}
              >
                {addCurrentAffair.isPending || updateCurrentAffair.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {editingAffair !== null ? 'Updating...' : 'Adding...'}
                  </>
                ) : editingAffair !== null ? (
                  'Update Current Affair'
                ) : (
                  'Add Current Affair'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <CardTitle>All Current Affairs ({allCurrentAffairs.length})</CardTitle>
              <Select value={filterType} onValueChange={(v) => setFilterType(v as CurrentAffairsType | 'all')}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {Object.entries(typeLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {filteredAffairs.length > 0 ? (
              <div className="space-y-4">
                {filteredAffairs.map((affair) => (
                  <div key={affair.id.toString()} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <Badge>{typeLabels[affair.type]}</Badge>
                          <span className="text-xs text-muted-foreground">ID: {affair.id.toString()}</span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap line-clamp-3">{affair.content}</p>
                        {affair.file && (
                          <Button
                            variant="link"
                            size="sm"
                            className="p-0 h-auto"
                            onClick={() => window.open(affair.file!.getDirectURL(), '_blank')}
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Download PDF
                          </Button>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(affair)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setAffairToDelete(affair.id);
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
              <p className="text-center py-8 text-muted-foreground">
                {filterType === 'all' ? 'No current affairs added yet' : `No ${typeLabels[filterType]} entries yet`}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the current affair entry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteCurrentAffair.isPending}>
              {deleteCurrentAffair.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
