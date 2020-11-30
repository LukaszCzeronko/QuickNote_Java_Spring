package com.example.quickNote.controller;

import com.example.quickNote.model.Note;
import com.example.quickNote.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class NoteController {

    @Autowired
    NoteRepository noteRepository;

    @GetMapping("/notes")
    public List<Note> getAllNotes(){
        return noteRepository.findAll();
    }
    @PostMapping("/notes")
    public Note createNote(@RequestBody Note note){
        return noteRepository.save(note);
    }

    @DeleteMapping("/notes/{id}")
    void deleteEmployee(@PathVariable Long id){
        noteRepository.deleteById(id);
    }

}
