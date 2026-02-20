import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Calendar } from 'lucide-react';
import type { CurrentAffair } from '../backend';

interface CurrentAffairItemProps {
  item: CurrentAffair;
}

export default function CurrentAffairItem({ item }: CurrentAffairItemProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Update #{item.id.toString()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{item.content}</p>
        {item.file && (
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <a href={item.file.getDirectURL()} download target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
