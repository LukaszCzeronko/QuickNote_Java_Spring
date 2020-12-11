package com.example.quickNote.service;

import com.example.quickNote.dto.AuthenticationResponse;
import com.example.quickNote.dto.LoginRequest;
import com.example.quickNote.dto.RegisterRequest;
import com.example.quickNote.exception.SpringNoteException;
import com.example.quickNote.model.NotificationEmail;
import com.example.quickNote.model.User;
import com.example.quickNote.model.VerificationToken;
import com.example.quickNote.repository.UserRepository;
import com.example.quickNote.repository.VerificationTokenRepository;
import com.example.quickNote.security.JwtProvider;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

import static com.example.quickNote.util.Constants.ACTIVATION_EMAIL;
import static java.time.Instant.now;

@Service
@AllArgsConstructor
@Slf4j
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final VerificationTokenRepository verificationTokenRepository;

    private final MailContentBuilder mailContentBuilder;
    private final MailService mailService;

   private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;

    @Transactional
    public void signup(RegisterRequest registerRequest){
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(encodePassword(registerRequest.getPassword()));
        user.setCreated(now());
        user.setEnabled(false);
        userRepository.save(user);

        String token = generateVerificationToken(user);
        //generate token for email auth

        String message = mailContentBuilder.build("Use URL to activate account  : "
                + ACTIVATION_EMAIL + "/" + token);

    mailService.sendMail(new NotificationEmail("Active your account", user.getEmail(),message));
    }
    private String encodePassword(String password){
        return passwordEncoder.encode(password);
    }
    private String generateVerificationToken(User user){
        String token= UUID.randomUUID().toString();
        VerificationToken verificationToken= new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);
        verificationTokenRepository.save(verificationToken);
        return token;
    }

    public void verifyAccount(String token){
        Optional<VerificationToken> verificationTokenOptional= verificationTokenRepository.findByToken(token);
       // verificationTokenOptional.orElseThrow(()->new SpringNoteException("Invalid token"));
      //  fetchUserAndEnable(verificationTokenOptional.get());
        fetchUserAndEnable(verificationTokenOptional.orElseThrow(()->new SpringNoteException("Invalid Token")));
    }
    @Transactional
    private void fetchUserAndEnable(VerificationToken verificationToken){
        String username=verificationToken.getUser().getUsername();
        User user=userRepository.findByUsername(username).orElseThrow(()-> new SpringNoteException("User Not Found with given id -"));

        user.setEnabled(true);
        userRepository.save(user);
    }
    public AuthenticationResponse login(LoginRequest loginRequest){
        Authentication authenticate=authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        String authenticationToken=jwtProvider.generateToken(authenticate);
        return new AuthenticationResponse(authenticationToken,loginRequest.getUsername());

    }
    @Transactional(readOnly = true)
    public User getCurrentUser() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.
                getContext().getAuthentication().getPrincipal();
        return userRepository.findByUsername(principal.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User name not found - " + principal.getUsername()));
    }
}
