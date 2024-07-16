package com.sick.apeuda.repository;

import com.sick.apeuda.entity.UnlikeMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UnlikeMemberRepository extends JpaRepository<UnlikeMember, Long> {
}