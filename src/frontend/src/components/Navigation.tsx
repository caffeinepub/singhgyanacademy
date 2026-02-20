import { Link, useNavigate } from '@tanstack/react-router';
import { Menu, X, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import LoginButton from './LoginButton';
import { useIsCallerAdmin, useGetLogo } from '../hooks/useQueries';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { data: isAdmin } = useIsCallerAdmin();
  const { data: logoData } = useGetLogo();

  const [logoUrl, setLogoUrl] = useState('/assets/generated/logo.dim_256x256.png');

  useEffect(() => {
    if (logoData) {
      const uint8Array = new Uint8Array(logoData);
      const blob = new Blob([uint8Array], { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      setLogoUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setLogoUrl('/assets/generated/logo.dim_256x256.png');
    }
  }, [logoData]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/ai-learning-zone', label: 'AI Learning Zone', icon: Sparkles },
    { to: '/courses', label: 'Courses' },
    { to: '/video-classes', label: 'Video Classes' },
    { to: '/notes', label: 'Notes' },
    { to: '/test-series', label: 'Test Series' },
    { to: '/current-affairs', label: 'Current Affairs' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate({ to: '/' })}>
            <img src={logoUrl} alt="SinghGyan Academy" className="h-10 w-10" />
            <div className="hidden sm:block">
              <div className="font-bold text-lg leading-tight">SinghGyan Academy</div>
              <div className="text-xs text-muted-foreground">AI Learning Platform</div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md hover:bg-accent flex items-center gap-1"
                activeProps={{ className: 'text-primary bg-accent' }}
              >
                {link.icon && <link.icon className="h-4 w-4" />}
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="px-3 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md hover:bg-accent"
                activeProps={{ className: 'text-primary bg-accent' }}
              >
                Admin
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            <LoginButton />
            <button
              className="lg:hidden p-2 hover:bg-accent rounded-md"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <nav className="lg:hidden py-4 space-y-2 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-3 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md hover:bg-accent"
                activeProps={{ className: 'text-primary bg-accent' }}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center gap-2">
                  {link.icon && <link.icon className="h-4 w-4" />}
                  {link.label}
                </div>
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="block px-3 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md hover:bg-accent"
                activeProps={{ className: 'text-primary bg-accent' }}
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
