package com.sick.apeuda.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
@Entity
@Table(name = "board")
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long boardId;

    private String title;

    @Lob
    @Column(length = 10000) // 예시로 10000자를 지정
    private String content;
    private String imgPath;
    private String profileImage;
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "board_id")
    private List<Reply> reply;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime regDate;


//    @ManyToOne
//    @JoinColumn(name = "project_id")
//    private Project project;

//    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
//    private List<Skill> skill;



}
