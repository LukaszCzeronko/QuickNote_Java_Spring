package com.example.quickNote.fakeDatabase;

import com.example.quickNote.model.*;
import com.example.quickNote.repository.NoteRepository;
import com.example.quickNote.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;

@Configuration
public class LoadDatabase {
    private static final Logger log= LoggerFactory.getLogger(LoadDatabase.class);
  private final PasswordEncoder passwordEncoder= new BCryptPasswordEncoder();
  @Bean
  CommandLineRunner initDatabase(NoteRepository repository, UserRepository userRepository) {
    return args -> {
      log.info("Preloading" + repository.save(new Note(Priority.HIGH, State.ACTIVE, "wawawa")));
      log.info("Preloading" + repository.save(new Note(Priority.LOW, State.INACTIVE, "abcde")));
      log.info("Preloaded user"+userRepository.save(new User(1L,"user",passwordEncoder.encode("user"),"aasda@gmail.com",Instant.now(),true)));

    };
    }

}