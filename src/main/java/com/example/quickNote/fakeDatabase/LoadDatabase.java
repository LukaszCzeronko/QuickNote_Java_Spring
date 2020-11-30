package com.example.quickNote.fakeDatabase;

import com.example.quickNote.model.Note;
import com.example.quickNote.model.Priority;
import com.example.quickNote.model.State;
import com.example.quickNote.repository.NoteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LoadDatabase {
    private static final Logger log= LoggerFactory.getLogger(LoadDatabase.class);

  @Bean
  CommandLineRunner initDatabase(NoteRepository repository) {
    return args -> {
      log.info("Preloading" + repository.save(new Note(Priority.HIGH, State.ACTIVE, "wawawa")));
      log.info("Preloading" + repository.save(new Note(Priority.LOW, State.INACTIVE, "abcde")));
    };
    }
}
