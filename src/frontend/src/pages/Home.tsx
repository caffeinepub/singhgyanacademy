import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BookOpen, Video, FileText, ClipboardList, Newspaper, ArrowRight, GraduationCap, School } from 'lucide-react';
import { SiYoutube, SiWhatsapp } from 'react-icons/si';
import { useGetSortedCoursesByCategory, useGetCurrentAffairsByType } from '../hooks/useQueries';
import { CurrentAffairsType } from '../backend';
import AIFeaturesShowcase from '../components/AIFeaturesShowcase';

export default function Home() {
  const navigate = useNavigate();
  const { data: courses = [] } = useGetSortedCoursesByCategory();
  const { data: latestUpdates = [] } = useGetCurrentAffairsByType(CurrentAffairsType.dailyUpdate);

  const features = [
    { icon: GraduationCap, title: 'Competitive Exams', description: 'UPSC, SSC, Railway, Banking & more' },
    { icon: School, title: 'School Education', description: 'All classes & boards covered' },
    { icon: Video, title: 'Video Lectures', description: 'Expert-led video classes' },
    { icon: ClipboardList, title: 'Test Series', description: 'Practice with mock tests' },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-chart-2/10" />
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <img src="/assets/generated/logo.dim_256x256.png" alt="SinghGyan Academy" className="h-20 w-20" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Welcome to <span className="text-primary">SinghGyan Academy</span>
              </h1>
              <p className="text-2xl md:text-3xl font-semibold text-primary">
                Ek Kadam Nishulk Shiksha Ki Aur
              </p>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                India's Smart Learning Platform
              </p>
              <p className="text-lg text-muted-foreground">
                Free AI-powered education platform for competitive exam preparation and school education. Quality education accessible to all.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => navigate({ to: '/ai-learning' })} className="gap-2">
                  Explore AI Tools <ArrowRight className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate({ to: '/competitive-exams' })} className="gap-2">
                  Browse Exams
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://wa.me/917068728031" target="_blank" rel="noopener noreferrer" className="gap-2">
                    <SiWhatsapp className="h-5 w-5" />
                    Join WhatsApp
                  </a>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/assets/generated/hero-banner.dim_1200x400.png"
                alt="Students studying"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Showcase */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Learning Tools</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of education with our intelligent AI features designed to accelerate your learning
          </p>
        </div>
        <AIFeaturesShowcase />
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <feature.icon className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Latest Updates */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Latest Updates</h2>
          <Button variant="outline" onClick={() => navigate({ to: '/current-affairs' })}>
            View All
          </Button>
        </div>
        {latestUpdates.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {latestUpdates.slice(0, 4).map((update) => (
              <Card key={update.id.toString()}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Newspaper className="h-5 w-5 text-primary" />
                    Current Affairs Update
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">{update.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <Newspaper className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No updates available yet. Check back soon!</p>
            </CardContent>
          </Card>
        )}
      </section>

      {/* About Founder */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="flex justify-center">
                    <img
                      src="/assets/generated/founder.dim_300x300.png"
                      alt="Gyanendra Singh"
                      className="rounded-full w-48 h-48 object-cover shadow-lg"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="text-2xl font-bold">Gyanendra Singh</h3>
                    <p className="text-lg font-semibold text-primary">Founder & Geography Expert</p>
                    <p className="text-muted-foreground">
                      Dedicated to providing free quality education to students across India. Specializing in Geography and competitive exam preparation with years of teaching experience.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" asChild>
                        <a href="https://youtube.com/@singhgyanacademy" target="_blank" rel="noopener noreferrer" className="gap-2">
                          <SiYoutube className="h-5 w-5" />
                          YouTube
                        </a>
                      </Button>
                      <Button variant="outline" asChild>
                        <a href="https://wa.me/917068728031" target="_blank" rel="noopener noreferrer" className="gap-2">
                          <SiWhatsapp className="h-5 w-5" />
                          WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <Card className="bg-gradient-to-r from-primary/10 to-chart-2/10">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students preparing for competitive exams with our comprehensive study material and AI-powered tools.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" onClick={() => navigate({ to: '/competitive-exams' })}>
                Explore Competitive Exams
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate({ to: '/school-education' })}>
                School Education
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
