package com.sick.apeuda.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class BoardReqDto {
    private Long boardId;
    private String title;
    private String content;
    private String img;
    private String nickName;
    private String profileImg;
    private LocalDateTime regDate;
    private String email;
}
