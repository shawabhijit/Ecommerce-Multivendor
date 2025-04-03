package com.ecom.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j  // For logging
public class EmailService {


    private final JavaMailSender mailSender ;

    public void sendVerificationOtpEmail(String userEmail, String otp, String subject, String text) throws MessagingException {
        try {
            log.info("Attempting to send email to: {}", userEmail);

            MimeMessage message = mailSender.createMimeMessage();
            log.info(message.getSubject());
            MimeMessageHelper helper = new MimeMessageHelper(message,"utf-8");
            helper.setSubject(subject);
            helper.setFrom("sujaysahoo234@gmail.com");
            helper.setText(text, true);  // true enables HTML content
            helper.setTo(userEmail);

            mailSender.send(message);
            log.info("Email sent successfully to: {}", userEmail);
        }
        catch (Exception e) {
            log.error("Failed to send email to: {}", userEmail, e);
            throw new MailSendException("Error sending email", e);
        }
    }
}