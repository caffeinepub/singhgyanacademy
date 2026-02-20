import { useNavigate } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PoliceExams() {
  const navigate = useNavigate();

  const policeExams = [
    { code: 'upPolice', name: 'UP Police', description: 'Uttar Pradesh Police' },
    { code: 'biharPolice', name: 'Bihar Police', description: 'Bihar Police Recruitment' },
    { code: 'mpPolice', name: 'MP Police', description: 'Madhya Pradesh Police' },
    { code: 'delhiPolice', name: 'Delhi Police', description: 'Delhi Police Recruitment' },
    { code: 'rajasthanPolice', name: 'Rajasthan Police', description: 'Rajasthan Police' },
    { code: 'haryanaPolice', name: 'Haryana Police', description: 'Haryana Police' },
    { code: 'capf', name: 'CAPF', description: 'Central Armed Police Forces' },
    { code: 'otherStatesPolice', name: 'Other States', description: 'Various State Police' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Police Exams</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete preparation material for all State and Central Police examinations
          </p>
        </div>

        <div className="mb-8">
          <Card className="bg-gradient-to-r from-blue-500/10 to-blue-600/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">SSC GD Constable</CardTitle>
                  <CardDescription>Staff Selection Commission General Duty</CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={() => navigate({ to: '/competitive-exams/ssc/sscGD' })}
                  className="gap-2"
                >
                  View Details <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {policeExams.map((exam) => (
            <Card
              key={exam.code}
              className="hover:shadow-lg transition-all cursor-pointer hover:scale-105"
              onClick={() => navigate({ to: `/competitive-exams/police/${exam.code}` })}
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
