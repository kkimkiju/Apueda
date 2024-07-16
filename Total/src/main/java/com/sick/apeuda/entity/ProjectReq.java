package com.sick.apeuda.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@ToString
@Entity
@Table(name = "ProjectReq")
public class ProjectReq {
    @Id
    @Column(name = "project_req_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long projectReqId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

}
