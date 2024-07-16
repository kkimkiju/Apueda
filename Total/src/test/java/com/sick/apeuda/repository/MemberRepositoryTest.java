//package com.sick.apeuda.repository;
//
//
//import com.sick.apeuda.entity.Member;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.TestPropertySource;
//
//import java.util.Optional;
//
//@SpringBootTest
//@TestPropertySource(locations = "classpath:application-test.properties")
//public class MemberRepositoryTest {
//    @Autowired
//    MemberRepository memberRepository;
//
//    @Test
//    @DisplayName("회원가입")
//    public void testUserSignup() {
//        Member member = Member.builder()
//                .email("test4@example.com")
//                .name("Test User4")
//                .password("password3")
//                .identityNumber("1234561")
//                .build();
//
//    }
//
//    @Test
//    @DisplayName("로그인")
//    public void testLogin() {
//        Optional<Member> login = memberRepository.findByEmailAndPassword("test1@example.com", "password2");
//        if(login.isPresent()) {
//            System.out.println("로그인 성공");
//        } else {
//            System.out.println("로그인 실패");
//        }
//    }
//
//
//
//
//
//
//}
