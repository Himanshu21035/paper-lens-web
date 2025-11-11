import { Component, Input } from '@angular/core';
import { DashBoardStats } from '../../../shared/interface/dashboard.module';
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { StatCard } from '../../../shared/interface/stats-card.module';
import { PaperService } from '../../../shared/paper.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  imports: [MatIconModule, CommonModule],
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.scss'
})
export class StatsCard implements OnInit {

  totalPaper: any;
  @Input() stats: DashBoardStats = {
    totalPapers: 0,
    papersThisMonth: 0,
    totalQuestions: 0,
    researchGaps: 0
  };

  constructor(private paperService: PaperService) {
    // this.paperService.listPapers().subscribe({
    //   next:(res)=>{
    //     this.totalPaper=res.count;
    //   }
    // });
  }

  ngOnInit(): void {
    this.paperService.listPapers().subscribe({
      next:(res)=>{
        this.totalPaper=res.count;
      },
      error:(err)=>{  
        console.error('Error fetching total papers:', err);
      }
      
    });
  }

  get statCards(): StatCard[] {
    return [
      {
        title: 'Total Papers',
        value: this.totalPaper||this.stats.totalPapers,
        icon: 'description',
        color: '#3498db',
        change: 12,
        changeType: 'increase'
      }
      // {
      //   title: 'This Month',
      //   value: this.stats.papersThisMonth,
      //   icon: 'trending_up',
      //   color: '#2ecc71',
      //   change: 8,
      //   changeType: 'increase'
      // },
      // {
      //   title: 'Questions Asked',
      //   value: this.stats.totalQuestions,
      //   icon: 'help_outline',
      //   color: '#f39c12',
      //   change: 5,
      //   changeType: 'decrease'
      // },
      // {
      //   title: 'Research Gaps',
      //   value: this.stats.researchGaps,
      //   icon: 'lightbulb_outline',
      //   color: '#e74c3c',
      //   change: 15,
      //   changeType: 'increase'
      // }
    ];
  }
}
