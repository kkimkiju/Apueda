// ChatRoomRepository.interface
package com.sick.apeuda.repository;
import com.sick.apeuda.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface ChatRoomRepository extends JpaRepository<ChatRoom, String> {
    Optional<ChatRoom> findByRoomId(String roomId);

    Optional<ChatRoom> findByRoomName(String roomName);

    // postType이 false인 ChatRoom들을 조회하는 메서드
    List<ChatRoom> findByPostType(Boolean postType);

    @Modifying
    @Query("UPDATE ChatRoom c SET c.currentCount = c.currentCount + 1 WHERE c.roomId = :roomId")
    void increaseCurrentCount(@Param("roomId")String roomId);

    @Modifying
    @Query("UPDATE ChatRoom c SET c.currentCount = c.currentCount - 1 WHERE c.roomId = :roomId")
    void decreaseCurrentConunt(@Param("roomId") String roomId);
}