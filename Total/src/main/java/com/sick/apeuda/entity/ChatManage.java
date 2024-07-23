//ChatManage.java
package com.sick.apeuda.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class ChatManage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne // 채팅방 하나당 하나의 채팅방 관리를 가지므로
    @JoinColumn(name = "room_id")
    private ChatRoom chatRoom;

    @ManyToOne // 왜 Many to One이 되는가
    @JoinColumn(name= "member_id")
    private Member member;

    private boolean host; // 강퇴권한 여부

    private Long projectId;

}
