package com.sick.apeuda.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReplyDto {
    private Long replyId;
    private String content;
    private LocalDateTime regDate;
    private String nickName;
    private String profileImg;
    private Long boardId;
    private Long projectId;
    private String memberId;
}
