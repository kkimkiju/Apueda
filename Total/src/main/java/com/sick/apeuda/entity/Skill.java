package com.sick.apeuda.entity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@ToString
@Entity
@Table(name = "Skill")
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "skill_id")
    private Long skillId;


    @Column(nullable = false)
    private String skillName;

//    @ManyToOne
//    @JoinColumn(name = "project_id")
//    private Project project;
}
