//package com.sick.apeuda.repository;
//
//import com.sick.apeuda.entity.*;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.TestPropertySource;
//
//import javax.persistence.EntityNotFoundException;
//import javax.transaction.Transactional;
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//@SpringBootTest
//@TestPropertySource(locations = "classpath:application-test.properties")
//public class BoardRepositoryTest {
//    @Autowired
//    private BoardRepository boardRepository;
//    @Autowired
//    private ReplyRepository replyRepository;
//    @Autowired
//    private MemberRepository memberRepository;
//    @Autowired
//    private ProjectRepository projectRepository;
//    @Autowired
//    private SkillRepository skillRepository;
//    // 회원 엔티티 생성
//    public Member createUserInfo() {
//        Member member = new Member();
//        member.setEmail("testId@gmail.com");
//        member.setPassword("1234");
//        member.setName("박성진");
//        member.setEmail("jks2024@gmail.com");
//        member.setMyInfo("술쟁이 입니다.");
//        member.setNickname("개똥벌레");
//        member.setIdentityNumber("941231");
//        member.setProfileImgPath("");
//        //member.setRegDate(LocalDateTime.now());
//        return member;
//    }
//    // 게시판 엔티티 생성
//    public Board createBoardContentEntity(){
//        Board board = new Board();
//        board.setBoardId(1L);
//        board.setContent("나는 개똥벌레 친구가 없네");
//        board.setTitle("성진이의 일기");
//        board.setImgPath("./image");
//        board.setRegDate(LocalDateTime.now());
//        return board;
//    }
//
//    @Test
//    @DisplayName("게시판 리스트 생성")
//    public void createBoardList() {
//        for(int i = 1; i <= 10; i++) {
//            Board board = new Board();
//            board.setBoardId(1L);
//            board.setContent(i + "번 나는 개똥벌레 친구가 없네");
//            board.setTitle(i + "번 성진이의 일기");
//            board.setImgPath("./image");
//            board.setRegDate(LocalDateTime.now());
//            boardRepository.save(board);
//        }
//    }
//    @Test
//    @DisplayName("자유 게시판 리스트 불러오기")
//    @Transactional
//    public void findAllBoardTest(){
//        this.createBoardList();
//        List<Board> boardList = boardRepository.findAll();
//        for (Board e : boardList) System.out.println(e.toString());
//    }
//    @Test
//    @DisplayName("플젝 게시판 리스트 불러오기")
//    @Transactional // LazyInitializationException 오류 예방
//    public void findAllProjectBoardTest(){
//        this.createProjectBoardContent();
//        List<Project> projectList = projectRepository.findAll();
//        for (Project e : projectList) System.out.println(e.toString());
//    }
//
//    //플젝 게시판 상세 정보 생성
//    public Project createProjectBoardContent(){
//        Project project = new Project();
//        Member member = createUserInfo();
//
//        project.setProjectName("플젝 이름");
//        project.setProjectPassword("1234");
//        project.setJob("매니저");
//        project.setProjectTime(LocalDateTime.now());
//        //project.setMember(member);
//
//        List<Skill> skills = skillRepository.findAll();
//        System.out.println(skills +  " 체크");
////        project.setSkills(skills);
//        projectRepository.save(project);
//
//        List<Project> projectList = projectRepository.findAll();
//        System.out.println("게시글 전체 개수: " + projectList.size());
//
//        // 추가로 Skill 목록도 확인 가능
//        List<Skill> savedSkills = skillRepository.findAll();
//        System.out.println("등록된 스킬 개수: " + savedSkills.size());
//
//        return project;
//
//    }
//
//    @Test
//    @DisplayName("플젝 게시판 상세 정보 조회")
//    public void findDetailProjectBoard(){
//        Project project = createProjectBoardContent();
//        //System.out.println(project.getProjectId() + " 여기 ");
//        Optional<Project> saveProject = projectRepository.findById(project.getProjectId());
//        if (saveProject.isPresent()  ){
//            Project foundProject = saveProject.get();
//            System.out.println("클릭한 플젝 : " + foundProject.getProjectId() + " , " + foundProject.getSkills());
//        }else {
//            throw new EntityNotFoundException("해당 게시글이 없습니다.");
//        }
//    }
//    // 스킬  생성
//    public List<Skill> createSkillContentEntity(){
//        List<Skill> skill = new ArrayList<>();
//        for(int i =0; i < 4; i++){
//            Skill s = new Skill();
//            s.setSkillId((long)i);
//            s.setSkillName("java" + i);
//            skill.add(s);
//        }
//        return skill;
//    }
//    // 댓글 생성
//    public List<Reply> createReplyList() {
//        Member member = createUserInfo();
//        Board board = createBoardContentEntity();
//        List<Reply> reply = new ArrayList<>();
//        for(int i = 1; i <= 5; i++) {
//            Reply r = new Reply();
//            r.setContent(1 + "번째 댓글");
//            r.setRegDate(LocalDateTime.now());
//
//            reply.add(r);
//        }
//        return reply;
//    }
//
//
//
//}
