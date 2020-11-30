package com.example.quickNote.model;

public enum State {
    ACTIVE(true),INACTIVE(false);
    boolean state;
    State(boolean state){
        this.state=state;
    }

    public void setState(boolean state) {
        this.state = state;
    }

}
