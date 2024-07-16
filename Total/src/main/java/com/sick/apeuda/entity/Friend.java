package com.sick.apeuda.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@ToString
@Entity
@Table(name = "Friend")
public class Friend {
    @Id
    @Column(name = "friend_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long friendId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "to_member_id")
    private Member toMember;

    private Boolean checkFriend;
    public Friend() {
        this.checkFriend = false; // 기본적으로 false로 설정
    }
    public void setCheckFriend(Boolean checkFriend) {
        this.checkFriend = checkFriend;
    }
}
