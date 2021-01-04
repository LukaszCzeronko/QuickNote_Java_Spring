import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DisplayNoteComponent} from './display-note/display-note.component';
import {CreateNoteComponent} from './create-note/create-note.component';
import {NoteListComponent} from './note-list/note-list.component';
import {UpdateNoteComponent} from './update-note/update-note.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {UserProfileComponent} from './auth/user-profile/user-profile.component';
import {HomepageComponent} from './homepage/homepage.component';

const routes: Routes = [
  {path:'',redirectTo: 'homepage',pathMatch:'full'},
  {path:'homepage',component:HomepageComponent},
  {path: 'notes', component: NoteListComponent},
  {path: 'add',component: CreateNoteComponent},
  {path: 'update/:id',component: UpdateNoteComponent},
  {path: 'display/:id',component: DisplayNoteComponent},
  {path: 'login',component:LoginComponent},
  {path: 'sign-up',component:SignupComponent},
  {path: 'user-profile/:name',component:UserProfileComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
