package com.sick.apeuda.controller;

import com.sick.apeuda.dto.BoardReqDto;
import com.sick.apeuda.dto.ReplyDto;
import com.sick.apeuda.service.ReplyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/reply")
public class ReplyController {
    private final ReplyService replyService;

    /**
     * 댓글 등록
     * @param replyDto 댓글 Dto 객체
     * @return boolean 저장 성공 여부
     */
    @PostMapping("/insert")
    public ResponseEntity<Boolean> insertReply(@RequestBody ReplyDto replyDto){
        System.out.println("Reply Insert Controller execute");
        boolean isTrue = replyService.saveReply(replyDto);
        return ResponseEntity.ok(isTrue);
    }

    /**
     * @param id 삭제하는 댓글 고유 id
     * @return boolean 삭제 성공 여부
     */
    @GetMapping("/delete")
    public ResponseEntity<Boolean> deleteReply(@RequestParam Long id){
        System.out.println("삭제 하는 게시판 넘버 : " + id);
        boolean isTrue = replyService.deleteReply(id);
        return ResponseEntity.ok(isTrue);
    }

    // 댓글 수정
    @PutMapping("/modify/{id}")
    public ResponseEntity<Boolean> replyModify(@PathVariable Long id, @RequestBody ReplyDto replyDto) {
        boolean isTrue = replyService.modifyReply(id, replyDto);
        return ResponseEntity.ok(isTrue);
    }
    
    // 자유 게시판 댓글 페이징
    @GetMapping("/board-reply/{boardId}/page")
    public ResponseEntity<Map<String, Object>> boardReplyPageList(@PathVariable Long boardId,
                                                               @RequestParam(defaultValue = "0") int page,
                                                               @RequestParam(defaultValue = "5") int size) {

        Map<String, Object> result = replyService.getBoardReplyList(boardId, page, size);
        return ResponseEntity.ok(result);
    }

    // 플젝 게시판 댓글 페이징
    @GetMapping("/project-reply/{projectId}/page")
    public ResponseEntity<Map<String, Object>> projectReplyPageList(@PathVariable Long projectId,
                                                               @RequestParam(defaultValue = "0") int page,
                                                               @RequestParam(defaultValue = "5") int size) {
//        List<ReplyDto> list = replyService.getProjectReplyList(projectId, page, size);
        Map<String, Object> result = replyService.getProjectReplyList(projectId, page, size);

        return ResponseEntity.ok(result);
    }
    // 페이지 수 조회
//    @GetMapping("/count")
//    public ResponseEntity<Integer> listBoards(@RequestParam(defaultValue = "0") int page,
//                                              @RequestParam(defaultValue = "10") int size) {
//        PageRequest pageRequest = PageRequest.of(page, size);
//        Integer pageCnt = replyService.getRepliesCount(pageRequest);
//        System.out.println("페이지 수 : " + pageCnt);
//        return ResponseEntity.ok(pageCnt);
//    }
}
// 자유 게시판 댓글 페이징 -> 한 컨트롤러에서 자유,플젝을 분기시키고 싶었는데 방법이 안떠오름
//    @GetMapping({"/page/{boardId}", "/page/{projectId}"})
//    public ResponseEntity<List<ReplyDto>> replyPageList(@PathVariable Long boardId,
//                                                        @PathVariable Long projectId,
//                                                        @RequestParam(defaultValue = "1") int page,
//                                                       @RequestParam(defaultValue = "5") int size) {
//        List<ReplyDto> list = replyService.getReplyList(boardId, projectId, page, size);
//        return ResponseEntity.ok(list);
//    }
    // 플젝 게시판 댓글 페이징
//}
