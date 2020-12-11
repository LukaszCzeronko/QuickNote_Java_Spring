package com.example.quickNote.model;

import lombok.Builder;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "Tables")
public class Note {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private Priority priority;
  private State state;

  private String noteText;

  public Note() {}

  public Note(Priority priority, State state, String noteText) {
    this.priority = priority;
    this.state = state;
    this.noteText = noteText;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public Priority getPriority() {
    return priority;
  }

  public void setPriority(Priority priority) {
    this.priority = priority;
  }

  public State getState() {
    return state;
  }

  public void setState(State state) {
    this.state = state;
  }

  public String getNoteText() {
    return noteText;
  }

  public void setNoteText(String noteText) {
    this.noteText = noteText;
  }

  @Override
  public String toString() {
    return "Note{"
        + "id="
        + id
        + ", priority="
        + priority
        + ", state="
        + state
        + ", noteText='"
        + noteText
        + '\''
        + '}';
  }
  @ManyToOne(fetch = LAZY)
  @JoinColumn(name = "userId",referencedColumnName = "userId")
  private User user;
}
