package com.sick.apeuda.service;

import com.sick.apeuda.dto.ProjectReqDto;
import com.sick.apeuda.dto.SkillDto;
import com.sick.apeuda.entity.Project;
import com.sick.apeuda.entity.Skill;
import com.sick.apeuda.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillService {
    private final SkillRepository skillRepository;
    public List<SkillDto> getSkillList() {
        List<Skill> skills = skillRepository.findAll();
        List<SkillDto> skillDtoList = new ArrayList<>();
        for(Skill skill : skills) {
            skillDtoList.add(convertSkillEntityToDto(skill));
        }
        return skillDtoList;
    }
    /**
     * 플젝 게시글 엔티티를 DTO로 변환(플젝 게시글 입력)
     * @param skill skill 엔티티 타입
     * @return skillDto -> 게시판 전체 리스트 반환
     */
    private SkillDto convertSkillEntityToDto(Skill skill) {
        SkillDto skillDto = new SkillDto();
        skillDto.setSkillId(skill.getSkillId());
        skillDto.setSkillName(skill.getSkillName());
        return skillDto;
    }
}
