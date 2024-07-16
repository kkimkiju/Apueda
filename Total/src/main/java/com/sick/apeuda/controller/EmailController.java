package com.sick.apeuda.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import java.util.Random;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@RestController
@RequestMapping("/email")
public class EmailController {
    @Autowired
    private JavaMailSender mailSender;

    @GetMapping("/mail")
    public ResponseEntity<String> sendMail(@RequestParam String email) {
        // 임의의 인증 번호 생성
        Random random = new Random();
        int min = 111111;
        int max = 999999;
        String tempPw = String.valueOf(random.nextInt(max-min) + min);


        // 이메일에 들어갈 내용
        String htmlContent = "<div style=\"margin: auto; padding: 50px; text-align: center; width: 700px; height: 200px; background-color: #ff5353; border-radius: 20px;\">"
                + "<p style=\"font-size: 30px; color: white; font-weight: 600;\">아프다(아무하고나 프로젝트 하지 않는다)에 오신것을 환영합니다!</p>"
                + "<p style=\"font-size: 16px; color: white;\">요청하신 인증번호를 보내드립니다.</p>"
                + "<div style=\"font-size: 20px; color: #ccc;\">" + tempPw + "</div>"
                + "</div>";

        // 이메일로 전송
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
        try {
            helper.setFrom("apueda@naver.com");
            helper.setTo(email);
            helper.setSubject("아프다에 오신 것을 환영 합니다!");
            helper.setText(htmlContent, true);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        mailSender.send(mimeMessage);
        return new ResponseEntity<>(tempPw, HttpStatus.OK);
    }
}
