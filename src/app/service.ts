// note.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = 'http://localhost:8000/api/notes'; // Ensure this matches your Node.js server URL

  constructor(private http: HttpClient) { }

  getNotes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addNote(note: { title: string; content: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, note);
  }

  deleteNote(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
