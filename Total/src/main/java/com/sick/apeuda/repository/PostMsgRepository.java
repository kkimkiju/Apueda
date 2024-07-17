package com.sick.apeuda.repository;

import com.sick.apeuda.entity.Member;
import com.sick.apeuda.entity.PostMsg;
import com.sick.apeuda.entity.ReadMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostMsgRepository extends JpaRepository<PostMsg,Long> {
    List<PostMsg> findAllByReceiveMemberAndSendMemberOrderByReceiveTimeDesc(Member receiveMember, Member sendMember);
    List<PostMsg> findAllBySendMemberAndReceiveMemberOrSendMemberAndReceiveMemberOrderByReceiveTimeDesc(Member sendMember1, Member receiveMember1, Member sendMember2, Member receiveMember2);

}
