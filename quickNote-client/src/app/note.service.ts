import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private baseUrl = 'http://localhost:8080/quick-note/api/notes';
  constructor(private http: HttpClient) { }
  getNoteList(): Observable<any>{
console.log(`${this.baseUrl}`)
    return this.http.get(`${this.baseUrl}`);
  }
  getNote(id: number):Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  createNote(note:Object): Observable<Object>{
    return this.http.post(`${this.baseUrl}`,note);
  }
  updateNote(id:number, change: any): Observable<Object>{
    return this.http.put(`${this.baseUrl}/${id}`,change);
  }
  deleteNote(id:number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`,{responseType: "text"});
  }
}
