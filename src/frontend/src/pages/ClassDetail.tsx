import { useParams } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BookOpen, FileText, Video, HelpCircle, FileQuestion } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

export default function ClassDetail() {
  const { classNumber } = useParams({ strict: false });
  const [selectedBoard, setSelectedBoard] = useState('cbse');

  const boards = [
    { value: 'cbse', label: 'CBSE' },
    { value: 'icse', label: 'ICSE' },
    { value: 'upBoard', label: 'UP Board' },
    { value: 'biharBoard', label: 'Bihar Board' },
    { value: 'mpBoard', label: 'MP Board' },
    { value: 'rajasthanBoard', label: 'Rajasthan Board' },
    { value: 'maharashtraBoard', label: 'Maharashtra Board' },
    { value: 'otherStateBoards', label: 'Other State Boards' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <BookOpen className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">Class {classNumber}</h1>
          <p className="text-lg text-muted-foreground">
            Complete study material for Class {classNumber}
          </p>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">Select Board</label>
          <Select value={selectedBoard} onValueChange={setSelectedBoard}>
            <SelectTrigger className="w-full max-w-xs">
              <SelectValue placeholder="Select board" />
            </SelectTrigger>
            <SelectContent>
              {boards.map((board) => (
                <SelectItem key={board.value} value={board.value}>
                  {board.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="notes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="notes">Subject Notes</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="question-bank">Question Bank</TabsTrigger>
            <TabsTrigger value="sample-papers">Sample Papers</TabsTrigger>
          </TabsList>

          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Subject Wise Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertDescription>
                    Subject-wise notes for Class {classNumber} ({boards.find(b => b.value === selectedBoard)?.label}) are being prepared. Content will be added soon!
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Video Lectures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertDescription>
                    Video lectures for Class {classNumber} will be added soon!
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="question-bank">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Question Bank
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertDescription>
                    Question bank for Class {classNumber} will be added soon!
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sample-papers">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileQuestion className="h-5 w-5" />
                  Sample Papers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertDescription>
                    Sample papers for Class {classNumber} will be added soon!
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
