package com.sick.apeuda.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.*;


@Getter
@Setter
@Entity
@Table
@Component
public class ReadMessage {

    @Id
    @Column(name = "msg_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn
    private Member member1;

    @ManyToOne
    @JoinColumn
    private Member member2;

    private boolean readCheck;

}
