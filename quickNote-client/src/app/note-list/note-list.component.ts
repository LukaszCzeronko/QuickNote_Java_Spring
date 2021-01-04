import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {NoteService} from "../note.service";
import {Note} from "../model/note";
import {DisplayNoteComponent} from "../display-note/display-note.component";
import {Router} from "@angular/router";
import {AuthorizationService} from '../auth/authorization.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  notes: Observable<Note[]>;
  constructor(private noteSerive:NoteService, private router:Router,private authService:AuthorizationService) { }
  isLoggedIn: boolean;
  username: string;
  ngOnInit(): void {
    this.refreshData();
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
    
  }
  refreshData(){
    this.notes=this.noteSerive.getNoteList();
  }
deleteNote(id:number){
  this.noteSerive.deleteNote(id).subscribe(
    data=>{
      console.log(data);
      this.refreshData();
    },error=>console.log(error));
}
displayNote(id:number){
  this.router.navigate(['display',id]);
}
modifyNote(id:number){
  this.router.navigate(['update',id])
}
}
