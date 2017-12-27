///<reference path="../../../node_modules/rxjs/add/operator/map.d.ts"/>
import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Component({
  selector: `sections`,
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})

export class SectionsComponent implements OnInit {

  private sectionsUrl = 'http://localhost:8080/sections';

  sections: Section[];
  activeSection : string;
  constructor(private http: HttpClient) {
    this.readSections();
  }
  @Output() sectionChanged: EventEmitter<string> =
    new EventEmitter<string>();

  @Input()
  set section(section:string) {
    if (section && section.length>0) {
      this.activeSection = section;
    }
  }
  ngOnInit() {
  }
  readSections() {

    this.getSections().subscribe(sections=>{
      this.sections=sections;
      if (this.activeSection == null && this.sections.length>0) {
        this.showSection(this.sections[0]);
      }
    });


  }
  getSections(): Observable<Section[]> {
    return this.http.get<Section[]>(this.sectionsUrl);
  }
  showSection(section:Section) {
    this.activeSection = section.title;
    this.sectionChanged.emit(this.activeSection);
  }
  addSection(newSection: HTMLInputElement)
  {
    let title: string = newSection.value;

    if (this.sections.map(s => s.title).find(t => t === title))
    {
      return;
    }

    const section: Section = {title};
    this.sections.unshift(section);
    this.showSection(section);

    this.writeSections().subscribe(res => newSection.value = "");
  }

  writeSections()
  {
    return this.http.post(this.sectionsUrl + '/replace', this.sections);
  }
}
export interface Section {
  _id?: string;
  title: string;
}
