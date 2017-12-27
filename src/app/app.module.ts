import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NotesComponent } from './notes.component';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import 'rxjs/add/operator/toPromise';
import { HttpClientModule } from '@angular/common/http';
import { SectionsComponent } from './sections/sections.component';
import {SectionFilterPipe} from './sections/section.filter.pipe';
import { RouterModule, Routes } from '@angular/router';
import { NotesEditorComponent } from './notes-editor/notes-editor.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewSectionComponent } from './view-section/view-section.component';
import {NotesServerService} from './notes-server.service';
import {CanDeactivateNote} from './can-deactivate-note.service';
import { UserFormComponent } from './user-form/user-form.component';

const appRoutes: Routes = [
  { path: 'register', component: UserFormComponent },
  { path: 'viewSection/:name', component: ViewSectionComponent },
  { path: ':name', component: NotesEditorComponent, canDeactivate: [CanDeactivateNote]  },
  { path: '', component: NotesEditorComponent, canDeactivate: [CanDeactivateNote]  },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    SectionsComponent,
    SectionFilterPipe,
    NotesEditorComponent,
    PageNotFoundComponent,
    ViewSectionComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [NotesServerService, CanDeactivateNote],
  bootstrap: [AppComponent]
})
export class AppModule { }
