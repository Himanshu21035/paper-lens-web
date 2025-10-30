import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentPaper } from '../../../shared/interface/recent-paper.module';


@Component({
  selector: 'app-recent-papers',
  imports: [],
  templateUrl: './recent-papers.html',
  styleUrl: './recent-papers.scss'
})
export class RecentPapers implements OnInit{
  recentPapers: RecentPaper[]=[];
  isLoading:boolean=true;
  ngOnInit(): void {
    
  }
  loadRecentPapers() {
    this.isLoading=true;
    setTimeout(() => {
      this.recentPapers=[
        {
          id: '1',
          title: 'Deep Learning Approaches for Medical Image Analysis',
          authors: ['Smith, J.', 'Johnson, A.', 'Williams, B.'],
          uploadDate: new Date(),
          status: 'completed',
          summary: 'Comprehensive review of deep learning techniques in medical imaging...'
        },
        {
          id: '2',
          title: 'Quantum Computing Applications in Cryptography',
          authors: ['Davis, M.', 'Brown, C.'],
          uploadDate: new Date(Date.now() - 86400000),
          status: 'processing'
        },
        {
          id: '3',
          title: 'Sustainable AI: Energy-Efficient Machine Learning',
          authors: ['Taylor, R.', 'Anderson, K.', 'White, L.'],
          uploadDate: new Date(Date.now() - 172800000),
          status: 'completed',
          summary: 'Investigation of energy consumption in ML models and optimization strategies...'
        }
      ]
      this.isLoading=false;
    }, 1000); 
  }
  
}
