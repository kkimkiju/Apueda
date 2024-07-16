//ChatMsgDto.java
package com.sick.apeuda.dto;


import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@Setter
public class ChatMsgDto {


    // 메시지  타입 : 입장, 퇴장, 대화
    // 메시지 타입에 따라서 동작하는 구조가 달라진다.
    // 입장과 퇴장 ENTER 과 LEAVE 의 경우 입장/퇴장 이벤트 처리가 실행되고,
    // TALK 는 말 그대로 내용이 해당 채팅방을 SUB 하고 있는 모든 클라이언트에게 전달된다.
    public enum MessageType{
        ENTER, TALK, LEAVE;
    }
    private MessageType type; // 메시지 타입
    private String senderId;
    private String senderNickname;
    private String profileImgPath;
    private String receiver; // 수신자 (일대일 채팅을 위한 필드)
    private String content;
    private String roomId;
    private String LocalDateTime;
}

