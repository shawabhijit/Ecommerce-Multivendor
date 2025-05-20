package com.ecom.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendVerificationOtpEmail(String userEmail, String otp, String subject, String text) throws MessagingException {
        try {
            log.info("Attempting to send email to: {}", userEmail);

            // Validate inputs
            if (userEmail == null || userEmail.isEmpty()) {
                throw new IllegalArgumentException("Email address cannot be empty");
            }

            if (otp == null || otp.isEmpty()) {
                throw new IllegalArgumentException("OTP cannot be empty");
            }

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

            // Log detailed information for debugging
            log.debug("Setting email subject: {}", subject);
            helper.setSubject(subject);

            log.debug("Setting email from: sujaysahoo234@gmail.com");
            helper.setFrom("sujaysahoo234@gmail.com");

            log.debug("Setting email content (HTML: true)");
            helper.setText(text, true);  // true enables HTML content

            log.debug("Setting recipient: {}", userEmail);
            helper.setTo(userEmail);

            // Try to send the message
            log.info("Sending email message...");
            mailSender.send(message);
            log.info("Email sent successfully to: {}", userEmail);
        }
        catch (MailException me) {
            log.error("Mail server error when sending to {}: {}", userEmail, me.getMessage());
            log.error("Mail exception details:", me);
            throw new MailSendException("Mail server error: " + me.getMessage(), me);
        }
        catch (Exception e) {
            log.error("Failed to send email to: {}", userEmail, e);
            log.error("Exception stack trace:", e);
            throw new MessagingException("Error sending email: " + e.getMessage(), e);
        }
    }
}