import { useNavigate } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Plane } from 'lucide-react';

export default function DefenceExams() {
  const navigate = useNavigate();

  const defenceExams = [
    { code: 'nda', name: 'NDA', description: 'National Defence Academy' },
    { code: 'cds', name: 'CDS', description: 'Combined Defence Services' },
    { code: 'afcat', name: 'AFCAT', description: 'Air Force Common Admission Test' },
    { code: 'agniveer', name: 'Agniveer', description: 'Agnipath Scheme Recruitment' },
    { code: 'navy', name: 'Navy', description: 'Indian Navy Recruitment' },
    { code: 'airforce', name: 'Air Force', description: 'Indian Air Force Recruitment' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Plane className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Defence Exams</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete preparation material for all Defence Services examinations
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {defenceExams.map((exam) => (
            <Card
              key={exam.code}
              className="hover:shadow-lg transition-all cursor-pointer hover:scale-105"
              onClick={() => navigate({ to: `/competitive-exams/defence/${exam.code}` })}
            >
              <CardHeader>
                <CardTitle className="text-lg">{exam.name}</CardTitle>
                <CardDescription>{exam.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
