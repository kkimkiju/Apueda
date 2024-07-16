package com.sick.apeuda.repository;

import com.sick.apeuda.entity.Board;
import com.sick.apeuda.entity.Member;
import com.sick.apeuda.entity.Reply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    @Query("SELECT b FROM Board b WHERE b.member.email = :memberId")
    List<Board> findPostsByMemberId(@Param("memberId") String memberId);

    List<Board> findByMember(Member member);




}
