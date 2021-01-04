import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { DisplayNoteComponent } from './display-note/display-note.component';
import { NoteListComponent } from './note-list/note-list.component';
import { FormsModule } from '@angular/forms';
import { UpdateNoteComponent } from './update-note/update-note.component';
import {HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import {LoginComponent} from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {TokenInterceptor} from './token-interceptor';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {EditorModule} from '@tinymce/tinymce-angular';
import { HomepageComponent } from './homepage/homepage.component';



@NgModule({
  declarations: [
    AppComponent,
    CreateNoteComponent,
    DisplayNoteComponent,
    NoteListComponent,
    UpdateNoteComponent,
    LoginComponent,
    SignupComponent,
    UserProfileComponent,
    HeaderComponent,
    HomepageComponent,
 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    FontAwesomeModule,
    NgbModule,
    EditorModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
