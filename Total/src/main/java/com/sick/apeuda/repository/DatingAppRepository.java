//DatingAppRepository.java
package com.sick.apeuda.repository;

import com.sick.apeuda.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DatingAppRepository extends JpaRepository<Member, String> {


    // 본인과 친구상태인 유저, 이미 친구신청한 유저, 싫어하는 유저를 제외한 전체 유저 출력
    @Query("SELECT m FROM Member m WHERE m.email <> :email AND m.id NOT IN " +
            "(SELECT f.toMember.id FROM Friend f WHERE f.member.email = :email) " +
            "AND m.id NOT IN " +
            "(SELECT f.member.id FROM Friend f WHERE f.toMember.email = :email) " +
            "AND m.id NOT IN " +
            "(SELECT u.unlikeMember.id FROM UnlikeMember u WHERE u.member.email = :email)")
    List<Member> findFilteredMember (@Param("email") String email);

}
