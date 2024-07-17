package com.sick.apeuda.controller;

import com.sick.apeuda.dto.PostMsgDto;
import com.sick.apeuda.entity.Member;
import com.sick.apeuda.entity.PostMsg;
import com.sick.apeuda.service.PostMsgService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/messages")
@RequiredArgsConstructor
public class PostMsgController {

    private final PostMsgService postMsgService;

    @PostMapping("/write")
    public ResponseEntity<PostMsg> writeMessage(@RequestBody PostMsgDto postMsgDto) {
        PostMsg postMsg = postMsgService.msgWrite(postMsgDto);
        return ResponseEntity.ok(postMsg);
    }

    @GetMapping("/received")
    public List<PostMsg> getReceivedMessages(@RequestParam("sendEmail") String sendEmail) {
        String memberEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        Member member = new Member();
        member.setEmail(memberEmail); //받는 이메일

        Member fromMember = new Member();
        fromMember.setEmail(sendEmail); //보내는 이메일

        return postMsgService.receivedMessage(member, fromMember);
    }

    @GetMapping("/delete")
    public ResponseEntity<Boolean> delMsg(@RequestParam Long id) {
        boolean isTrue = postMsgService.delMsg(id);
        return ResponseEntity.ok(isTrue);
    }
}
