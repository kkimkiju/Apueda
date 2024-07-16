package com.sick.apeuda.dto;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PostMsgDto {
    private String senderMemberName;
    private String receiverMemberName;
    private String content;
    private LocalDateTime receiveTime;
    private Boolean readStatus;
    
}
