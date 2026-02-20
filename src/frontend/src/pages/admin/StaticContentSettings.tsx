import { useState, useEffect } from 'react';
import { useIsCallerAdmin, useGetStaticContent, useUpdateStaticContent } from '../../hooks/useQueries';
import AccessDeniedScreen from '../../components/AccessDeniedScreen';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function StaticContentSettings() {
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: staticContent, isLoading: contentLoading } = useGetStaticContent();
  const updateStaticContent = useUpdateStaticContent();

  const [aboutUs, setAboutUs] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [footerText, setFooterText] = useState('');

  useEffect(() => {
    if (staticContent) {
      setAboutUs(staticContent.aboutUs);
      setContactInfo(staticContent.contactInfo);
      setFooterText(staticContent.footerText);
    }
  }, [staticContent]);

  if (adminLoading || contentLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return <AccessDeniedScreen />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateStaticContent.mutateAsync({
        aboutUs,
        contactInfo,
        footerText,
      });
      toast.success('Static content updated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update static content');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Static Content Settings</h1>
          <p className="text-muted-foreground">Manage About Us, contact information, and footer text</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About Us Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>About Us Description</Label>
                <Textarea
                  value={aboutUs}
                  onChange={(e) => setAboutUs(e.target.value)}
                  placeholder="Enter the About Us content that will be displayed on the About page"
                  rows={8}
                  className="font-mono text-sm"
                />
                <p className="text-sm text-muted-foreground">
                  This content will be displayed on the About Us page
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Contact Details</Label>
                <Textarea
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="Enter contact information (phone, email, address)"
                  rows={6}
                  className="font-mono text-sm"
                />
                <p className="text-sm text-muted-foreground">
                  This information will be displayed on the Contact page
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Footer Text</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Footer Description</Label>
                <Textarea
                  value={footerText}
                  onChange={(e) => setFooterText(e.target.value)}
                  placeholder="Enter the text that will appear in the footer"
                  rows={4}
                  className="font-mono text-sm"
                />
                <p className="text-sm text-muted-foreground">
                  This text will be displayed in the footer section of all pages
                </p>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full" disabled={updateStaticContent.isPending}>
            {updateStaticContent.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
