import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            Have questions? We're here to help. Reach out to us through any of the following channels.
          </p>
        </div>

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
                href="mailto:contact@singhgyanacademy.com"
                className="text-lg hover:text-primary transition-colors"
              >
                contact@singhgyanacademy.com
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
                Get instant updates, study materials, and connect with fellow students preparing for competitive exams.
              </p>
            </div>
            <Button size="lg" asChild className="gap-2">
              <a href="https://wa.me/917068728031?text=Hello%2C%20I%20want%20to%20join%20SinghGyan%20Academy" target="_blank" rel="noopener noreferrer">
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
            <address className="not-italic text-muted-foreground leading-relaxed">
              SinghGyan Academy
              <br />
              Education Complex, Main Road
              <br />
              Lucknow, Uttar Pradesh 226001
              <br />
              India
            </address>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
