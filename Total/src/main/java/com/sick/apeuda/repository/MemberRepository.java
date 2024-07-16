package com.sick.apeuda.repository;

import com.sick.apeuda.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {
    Optional<Member> findByEmail(String email);
    Optional<Member> findByEmailAndPassword(String email, String password);
    Optional<Member> findByNameAndIdentityNumber(String name, String identityNumber);
    boolean existsByEmail(String email);
}
