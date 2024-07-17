package com.sick.apeuda.service;

import com.sick.apeuda.dto.PostMsgDto;
import com.sick.apeuda.entity.Member;
import com.sick.apeuda.entity.PostMsg;

import com.sick.apeuda.entity.ReadMessage;
import com.sick.apeuda.repository.MemberRepository;
import com.sick.apeuda.repository.PostMsgRepository;
import com.sick.apeuda.repository.ReadMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class PostMsgService {
    private  final PostMsgRepository msgRepository;
    private  final MemberRepository memberRepository;
    @Autowired
    private ReadMessageRepository readMessageRepository;

    @Transactional
    public PostMsg msgWrite(PostMsgDto postMsgDto) {
        Member receiver = memberRepository.findByEmail(postMsgDto.getReceiverMemberName())
                .orElseThrow(() -> new IllegalArgumentException("Receiver not found"));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String senderName = authentication.getName();

        Member sender = memberRepository.findByEmail(senderName)
                .orElseThrow(() -> new IllegalArgumentException("Sender not found"));
        log.info("receiver = {}", receiver);
        log.info("sender = {}", sender);

        PostMsg postMsg = new PostMsg();
        postMsg.messageSave(sender, receiver, postMsgDto.getContent());
        postMsg.setReceiveTime(LocalDateTime.now()); // 현재 시간 설정
        postMsg.setReadStatus(false); // 기본값으로 false 설정

        msgRepository.save(postMsg);

        //메세지 읽지 않음으로 변경
        Optional<ReadMessage> optionalReadMessage = readMessageRepository.findByMember1AndMember2(receiver, sender);

        // Optional이 값을 포함하고 있을 때 처리
        optionalReadMessage.ifPresent(readMessage -> {
            readMessage.setReadCheck(false);
            readMessageRepository.save(readMessage); // 변경 사항을 저장
        });


        return postMsg;
    }
    @Transactional(readOnly = true)
    public List<PostMsg> receivedMessage(Member receiveMember, Member sendMember) {
        List<PostMsg> postMsgs = msgRepository.findAllByReceiveMemberAndSendMemberOrderByReceiveTimeDesc(receiveMember, sendMember);
        return postMsgs;
    }

    public boolean delMsg(Long id) {
        try{
            msgRepository.deleteById(id);
            return true;
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
}