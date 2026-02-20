import { useNavigate } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { CourseCategory } from '../backend';

interface CourseCardProps {
  category: CourseCategory;
  courseCount: number;
}

const categoryLabels: Record<CourseCategory, string> = {
  [CourseCategory.upsc]: 'UPSC',
  [CourseCategory.uppcs]: 'UPPCS',
  [CourseCategory.university_geography]: 'University Geography',
  [CourseCategory.bpsc]: 'BPSC',
  [CourseCategory.mppcs]: 'MPPCS',
  [CourseCategory.rpsc]: 'RPSC',
  [CourseCategory.hpsc]: 'HPSC',
  [CourseCategory.ukpsc]: 'UKPSC',
  [CourseCategory.jpsc]: 'JPSC',
  [CourseCategory.cgpsc]: 'CGPSC',
  [CourseCategory.mpsc]: 'MPSC',
  [CourseCategory.gpsc]: 'GPSC',
  [CourseCategory.appsc]: 'APPSC',
  [CourseCategory.tspsc]: 'TSPSC',
  [CourseCategory.wbpsc]: 'WBPSC',
  [CourseCategory.tnpsc]: 'TNPSC',
  [CourseCategory.kpsc]: 'KPSC',
  [CourseCategory.keralaPSC]: 'Kerala PSC',
  [CourseCategory.punjabPSC]: 'Punjab PSC',
  [CourseCategory.otherStatesPCS]: 'Other States PCS',
  [CourseCategory.sscCGL]: 'SSC CGL',
  [CourseCategory.sscCHSL]: 'SSC CHSL',
  [CourseCategory.sscGD]: 'SSC GD',
  [CourseCategory.sscMTS]: 'SSC MTS',
  [CourseCategory.sscCPO]: 'SSC CPO',
  [CourseCategory.sscStenographer]: 'SSC Stenographer',
  [CourseCategory.sscJE]: 'SSC JE',
  [CourseCategory.sscSelectionPost]: 'SSC Selection Post',
  [CourseCategory.sscConstable]: 'SSC Constable',
  [CourseCategory.rrbNTPC]: 'RRB NTPC',
  [CourseCategory.rrbGroupD]: 'RRB Group D',
  [CourseCategory.rrbALP]: 'RRB ALP',
  [CourseCategory.rrbTechnician]: 'RRB Technician',
  [CourseCategory.rrbJE]: 'RRB JE',
  [CourseCategory.rpfConstable]: 'RPF Constable',
  [CourseCategory.rpfSI]: 'RPF SI',
  [CourseCategory.upPolice]: 'UP Police',
  [CourseCategory.biharPolice]: 'Bihar Police',
  [CourseCategory.mpPolice]: 'MP Police',
  [CourseCategory.delhiPolice]: 'Delhi Police',
  [CourseCategory.rajasthanPolice]: 'Rajasthan Police',
  [CourseCategory.haryanaPolice]: 'Haryana Police',
  [CourseCategory.capf]: 'CAPF',
  [CourseCategory.otherStatesPolice]: 'Other States Police',
  [CourseCategory.ctet]: 'CTET',
  [CourseCategory.uptet]: 'UPTET',
  [CourseCategory.htet]: 'HTET',
  [CourseCategory.reet]: 'REET',
  [CourseCategory.mptet]: 'MPTET',
  [CourseCategory.superTET]: 'Super TET',
  [CourseCategory.kvs]: 'KVS',
  [CourseCategory.nvs]: 'NVS',
  [CourseCategory.dsssb]: 'DSSSB',
  [CourseCategory.stateTET]: 'State TET',
  [CourseCategory.ibpsPO]: 'IBPS PO',
  [CourseCategory.ibpsClerk]: 'IBPS Clerk',
  [CourseCategory.sbiPO]: 'SBI PO',
  [CourseCategory.sbiClerk]: 'SBI Clerk',
  [CourseCategory.rbiGradeB]: 'RBI Grade B',
  [CourseCategory.nabard]: 'NABARD',
  [CourseCategory.licAAO]: 'LIC AAO',
  [CourseCategory.nda]: 'NDA',
  [CourseCategory.cds]: 'CDS',
  [CourseCategory.afcat]: 'AFCAT',
  [CourseCategory.agniveer]: 'Agniveer',
  [CourseCategory.navy]: 'Navy',
  [CourseCategory.airforce]: 'Air Force',
};

export default function CourseCard({ category, courseCount }: CourseCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => navigate({ to: `/courses/${category}` })}
    >
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <img src="/assets/generated/exam-icons.dim_64x64.png" alt={categoryLabels[category]} className="h-10 w-10" />
          <BookOpen className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>{categoryLabels[category]}</CardTitle>
        <CardDescription>{courseCount} course{courseCount !== 1 ? 's' : ''} available</CardDescription>
      </CardHeader>
    </Card>
  );
}
