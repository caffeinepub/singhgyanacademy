import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import type { Note } from '../backend';
import { Subject } from '../backend';

interface NotesListProps {
  notes: Note[];
  subject: Subject;
}

const subjectLabels: Record<Subject, string> = {
  [Subject.history]: 'History',
  [Subject.geography]: 'Geography',
  [Subject.polity]: 'Polity',
  [Subject.economy]: 'Economy',
  [Subject.science]: 'Science',
  [Subject.currentAffairs]: 'Current Affairs',
};

export default function NotesList({ notes, subject }: NotesListProps) {
  if (notes.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No notes available for {subjectLabels[subject]} yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {notes.map((note) => (
        <Card key={note.id.toString()}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              {subjectLabels[subject]} Notes #{note.id.toString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full sm:w-auto">
              <a href={note.file.getDirectURL()} download target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
