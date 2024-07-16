package com.sick.apeuda.controller;

import com.sick.apeuda.dto.ProjectReqDto;
import com.sick.apeuda.dto.SkillDto;
import com.sick.apeuda.service.SkillService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/skill")
@RequiredArgsConstructor
public class SkillController {
    private final SkillService skillService;
    @GetMapping("/list")
    public ResponseEntity<List<SkillDto>> skillList() {
        log.info("projectBoardList실행");
        List<SkillDto> list = skillService.getSkillList();
        return ResponseEntity.ok(list);
    }
}
