//DatingAppController.java
package com.sick.apeuda.controller;

import com.sick.apeuda.dto.MemberDto;
import com.sick.apeuda.dto.SubscriptionDto;
import com.sick.apeuda.entity.Member;
import com.sick.apeuda.service.DatingAppService;
import com.sick.apeuda.service.FriendService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/datingapp")
public class DatingAppController {

    @Autowired
    private FriendService friendService;
    @Autowired
    private DatingAppService datingAppService;

//    // 친구 신청
//    @PostMapping("/request")
//    public void sendFriendRequest(@RequestParam String memberEmail, @RequestParam String toMemberEmail) {
//        // 이메일을 사용하여 사용자 객체를 가져온다고 가정
//        Member member = new Member();
//        member.setEmail(memberEmail);
//
//        Member toMember = new Member();
//        toMember.setEmail(toMemberEmail);
//
//        friendService.sendFriendRequest(member, toMember);
//    }
    // 싫어하는 유저 저장
    @PostMapping("/unlike")
    public void saveUnlikeMember(@RequestParam String memberEmail, @RequestParam String unlikeMemberEmail) {
        datingAppService.saveUnlikeMember(memberEmail, unlikeMemberEmail);
    }
    // 현재 사용자와 친구가 아닌 유저 리스트 출력
    @PostMapping("/cardlist") // 현재 localStorage에 저장된 이메일을 전달받고 그계정과 친구, 싫어한 친구를 제외한 전체 유저정보 반환
    public ResponseEntity<List<MemberDto>> memberList(@RequestParam String myEmail){
        List<MemberDto> list = datingAppService.getFilteredMemberList(myEmail);
        return ResponseEntity.ok(list);
    }
    // 구독 여부 확인
    @PostMapping("/check-subscribe")
    public ResponseEntity<Boolean> checkSubscriptionStatus(@RequestBody Map<String, String> request) {
        String accessToken = request.get("accessToken");
        log.info("Received AccessToken: " + accessToken); // 프론트로부터 토큰 받는지 확인
        boolean isSubscribed = datingAppService.checkSubscriptionStatus(accessToken);
        log.info("Subscription status: " + isSubscribed); // 구독 여부 로그 추가
        return ResponseEntity.ok(isSubscribed);
    }

}
