import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Heart, Users, Target, Loader2 } from 'lucide-react';
import { useGetAllLeadershipImages, useGetStaticContent } from '../hooks/useQueries';

export default function AboutUs() {
  const { data: leadershipImages = [], isLoading: imagesLoading } = useGetAllLeadershipImages();
  const { data: staticContent, isLoading: contentLoading } = useGetStaticContent();

  const founderImage = leadershipImages.find((img) => img.name.toLowerCase() === 'founder');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">About SinghGyan Academy</h1>
          <p className="text-xl text-muted-foreground">Ek Kadam Nishulk Shiksha Ki Aur</p>
        </div>

        {contentLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <Heart className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {staticContent?.aboutUs ||
                      'SinghGyan Academy is an educational platform dedicated to providing free, quality education to students from all backgrounds. Our mission is to make competitive exam preparation accessible to everyone, especially students from low and middle-income families who aspire to succeed in their chosen fields.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Target className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We envision a future where quality education is not a privilege but a right accessible to all.
                    Through our comprehensive courses, video lectures, study materials, and test series, we aim to
                    empower thousands of students to achieve their dreams of clearing competitive examinations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Users className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">What We Offer</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Comprehensive courses for UPSC, SSC, Railway, Banking, and other competitive exams
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Expert-led video lectures covering all subjects
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Downloadable study notes and previous year questions
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Regular test series to track your progress
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Daily current affairs updates
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="bg-gradient-to-br from-primary/10 to-chart-2/10 border-none">
          <CardContent className="p-8">
            {imagesLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="flex justify-center">
                  <img
                    src={founderImage?.image.getDirectURL() || '/assets/generated/founder.dim_300x300.png'}
                    alt={founderImage?.position || 'Founder'}
                    className="rounded-full w-48 h-48 object-cover shadow-lg"
                  />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <h2 className="text-3xl font-bold">Meet the Founder</h2>
                  <h3 className="text-xl text-primary font-semibold">
                    {founderImage?.position || 'Gyanendra Singh'}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {founderImage?.description ||
                      'With years of experience in competitive exam preparation and a passion for teaching, Gyanendra Singh founded SinghGyan Academy to bridge the gap between quality education and accessibility. His vision is to create a platform where every student, regardless of their economic background, can access the resources they need to succeed.'}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Through dedication and commitment to educational equity, he has helped thousands of students
                    prepare for their competitive exams and achieve their career goals.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <Card>
            <CardContent className="p-6">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-3xl font-bold mb-2">100+</h3>
              <p className="text-muted-foreground">Courses Available</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-3xl font-bold mb-2">10,000+</h3>
              <p className="text-muted-foreground">Students Enrolled</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Target className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-3xl font-bold mb-2">100%</h3>
              <p className="text-muted-foreground">Free Education</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
