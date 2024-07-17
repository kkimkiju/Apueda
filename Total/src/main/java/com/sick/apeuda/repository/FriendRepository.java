package com.sick.apeuda.repository;

import com.sick.apeuda.entity.Friend;
import com.sick.apeuda.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FriendRepository extends JpaRepository<Friend, Long> {

    // 특정 사용자(toMember)가 받은 대기 중인 친구 요청 목록을 반환합니다.
    List<Friend> findByToMemberAndCheckFriend(Member toMember, Boolean checkFriend);

    // 특정 사용자(member)와 친구가 될 사용자(toMember) 사이의 친구 요청을 삭제합니다.
    void deleteByMemberAndToMember(Member member, Member toMember);


    // 특정 사용자(member)와 친구가 될 사용자(toMember) 사이의 친구 요청을 반환합니다.
    Friend findByMemberAndToMember(Member member, Member toMember);


    // checkFriend가 true인 모든 친구 관계를 가져오는 메서드
    @Query("SELECT f FROM Friend f WHERE (f.member = :member OR f.toMember = :member) AND f.checkFriend = true ORDER BY f.friendId DESC")
    List<Friend> findAllFriends(@Param("member") Member member);

    // 특정 사용자(member)와 친구(friend) 사이의 친구 관계를 삭제합니다.
    @Modifying
    @Query("delete from Friend f where (f.member = :member and f.toMember = :friend) or (f.member = :friend and f.toMember = :member)")
    void deleteFriend(@Param("member") Member member, @Param("friend") Member friend);
}