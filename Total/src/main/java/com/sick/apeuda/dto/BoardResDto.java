package com.sick.apeuda.dto;

import com.sick.apeuda.entity.Member;
import com.sick.apeuda.entity.Skill;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class BoardResDto {
    private Long boardId;
    private String title;
    private String content;
    private String img;
    private String nickName;
    private String profileImg;
    private LocalDateTime regDate;
    private List<ReplyDto> replies;
    private Member memberId;
}
