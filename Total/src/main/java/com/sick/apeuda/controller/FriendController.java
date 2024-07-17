package com.sick.apeuda.controller;


import com.sick.apeuda.dto.FriendDto;
import com.sick.apeuda.dto.ReadMessageDto;
import com.sick.apeuda.entity.Member;
import com.sick.apeuda.entity.ReadMessage;
import com.sick.apeuda.repository.MemberRepository;
import com.sick.apeuda.service.FriendService;
import com.sick.apeuda.service.ReadMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/friends")
public class FriendController {

    @Autowired
    private FriendService friendService;
    @Autowired
    private ReadMessageService readMessageService;

    @Autowired
    private ReadMessage readMessage;

    @Autowired
    private MemberRepository memberRepository;

    /**
     * 친구 요청을 보냅니다.
     * @param memberEmail   친구 요청을 보내는 사용자의 이메일
     * @param toMemberEmail 친구 요청을 받는 사용자의 이메일
     */
    @PostMapping("/request")
    public void sendFriendRequest(@RequestParam String memberEmail, @RequestParam String toMemberEmail) {
        // 이메일을 사용하여 사용자 객체를 가져온다고 가정
        Member member = new Member();
        member.setEmail(memberEmail);

        Member toMember = new Member();
        toMember.setEmail(toMemberEmail);

        friendService.sendFriendRequest(member, toMember);
    }
    /**
     * 대기 중인 친구 요청 목록을 가져옵니다.
     */
    @GetMapping("/findrequest")
    public ResponseEntity<List<FriendDto>> getPendingFriendRequests() {
        // 이메일을 사용하여 사용자 객체를 가져온다고 가정
        String memberEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = new Member();
        member.setEmail(memberEmail);

        List<FriendDto> friends = friendService.getPendingFriendRequests(member);
        return ResponseEntity.ok(friends);
    }



    /**
     * 친구 요청을 수락합니다.
     * @param memberEmail   친구 요청을 받는 사용자의 이메일
     */
    @GetMapping("/accept")
    public ResponseEntity<List<FriendDto>> acceptFriendRequest(@RequestParam String memberEmail) {
        String toMemberEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        Member member = new Member();
        member.setEmail(memberEmail);

        Member toMember = new Member();
        toMember.setEmail(toMemberEmail);

        List<FriendDto> friends = friendService.acceptFriendRequest(member, toMember);
        return ResponseEntity.ok(friends);
    }

    /**
     * 친구 요청을 거절하고 요청을 삭제합니다.
     * @param memberEmail   친구 요청을 받는 사용자의 이메일
     */
    @GetMapping("/reject")
    public ResponseEntity<List<FriendDto>>rejectFriendRequest(@RequestParam String memberEmail) {
        String toMemberEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = new Member();
        member.setEmail(memberEmail);

        Member toMember = new Member();
        toMember.setEmail(toMemberEmail);

        List<FriendDto> friends = friendService.rejectFriendRequest(member, toMember);
        return ResponseEntity.ok(friends);
    }


    @GetMapping("/list")
    public ResponseEntity<List<ReadMessageDto>> getFriends() {

        List<ReadMessageDto> friends = readMessageService.getFriends();
        return ResponseEntity.ok(friends);
    }


    @PostMapping("/updateReadCheck")
    public ResponseEntity<List<ReadMessageDto>> updateReadCheck(@RequestParam String friendEmail) {
        // 현재 인증된 사용자의 이메일을 가져옴
        String memberEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        // 이메일을 사용하여 사용자 객체를 생성
        Member member = new Member();
        member.setEmail(memberEmail);
        Member friend = new Member();
        friend.setEmail(friendEmail);

        readMessageService.updateReadCheck(member, friend);

        // 성공적인 응답 반환
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/delete")
    public ResponseEntity<List<FriendDto>> deleteFriend(@RequestParam String friendEmail) {
        // 현재 인증된 사용자의 이메일을 가져옴
        String memberEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        // 이메일을 사용하여 사용자 객체를 생성
        Member member = new Member();
        member.setEmail(memberEmail);
        Member friend = new Member();
        friend.setEmail(friendEmail);

        // 친구 삭제 서비스 호출
        friendService.deleteFriend(member, friend);

        // 성공적인 응답 반환
        return ResponseEntity.noContent().build();
    }
}
