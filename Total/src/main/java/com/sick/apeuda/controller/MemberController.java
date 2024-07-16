//MemberController.java
package com.sick.apeuda.controller;


import com.sick.apeuda.dto.MemberDto;
import com.sick.apeuda.dto.MemberReqDto;
import com.sick.apeuda.dto.MemberResDto;
import com.sick.apeuda.dto.TokenDto;
import com.sick.apeuda.entity.Member;
import com.sick.apeuda.repository.MemberRepository;
import com.sick.apeuda.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;



    // 회원정보 가져오기
    @GetMapping("/memberinfo2")
    public ResponseEntity<MemberDto> memberInfo2 (){
        MemberDto memberDto = memberService.getMemberInfo(SecurityContextHolder.getContext().getAuthentication().getName());
        return ResponseEntity.ok(memberDto);
    }

    @PostMapping("/membermodify")
    public ResponseEntity<MemberResDto> memberModify(@RequestBody MemberReqDto memberReqDto) {
        return ResponseEntity.ok(memberService.modifyMember(memberReqDto));
    }


    // 회원 삭제
    @GetMapping("/delmember")
    public ResponseEntity<Boolean> memberDelete() {
        boolean isTrue = memberService.deleteMember(SecurityContextHolder.getContext().getAuthentication().getName());
        return ResponseEntity.ok(isTrue);
    }

    @GetMapping("/list")
    public ResponseEntity<List<MemberDto>> memberList(){
        List<MemberDto> list = memberService.getMemberList();
        return ResponseEntity.ok(list);
    }

}
