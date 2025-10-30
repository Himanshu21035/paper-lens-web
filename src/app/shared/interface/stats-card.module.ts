export interface StatCard {
  title: string;
  value: number;
  icon: string;
  color: string;
  change: number;
  changeType: 'increase' | 'decrease';
}