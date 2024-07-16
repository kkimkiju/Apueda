// ChatRoom.java
package com.sick.apeuda.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@ToString(exclude = "chatMsgs") // 순환참조 방지
@Entity
@Table(name = "ChatRoom")
public class ChatRoom {
    @Id
    @Column(name = "room_id")
    private String roomId = UUID.randomUUID().toString(); // UUID를 사용한 무작위 방아이디 생성




    @Column(unique = true, nullable = false)
    private String roomName; // 방 이름이 꼭 유니크 속성이어야 할까?
    private Integer currentCount;
    private Integer maxCount;
    private Boolean postType; // 게시글 종류 구분을 위한 속성 1이면 프로젝트 0이면 오픈채팅방
    //private String roomPassword;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private String localDateTime ;

    @PrePersist // 날짜가 비어있는경우 현재 시간 자동 입력
    protected void onCreate() {
        if (this.localDateTime == null) {
            this.localDateTime = LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME);
        }
    }
    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ChatMsg> chatMsgs;


}
