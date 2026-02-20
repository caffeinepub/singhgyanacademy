import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { useGetStaticContent } from '../hooks/useQueries';

export default function Contact() {
  const { data: staticContent, isLoading } = useGetStaticContent();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            Have questions? We're here to help. Reach out to us through any of the following channels.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Phone className="h-6 w-6 text-primary" />
                    Phone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="tel:+917068728031" className="text-lg hover:text-primary transition-colors">
                    +91 70687 28031
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">Available Mon-Sat, 9 AM - 6 PM</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Mail className="h-6 w-6 text-primary" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href="mailto:singhgyanacademy1@gmail.com"
                    className="text-lg hover:text-primary transition-colors"
                  >
                    singhgyanacademy1@gmail.com
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">We'll respond within 24 hours</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-br from-chart-2/10 to-primary/10 border-none">
              <CardContent className="p-8 text-center space-y-6">
                <SiWhatsapp className="h-16 w-16 mx-auto text-chart-2" />
                <div>
                  <h2 className="text-2xl font-bold mb-2">Join Our WhatsApp Community</h2>
                  <p className="text-muted-foreground">
                    Get instant updates, study materials, and connect with fellow students preparing for competitive
                    exams.
                  </p>
                </div>
                <Button size="lg" asChild className="gap-2">
                  <a
                    href="https://wa.me/917068728031?text=Hello%2C%20I%20want%20to%20join%20SinghGyan%20Academy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiWhatsapp className="h-5 w-5" />
                    Join WhatsApp Group
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  Office Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <address className="not-italic text-muted-foreground leading-relaxed whitespace-pre-line">
                  {staticContent?.contactInfo ||
                    'SinghGyan Academy\nEducation Complex, Main Road\nLucknow, Uttar Pradesh 226001\nIndia'}
                </address>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
