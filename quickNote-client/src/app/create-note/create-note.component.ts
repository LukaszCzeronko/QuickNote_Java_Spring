import { Component, OnInit } from '@angular/core';
import { Note } from '../model/note';
import {NoteService} from '../note.service';
import {Router} from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  confirmed=false;
  createNoteForm: FormGroup;
  note:Note;

  priorities=[{name:'LOW'},{name:'MEDIUM'},{name:'HIGH'}];
  selectedOption:string;
  constructor(private noteSerive:NoteService, private router:Router) { 
    this.note={
      noteText:'',
      id:0,
      state:'ACTIVE',
      priority:''
      }

  }

  ngOnInit(): void {
    this.createNoteForm=new FormGroup({
      priority: new FormControl('',Validators.required),
      text: new FormControl(this.priorities,Validators.required)
    })


    this.selectedOption='LOW';
    this.onNoteSelected(this.selectedOption);
    // this.note.state='ACTIVE';
  }

  newNote():void{
    this.confirmed=false;
    this.note=new Note();
  }
  save(){

    this.note.priority=this.createNoteForm.get('priority').value;
    this.note.noteText=this.createNoteForm.get('text').value;
    this.noteSerive.createNote(this.note).subscribe(
      data=>{
        console.log(data)
        console.log(this.selectedOption)
       // this.note= new Note();
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
  onNoteSelected(val:any){
    console.log(val)
    this.note.priority=val;
  }
}
