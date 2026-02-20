import { Heart, Mail, Loader2 } from 'lucide-react';
import { SiYoutube, SiWhatsapp } from 'react-icons/si';
import { useGetStaticContent } from '../hooks/useQueries';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(window.location.hostname || 'singhgyan-academy');
  const { data: staticContent, isLoading } = useGetStaticContent();

  return (
    <footer className="border-t border-border/40 bg-muted/30 mt-16">
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-3">SinghGyan Academy</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {staticContent?.footerText ||
                    'Ek Kadam Nishulk Shiksha Ki Aur - Providing free education for competitive exam aspirants.'}
                </p>
                <a
                  href="mailto:singhgyanacademy1@gmail.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  singhgyanacademy1@gmail.com
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/courses" className="text-muted-foreground hover:text-primary transition-colors">
                      Courses
                    </a>
                  </li>
                  <li>
                    <a href="/notes" className="text-muted-foreground hover:text-primary transition-colors">
                      Notes
                    </a>
                  </li>
                  <li>
                    <a href="/test-series" className="text-muted-foreground hover:text-primary transition-colors">
                      Test Series
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                      About Us
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://youtube.com/@singhgyanacademy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="YouTube"
                  >
                    <SiYoutube className="h-6 w-6" />
                  </a>
                  <a
                    href="https://wa.me/917068728031"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-chart-2 transition-colors"
                    aria-label="WhatsApp"
                  >
                    <SiWhatsapp className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/40 text-center text-sm text-muted-foreground">
              <p>© {currentYear} SinghGyan Academy. All rights reserved.</p>
              <p className="mt-2 flex items-center justify-center gap-1">
                Built with <Heart className="h-4 w-4 text-destructive fill-destructive" /> using{' '}
                <a
                  href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </footer>
  );
}
