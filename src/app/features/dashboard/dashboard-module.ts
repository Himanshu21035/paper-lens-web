import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing-module';
import { Dashboard } from './dashboard/dashboard';
import { StatsCard } from './stats-card/stats-card';
import { RecentPapers } from './recent-papers/recent-papers';
import { QaModule } from '../qa/qa-module';
import { QuickActions } from './quick-actions/quick-actions';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    Dashboard,
    StatsCard,
    RecentPapers,
    QuickActions,
    
  ]
})
export class DashboardModule { }
