package com.sick.apeuda.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Entity
@Table(name = "PostMsg")
public class PostMsg {
    @Id
    @Column(name = "post_msg_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long postMsgId;

    @Lob
    private String content;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime receiveTime;

    @ManyToOne
    @JoinColumn(name = "send_id")
    private Member sendMember;

    @ManyToOne
    @JoinColumn(name = "receive_id")
    private Member receiveMember;

    private Boolean readStatus;

    public void messageSave(Member sendMember, Member receiveMember, String content) {
        this.sendMember = sendMember;
        this.receiveMember = receiveMember;
        this.content = content;
    }

}
