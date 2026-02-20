import { FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useGetNotesBySubject } from '../hooks/useQueries';
import { Subject } from '../backend';
import NotesList from '../components/NotesList';

export default function StudyMaterial() {
  const { data: historyNotes = [] } = useGetNotesBySubject(Subject.history);
  const { data: geographyNotes = [] } = useGetNotesBySubject(Subject.geography);
  const { data: polityNotes = [] } = useGetNotesBySubject(Subject.polity);
  const { data: economyNotes = [] } = useGetNotesBySubject(Subject.economy);
  const { data: scienceNotes = [] } = useGetNotesBySubject(Subject.science);
  const { data: currentAffairsNotes = [] } = useGetNotesBySubject(Subject.currentAffairs);

  const subjects = [
    { id: 'history', name: 'History', notes: historyNotes, subject: Subject.history },
    { id: 'geography', name: 'Geography', notes: geographyNotes, subject: Subject.geography },
    { id: 'polity', name: 'Polity', notes: polityNotes, subject: Subject.polity },
    { id: 'economy', name: 'Economy', notes: economyNotes, subject: Subject.economy },
    { id: 'science', name: 'Science', notes: scienceNotes, subject: Subject.science },
    { id: 'maths', name: 'Maths', notes: [], subject: Subject.science },
    { id: 'reasoning', name: 'Reasoning', notes: [], subject: Subject.science },
    { id: 'english', name: 'English', notes: [], subject: Subject.science },
    { id: 'hindi', name: 'Hindi', notes: [], subject: Subject.science },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <FileText className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">Study Material</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Subject-wise comprehensive study material with downloadable notes, video lectures, and practice questions
          </p>
        </div>

        <Tabs defaultValue="history" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9 h-auto gap-2">
            {subjects.map((subject) => (
              <TabsTrigger key={subject.id} value={subject.id} className="text-xs lg:text-sm">
                {subject.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {subjects.map((subject) => (
            <TabsContent key={subject.id} value={subject.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{subject.name} Study Material</CardTitle>
                </CardHeader>
                <CardContent>
                  {subject.notes.length > 0 ? (
                    <NotesList notes={subject.notes} subject={subject.subject} />
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>{subject.name} study material will be added soon.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
