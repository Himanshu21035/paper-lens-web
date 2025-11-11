import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { count, Observable } from "rxjs";
export interface UploadResponse{
    paperId:string;
    uploadUrl:string;
    key:string;
    expiresIn:number;
}
export interface Paper{
    paperId:string;
    status:string;
    chuncksCount?:number;
    processedDate?:string;
    summaryAvailable?:boolean;
    metadata?:any;
    totalChunks?:number;
    chunksCount?:number;
}
export interface Summary {
  paperId: string;
  metadata: {
    title?: string;
    authors?: string[];
    abstract?: string;
    processed_date?: string;
    total_chunks?: number;
  };
  chunk_summaries?: Array<{
    chunk_id: string;
    chunk_index: number;
    original_text: string;
    summary: string;
  }>;
}

export interface QAResponse {
  answer: string;
  sources: Array<{
    chunkId: string;
    chunkIndex: number;
    relevanceScore: string;
    summary?: string;
  }>;
  metadata: {
    paperId: string;
    chunksRetrieved: number;
    question: string;
  };
}
@Injectable({
  providedIn: 'root'
})
export class PaperService {
    private apiUrl='http://localhost:3000/api/v1/papers';
  constructor(private http: HttpClient) {}

  getUploadUrl(filename:string): Observable<UploadResponse>{
    return this.http.post<UploadResponse>(`${this.apiUrl}/upload`,{filename});
  }
  uploadToS3(url:string,file:File):Observable<any>{
    const headers=new HttpHeaders({
        'Content-Type':'application/pdf'
    });
    return this.http.put(url,file,{
        headers:headers,
        reportProgress:true,
        observe:'events'
    })
  }
  getPaperStatus(paperId:string):Observable<Paper>{
    return this.http.get<Paper>(`${this.apiUrl}/${paperId}`);
  }
  listPapers():Observable<{papers:Paper[];count:number}>{
    return this.http.get<{papers:Paper[];count:number}>(this.apiUrl);
  }
  getPaperSummary(paperId: string): Observable<Summary> {
    return this.http.get<Summary>(`${this.apiUrl}/${paperId}/summary`);
  }

  askQuestion(paperId: string, question: string, topK: number = 5): Observable<QAResponse> {
    return this.http.post<QAResponse>(`${this.apiUrl}/${paperId}/ask`, {
      question,
      topK
    });
  }

  deletePaper(paperId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${paperId}`);
  }
}