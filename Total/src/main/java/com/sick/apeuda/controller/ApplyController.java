package com.sick.apeuda.controller;

import com.sick.apeuda.dto.ApplyReqDto;
import com.sick.apeuda.dto.ApplyResDto;


import com.sick.apeuda.dto.FriendDto;
import com.sick.apeuda.entity.Member;
import com.sick.apeuda.service.ApplyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/apply")
public class ApplyController {
    private final ApplyService applyService;
    // 전체 조회기능 (신청한 사람 재 신청 막기위해 생성 )
    @GetMapping("/all-list/{projectId}/{email}")
    public  ResponseEntity<Boolean> allApplyList(@PathVariable Long projectId,@PathVariable String email){
        boolean isTrue = applyService.getAllApplyList(projectId,email);
        return ResponseEntity.ok(isTrue);
    }
    // 요청 조회 기능 select
    @GetMapping("/list")
    public ResponseEntity<List<ApplyResDto>> applyList(){
        String manager = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = new Member();
        member.setEmail(manager);
        List<ApplyResDto> list = applyService.getApplyList(member);
        return ResponseEntity.ok(list);
    }
    // 요청기능
    @PostMapping("/insert")
    public ResponseEntity<Boolean> insertApply(@RequestBody ApplyReqDto applyReqDto){
        boolean isTrue = applyService.saveApply(applyReqDto);
        return ResponseEntity.ok(isTrue);
    }

    @PostMapping("/accept")
    public ResponseEntity<Boolean> acceptProjectRequest(@RequestBody ApplyReqDto applyReqDto) {

        boolean istrue = applyService.acceptRequest(applyReqDto);
        return ResponseEntity.ok(istrue);
    }


    @PostMapping("/reject")
    public ResponseEntity<Boolean> rejectProjectRequest(@RequestBody Long id){
        boolean isTrue = applyService.rejectProjectRequest(id);
        return ResponseEntity.ok(isTrue);
    }

    // 거절기능
//    @PostMapping("/refuse")
//    public ResponseEntity<Boolean> refuseApply(@RequestBody ApplyReqDto applyReqDto){
//        boolean isTrue = applyService.saveApply(applyReqDto);
//        return ResponseEntity.ok(isTrue);
//    }
    // 수락 거절 기능
//    @PostMapping("/decision/{}/{result}")
//    public ResponseEntity<Boolean> acceptApply(@PathVariable boolean result){
//        boolean isTrue = applyService.decisionApply(result);
//        return ResponseEntity.ok(isTrue);
//    }
}
