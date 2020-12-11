import { Component, OnInit } from '@angular/core';
import {Note} from '../note'
import{ActivatedRoute,Router} from '@angular/router';
import{NoteService} from '../note.service';
@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css']
})
export class UpdateNoteComponent implements OnInit {
id:number;
note:Note;
selectedOption:string;
priorities=[{name:'LOW'},{name:'MEDIUM'},{name:'HIGH'}];
  constructor(private route: ActivatedRoute,private router: Router,private noteService: NoteService) { }

  ngOnInit(): void {
    this.note=new Note();
    this.id=this.route.snapshot.params['id'];
    this.noteService.getNote(this.id).subscribe(
      data=>{
        console.log(data)
        this.note=data;
        this.selectedOption=this.note.priority;
      },error=>console.log(error)
    );
  }

  updateNote(){
    this.noteService.updateNote(this.id,this.note).subscribe(data=>{
      console.log(data)
      this.note=new Note();
      this.gotoList();
    },error=>console.log(error));
  }
  onSubmit(){
    this.updateNote();
  }
  gotoList(){
    this.router.navigate(['/notes']);
  }
  onNoteSelected(val:any){
    console.log(val)
    this.note.priority=val;
  }
}
