import { useNavigate } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function AIFeaturesShowcase() {
  const navigate = useNavigate();

  const features = [
    {
      icon: '/assets/generated/ai-teacher-icon.dim_256x256.png',
      title: 'AI Teacher',
      description: 'Ask questions and get instant answers on any topic',
    },
    {
      icon: '/assets/generated/ai-notes-icon.dim_256x256.png',
      title: 'Notes Generator',
      description: 'Generate comprehensive notes with revision points',
    },
    {
      icon: '/assets/generated/ai-test-icon.dim_256x256.png',
      title: 'Test Generator',
      description: 'Create custom MCQ tests and practice questions',
    },
    {
      icon: '/assets/generated/ai-strategy-icon.dim_256x256.png',
      title: 'Exam Strategy',
      description: 'Get personalized study plans and book recommendations',
    },
    {
      icon: '/assets/generated/ai-geography-icon.dim_256x256.png',
      title: 'Geography Expert',
      description: 'Specialized geography content with diagrams and maps',
    },
    {
      icon: '/assets/generated/ai-news-icon.dim_256x256.png',
      title: 'Current Affairs',
      description: 'Daily updates and quiz questions on current events',
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature) => (
        <Card
          key={feature.title}
          className="hover:shadow-lg transition-all cursor-pointer hover:scale-105 bg-gradient-to-br from-card to-primary/5"
          onClick={() => navigate({ to: '/ai-learning-zone' })}
        >
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <img src={feature.icon} alt={feature.title} className="h-16 w-16" />
            </div>
            <CardTitle className="text-xl">{feature.title}</CardTitle>
            <CardDescription className="text-sm">{feature.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
