package com.sick.apeuda.service;


import com.sick.apeuda.dto.BoardReqDto;
import com.sick.apeuda.dto.BoardResDto;
import com.sick.apeuda.dto.ReplyDto;
import com.sick.apeuda.entity.*;
import com.sick.apeuda.repository.BoardRepository;
import com.sick.apeuda.repository.ReplyRepository;
import com.sick.apeuda.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

import static com.sick.apeuda.security.SecurityUtil.getCurrentMemberId;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final ReplyRepository replyRepository;
    private final MemberRepository memberRepository;

    /**
     * 게시판 전체 조회 메소드
     * @return boardDtos Board 엔티티타입의 List 반환
     */
    public Map<String, Object> getBoardList(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<Board> boards = boardRepository.findAll(pageable).getContent();
        List<BoardReqDto> boardDtos = new ArrayList<>();
        for(Board board : boards) {
            boardDtos.add(convertEntityToDto(board));
        }
        int cnt =boardRepository.findAll(pageable).getTotalPages();
        Map<String, Object> result = new HashMap<>();
        result.put("boards", boardDtos);
        result.put("totalPages", cnt);
        return result;
    }

    public List<BoardReqDto> getMyBoard() {
        String memberEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<Member> memberOptional = memberRepository.findById(memberEmail);
        List<Board> boards = boardRepository.findByMember(memberOptional.get());
        List<BoardReqDto> projectDtos = new ArrayList<>();
        for(Board board : boards) {
            projectDtos.add(convertEntityToDto(board));
        }
        return projectDtos;
    }

    /**
     * 게시글 상세 조회
     * @param id 게시판 고유번호
     * @return param으로 받은 id에 해당하는 BoardDto객체 값 반환
     */
    public BoardResDto getBoardDetail(Long id) {
        Board board = boardRepository.findById(id).orElseThrow(
                () -> new RuntimeException("해당 게시글이 존재하지 않습니다.")
        );

        return convertEntityToDetailDto(board);
    }

    /**
     * @param id 게시판 고유 ID
     * @return 삭제 성공 여부
     */
    public boolean delboard(Long id) {
        try{
            boardRepository.deleteById(id);
            return true;
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
    // 게시글등록
    public boolean saveBoard(BoardReqDto boardReqDto) {
        try {
            Board board = new Board();

            String memberId = getCurrentMemberId();
            System.out.println("토큰으로 받은 멤버아이디 체크 : " +memberId );
            Member member = memberRepository.findById(memberId).orElseThrow(
                    () -> new RuntimeException("Member does not exist")
            );
            board.setBoardId(boardReqDto.getBoardId());
            board.setTitle(boardReqDto.getTitle());
            board.setContent(boardReqDto.getContent());
            board.setRegDate(LocalDateTime.now());
            board.setProfileImage(member.getProfileImgPath());
            board.setMember(member);

            boardRepository.save(board);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // 게시글 수정
    public boolean modifyBoard(Long id, BoardReqDto boardReqDto) {
        try {
            Board board = boardRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("Board does not exist")
            );
            board.setBoardId(boardReqDto.getBoardId());
            board.setTitle(boardReqDto.getTitle());
            board.setContent(boardReqDto.getContent());
            board.setImgPath(boardReqDto.getImg());
            board.setRegDate(LocalDateTime.now());
            boardRepository.save(board);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // 게시글 페이징 -> 무한 스크롤로 변경 예정
//    public List<BoardReqDto> getBoardPageList(int page, int size) {
//        Pageable pageable = PageRequest.of(page, size);
//        List<Board> boards = boardRepository.findAll(pageable).getContent();
//        List<BoardReqDto> boardDtos = new ArrayList<>();
//        for(Board board : boards) {
//            boardDtos.add(convertEntityToDto(board));
//        }
//        return boardDtos;
//    }

    // *** 이밑으론 DTO변환 메소드들 ***


    /**
     * 게시글 엔티티를 DTO로 변환(자유 게시글 전체 조회)
     * @param board Board 엔티티 타입
     * @return boardDto -> 게시판 전체 리스트 반환
     */
    private BoardReqDto convertEntityToDto(Board board) {
        BoardReqDto boardDto = new BoardReqDto();
        boardDto.setBoardId(board.getBoardId());
        boardDto.setTitle(board.getTitle());
        boardDto.setContent(board.getContent());
        boardDto.setNickName(board.getMember().getNickname());
        boardDto.setProfileImg(board.getMember().getProfileImgPath());
        //boardDto.setReplies(board.getReply().ge);
        boardDto.setRegDate(board.getRegDate());
        boardDto.setEmail(board.getMember().getEmail());
        return boardDto;
    }

    /**
     * 게시글 엔티티를 BoardDto로 변환(자유 게시글 상세페이지, 댓글 포함)
     * @param board Board 엔티티 객체
     * @return BoardDto -> 게시판 상세 내용과 해당 게시판의 댓글 리스트 반환
     */
    private BoardResDto convertEntityToDetailDto(Board board) {
        BoardResDto boardResDto = new BoardResDto();
        // 게시글 기본 정보 설정
        boardResDto.setBoardId(board.getBoardId());
        boardResDto.setTitle(board.getTitle());
        boardResDto.setContent(board.getContent());
        boardResDto.setImg(board.getImgPath());
        boardResDto.setRegDate(board.getRegDate());
        boardResDto.setMemberId(board.getMember());        // 게시글 작성자 정보 설정
        boardResDto.setNickName(board.getMember().getNickname());
        boardResDto.setProfileImg(board.getMember().getProfileImgPath());

        // 댓글 리스트 조회 및 설정
//        List<Reply> replies = replyRepository.findByBoardId(board.getBoardId());
//        List<ReplyDto> replyDtos = convertEntityListToDtoList(replies);
//        boardResDto.setReplies(replyDtos);
        return boardResDto;
    }

    /**
     * 댓글 엔티티를 DTO로 변환
     * @param reply Reply 엔티티 객체
//     * @param boardId 댓글이 들어가있는 게시판 고유 번호
     * @return ReplyDto -> 게시판 번호에 맞는 댓글 리스트
     */
    private ReplyDto convertEntityToReplyDto(Reply reply) {
        ReplyDto replyDto = new ReplyDto();
//        replyDto.setBoardId(boardId);, Long boardId
        replyDto.setContent(reply.getContent());
        replyDto.setProfileImg(reply.getMember().getProfileImgPath());
        replyDto.setNickName(reply.getMember().getNickname());
        replyDto.setRegDate(reply.getRegDate());
        return replyDto;
    }


//
//    // 댓글 생성으로 수정해야됨 + 게시판 번호도 변수로 받아야될듯
//    public ReplyDto saveReplyList(Reply reply) {
//        ReplyDto replyDto = new ReplyDto();
//        replyDto.setReplyId(reply.getReplyId());
//        replyDto.setContent(reply.getContent());
//        replyDto.setRegDate(reply.getRegDate());
//        replyDto.setNickName(reply.getMember().getNickname());
//        return replyDto;
//    }
//    private List<ReplyDto> convertEntityListToDtoList(List<Reply> replies) {
//        return replies.stream()
//                .map(this::saveReplyList)
//                .collect(Collectors.toList());
//    }
    // 댓글 페이징
//    public List<ReplyDto> getReplyList(int page, int size) {
//        Pageable pageable = PageRequest.of(page, size);
//        List<Reply> replies = replyRepository.findAll(pageable).getContent();
//        List<ReplyDto> replyDtos = new ArrayList<>();
//        for(Reply reply : replies) {
//            replyDtos.add(convertEntityToReplyDto(reply));
//        }
//        return replyDtos;
//    }

}
