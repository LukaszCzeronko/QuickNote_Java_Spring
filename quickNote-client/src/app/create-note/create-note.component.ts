import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import {NoteService} from '../note.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  confirmed=false;
  note: Note=new Note();
  constructor(private noteSerive:NoteService, private router:Router) { }

  ngOnInit(): void {
  }

  newNote():void{
    this.confirmed=false;
    this.note=new Note();
  }
  save(){
    this.noteSerive.createNote(this.note).subscribe(
      data=>{
        console.log(data)
        this.note= new Note();
        this.gotoList();
      },error=> console.log(error));
  }
  onSubmit(){
    this.confirmed=true;
    this.save();
  }
  gotoList(){
    this.router.navigate(['/notes']);
  }
}
