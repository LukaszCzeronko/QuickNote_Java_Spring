import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { DisplayNoteComponent } from './display-note/display-note.component';
import { NoteListComponent } from './note-list/note-list.component';
import { FormsModule } from '@angular/forms';
import { UpdateNoteComponent } from './update-note/update-note.component';
import {HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    CreateNoteComponent,
    DisplayNoteComponent,
    NoteListComponent,
    UpdateNoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
