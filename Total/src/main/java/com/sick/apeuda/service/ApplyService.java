package com.sick.apeuda.service;

import com.sick.apeuda.dto.ApplyReqDto;
import com.sick.apeuda.dto.ApplyResDto;
import com.sick.apeuda.dto.FriendDto;
import com.sick.apeuda.entity.*;
import com.sick.apeuda.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.sick.apeuda.security.SecurityUtil.getCurrentMemberId;

@Slf4j
@Service
@RequiredArgsConstructor
public class ApplyService {
    private final ApplyRepository applyRepository;
    private final MemberRepository memberRepository;
    private final ProjectRepository projectRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatManageRepository chatManageRepository;

    // 신청 조회
    public List<ApplyResDto> getApplyList(Member member) {
        List<Apply> applies = applyRepository.findByManagerAndApplyStatus(member, false);
        List<ApplyResDto> applyResDtos = new ArrayList<>();
        for (Apply apply : applies) {
            applyResDtos.add(convertEntityToDto(apply));
        }
        return applyResDtos;
    }
 // 전체 신청 조회
    public boolean getAllApplyList(Long projectId, String email) {
        Project project = new Project();
        project.setProjectId(projectId);
        Apply apply = applyRepository.findByProjectIdAndMemberId(projectId,email);
        if(apply == null){
         return true;
        }else {
         return false;
        }
    }

    private ApplyResDto convertEntityToDto(Apply apply) {
        ApplyResDto applyResDto = new ApplyResDto();
        applyResDto.setApplyId(apply.getApplyId());
        applyResDto.setApplyStatus(apply.getApplyStatus());
        applyResDto.setApplicant(apply.getMember());
        applyResDto.setManagerId(apply.getProject().getMember());
        System.out.println("등록자 아이디 : " + apply.getProject().getMember());
        applyResDto.setProjectId(apply.getProject().getProjectId());
        applyResDto.setProjectName(apply.getProject().getProjectName());
        return applyResDto;
    }

    // 신청 등록
    public boolean saveApply(ApplyReqDto applyReqDto) {
        try {
            Apply apply = new Apply();
            Project project = projectRepository.findById(applyReqDto.getProjectId().getProjectId()).orElseThrow(
                    () -> new RuntimeException("프로젝트 번호가 존재하지않습니다.")
            );

            String memberId = getCurrentMemberId();
            System.out.println("토큰으로 받은 멤버아이디 체크 : " + memberId);
            Member member = memberRepository.findById(memberId).orElseThrow(
                    () -> new RuntimeException("Member does not exist")
            );

            if (member.equals(project.getMember())) { //자신 프로젝트 신청 불가
                throw new IllegalStateException("자신의 프로젝트에는 신청 불가합니다.");
            }

            // 중복 신청 여부 확인
            boolean isDuplicateApply = applyRepository.existsByMemberAndProject(member, project);
            if (isDuplicateApply) {
                throw new IllegalStateException("이미 해당 프로젝트에 신청하셨습니다.");
            }

            apply.setApplyId(applyReqDto.getApplyId());
            apply.setApplyStatus(applyReqDto.getApplyStatus());
            apply.setApplyDate(LocalDateTime.now());
            apply.setMember(member);
            apply.setManager(project.getMember()); // 개설 멤버 아이디
            //apply.setMember(applyReqDto.getApplicant());
            apply.setProject(project);
            apply.setApplyStatus(false);
            applyRepository.save(apply);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Transactional
    public boolean acceptRequest(ApplyReqDto applyReqDto) {

        Optional<Apply> applyOptional = applyRepository.findByApplyId(applyReqDto.getApplyId());
        Apply apply = applyOptional.get();
        String manager = SecurityContextHolder.getContext().getAuthentication().getName();
        log.warn("manager : {}", manager);
        log.warn("apply manager : {}", apply);
        if (manager.equals(apply.getManager().getEmail())) {
            apply.setApplyStatus(true);
            log.warn("Project {} ", apply.getProject());
            Optional<Project> projectOptional = projectRepository.findById(apply.getProject().getProjectId());
            Project project = projectOptional.get();
            log.warn("챗룸{} ", project.getChatRoom());


            Optional<ChatRoom> chatRoomOptional = chatRoomRepository.findByRoomId(project.getChatRoom().getRoomId());
            chatRoomRepository.increaseCurrentCount(project.getChatRoom().getRoomId());
            ChatRoom chatRoom = chatRoomOptional.get();
            ChatManage chatManage = new ChatManage();
            chatManage.setChatRoom(chatRoom);

            Long projectId = project.getProjectId(); //프로젝트 아이디 넣기


            Member member = new Member();
            member.setEmail(apply.getMember().getEmail());
            chatManage.setMember(member);
            chatManage.setHost(false);
            chatManageRepository.save(chatManage);
            applyRepository.save(apply);
            return true;
        } else return false;
    }

    //
    public boolean rejectProjectRequest(Long id) {
        try{
            applyRepository.deleteById(id);
            return true;
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

}
