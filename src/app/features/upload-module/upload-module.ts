import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpEventType } from '@angular/common/http'; 
import { Paper, PaperService } from '../../shared/paper.service';
interface UploadFile{
  file:File;
  paperId?:string;
  progress:number;
  status:'pending'|'processing'|'success'|'error'|'uploading'|'ready'|'failed';
  error?:string;
}
@Component({
  selector: 'app-upload-module',
  imports: [CommonModule ],
  templateUrl: './upload-module.html',
  styleUrl: './upload-module.css'
})
export class UploadModule {
  files:UploadFile[]=[];
  isDragging=false;
  maxFileSize=50*1024*1024;
  constructor(private paperService:PaperService){}
  onDragOver(event:DragEvent):void{
    event.preventDefault();
    event.stopPropagation();
    this.isDragging=true;
  }
  onDragLeave(event:DragEvent):void{
    event.preventDefault();
    event.stopPropagation();
      this.isDragging=false;
  }
  onDrop(event:DragEvent):void{
    event.preventDefault();
    event.stopPropagation();
    this.isDragging=false;
    const files=event.dataTransfer?.files;
    if(files){
      this.handleFiles(files);
    }
  }
  onFileSelected(event:any):void{
    const input=event.target as HTMLInputElement;
    if(input.files){
      this.handleFiles(input.files);
    }
  }
  private handleFiles(fileList:FileList):void{
    Array.from(fileList).forEach(file=>{
      if(!file.name.toLowerCase().endsWith('.pdf')){
        alert('File not in pdf format: '+file.name);
        return;
      }
      if(file.size>this.maxFileSize){
        alert('File size exceeds limit (50MB): '+file.name);
        return;
      }
      this.files.push({
        file,
        progress:0,
        status:'pending'
      });

    });
  }
  uploadAll():void{
    this.files.filter(f=>f.status==='pending').forEach(uploadFile=>this.uploadFile(uploadFile));
  }
  // Upload single file
  private uploadFile(uploadFile: UploadFile): void {
    uploadFile.status = 'uploading';

    // Step 1: Get pre-signed URL
    this.paperService.getUploadUrl(uploadFile.file.name).subscribe({
      next: (response) => {
        uploadFile.paperId = response.paperId;

        // Step 2: Upload to S3
        this.paperService.uploadToS3(response.uploadUrl, uploadFile.file).subscribe({
          next: (event) => {
            if (event.type === HttpEventType.UploadProgress) {
              // Update progress
              const percentDone = event.total 
                ? Math.round((100 * event.loaded) / event.total)
                : 0;
              uploadFile.progress = percentDone;
            } else if (event.type === HttpEventType.Response) {
              // Upload complete
              uploadFile.status = 'processing';
              uploadFile.progress = 100;
              
              // Poll for processing status
              this.pollProcessingStatus(uploadFile);
            }
          },
          error: (error) => {
            uploadFile.status = 'error';
            uploadFile.error = 'Upload failed';
            console.error('Upload error:', error);
          }
        });
      },
      error: (error) => {
        uploadFile.status = 'error';
        uploadFile.error = 'Failed to get upload URL';
        console.error('Pre-signed URL error:', error);
      }
    });
  }

  // Poll for processing status
  private pollProcessingStatus(uploadFile: UploadFile): void {
    if (!uploadFile.paperId) return;

    const pollInterval = setInterval(() => {
      this.paperService.getPaperStatus(uploadFile.paperId!).subscribe({
        next: (paper) => {
          if (paper.status === 'ready') {
            uploadFile.status = 'success';
            clearInterval(pollInterval);
          } else if (paper.status === 'failed') {
            uploadFile.status = 'error';
            uploadFile.error = 'Processing failed';
            clearInterval(pollInterval);
          }
        },
        error: (error) => {
          console.error('Status check error:', error);
        }
      });
    }, 3000); // Check every 3 seconds

    // Stop polling after 5 minutes
    setTimeout(() => clearInterval(pollInterval), 300000);
  }

  // Remove file from list
  removeFile(index: number): void {
    this.files.splice(index, 1);
  }

  // Clear all files
  clearAll(): void {
    this.files = [];
  }

  // Get status icon
  getStatusIcon(status: string): string {
    switch (status) {
      case 'pending': return '⏳';
      case 'uploading': return '⬆️';
      case 'processing': return '⚙️';
      case 'success': return '✅';
      case 'error': return '❌';
      default: return '';
    }
  }

  // Format file size
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  hasPendingFiles(): boolean {
    return this.files.some(f => f.status === 'pending');
  }

  // Get count of pending files
  getPendingFilesCount(): number {
    return this.files.filter(f => f.status === 'pending').length;
  }

  // Check if file can be removed
  canRemoveFile(uploadFile: UploadFile): boolean {
    return uploadFile.status !== 'uploading';
  }
   hasFiles(): boolean {
    return this.files.length > 0;
  }
}