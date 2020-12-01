import { Component, OnInit } from '@angular/core';
import{Note} from '../note';
import {NoteService} from '../note.service';
import {NoteListComponent} from '../note-list/note-list.component';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.css']
})
export class DisplayNoteComponent implements OnInit {
id:number
note: Note;
  constructor(private route: ActivatedRoute,private router: Router,private noteService: NoteService) { }

  ngOnInit(): void {
    this.note=new Note();
    this.id=this.route.snapshot.params['id'];

    this.noteService.getNote(this.id).subscribe(data=>{
      console.log(data)
      this.note=data;
    },error=>console.log(error));
  }
list(){
  this.router.navigate(['notes']);
}


}
