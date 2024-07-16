package com.sick.apeuda.repository;

import com.sick.apeuda.entity.Member;
import com.sick.apeuda.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
//    @Query("SELECT p FROM Project p WHERE p.member.email = :memberId")
//    Optional<Project> findProjectsByMemberId(@Param("memberId") String memberId);


    List<Project> findByMemberOrderByRegDateDesc(Member member);

    Optional<Project> findByProjectId(Long id);

    @Query("SELECT p FROM Project p ORDER BY p.regDate DESC")
    List<Project> findAllOrderByRegDateDesc();

    @Query("SELECT p FROM Project p ORDER BY p.regDate DESC")
    Page<Project> findAllOrderByRegDateDesc(Pageable page);

    @Modifying
    @Query("UPDATE Project p SET p.existStatus = false WHERE p.chatRoom.roomId = :roomId")
    void existStatusUpdate(@Param("roomId") String roomId);;
}
