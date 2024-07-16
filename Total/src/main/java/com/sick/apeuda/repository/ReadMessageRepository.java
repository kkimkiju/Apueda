package com.sick.apeuda.repository;

import com.sick.apeuda.entity.Member;
import com.sick.apeuda.entity.ReadMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReadMessageRepository extends JpaRepository<ReadMessage, Long> {
    @Query("SELECT rm FROM ReadMessage rm WHERE (rm.member1 = :member1 AND rm.member2 = :member2) OR (rm.member1 = :member2 AND rm.member2 = :member1)")
    List<ReadMessage> findAllByMembers(@Param("member1") Member member1, @Param("member2") Member member2);

    List<ReadMessage> findByMember1(Member member1);

    Optional<ReadMessage> findByMember1AndMember2(Member member1, Member member2);
}
