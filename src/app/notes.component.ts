import {Component, Input, OnChanges, OnInit} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {NotesServerService} from './notes-server.service';

@Component({
  selector: 'notes',
  templateUrl: './notes.component.html'
})
export class NotesComponent {

@Input()
  section:string = 'Work';

  constructor(private http: HttpClient, private notesServer: NotesServerService) {
  }
  notes: Note[];

  text: string;


  private notesUrl = 'http://localhost:8080/notes';

  add(): void{
    let note = { text: this.text, section: this.section };

     this.http.post(this.notesUrl, note).subscribe(
       res=>{
         this.text='';
         this.notes.push(note);
       });
  }


  remove(idx) {
    this.notes.splice(idx, 1);
  }

  ngOnChanges(){
    this.notesServer.getNotes(this.section).subscribe(notes=> {
      this.notes = notes;
    });

  }
}
 export interface Note {
  text: string;
 }
