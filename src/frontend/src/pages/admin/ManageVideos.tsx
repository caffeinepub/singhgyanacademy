import { useState } from 'react';
import {
  useIsCallerAdmin,
  useGetAllVideos,
  useAddVideo,
  useUpdateVideo,
  useDeleteVideo,
} from '../../hooks/useQueries';
import AccessDeniedScreen from '../../components/AccessDeniedScreen';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Edit, Trash2, X, Search } from 'lucide-react';
import { toast } from 'sonner';
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

const VIDEO_CATEGORIES = ['Geography Classes', 'Current Affairs', 'GS Classes', 'Exam Strategy'];

export default function ManageVideos() {
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: videos = [] } = useGetAllVideos();
  const addVideo = useAddVideo();
  const updateVideo = useUpdateVideo();
  const deleteVideo = useDeleteVideo();

  const [editingVideo, setEditingVideo] = useState<bigint | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<bigint | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(VIDEO_CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');

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
    setTitle('');
    setCategory(VIDEO_CATEGORIES[0]);
    setDescription('');
    setYoutubeLink('');
    setEditingVideo(null);
  };

  const handleEdit = (video: any) => {
    setEditingVideo(video.id);
    setTitle(video.title);
    setCategory(video.category);
    setDescription(video.description);
    setYoutubeLink(video.youtubeLink);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async () => {
    if (!videoToDelete) return;

    try {
      await deleteVideo.mutateAsync(videoToDelete);
      toast.success('Video deleted successfully!');
      setDeleteDialogOpen(false);
      setVideoToDelete(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete video');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !youtubeLink.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const params = {
        title: title.trim(),
        category,
        description: description.trim(),
        youtubeLink: youtubeLink.trim(),
      };

      if (editingVideo !== null) {
        await updateVideo.mutateAsync({ id: editingVideo, ...params });
        toast.success('Video updated successfully!');
      } else {
        await addVideo.mutateAsync(params);
        toast.success('Video added successfully!');
      }

      resetForm();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save video');
    }
  };

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getYouTubeEmbedUrl = (link: string) => {
    const videoId = link.includes('youtube.com') ? new URL(link).searchParams.get('v') : link;
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Manage Videos</h1>
          <p className="text-muted-foreground">Add and manage YouTube video library</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{editingVideo !== null ? 'Edit Video' : 'Add New Video'}</CardTitle>
              {editingVideo !== null && (
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
                <Label>Video Title *</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter video title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {VIDEO_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>YouTube Link *</Label>
                <Input
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... or video ID"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter video description (optional)"
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full" disabled={addVideo.isPending || updateVideo.isPending}>
                {addVideo.isPending || updateVideo.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {editingVideo !== null ? 'Updating...' : 'Adding...'}
                  </>
                ) : editingVideo !== null ? (
                  'Update Video'
                ) : (
                  'Add Video'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <CardTitle>Video Library ({videos.length})</CardTitle>
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search videos..."
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredVideos.length > 0 ? (
              <div className="space-y-6">
                {filteredVideos.map((video) => (
                  <div key={video.id.toString()} className="border rounded-lg overflow-hidden">
                    <div className="grid md:grid-cols-[300px_1fr] gap-4">
                      <div className="aspect-video bg-muted">
                        <iframe
                          src={getYouTubeEmbedUrl(video.youtubeLink)}
                          title={video.title}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1 flex-1">
                            <h3 className="font-semibold text-lg">{video.title}</h3>
                            <Badge variant="secondary">{video.category}</Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(video)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setVideoToDelete(video.id);
                                setDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {video.description && (
                          <p className="text-sm text-muted-foreground line-clamp-3">{video.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-muted-foreground">
                {searchQuery ? 'No videos found matching your search' : 'No videos added yet'}
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
              This action cannot be undone. This will permanently delete the video from the library.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteVideo.isPending}>
              {deleteVideo.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
