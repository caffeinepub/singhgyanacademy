import { useNavigate } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GraduationCap, Building2, Train, Shield, BookOpen, Landmark, Plane } from 'lucide-react';

export default function CompetitiveExams() {
  const navigate = useNavigate();

  const examCategories = [
    {
      id: 'civil-services',
      title: 'Civil Services Exams',
      description: 'UPSC & All State PCS (18 States)',
      icon: GraduationCap,
      path: '/competitive-exams/civil-services',
      color: 'from-blue-500/10 to-blue-600/10',
    },
    {
      id: 'ssc',
      title: 'SSC Exams',
      description: 'CGL, CHSL, GD, MTS, CPO & more (9 Exams)',
      icon: Building2,
      path: '/competitive-exams/ssc',
      color: 'from-green-500/10 to-green-600/10',
    },
    {
      id: 'railway',
      title: 'Railway Exams',
      description: 'RRB NTPC, Group D, ALP & more (7 Exams)',
      icon: Train,
      path: '/competitive-exams/railway',
      color: 'from-orange-500/10 to-orange-600/10',
    },
    {
      id: 'police',
      title: 'Police Exams',
      description: 'State Police, CAPF & more (8 Exams)',
      icon: Shield,
      path: '/competitive-exams/police',
      color: 'from-red-500/10 to-red-600/10',
    },
    {
      id: 'teaching',
      title: 'Teaching Exams',
      description: 'CTET, TET, KVS, NVS & more (10 Exams)',
      icon: BookOpen,
      path: '/competitive-exams/teaching',
      color: 'from-purple-500/10 to-purple-600/10',
    },
    {
      id: 'banking',
      title: 'Banking Exams',
      description: 'IBPS, SBI, RBI & more (7 Exams)',
      icon: Landmark,
      path: '/competitive-exams/banking',
      color: 'from-yellow-500/10 to-yellow-600/10',
    },
    {
      id: 'defence',
      title: 'Defence Exams',
      description: 'NDA, CDS, AFCAT, Agniveer & more (6 Exams)',
      icon: Plane,
      path: '/competitive-exams/defence',
      color: 'from-indigo-500/10 to-indigo-600/10',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <GraduationCap className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Competitive Exams</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive preparation material for all major competitive exams across India. Choose your exam category to get started.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {examCategories.map((category) => (
            <Card
              key={category.id}
              className={`hover:shadow-lg transition-all cursor-pointer hover:scale-105 bg-gradient-to-br ${category.color}`}
              onClick={() => navigate({ to: category.path })}
            >
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <category.icon className="h-16 w-16 text-primary" />
                </div>
                <CardTitle className="text-xl">{category.title}</CardTitle>
                <CardDescription className="text-sm">{category.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
