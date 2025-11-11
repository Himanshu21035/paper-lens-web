import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaperService, Paper, Summary, QAResponse } from '../../shared/paper.service';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  sources?: QAResponse['sources'];
  timestamp: Date;
}

@Component({
  selector: 'app-paper-viewer',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './paper-viewer.html',
  styleUrls: ['./paper-viewer.css']
})
export class PaperViewerComponent implements OnInit {
  paperId: string = '';
  paper: Paper | null = null;
  summary: Summary | null = null;
  
  isLoadingPaper = true;
  isLoadingSummary = true;
  isAsking = false;
  error: string | null = null;
  
  question = '';
  chatHistory: ChatMessage[] = [];
  
  activeTab: 'summary' | 'qa' = 'summary';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paperService: PaperService
  ) {}

  ngOnInit() {
    this.paperId = this.route.snapshot.paramMap.get('paperId') || '';
    if (this.paperId) {
      this.loadPaper();
      this.loadSummary();
    }
  }

  loadPaper() {
    this.isLoadingPaper = true;
    this.paperService.getPaperStatus(this.paperId).subscribe({
      next: (data) => {
        this.paper = data;
        this.isLoadingPaper = false;
      },
      error: (err) => {
        this.error = 'Failed to load paper metadata';
        this.isLoadingPaper = false;
      }
    });
  }

  loadSummary() {
    this.isLoadingSummary = true;
    this.paperService.getPaperSummary(this.paperId).subscribe({
      next: (data) => {
        this.summary = data;
        this.isLoadingSummary = false;
      },
      error: (err) => {
        this.error = 'Summary not available yet';
        this.isLoadingSummary = false;
      }
    });
  }

  askQuestion() {
    if (!this.question.trim() || this.isAsking) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: this.question,
      timestamp: new Date()
    };
    
    this.chatHistory.push(userMessage);
    const currentQuestion = this.question;
    this.question = '';
    this.isAsking = true;

    this.paperService.askQuestion(this.paperId, currentQuestion).subscribe({
      next: (response) => {
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: response.answer,
          sources: response.sources,
          timestamp: new Date()
        };
        this.chatHistory.push(assistantMessage);
        this.isAsking = false;
      },
      error: (err) => {
        const errorMessage: ChatMessage = {
          role: 'assistant',
          content: 'Sorry, I encountered an error processing your question.',
          timestamp: new Date()
        };
        this.chatHistory.push(errorMessage);
        this.isAsking = false;
      }
    });
  }

  switchTab(tab: 'summary' | 'qa') {
    this.activeTab = tab;
  }

  goBack() {
    this.router.navigate(['/papers']);
  }

  deletePaper() {
    if (!confirm('Are you sure you want to delete this paper?')) return;
    
    this.paperService.deletePaper(this.paperId).subscribe({
      next: () => {
        this.router.navigate(['/papers']);
      },
      error: (err) => {
        alert('Failed to delete paper');
      }
    });
  }
}
