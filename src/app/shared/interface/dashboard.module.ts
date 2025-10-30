export interface DashBoardStats{
  totalPapers:number;
  papersThisMonth: number;
  totalQuestions:number;
  researchGaps:number;
}
export interface RecentActivity{
    id:string;
    type:'Upload' | 'Analysis'| 'Questions' | 'Export';
    title:string;
    timestamp:Date;
    status: 'Completed' | 'In Progress' | 'Failed';
}