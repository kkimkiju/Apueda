package com.sick.apeuda.service;


import com.sick.apeuda.dto.ReplyDto;
import com.sick.apeuda.entity.Board;
import com.sick.apeuda.entity.Project;
import com.sick.apeuda.entity.Reply;
import com.sick.apeuda.entity.Member;
import com.sick.apeuda.repository.BoardRepository;
import com.sick.apeuda.repository.MemberRepository;
import com.sick.apeuda.repository.ProjectRepository;
import com.sick.apeuda.repository.ReplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.sick.apeuda.security.SecurityUtil.getCurrentMemberId;
@Service
@RequiredArgsConstructor
public class ReplyService {
    private final ReplyRepository replyRepository;
    private final MemberRepository memberRepository;
    private final ProjectRepository projectRepository;
    private final BoardRepository boardRepository;


    /**
     * 댓글 등록
     * @param replyDto
     * @return
     */
    public boolean saveReply(ReplyDto replyDto) {
        try {
            Reply reply = new Reply();
            String memberId = getCurrentMemberId();
            System.out.println("토큰으로 받은 멤버아이디 체크 : " +memberId );
            Member member = memberRepository.findById(memberId).orElseThrow(
                    () -> new RuntimeException("Member does not exist")
            );
            reply.setReplyId(replyDto.getReplyId());
            reply.setContent(replyDto.getContent());
            reply.setRegDate(LocalDateTime.now());
            if (replyDto.getBoardId() != null) {
                Board board = boardRepository.findById(replyDto.getBoardId()).orElseThrow(
                        () -> new RuntimeException("Board does not exist")
                );
                reply.setBoard(board);
            } else if (replyDto.getProjectId() != null) {
                Project project = projectRepository.findById(replyDto.getProjectId()).orElseThrow(
                        () -> new RuntimeException("Project does not exist")
                );
                reply.setProject(project);
            } else {
                throw new RuntimeException("Either boardId or projectId must be provided");
            }
            reply.setMember(member);
            replyRepository.save(reply);
            return true;
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 댓글 삭제
     * @param id 댓글 고유 ID
     * @return 삭제 성공 여부
     */
    public boolean deleteReply(Long id) {
        try{
            replyRepository.deleteById(id);
            return true;
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 댓글 수정
     * @param id 댓글 고유 ID
     * @param replyDto 수정할 객체
     * @return replyDto 수정한 객체
     */
    public boolean modifyReply(Long id, ReplyDto replyDto) {
        try {
            Reply reply = replyRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("Board does not exist")
            );
            reply.setReplyId(replyDto.getReplyId());
            reply.setContent(replyDto.getContent());
            reply.setRegDate(LocalDateTime.now());
            // 프론트랑 연결시 null안되면 0으로 시도해보기
            if (replyDto.getBoardId() != null) {
                Board board = boardRepository.findById(replyDto.getBoardId()).orElseThrow(
                        () -> new RuntimeException("Board does not exist")
                );
                reply.setBoard(board);
            } else if (replyDto.getProjectId() != null) {
                Project project = projectRepository.findById(replyDto.getProjectId()).orElseThrow(
                        () -> new RuntimeException("Project does not exist")
                );
                reply.setProject(project);
            } else {
                throw new RuntimeException("Either boardId or projectId must be provided");
            }
            replyRepository.save(reply);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }



    /**
     * 자유 게시판 댓글 페이징
     * @param boardId 자유 게시판 아이디
     * @param page 조회할 페이지
     * @param size 한 페이지에 나오는 댓글 수
     * @return ReplyDto List 객체
     */
    public Map<String, Object> getBoardReplyList(Long boardId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<Reply> replies = replyRepository.findAllByBoardId(boardId, pageable).getContent();
        List<ReplyDto> replyDtos = new ArrayList<>();
        for(Reply reply : replies) {
            replyDtos.add(saveReplyList(reply));
        }
        int cnt =replyRepository.findAllByBoardId(boardId, pageable).getTotalPages();
        Map<String, Object> result = new HashMap<>();
        result.put("replies", replyDtos);
        result.put("totalPages", cnt);
        System.out.println("댓글 길이 : "+replyDtos.size());
        return result;
    }

    /**
     * 플젝 게시판 댓글 페이징
     * @param projectId 플젝 게시판 아이디
     * @param page 조회할 페이지
     * @param size 한 페이지에 나오는 댓글 수
     * @return ReplyDto List 객체
     */
    public Map<String, Object> getProjectReplyList(Long projectId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        List<Reply> replies = replyRepository.findAllByProjectId(projectId, pageable).getContent();
        List<ReplyDto> replyDtos = new ArrayList<>();
        for(Reply reply : replies) {
            replyDtos.add(saveReplyList(reply));

        }
        int cnt =replyRepository.findAllByProjectId(projectId, pageable).getTotalPages();
        Map<String, Object> result = new HashMap<>();
        result.put("replies", replyDtos);
        result.put("totalPages", cnt);
        System.out.println("댓글 길이 : "+replyDtos.size());
        return result;

    }
    // 페이지 수 조회
    public int getRepliesCount(Long projectId,Pageable pageable) {
        return replyRepository.findAllByProjectId(projectId, pageable).getTotalPages();
    }
    // 댓글 목록과 총 페이지 수를 함께 반환하는 메서드
//    public Map<String, Object> getProjectReplyListAndCount(Long projectId, int page, int size) {
//        Pageable pageable = PageRequest.of(page, size);
//
//        // Page<Reply> 객체를 사용하여 댓글 목록과 페이징 정보를 함께 가져옴
//        Page<Reply> replyPage = replyRepository.findAllByProjectId(projectId, pageable);
//
//        List<ReplyDto> replyDtos = new ArrayList<>();
//        for (Reply reply : replyPage.getContent()) {
//            replyDtos.add(saveReplyList(reply));
//        }
//
//        Map<String, Object> result = new HashMap<>();
//        result.put("replies", replyDtos);
//        result.put("totalPages", replyPage.getTotalPages());
//
//        return result;
//    }
    /**
     * 댓글 엔티티를 DTO로 변환
     * @param reply Reply 엔티티 객체
     * @return ReplyDto -> 게시판 번호에 맞는 댓글 리스트
     */
    public ReplyDto saveReplyList(Reply reply) {
        ReplyDto replyDto = new ReplyDto();
        replyDto.setReplyId(reply.getReplyId());
        replyDto.setContent(reply.getContent());
        replyDto.setRegDate(reply.getRegDate());
        replyDto.setNickName(reply.getMember().getNickname());
        replyDto.setProfileImg(reply.getMember().getProfileImgPath());
        // 프로젝트 아이디 설정
        if (reply.getProject() != null) {
            replyDto.setProjectId(reply.getProject().getProjectId());
        }
        // 게시판 아이디 설정
        if (reply.getBoard() != null) {
            replyDto.setBoardId(reply.getBoard().getBoardId());
        }

        return replyDto;
    }

}
