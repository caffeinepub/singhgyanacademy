import { useNavigate } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { School, BookOpen } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SchoolEducation() {
  const navigate = useNavigate();

  const classes = [
    { number: 1, name: 'Class 1' },
    { number: 2, name: 'Class 2' },
    { number: 3, name: 'Class 3' },
    { number: 4, name: 'Class 4' },
    { number: 5, name: 'Class 5' },
    { number: 6, name: 'Class 6' },
    { number: 7, name: 'Class 7' },
    { number: 8, name: 'Class 8' },
    { number: 9, name: 'Class 9' },
    { number: 10, name: 'Class 10' },
    { number: 11, name: 'Class 11' },
    { number: 12, name: 'Class 12' },
  ];

  const boards = [
    { code: 'cbse', name: 'CBSE', description: 'Central Board of Secondary Education' },
    { code: 'icse', name: 'ICSE', description: 'Indian Certificate of Secondary Education' },
    { code: 'upBoard', name: 'UP Board', description: 'Uttar Pradesh Board' },
    { code: 'biharBoard', name: 'Bihar Board', description: 'Bihar School Examination Board' },
    { code: 'mpBoard', name: 'MP Board', description: 'Madhya Pradesh Board' },
    { code: 'rajasthanBoard', name: 'Rajasthan Board', description: 'Board of Secondary Education Rajasthan' },
    { code: 'maharashtraBoard', name: 'Maharashtra Board', description: 'Maharashtra State Board' },
    { code: 'otherStateBoards', name: 'Other State Boards', description: 'Various State Boards' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <School className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">School Education</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete study material for all classes and boards
          </p>
        </div>

        <Tabs defaultValue="classes" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="classes">Classes (1-12)</TabsTrigger>
            <TabsTrigger value="boards">Boards</TabsTrigger>
          </TabsList>

          <TabsContent value="classes">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Select Your Class</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {classes.map((cls) => (
                  <Card
                    key={cls.number}
                    className="hover:shadow-lg transition-all cursor-pointer hover:scale-105"
                    onClick={() => navigate({ to: `/school-education/class/${cls.number}` })}
                  >
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-4">
                        <BookOpen className="h-12 w-12 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{cls.name}</CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="boards">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Select Your Board</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {boards.map((board) => (
                  <Card key={board.code} className="hover:shadow-lg transition-all">
                    <CardHeader>
                      <CardTitle className="text-lg">{board.name}</CardTitle>
                      <CardDescription>{board.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
