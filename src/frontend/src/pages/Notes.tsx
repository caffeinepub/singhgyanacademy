import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText } from 'lucide-react';
import { useGetNotesBySubject } from '../hooks/useQueries';
import NotesList from '../components/NotesList';
import { Subject } from '../backend';

export default function Notes() {
  const [activeSubject, setActiveSubject] = useState<Subject>(Subject.history);

  const { data: historyNotes = [] } = useGetNotesBySubject(Subject.history);
  const { data: geographyNotes = [] } = useGetNotesBySubject(Subject.geography);
  const { data: polityNotes = [] } = useGetNotesBySubject(Subject.polity);
  const { data: economyNotes = [] } = useGetNotesBySubject(Subject.economy);
  const { data: scienceNotes = [] } = useGetNotesBySubject(Subject.science);
  const { data: currentAffairsNotes = [] } = useGetNotesBySubject(Subject.currentAffairs);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <FileText className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">Study Notes</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Download comprehensive study notes for all subjects. All materials are available in PDF format.
          </p>
        </div>

        <Tabs value={activeSubject} onValueChange={(v) => setActiveSubject(v as Subject)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value={Subject.history}>History</TabsTrigger>
            <TabsTrigger value={Subject.geography}>Geography</TabsTrigger>
            <TabsTrigger value={Subject.polity}>Polity</TabsTrigger>
            <TabsTrigger value={Subject.economy}>Economy</TabsTrigger>
            <TabsTrigger value={Subject.science}>Science</TabsTrigger>
            <TabsTrigger value={Subject.currentAffairs}>Current Affairs</TabsTrigger>
          </TabsList>

          <TabsContent value={Subject.history}>
            <NotesList notes={historyNotes} subject={Subject.history} />
          </TabsContent>

          <TabsContent value={Subject.geography}>
            <NotesList notes={geographyNotes} subject={Subject.geography} />
          </TabsContent>

          <TabsContent value={Subject.polity}>
            <NotesList notes={polityNotes} subject={Subject.polity} />
          </TabsContent>

          <TabsContent value={Subject.economy}>
            <NotesList notes={economyNotes} subject={Subject.economy} />
          </TabsContent>

          <TabsContent value={Subject.science}>
            <NotesList notes={scienceNotes} subject={Subject.science} />
          </TabsContent>

          <TabsContent value={Subject.currentAffairs}>
            <NotesList notes={currentAffairsNotes} subject={Subject.currentAffairs} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
