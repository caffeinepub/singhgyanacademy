import { useNavigate } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export default function TeachingExams() {
  const navigate = useNavigate();

  const teachingExams = [
    { code: 'ctet', name: 'CTET', description: 'Central Teacher Eligibility Test' },
    { code: 'uptet', name: 'UPTET', description: 'Uttar Pradesh TET' },
    { code: 'htet', name: 'HTET', description: 'Haryana TET' },
    { code: 'reet', name: 'REET', description: 'Rajasthan Eligibility Exam for Teachers' },
    { code: 'mptet', name: 'MPTET', description: 'Madhya Pradesh TET' },
    { code: 'superTET', name: 'Super TET', description: 'Uttar Pradesh Super TET' },
    { code: 'kvs', name: 'KVS', description: 'Kendriya Vidyalaya Sangathan' },
    { code: 'nvs', name: 'NVS', description: 'Navodaya Vidyalaya Samiti' },
    { code: 'dsssb', name: 'DSSSB', description: 'Delhi Subordinate Services Selection Board' },
    { code: 'stateTET', name: 'State TET', description: 'Various State TET Exams' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <BookOpen className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Teaching Exams</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete preparation material for all Teacher Eligibility Tests and teaching recruitment exams
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachingExams.map((exam) => (
            <Card
              key={exam.code}
              className="hover:shadow-lg transition-all cursor-pointer hover:scale-105"
              onClick={() => navigate({ to: `/competitive-exams/teaching/${exam.code}` })}
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
