import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AITeacherChat from '../components/AITeacherChat';
import AINotesGenerator from '../components/AINotesGenerator';
import AITestGenerator from '../components/AITestGenerator';
import AIExamStrategyAdvisor from '../components/AIExamStrategyAdvisor';
import AIGeographyExpert from '../components/AIGeographyExpert';
import AICurrentAffairsGenerator from '../components/AICurrentAffairsGenerator';

export default function AILearningZone() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🤖 AI Learning Zone
          </h1>
          <p className="text-xl text-muted-foreground">
            Your 24×7 AI-Powered Study Companion
          </p>
          <p className="text-lg text-muted-foreground mt-2">
            Experience intelligent learning tools designed specifically for competitive exam preparation
          </p>
        </div>

        <Tabs defaultValue="teacher" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 h-auto gap-2">
            <TabsTrigger value="teacher" className="flex flex-col items-center gap-1 py-3">
              <img src="/assets/generated/ai-teacher-icon.dim_256x256.png" alt="AI Teacher" className="h-8 w-8" />
              <span className="text-xs">AI Teacher</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex flex-col items-center gap-1 py-3">
              <img src="/assets/generated/ai-notes-icon.dim_256x256.png" alt="Notes Generator" className="h-8 w-8" />
              <span className="text-xs">Notes</span>
            </TabsTrigger>
            <TabsTrigger value="test" className="flex flex-col items-center gap-1 py-3">
              <img src="/assets/generated/ai-test-icon.dim_256x256.png" alt="Test Generator" className="h-8 w-8" />
              <span className="text-xs">Tests</span>
            </TabsTrigger>
            <TabsTrigger value="strategy" className="flex flex-col items-center gap-1 py-3">
              <img src="/assets/generated/ai-strategy-icon.dim_256x256.png" alt="Strategy Advisor" className="h-8 w-8" />
              <span className="text-xs">Strategy</span>
            </TabsTrigger>
            <TabsTrigger value="geography" className="flex flex-col items-center gap-1 py-3">
              <img src="/assets/generated/ai-geography-icon.dim_256x256.png" alt="Geography Expert" className="h-8 w-8" />
              <span className="text-xs">Geography</span>
            </TabsTrigger>
            <TabsTrigger value="current-affairs" className="flex flex-col items-center gap-1 py-3">
              <img src="/assets/generated/ai-news-icon.dim_256x256.png" alt="Current Affairs" className="h-8 w-8" />
              <span className="text-xs">Current Affairs</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="teacher">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <img src="/assets/generated/ai-teacher-icon.dim_256x256.png" alt="AI Teacher" className="h-12 w-12" />
                  <div>
                    <CardTitle className="text-2xl">AI Teacher</CardTitle>
                    <CardDescription>Ask anything about Geography, UPSC, Polity, and more</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AITeacherChat />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <img src="/assets/generated/ai-notes-icon.dim_256x256.png" alt="Notes Generator" className="h-12 w-12" />
                  <div>
                    <CardTitle className="text-2xl">AI Notes Generator</CardTitle>
                    <CardDescription>Generate comprehensive notes with revision points</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AINotesGenerator />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="test">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <img src="/assets/generated/ai-test-icon.dim_256x256.png" alt="Test Generator" className="h-12 w-12" />
                  <div>
                    <CardTitle className="text-2xl">AI Test Generator</CardTitle>
                    <CardDescription>Create custom MCQ tests, practice questions, and mock tests</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AITestGenerator />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategy">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <img src="/assets/generated/ai-strategy-icon.dim_256x256.png" alt="Strategy Advisor" className="h-12 w-12" />
                  <div>
                    <CardTitle className="text-2xl">AI Exam Strategy Advisor</CardTitle>
                    <CardDescription>Get personalized study plans, book recommendations, and time tables</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AIExamStrategyAdvisor />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="geography">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <img src="/assets/generated/ai-geography-icon.dim_256x256.png" alt="Geography Expert" className="h-12 w-12" />
                  <div>
                    <CardTitle className="text-2xl">AI Geography Expert</CardTitle>
                    <CardDescription>Specialized geography content with diagrams, maps, and university-level concepts</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AIGeographyExpert />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="current-affairs">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <img src="/assets/generated/ai-news-icon.dim_256x256.png" alt="Current Affairs" className="h-12 w-12" />
                  <div>
                    <CardTitle className="text-2xl">AI Current Affairs Generator</CardTitle>
                    <CardDescription>Daily updates and quiz questions based on current events</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AICurrentAffairsGenerator />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
