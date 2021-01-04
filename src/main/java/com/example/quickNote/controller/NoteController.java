package com.example.quickNote.controller;

import com.example.quickNote.exception.NoteNotFoundException;
import com.example.quickNote.model.Note;
import com.example.quickNote.repository.NoteRepository;
import com.example.quickNote.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
@RequestMapping("/api")
public class NoteController {

  @Autowired NoteRepository noteRepository;
  private final AuthService authService;
  @GetMapping("/notes")
  public List<Note> getAllNotes() {


    return noteRepository.findAll();
  }

  @GetMapping("/notes/{id}")
  public Note getNoteByID(@PathVariable Long id) {
    return noteRepository.findById(id).orElseThrow(() -> new NoteNotFoundException(id));
  }

  @PostMapping("/notes")
  public Note createNote(@RequestBody Note note) {
    return noteRepository.save(note);
  }

  @PutMapping("/notes/{id}")
  ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody Note newNote) {
    return noteRepository
        .findById(id)
        .map(
            currentNote -> {
              currentNote.setNoteText(newNote.getNoteText());
              currentNote.setPriority(newNote.getPriority());
              currentNote.setState(newNote.getState());
              noteRepository.save(currentNote);
              return ResponseEntity.ok(currentNote);
            })
        .orElseThrow(() -> new NoteNotFoundException(id));
  }

  @DeleteMapping("/notes/{id}")
  void deleteNote(@PathVariable Long id) {
    noteRepository.deleteById(id);
  }

  @DeleteMapping("/notes")
  void deleteAll() {
    noteRepository.deleteAll();
  }
}
