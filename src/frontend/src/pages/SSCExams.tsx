import { useNavigate } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

export default function SSCExams() {
  const navigate = useNavigate();

  const sscExams = [
    { code: 'sscCGL', name: 'SSC CGL', description: 'Combined Graduate Level' },
    { code: 'sscCHSL', name: 'SSC CHSL', description: 'Combined Higher Secondary Level' },
    { code: 'sscGD', name: 'SSC GD', description: 'General Duty Constable' },
    { code: 'sscMTS', name: 'SSC MTS', description: 'Multi-Tasking Staff' },
    { code: 'sscCPO', name: 'SSC CPO', description: 'Central Police Organization' },
    { code: 'sscStenographer', name: 'SSC Stenographer', description: 'Stenographer Grade C & D' },
    { code: 'sscJE', name: 'SSC JE', description: 'Junior Engineer' },
    { code: 'sscSelectionPost', name: 'SSC Selection Post', description: 'Various Posts' },
    { code: 'sscConstable', name: 'SSC Constable', description: 'Constable Recruitment' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Building2 className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">SSC Exams</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete preparation material for all Staff Selection Commission examinations
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sscExams.map((exam) => (
            <Card
              key={exam.code}
              className="hover:shadow-lg transition-all cursor-pointer hover:scale-105"
              onClick={() => navigate({ to: `/competitive-exams/ssc/${exam.code}` })}
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
