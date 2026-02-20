import { useNavigate } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Train } from 'lucide-react';

export default function RailwayExams() {
  const navigate = useNavigate();

  const railwayExams = [
    { code: 'rrbNTPC', name: 'RRB NTPC', description: 'Non-Technical Popular Categories' },
    { code: 'rrbGroupD', name: 'RRB Group D', description: 'Group D Posts' },
    { code: 'rrbALP', name: 'RRB ALP', description: 'Assistant Loco Pilot' },
    { code: 'rrbTechnician', name: 'RRB Technician', description: 'Technician Posts' },
    { code: 'rrbJE', name: 'RRB JE', description: 'Junior Engineer' },
    { code: 'rpfConstable', name: 'RPF Constable', description: 'Railway Protection Force' },
    { code: 'rpfSI', name: 'RPF SI', description: 'Sub-Inspector' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Train className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Railway Exams</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete preparation material for all Railway Recruitment Board examinations
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {railwayExams.map((exam) => (
            <Card
              key={exam.code}
              className="hover:shadow-lg transition-all cursor-pointer hover:scale-105"
              onClick={() => navigate({ to: `/competitive-exams/railway/${exam.code}` })}
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
