import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {NoteService} from "../note.service";
import {Note} from "../note";
import {DisplayNoteComponent} from "../display-note/display-note.component";
import {Router} from "@angular/router";


@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
notes: Observable<Note[]>;
  constructor(private noteSerive:NoteService, private router:Router) { }

  ngOnInit(): void {
    this.refreshData();
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
