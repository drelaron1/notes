import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Note} from "./notes.component";
@Injectable()
export class NotesServerService {
  private notesUrl = 'http://localhost:8080/notes';

  constructor(private http: HttpClient) {
  }
  getNotes(section): Observable<Note[]> {

    return this.http.get<Note[]>(this.notesUrl + '?section=' + section);

  }
}
