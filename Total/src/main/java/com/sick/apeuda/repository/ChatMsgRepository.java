// ChatMsgRepository
package com.sick.apeuda.repository;

import com.sick.apeuda.entity.ChatMsg;
import com.sick.apeuda.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatMsgRepository extends JpaRepository<ChatMsg, Long> {
    List<ChatMsg> findByChatRoom(ChatRoom chatRoom);

    @Modifying
    @Query("DELETE FROM ChatMsg c WHERE c.chatRoom.id = :roomId")
    void deleteByMsg(@Param("roomId") String roomId);
}
