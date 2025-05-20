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
            log.info("Attempting to send otp: {}", otp);

            MimeMessage message = mailSender.createMimeMessage();
            // Set the second parameter to true to indicate multipart mode
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            // Set email basics
            helper.setSubject(subject);
            helper.setFrom("sujaysahoo234@gmail.com");
            helper.setTo(userEmail);

            // Create a simple HTML message if the formatted one is causing issues
            String safeHtmlContent = """
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>OTP Verification</title>
                </head>
                <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
                        <div style="background-color: #2b2e4a; padding: 20px; text-align: center; color: #ffffff;">
                            <h1>HikariHub</h1>
                        </div>
                        <div style="padding: 20px;">
                            <h2>Your One-Time Password (OTP)</h2>
                            <p>Hello,</p>
                            <p>We're excited to welcome you back! Please use the OTP below to complete your login:</p>
                            <p style="font-size: 24px; font-weight: bold; text-align: center; margin: 20px 0; padding: 10px; background-color: #f7f7f7; border-radius: 5px;">
                                """ + otp + """
                            </p>
                            <p style="font-size: 14px; color: #777;">
                                This OTP is valid for 10 minutes. Do not share it with anyone for security reasons.
                            </p>
                            <p>Thanks,<br><strong>Team HikariHub</strong></p>
                        </div>
                        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #888;">
                            If you didn't request this, please ignore this email.
                        </div>
                    </div>
                </body>
                </html>
                """;

            // Use the safe HTML content instead of the formatted string
            helper.setText(safeHtmlContent, true);  // true enables HTML content

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
            log.error("Failed to send email to: {}. Error: {}", userEmail, e.getMessage());
            log.error("Exception stack trace:", e);
            throw new MessagingException("Error sending email: " + e.getMessage(), e);
        }
    }
}