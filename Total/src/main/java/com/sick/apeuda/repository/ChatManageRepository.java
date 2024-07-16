//ChatManageRepository
package com.sick.apeuda.repository;

import com.sick.apeuda.entity.ChatManage;
import com.sick.apeuda.entity.ChatRoom;
import com.sick.apeuda.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChatManageRepository extends JpaRepository<ChatManage, Long> {
    List<ChatManage> findByMember(Member member); // ChatManage 테이블에서 유저아이디 검색
    Optional<ChatManage> findByChatRoomAndMember(ChatRoom chatRoom, Member member); // 유저가 이미 참여하고 있는지 조회
    Optional<ChatManage> findByChatRoomAndMemberAndHost(ChatRoom chatRoom, Member member, boolean host); // 채팅방에 입장해있는 유저이고 호스트인지 DB 확인
    List<ChatManage> findByChatRoom(ChatRoom chatRoom);

    // 첫 번째 쿼리: member_id로 ChatManage ID 조회
//    @Query("SELECT c.id FROM ChatManage c WHERE c.member.id = :memberId")
//    List<Long> findIdsByMemberId(@Param("memberId") String memberId);
//
//    // 두 번째 쿼리: 조회된 ID로 ChatManage 전체 데이터 조회
    @Query("SELECT c.chatRoom.roomId FROM ChatManage c WHERE c.member.id = :memberId")
    List<String> findByEmail(@Param("memberId") String memberId);

    @Query("SELECT c FROM ChatManage c WHERE c.chatRoom.roomId = :roomId")
    List<ChatManage> findByRoomId(@Param("roomId") String roomId);

    @Modifying
    @Query("DELETE FROM ChatManage c WHERE c.chatRoom.roomId = :roomId AND c.member.id = :memberId")
    int kickMember(@Param("roomId") String roomId ,@Param("memberId") String memberId);
}
