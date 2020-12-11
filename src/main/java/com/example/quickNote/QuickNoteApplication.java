package com.example.quickNote;

import com.example.quickNote.config.SwaggerConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableAsync
@SpringBootApplication
@Import(SwaggerConfig.class)
public class QuickNoteApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuickNoteApplication.class, args);
	}

}
