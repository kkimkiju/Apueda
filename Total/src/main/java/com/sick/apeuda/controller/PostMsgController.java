package com.sick.apeuda.controller;

import com.sick.apeuda.dto.PostMsgDto;
import com.sick.apeuda.entity.Member;
import com.sick.apeuda.entity.PostMsg;
import com.sick.apeuda.entity.ReadMessage;
import com.sick.apeuda.service.PostMsgService;
import com.sick.apeuda.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<Boolean> delMsg(@RequestParam Long id){
        boolean isTrue = postMsgService.delMsg(id);
        return ResponseEntity.ok(isTrue);
    }

//    @PostMapping("/updateReadStatus")
//    public ResponseEntity<Void> updateReadStatus(@RequestBody Map<String, Object> requestData) {
//        Long postMsgId = Long.parseLong(requestData.get("postMsgId").toString());
//        boolean readStatus = Boolean.parseBoolean(requestData.get("readStatus").toString());
//
//        // postMsgId와 readStatus를 사용하여 로직을 처리합니다.
//        postMsgService.updateReadStatus(postMsgId, readStatus);
//
//        return ResponseEntity.ok().build();
//    }
}
