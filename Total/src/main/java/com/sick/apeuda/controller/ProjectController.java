package com.sick.apeuda.controller;

import com.sick.apeuda.dto.ProjectReqDto;
import com.sick.apeuda.dto.ProjectResDto;
import com.sick.apeuda.service.ChatService;
import com.sick.apeuda.service.ProjectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/project")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;
    private final ChatService chatService;

    // 플젝 게시판 전체 조회
    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> projectList(@RequestParam(defaultValue = "0") int page,
                                                                @RequestParam(defaultValue = "7") int size) {

        Map<String, Object> rs = projectService.getProjectList(page, size);

        return ResponseEntity.ok(rs);
    }
    @GetMapping("/list-all")
    public ResponseEntity<List<ProjectReqDto>> projectAllList() {

        List<ProjectReqDto> list = projectService.getProjectAllList();

        return ResponseEntity.ok(list);
    }

    @GetMapping("/mypj")
    public ResponseEntity<List<ProjectReqDto>> myProjectList() {
        List<ProjectReqDto> friends = projectService.getMyProject();
        return ResponseEntity.ok(friends);
    }


    // 플젝 게시글 상세 조회
    @GetMapping("/detail/{id}")
    public ResponseEntity<ProjectResDto> projectDetail(@PathVariable Long id) {
        log.warn("project id : " + id);
        ProjectResDto projectResDto = projectService.getProjectDetail(id);

        return ResponseEntity.ok(projectResDto);
    }

    // 플젝 게시글 등록
    @PostMapping("/insert")
    public ResponseEntity<Boolean> projectBoardInsert(@RequestBody ProjectReqDto projectReqDto) {
        boolean isTrue = projectService.saveProject(projectReqDto);
        return ResponseEntity.ok(isTrue);
    }

    // 플젝 게시판 삭제
    @GetMapping("/delete")
    public ResponseEntity<Boolean> delProject(@RequestParam Long id) {
        System.out.println("삭제 하는 게시판 넘버 : " + id);
        boolean isTrue = projectService.delProject(id);
        return ResponseEntity.ok(isTrue);
    }

    // 플젝 게시글 수정
    @PutMapping("/modify/{id}")
    public ResponseEntity<Boolean> projectModify(@PathVariable Long id, @RequestBody ProjectReqDto projectReqDto) {
        boolean isTrue = projectService.modifyProject(id, projectReqDto);
        return ResponseEntity.ok(isTrue);
    }

    @GetMapping("/kick")
    public ResponseEntity<Boolean> kickProjectMember(@RequestParam String roomId,
                                                     @RequestParam String memberId,
                                                     @RequestParam Long projectId) {


        boolean isTrue = chatService.kickProjectMember(roomId, memberId, projectId);
        return ResponseEntity.ok(isTrue);
    }

    @GetMapping("/exit")
    public ResponseEntity<Boolean> exitProject(@RequestParam String roomId, @RequestParam String memberId) {
        boolean isTrue = chatService.exitProject(roomId, memberId);
        return ResponseEntity.ok(isTrue);
    }
}
