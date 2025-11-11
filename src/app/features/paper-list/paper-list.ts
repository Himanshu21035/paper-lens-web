import { Component, OnInit } from '@angular/core';
import { PaperService, Paper } from '../../shared/paper.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paper-list',
  standalone: true,
  imports:  [ CommonModule ],
  templateUrl: './paper-list.html',
  styleUrls: ['./paper-list.css']
})
export class PaperList implements OnInit {
  papers: Paper[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private paperService: PaperService, private router: Router) {}

  ngOnInit() {
    this.fetchPapers();
  }

  fetchPapers() {
    this.isLoading = true;
    this.error = null;
    this.paperService.listPapers().subscribe({
      next: (data) => {
        this.papers = data.papers || [];
        console.log('Fetched papers:', this.papers);
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch papers.';
        this.isLoading = false;
      }
    });
  }

  openPaper(paperId: string) {
    this.router.navigate(['/papers', paperId]);
  }
}
