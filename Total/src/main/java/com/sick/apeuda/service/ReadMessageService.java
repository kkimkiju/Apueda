package com.sick.apeuda.service;

import com.sick.apeuda.dto.ReadMessageDto;
import com.sick.apeuda.entity.Member;
import com.sick.apeuda.entity.ReadMessage;
import com.sick.apeuda.repository.MemberRepository;
import com.sick.apeuda.repository.ReadMessageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReadMessageService {

    @Autowired
    ReadMessageRepository readMessageRepository;
    @Autowired
    MemberRepository memberRepository;

    public List<ReadMessageDto> getFriends() {
        String memberEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        Optional<Member> member = memberRepository.findByEmail(memberEmail);
        List<ReadMessage> friends = readMessageRepository.findByMember1(member.get());

        // ReadMessage를 ReadMessageDto로 변환
        List<ReadMessageDto> friendDtos = new ArrayList<>();
        for (ReadMessage friend : friends) {
            ReadMessageDto dto = new ReadMessageDto();
            dto.setMember2(friend.getMember2());
            dto.setReadCheck(friend.isReadCheck());
            friendDtos.add(dto);
        }

        return friendDtos;
    }

    @Transactional
    public void updateReadCheck(Member member1, Member member2) {
        Optional<ReadMessage> optionalReadMessage = readMessageRepository.findByMember1AndMember2(member1, member2);

        // Optional이 값을 포함하고 있을 때 처리
        optionalReadMessage.ifPresent(readMessage -> {
            readMessage.setReadCheck(true);
            readMessageRepository.save(readMessage); // 변경 사항을 저장
        });
    }
}


