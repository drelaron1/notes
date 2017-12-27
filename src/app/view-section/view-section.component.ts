import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotesServerService} from '../notes-server.service';
import {Note} from '../notes.component';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-view-section',
  templateUrl: './view-section.component.html',
  styleUrls: ['./view-section.component.css']
})
export class ViewSectionComponent implements OnInit {
  section: string;
  notes$: Observable<Note[]>;
  constructor(private route: ActivatedRoute,private noteServer: NotesServerService) {}

  ngOnInit() {
    this.section = this.route.snapshot.params["name"];
    this.notes$ = this.getNotes();
  }

  getNotes() {
    return this.noteServer.getNotes(this.section);
  }
}
