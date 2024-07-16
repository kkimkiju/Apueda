package com.sick.apeuda.repository;

import com.sick.apeuda.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRepository extends JpaRepository<Skill , Long> {
}
