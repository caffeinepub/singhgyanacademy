import { useNavigate } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GraduationCap, BookOpen, FileText, Video, ClipboardList, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CivilServicesExams() {
  const navigate = useNavigate();

  const upscSections = [
    { id: 'prelims', title: 'Prelims', icon: BookOpen },
    { id: 'mains', title: 'Mains', icon: FileText },
    { id: 'optional', title: 'Optional', icon: BookOpen },
    { id: 'interview', title: 'Interview', icon: MessageSquare },
    { id: 'notes', title: 'Notes', icon: FileText },
    { id: 'test-series', title: 'Test Series', icon: ClipboardList },
  ];

  const statePCS = [
    { code: 'uppcs', name: 'UPPCS', state: 'Uttar Pradesh' },
    { code: 'bpsc', name: 'BPSC', state: 'Bihar' },
    { code: 'mppcs', name: 'MPPCS', state: 'Madhya Pradesh' },
    { code: 'rpsc', name: 'RPSC', state: 'Rajasthan' },
    { code: 'hpsc', name: 'HPSC', state: 'Haryana' },
    { code: 'ukpsc', name: 'UKPSC', state: 'Uttarakhand' },
    { code: 'jpsc', name: 'JPSC', state: 'Jharkhand' },
    { code: 'cgpsc', name: 'CGPSC', state: 'Chhattisgarh' },
    { code: 'mpsc', name: 'MPSC', state: 'Maharashtra' },
    { code: 'gpsc', name: 'GPSC', state: 'Gujarat' },
    { code: 'appsc', name: 'APPSC', state: 'Andhra Pradesh' },
    { code: 'tspsc', name: 'TSPSC', state: 'Telangana' },
    { code: 'wbpsc', name: 'WBPSC', state: 'West Bengal' },
    { code: 'tnpsc', name: 'TNPSC', state: 'Tamil Nadu' },
    { code: 'kpsc', name: 'KPSC', state: 'Karnataka' },
    { code: 'keralaPSC', name: 'Kerala PSC', state: 'Kerala' },
    { code: 'punjabPSC', name: 'Punjab PSC', state: 'Punjab' },
    { code: 'otherStatesPCS', name: 'Other States', state: 'Various States' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <GraduationCap className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Civil Services Exams</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete preparation material for UPSC and all State PCS examinations
          </p>
        </div>

        <Tabs defaultValue="upsc" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upsc">UPSC</TabsTrigger>
            <TabsTrigger value="state-pcs">All State PCS</TabsTrigger>
          </TabsList>

          <TabsContent value="upsc">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">UPSC Civil Services Examination</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {upscSections.map((section) => (
                  <Card
                    key={section.id}
                    className="hover:shadow-lg transition-all cursor-pointer hover:scale-105"
                    onClick={() => navigate({ to: `/courses/upsc` })}
                  >
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-4">
                        <section.icon className="h-12 w-12 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="state-pcs">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">All State PCS Examinations</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {statePCS.map((pcs) => (
                  <Card
                    key={pcs.code}
                    className="hover:shadow-lg transition-all cursor-pointer hover:scale-105"
                    onClick={() => navigate({ to: `/competitive-exams/civil-services/${pcs.code}` })}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{pcs.name}</CardTitle>
                      <CardDescription>{pcs.state}</CardDescription>
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
