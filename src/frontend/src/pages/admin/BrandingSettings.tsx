import { useState, useEffect } from 'react';
import { useIsCallerAdmin, useGetLogo, useUpdateLogo } from '../../hooks/useQueries';
import AccessDeniedScreen from '../../components/AccessDeniedScreen';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader2, Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function BrandingSettings() {
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: currentLogo, isLoading: logoLoading } = useGetLogo();
  const updateLogo = useUpdateLogo();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentLogoUrl, setCurrentLogoUrl] = useState<string>('/assets/generated/logo.dim_256x256.png');

  useEffect(() => {
    if (currentLogo) {
      const uint8Array = new Uint8Array(currentLogo);
      const blob = new Blob([uint8Array], { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      setCurrentLogoUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [currentLogo]);

  if (adminLoading || logoLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return <AccessDeniedScreen />;
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleSave = async () => {
    if (!selectedFile) {
      toast.error('Please select a logo file');
      return;
    }

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      await updateLogo.mutateAsync(uint8Array);
      toast.success('Logo updated successfully!');

      setSelectedFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update logo');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Branding Settings</h1>
          <p className="text-muted-foreground">Customize your platform's logo and branding</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Logo Management</CardTitle>
            <CardDescription>Upload a new logo to replace the current one</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Current Logo</Label>
                <div className="border rounded-lg p-6 bg-muted/30 flex items-center justify-center">
                  <img src={currentLogoUrl} alt="Current Logo" className="max-h-32 max-w-full object-contain" />
                </div>
              </div>

              {previewUrl && (
                <div className="space-y-2">
                  <Label>New Logo Preview</Label>
                  <div className="border rounded-lg p-6 bg-muted/30 flex items-center justify-center">
                    <img src={previewUrl} alt="New Logo Preview" className="max-h-32 max-w-full object-contain" />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo-upload">Upload New Logo</Label>
                <div className="flex gap-2">
                  <Input
                    id="logo-upload"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                    onChange={handleFileSelect}
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={() => document.getElementById('logo-upload')?.click()}>
                    <Upload className="h-4 w-4 mr-2" />
                    Browse
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Supported formats: PNG, JPG, SVG. Recommended size: 256x256px
                </p>
              </div>

              <Button onClick={handleSave} disabled={!selectedFile || updateLogo.isPending} className="w-full">
                {updateLogo.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Logo'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Logo Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The logo will be displayed in the navigation header across all pages. After updating, the new logo will
              appear immediately throughout the platform.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
