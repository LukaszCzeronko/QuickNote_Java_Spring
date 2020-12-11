package com.example.quickNote.security;

import com.example.quickNote.exception.SpringNoteException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.security.*;
import java.security.cert.CertificateException;

import static io.jsonwebtoken.Jwts.parser;

@Service
public class JwtProvider {

    private KeyStore keyStore;

    @PostConstruct
    public void init(){
        try{
            keyStore=KeyStore.getInstance("JKS");
            InputStream resourceAsStream= getClass().getResourceAsStream("/note.jks");
            keyStore.load(resourceAsStream,"secret".toCharArray());
        }catch(KeyStoreException | CertificateException | NoSuchAlgorithmException | IOException e) {
            throw new SpringNoteException("Error with keystore");

        }
    }
    public String generateToken(Authentication authentication){
        org.springframework.security.core.userdetails.User principal=(User) authentication.getPrincipal();
        return Jwts.builder().setSubject(principal.getUsername()).signWith(getPrivateKey()).compact();
    }
    private PrivateKey getPrivateKey(){
        try{
            return (PrivateKey) keyStore.getKey("springblog","secret".toCharArray());
        }catch (KeyStoreException|NoSuchAlgorithmException| UnrecoverableKeyException e){
            throw new SpringNoteException("Error with public key from keystore");
        }
    }
    public boolean validateToken(String jwt){
        parser().setSigningKey(getPublicKey()).parseClaimsJws(jwt);
        return true;
    }
    private PublicKey getPublicKey(){
        try{
            return keyStore.getCertificate("springblog").getPublicKey();

        }catch(KeyStoreException e){
            throw new SpringNoteException("Problem with public key");
        }
    }
    public String getUsernameFromJwt(String token){
        Claims claims=parser().setSigningKey(getPublicKey()).parseClaimsJws(token).getBody();
        return claims.getSubject();
    }
}
