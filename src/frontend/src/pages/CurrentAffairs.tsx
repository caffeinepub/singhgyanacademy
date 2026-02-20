import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Newspaper } from 'lucide-react';
import { useGetCurrentAffairsByType } from '../hooks/useQueries';
import CurrentAffairItem from '../components/CurrentAffairItem';
import { CurrentAffairsType } from '../backend';

export default function CurrentAffairs() {
  const [activeType, setActiveType] = useState<CurrentAffairsType>(CurrentAffairsType.dailyUpdate);

  const { data: dailyUpdates = [] } = useGetCurrentAffairsByType(CurrentAffairsType.dailyUpdate);
  const { data: weeklyPDFs = [] } = useGetCurrentAffairsByType(CurrentAffairsType.weeklyPDF);
  const { data: monthlyMagazines = [] } = useGetCurrentAffairsByType(CurrentAffairsType.monthlyMagazine);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Newspaper className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">Current Affairs</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest current affairs. Daily updates, weekly PDFs, and monthly magazines.
          </p>
        </div>

        <Tabs value={activeType} onValueChange={(v) => setActiveType(v as CurrentAffairsType)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value={CurrentAffairsType.dailyUpdate}>Daily Updates</TabsTrigger>
            <TabsTrigger value={CurrentAffairsType.weeklyPDF}>Weekly PDFs</TabsTrigger>
            <TabsTrigger value={CurrentAffairsType.monthlyMagazine}>Monthly Magazines</TabsTrigger>
          </TabsList>

          <TabsContent value={CurrentAffairsType.dailyUpdate}>
            {dailyUpdates.length > 0 ? (
              <div className="space-y-4">
                {dailyUpdates.map((item) => (
                  <CurrentAffairItem key={item.id.toString()} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Newspaper className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No daily updates available yet.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value={CurrentAffairsType.weeklyPDF}>
            {weeklyPDFs.length > 0 ? (
              <div className="space-y-4">
                {weeklyPDFs.map((item) => (
                  <CurrentAffairItem key={item.id.toString()} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Newspaper className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No weekly PDFs available yet.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value={CurrentAffairsType.monthlyMagazine}>
            {monthlyMagazines.length > 0 ? (
              <div className="space-y-4">
                {monthlyMagazines.map((item) => (
                  <CurrentAffairItem key={item.id.toString()} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Newspaper className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No monthly magazines available yet.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
