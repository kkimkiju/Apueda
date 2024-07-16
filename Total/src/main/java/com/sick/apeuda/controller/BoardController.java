package com.sick.apeuda.controller;


import com.sick.apeuda.dto.BoardReqDto;
import com.sick.apeuda.dto.BoardResDto;
import com.sick.apeuda.entity.Skill;
import com.sick.apeuda.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;
    // 게시글 목록 조회
    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> boardList(@RequestParam(defaultValue = "0") int page,
                                                         @RequestParam(defaultValue = "10") int size) {

        log.info("boardList실행");
        Map<String, Object>rs = boardService.getBoardList(page,size);
        return ResponseEntity.ok(rs);
    }
    @GetMapping("/myboard")
    public ResponseEntity<List<BoardReqDto>> myProjectList() {
        List<BoardReqDto> friends = boardService.getMyBoard();
        return ResponseEntity.ok(friends);
    }

    // 자유 게시글 상세 조회
    @GetMapping("/detail/{id}")
    public ResponseEntity<BoardResDto> boardDetail(@PathVariable Long id) {
        log.warn("board id : " + id);
        BoardResDto boardResDto = boardService.getBoardDetail(id);
        return ResponseEntity.ok(boardResDto);
    }
    // 자유 게시글 등록
    @PostMapping("/insert")
    public ResponseEntity<Boolean> boardInsert(@RequestBody BoardReqDto boardReqDto){
        boolean isTrue = boardService.saveBoard(boardReqDto);
        return ResponseEntity.ok(isTrue);
    }
    // 자유 게시글 삭제
    @GetMapping("/delete")
    public ResponseEntity<Boolean> delBoard(@RequestParam Long id){
        System.out.println("삭제 하는 게시판 넘버 : " + id);
        boolean isTrue = boardService.delboard(id);
        return ResponseEntity.ok(isTrue);
    }
    // 자유 게시글 수정
    @PutMapping("/modify/{id}")
    public ResponseEntity<Boolean> boardModify(@PathVariable Long id, @RequestBody BoardReqDto boardReqDto) {
        boolean isTrue = boardService.modifyBoard(id, boardReqDto);
        return ResponseEntity.ok(isTrue);
    }
    // 게시글 목록 페이징
//    @GetMapping("/page")
//    public ResponseEntity<List<BoardReqDto>> boardPageList(@RequestParam(defaultValue = "0") int page,
//                                                            @RequestParam(defaultValue = "5") int size) {
//        List<BoardReqDto> list = boardService.getBoardPageList(page, size);
//        return ResponseEntity.ok(list);
//    }
}
