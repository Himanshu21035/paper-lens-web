import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { QuickAction } from '../../../shared/interface/quickAction.module';
// import { MatButton } from "../../../../../node_modules/@angular/material/button/index";
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-quick-actions',
  imports: [
    CommonModule,
    MatIcon,
    MatButton
],
  templateUrl: './quick-actions.html',
  styleUrl: './quick-actions.scss'
})
export class QuickActions {
  quickActions: QuickAction[]=[
     {
      title: 'Upload Paper',
      description: 'Analyze a new research paper',
      icon: 'upload_file',
      route: '/upload',
      color: '#3498db'
    },
    {
      title: 'Ask Questions',
      description: 'Query your paper collection',
      icon: 'chat',
      route: '/qa',
      color: '#2ecc71'
    },
    {
      title: 'Compare Papers',
      description: 'Side-by-side comparison',
      icon: 'compare_arrows',
      route: '/comparison',
      color: '#f39c12'
    },
    {
      title: 'Generate Proposal',
      description: 'Create research proposals',
      icon: 'auto_awesome',
      route: '/generator/proposal',
      color: '#9b59b6'
    },
    {
      title: 'Library',
      description: 'Browse your papers',
      icon: 'library_books',
      route: '/papers',
      color: '#e67e22'
    },
    {
      title: 'Analytics',
      description: 'View research insights',
      icon: 'analytics',
      route: '/library/analytics',
      color: '#1abc9c'
    }
  ]
  constructor(private router:Router){}
  navigateTo(route:string){
    this.router.navigate([route]);
  }
}
