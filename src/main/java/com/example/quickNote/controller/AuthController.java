package com.example.quickNote.controller;

import com.example.quickNote.dto.AuthenticationResponse;
import com.example.quickNote.dto.LoginRequest;
import com.example.quickNote.dto.RegisterRequest;
import com.example.quickNote.service.AuthService;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody RegisterRequest registerRequest){
        authService.signup(registerRequest);
    System.out.println(registerRequest);
        return  new ResponseEntity(HttpStatus.OK);
    }
    @GetMapping("/accountVerification/{token}")
    public ResponseEntity<String> verifyAccount(@PathVariable String token){
        authService.verifyAccount(token);
        return new ResponseEntity<>("Account Activated",HttpStatus.OK);
    }
    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody LoginRequest loginRequest){
   // System.out.println(loginRequest);
    //System.out.println(authService.login(loginRequest));
        return authService.login(loginRequest);
    }
}
