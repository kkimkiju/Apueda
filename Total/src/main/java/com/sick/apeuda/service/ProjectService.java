package com.sick.apeuda.service;


import com.sick.apeuda.dto.ProjectReqDto;
import com.sick.apeuda.dto.ProjectResDto;
import com.sick.apeuda.entity.ChatManage;
import com.sick.apeuda.entity.Member;
import com.sick.apeuda.entity.Project;
import com.sick.apeuda.repository.*;
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
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final MemberRepository memberRepository;
    private final ChatManageRepository chatManageRepository;
    private final ChatRoomRepository chatRoomRepository;
    /**
     * 프로젝트 게시판 전체 조회 메소드
     * @return projectDtos Project 엔티티타입의 List 반환
     */
    public Map<String, Object>  getProjectList(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<Project> projects = projectRepository.findAllOrderByRegDateDesc(pageable).getContent();
        List<ProjectReqDto> projectDtos = new ArrayList<>();
        List<String> list = new ArrayList<>();
        for(Project project : projects) {
            System.out.println("project.getChatRoom()"+ project.getChatRoom());
            List<ChatManage> chatmanages = chatManageRepository.findByChatRoom(project.getChatRoom());
            System.out.println("chatmanages" +chatmanages);
            for(ChatManage chatmanage : chatmanages){
                list.add(chatmanage.getMember().getProfileImgPath());
                System.out.println("길이"+list.size());
            }
            projectDtos.add(convertProjectListEntityToDto(project,list));
        }
        int cnt =projectRepository.findAll(pageable).getTotalPages();
        Map<String, Object> result = new HashMap<>();
        result.put("projects", projectDtos);
        result.put("totalPages", cnt);
        return result;
    } public List<ProjectReqDto>  getProjectAllList() {
        List<Project> projects = projectRepository.findAll();
        List<ProjectReqDto> projectDtos = new ArrayList<>();
        for(Project project : projects) {

            projectDtos.add(convertProjectAllListEntityToDto(project));
        }


        return projectDtos;
    }
    /**
     * 플젝 게시글 조회 page 추가
     * @param project Project 엔티티 타입
     * @return projectDto -> 게시판 전체 리스트 반환
     */
    private ProjectReqDto convertProjectListEntityToDto(Project project, List<String> list) {
        ProjectReqDto projectReqDto = new ProjectReqDto();
        projectReqDto.setProjectId(project.getProjectId());
        projectReqDto.setProjectName(project.getProjectName());
        projectReqDto.setProjectTitle(project.getProjectTitle());
        projectReqDto.setProjectContent(project.getProjectContent());
        projectReqDto.setProjectTime(project.getProjectTime());
        projectReqDto.setRegDate(project.getRegDate());
        projectReqDto.setRecruitNum(project.getRecruitNum());
        projectReqDto.setEmail(project.getMember().getEmail());
        projectReqDto.setNickName(project.getMember().getNickname());
        projectReqDto.setProfileImg(project.getMember().getProfileImgPath());
        projectReqDto.setSkillName(project.getSkills());
        projectReqDto.setChatRoom(project.getChatRoom());
        projectReqDto.setChatMemProfile(list);
        projectReqDto.setImgPath(project.getImgPath());
        projectReqDto.setExistStatus(project.getExistStatus());
        System.out.println("project.getImgPath()" + project.getImgPath());
        return projectReqDto;
    }private ProjectReqDto convertProjectAllListEntityToDto(Project project) {
        ProjectReqDto projectReqDto = new ProjectReqDto();
        projectReqDto.setProjectId(project.getProjectId());
        projectReqDto.setProjectName(project.getProjectName());
        projectReqDto.setProjectTitle(project.getProjectTitle());
        projectReqDto.setProjectContent(project.getProjectContent());
        projectReqDto.setProjectTime(project.getProjectTime());
        projectReqDto.setRegDate(project.getRegDate());
        projectReqDto.setRecruitNum(project.getRecruitNum());
        projectReqDto.setEmail(project.getMember().getEmail());
        projectReqDto.setNickName(project.getMember().getNickname());
        projectReqDto.setProfileImg(project.getMember().getProfileImgPath());
        projectReqDto.setSkillName(project.getSkills());
        projectReqDto.setChatRoom(project.getChatRoom());
        projectReqDto.setImgPath(project.getImgPath());
        projectReqDto.setExistStatus(project.getExistStatus());
        System.out.println("project.getImgPath()" + project.getImgPath());
        return projectReqDto;
    }
    /**
     * 플젝 게시글 엔티티를 DTO로 변환(플젝 게시글 입력)
     * @param project Project 엔티티 타입
     * @return projectDto -> 게시판 전체 리스트 반환
     */
    private ProjectReqDto convertProjectEntityToDto(Project project) {
        ProjectReqDto projectReqDto = new ProjectReqDto();
        projectReqDto.setProjectId(project.getProjectId());
        projectReqDto.setProjectName(project.getProjectName());
        projectReqDto.setProjectTitle(project.getProjectTitle());
        projectReqDto.setProjectContent(project.getProjectContent());
        projectReqDto.setProjectTime(project.getProjectTime());
        projectReqDto.setRegDate(project.getRegDate());
        projectReqDto.setRecruitNum(project.getRecruitNum());
        projectReqDto.setEmail(project.getMember().getEmail());
        projectReqDto.setNickName(project.getMember().getNickname());
        projectReqDto.setProfileImg(project.getMember().getProfileImgPath());
        projectReqDto.setSkillName(project.getSkills());
        projectReqDto.setChatRoom(project.getChatRoom());
        projectReqDto.setExistStatus(project.getExistStatus());
        return projectReqDto;
    }
    /**
     * 플젝 글등록
     * @param projectReqDto
     * @return true 등록 성공 실패 반환
     */
    public boolean saveProject(ProjectReqDto projectReqDto) {
        try{
            Project project = new Project();

            String memberId = getCurrentMemberId();
            // 토큰 발급 받기전까지 Id 직접입력 토큰 발급시 memberId 넣으면됨
            System.out.println("토큰으로 받은 멤버아이디 체크 : " +memberId );
            Member member = memberRepository.findById(memberId).orElseThrow(
                    () -> new RuntimeException("Member does not exist")
            );
            System.out.println("projectReqDto.getChatRoom() : " + projectReqDto.getChatRoom());
            project.setProjectId(projectReqDto.getProjectId());
            //project.setJob(projectReqDto.getJob());
            project.setProjectName(projectReqDto.getProjectName());
            project.setProjectTitle(projectReqDto.getProjectTitle());
            project.setProjectContent(projectReqDto.getProjectContent());
            project.setImgPath(projectReqDto.getImgPath());
            System.out.println("getImgPath 체크 : " +projectReqDto.getImgPath());
            project.setProjectTime(projectReqDto.getProjectTime());
            //project.setRecruitNum(projectReqDto.getRecruitNum());
            project.setRegDate(LocalDateTime.now());
            project.setSkills(projectReqDto.getSkillName());
            project.setRecruitNum(projectReqDto.getRecruitNum());
            project.setMember(member);
            project.setNickName(member.getNickname());
            project.setProfileImage(member.getProfileImgPath());
            project.setChatRoom(projectReqDto.getChatRoom());
            project.setExistStatus(true);
            projectRepository.save(project);
            return true;
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    public List<ProjectReqDto> getMyProject() {
        String memberEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<Member> memberOptional = memberRepository.findById(memberEmail);
        List<Project> projects = projectRepository.findByMemberOrderByRegDateDesc(memberOptional.get());
        List<ProjectReqDto> projectDtos = new ArrayList<>();
        for(Project project : projects) {
            projectDtos.add(convertProjectEntityToDto(project));
        }
        return projectDtos;
    }



    /**
     * 플젝 상세 조회
     * @param id 게시판 고유번호
     * @return param으로 받은 id에 해당하는 BoardDto객체 값 반환
     */
    public ProjectResDto getProjectDetail(Long id) {
        Project project = projectRepository.findById(id).orElseThrow(
                () -> new RuntimeException("해당 게시글이 존재하지 않습니다.")
        );
        return convertProjectDetailEntityToDto(project);
    }
    // 게시글 수정
    // 게시글 수정
    public boolean modifyProject(Long id, ProjectReqDto projectReqDto) {
        try {
            Project project = projectRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("Board does not exist")
            );
            String memberId = getCurrentMemberId();
            // 토큰 발급 받기전까지 Id 직접입력 토큰 발급시 memberId 넣으면됨
            System.out.println("토큰으로 받은 멤버아이디 체크 : " +memberId );
            Member member = memberRepository.findById(memberId).orElseThrow(
                    () -> new RuntimeException("Member does not exist")
            );
            project.setMember(member);
            project.setProjectName(projectReqDto.getProjectName());
            project.setProjectTitle(projectReqDto.getProjectTitle());
            project.setProjectContent(projectReqDto.getProjectContent());
            project.setRecruitNum(projectReqDto.getRecruitNum());
            project.setImgPath(projectReqDto.getImgPath());
            System.out.println("getImgPath 체크 : " +projectReqDto.getImgPath());
            // 등록일자는 전달된 값 유지
            project.setRegDate(projectReqDto.getRegDate());

            // 프로젝트 시간도 전달된 값으로 설정
            project.setProjectTime(projectReqDto.getProjectTime());

            // 기존 스킬을 새로운 스킬로 설정
            project.setSkills(projectReqDto.getSkillName());

            projectRepository.save(project);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

//    public boolean modifyProject(Long id, ProjectReqDto projectReqDto) {
//        try {
//            Project project = projectRepository.findById(id).orElseThrow(
//                    () -> new RuntimeException("Board does not exist")
//            );
//            project.setProjectId(projectReqDto.getProjectId());
//            project.setJob(projectReqDto.getJob());
//            project.setProjectName(projectReqDto.getProjectName());
//            project.setProjectTitle(projectReqDto.getProjectTitle());
//            project.setProjectContent(projectReqDto.getProjectContent());
//            project.setProjectPassword(projectReqDto.getProjectPassword());
//            project.setRecruitNum(projectReqDto.getRecruitNum());
//            project.setImgPath(project.getImgPath());
//            project.setRegDate(LocalDateTime.now());
//            project.setProjectTime(projectReqDto.getProjectTime());
//            project.setSkills(projectReqDto.getSkillName());
//            projectRepository.save(project);
//            return true;
//        } catch (Exception e) {
//            e.printStackTrace();
//            return false;
//        }
//    }

    /**
     * 플젝 게시판 삭제
     * @param id
     * @return
     */
    public boolean delProject(Long id) {
        try{
            projectRepository.deleteById(id);
            return true;
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
    /**
     * 플젝 상세내용 엔티티를 DTO로 변환(플젝 상세 내용, 스킬 조회)
     * @param project Project 엔티티 타입
     * @return projectResDto -> 플젝 게시판 상세 정보 반환
     */
    private ProjectResDto convertProjectDetailEntityToDto(Project project) {
        ProjectResDto projectResDto = new ProjectResDto();
        projectResDto.setMemberId(project.getMember());
        projectResDto.setProjectId(project.getProjectId());
        projectResDto.setProjectName(project.getProjectName());
        projectResDto.setProjectTitle(project.getProjectTitle());
        //projectDto.setProjectPassword(project.getProjectPassword());
        projectResDto.setProjectContent(project.getProjectContent());
        projectResDto.setRecruitNum(project.getRecruitNum());
        projectResDto.setImgPath(project.getImgPath());
        //projectResDto.setRecruitMember(project.getRecruitMember());
        projectResDto.setProjectContent(project.getProjectContent());
        projectResDto.setProjectTime(project.getProjectTime());
        projectResDto.setRegDate(LocalDateTime.now());
        projectResDto.setSkillName(project.getSkills());
        projectResDto.setExistStatus(project.getExistStatus());
        // 플젝 작성자 정보 설정
        projectResDto.setNickName(project.getMember().getNickname());
        projectResDto.setProfileImg(project.getMember().getProfileImgPath());

        // 댓글 리스트 조회 및 설정
//        List<Reply> replies = replyRepository.findByProjectId(project.getProjectId());
//        List<ReplyDto> replyDtos = convertEntityListToDtoList(replies);
//        projectResDto.setReplies(replyDtos);
        return projectResDto;
    }
//    /**
//     * 댓글 엔티티를 DTO로 변환
//     * @param reply Reply 엔티티 객체
//     * @return ReplyDto -> 게시판 번호에 맞는 댓글 리스트
//     */
//    private ReplyDto saveReplyList(Reply reply) {
//        ReplyDto replyDto = new ReplyDto();
//        replyDto.setContent(reply.getContent());
//        replyDto.setProfile_img(reply.getMember().getProfileImgPath());
//        replyDto.setNickName(reply.getMember().getNickname());
//        replyDto.setRegDate(reply.getRegDate());
//        return replyDto;
//    }
//    private List<ReplyDto> convertEntityListToDtoList(List<Reply> replies) {
//        return replies.stream()
//                .map(this::saveReplyList)
//                .collect(Collectors.toList());
//    }

}
