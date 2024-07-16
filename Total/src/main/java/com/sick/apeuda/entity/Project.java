package com.sick.apeuda.entity;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
@Entity
@Table(name = "project")
public class Project {
    @Id
    @Column(name = "project_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long projectId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;


    // 플젝 컨텐츠
    @Lob
    @Column(length = 10000) // 예시로 10000자를 지정
    private String projectContent;
    private String projectName;
    private String projectTitle;
    private String imgPath;
    // 최대 모집인원
    private String recruitNum;
    // 참가 멤버 닉네임


    // 플젝 구인 마감시간
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime projectTime;
    // 등록일자
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime regDate;

    // 작성자 정보
    private String nickName;
    private String profileImage;
    // 요구 스킬
    @ManyToMany
    @JoinTable(
            name = "project_skills",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private List<Skill> skills;
    // 댓글 목록
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "project_id")
    private List<Reply> reply;

    @OneToOne
    @JoinColumn(name = "room_id")
    private ChatRoom chatRoom;

    //프로젝트 나가기 해도 게시물은 존재하기 위해서
    private Boolean existStatus;


}
