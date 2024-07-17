package com.sick.apeuda.dto;

import com.sick.apeuda.entity.Member;
import com.sick.apeuda.entity.Project;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ApplyResDto {
    private Long applyId;
    private Member applicant;
    private Long projectId;
    private Boolean applyStatus;
    private Member managerId; // 프로젝트 생성자 이름
    private String projectName;



}
