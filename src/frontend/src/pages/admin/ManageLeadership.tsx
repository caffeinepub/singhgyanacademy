import { useState } from 'react';
import { useIsCallerAdmin, useGetAllLeadershipImages, useAddLeadershipImage, useUpdateLeadershipImage, useDeleteLeadershipImage } from '../../hooks/useQueries';
import AccessDeniedScreen from '../../components/AccessDeniedScreen';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Upload, Trash2, Edit, X } from 'lucide-react';
import { toast } from 'sonner';
import { ExternalBlob } from '../../backend';
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

export default function ManageLeadership() {
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: leadershipImages = [], isLoading: imagesLoading } = useGetAllLeadershipImages();
  const addLeadershipImage = useAddLeadershipImage();
  const updateLeadershipImage = useUpdateLeadershipImage();
  const deleteLeadershipImage = useDeleteLeadershipImage();

  const [editingName, setEditingName] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

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
    setName('');
    setPosition('');
    setDescription('');
    setImageFile(null);
    setImagePreview(null);
    setEditingName(null);
    setUploadProgress(0);
  };

  const handleEdit = (image: any) => {
    setEditingName(image.name);
    setName(image.name);
    setPosition(image.position);
    setDescription(image.description);
    setImagePreview(image.image.getDirectURL());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async () => {
    if (!imageToDelete) return;

    try {
      await deleteLeadershipImage.mutateAsync(imageToDelete);
      toast.success('Leadership image deleted successfully!');
      setDeleteDialogOpen(false);
      setImageToDelete(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete leadership image');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !position.trim() || !description.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!imageFile && !editingName) {
      toast.error('Please select an image');
      return;
    }

    try {
      let imageBlob: ExternalBlob;

      if (imageFile) {
        const arrayBuffer = await imageFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        imageBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
          setUploadProgress(percentage);
        });
      } else if (editingName) {
        const existingImage = leadershipImages.find((img) => img.name === editingName);
        if (!existingImage) {
          toast.error('Image not found');
          return;
        }
        imageBlob = existingImage.image;
      } else {
        toast.error('No image available');
        return;
      }

      const params = {
        name: name.trim(),
        image: imageBlob,
        position: position.trim(),
        description: description.trim(),
      };

      if (editingName !== null) {
        await updateLeadershipImage.mutateAsync(params);
        toast.success('Leadership image updated successfully!');
      } else {
        await addLeadershipImage.mutateAsync(params);
        toast.success('Leadership image added successfully!');
      }

      resetForm();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save leadership image');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Manage Leadership</h1>
          <p className="text-muted-foreground">Upload and manage leadership profile images</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{editingName !== null ? 'Edit Leadership Image' : 'Add Leadership Image'}</CardTitle>
              {editingName !== null && (
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
                <Label>Name (Identifier)</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., owner, founder, director"
                  disabled={editingName !== null}
                />
                <p className="text-sm text-muted-foreground">
                  Use lowercase identifiers like 'owner', 'founder', or 'director'
                </p>
              </div>

              <div className="space-y-2">
                <Label>Position/Title</Label>
                <Input
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="e.g., Founder & CEO"
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description about the person"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Profile Image</Label>
                <div className="flex items-center gap-4">
                  <Button type="button" variant="outline" onClick={() => document.getElementById('image-upload')?.click()}>
                    <Upload className="h-4 w-4 mr-2" />
                    {imageFile ? 'Change Image' : 'Upload Image'}
                  </Button>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {imageFile && <span className="text-sm text-muted-foreground">{imageFile.name}</span>}
                </div>
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-48 h-48 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={addLeadershipImage.isPending || updateLeadershipImage.isPending}
              >
                {addLeadershipImage.isPending || updateLeadershipImage.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {editingName !== null ? 'Updating...' : 'Adding...'}
                  </>
                ) : editingName !== null ? (
                  'Update Leadership Image'
                ) : (
                  'Add Leadership Image'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Existing Leadership Images ({leadershipImages.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {imagesLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : leadershipImages.length > 0 ? (
              <div className="space-y-4">
                {leadershipImages.map((image) => (
                  <div key={image.name} className="p-4 border rounded-lg flex items-start gap-4">
                    <img
                      src={image.image.getDirectURL()}
                      alt={image.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold capitalize">{image.name}</h3>
                      <p className="text-sm text-muted-foreground">{image.position}</p>
                      <p className="text-sm text-muted-foreground">{image.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(image)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setImageToDelete(image.name);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-muted-foreground">No leadership images added yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the leadership image.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteLeadershipImage.isPending}>
              {deleteLeadershipImage.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
