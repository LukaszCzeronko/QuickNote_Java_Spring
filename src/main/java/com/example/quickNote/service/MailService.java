package com.example.quickNote.service;

import com.example.quickNote.exception.SpringNoteException;
import com.example.quickNote.model.NotificationEmail;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class MailService {

    private final JavaMailSender javaMailSender;
    private final MailContentBuilder mailContentBuilder;

    @Async
    void sendMail(NotificationEmail notificationEmail){
        MimeMessagePreparator messagePreparator=mimeMessage -> {
            MimeMessageHelper messageHelper= new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom("quickNote@email.com");
            messageHelper.setTo(notificationEmail.getRecipient());
            messageHelper.setSubject(notificationEmail.getSubject());
            messageHelper.setText(mailContentBuilder.build(notificationEmail.getBody()));
        };
        try{
            javaMailSender.send(messagePreparator);
            log.info("Activate email sent");
        }catch (MailException e){
            throw new SpringNoteException("Failed to send email to "+notificationEmail.getRecipient());
        }

    }
}
