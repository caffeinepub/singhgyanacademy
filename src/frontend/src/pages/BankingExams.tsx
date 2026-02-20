import { useNavigate } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Landmark } from 'lucide-react';

export default function BankingExams() {
  const navigate = useNavigate();

  const bankingExams = [
    { code: 'ibpsPO', name: 'IBPS PO', description: 'Probationary Officer' },
    { code: 'ibpsClerk', name: 'IBPS Clerk', description: 'Clerical Cadre' },
    { code: 'sbiPO', name: 'SBI PO', description: 'State Bank of India PO' },
    { code: 'sbiClerk', name: 'SBI Clerk', description: 'State Bank of India Clerk' },
    { code: 'rbiGradeB', name: 'RBI Grade B', description: 'Reserve Bank of India' },
    { code: 'nabard', name: 'NABARD', description: 'National Bank for Agriculture' },
    { code: 'licAAO', name: 'LIC AAO', description: 'Assistant Administrative Officer' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Landmark className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Banking Exams</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete preparation material for all Banking and Financial Services examinations
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bankingExams.map((exam) => (
            <Card
              key={exam.code}
              className="hover:shadow-lg transition-all cursor-pointer hover:scale-105"
              onClick={() => navigate({ to: `/competitive-exams/banking/${exam.code}` })}
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
