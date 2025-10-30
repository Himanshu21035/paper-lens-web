import { Component } from '@angular/core';
import { DashBoardStats,RecentActivity } from '../../../shared/interface/dashboard.module';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { RecentPapers } from '../recent-papers/recent-papers';
import { QuickActions } from '../quick-actions/quick-actions';
import { StatsCard } from '../stats-card/stats-card';


@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    QuickActions,
    RecentPapers,
    StatsCard,
    MatProgressSpinner,
],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard implements OnInit{
  isLoading:boolean=false;
  dashboardStats:DashBoardStats={
    totalPapers:0,
    papersThisMonth:0,
    totalQuestions:0,
    researchGaps:0
  };
  recentActivities:RecentActivity[]=[];
  constructor(){}

  ngOnInit(): void {
      this.loadDashboardData();
  }
  loadDashboardData(){
    this.isLoading=true;
    console.log(this.isLoading);
    setTimeout(() => {
      this.dashboardStats={
        totalPapers:127,
        papersThisMonth:12,
        totalQuestions:45,
        researchGaps:7
      };
      this.recentActivities=[
         {
          id: '1',
          type: 'Upload',
          title: 'Machine Learning in Healthcare.pdf',
          timestamp: new Date(),
          status: 'Completed'
        },
        {
          id: '2',
          type: 'Analysis',
          title: 'Deep Learning Research Trends',
          timestamp: new Date(Date.now() - 3600000),
          status: 'In Progress'
        }
      ]
      this.isLoading=false;
    }, 2000);
  }
  onRefreshData(){
    this.loadDashboardData()
  }

}
