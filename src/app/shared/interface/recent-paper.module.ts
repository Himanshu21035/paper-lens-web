export interface RecentPaper {
  id: string;
  title: string;
  authors: string[];
  uploadDate: Date;
  status: 'completed' | 'processing' | 'failed';
  summary?: string;
}