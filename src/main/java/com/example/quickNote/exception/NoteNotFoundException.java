package com.example.quickNote.exception;

public class NoteNotFoundException extends RuntimeException{
    public NoteNotFoundException(Long id) {
        super("Could not find Note: "+ id);
    }
}
