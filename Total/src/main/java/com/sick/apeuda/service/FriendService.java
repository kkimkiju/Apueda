package com.sick.apeuda.service;

import com.sick.apeuda.dto.FriendDto;
import com.sick.apeuda.entity.Friend;
import com.sick.apeuda.entity.Member;
import com.sick.apeuda.entity.PostMsg;
import com.sick.apeuda.entity.ReadMessage;
import com.sick.apeuda.repository.FriendRepository;
import com.sick.apeuda.repository.PostMsgRepository;
import com.sick.apeuda.repository.ReadMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FriendService {

    @Autowired
    private FriendRepository friendRepository;
    @Autowired
    private PostMsgRepository postMsgRepository;
    @Autowired
    private ReadMessageRepository readMessageRepository;

    /**
     * 친구 요청을 보냅니다.
     *
     * @param member   친구 요청을 보내는 사용자 객체
     * @param toMember 친구 요청을 받는 사용자 객체
     * @throws IllegalStateException 이미 친구인 경우 예외를 발생시킵니다.
     */
    @Transactional
    public void sendFriendRequest(Member member, Member toMember) {
        //자기 자신에게 신청 불가
        if (member.getEmail().equals(toMember.getEmail())) {
            throw new IllegalStateException("자기 자신에게 친구 요청을 보낼 수 없습니다.");
        }

        // 이미 친구인 경우 친구 요청을 보내지 않도록 합니다.
        if (areFriends(member, toMember)) {
            throw new IllegalStateException("이미 친구인 상태입니다.");
        }

        Friend existingRequest = friendRepository.findByMemberAndToMember(member, toMember);
        if (existingRequest != null && !existingRequest.getCheckFriend()) {
            throw new IllegalStateException("이미 친구 요청을 보냈습니다.");
        }

        // 동일한 사용자에게 요청을 여러 번 보내지 않도록 체크
        Friend existingRequestToMember = friendRepository.findByMemberAndToMember(toMember, member);
        if (existingRequestToMember != null && !existingRequestToMember.getCheckFriend()) {
            throw new IllegalStateException("이 사용자에게 이미 친구 요청을 받았습니다.");
        }

        // 새로운 친구 요청을 생성하고 저장합니다.
        Friend friend = new Friend();
        friend.setMember(member);
        friend.setToMember(toMember);
        friendRepository.save(friend);
    }


    /**
     * 사용자의 친구 목록을 가져옵니다.
     *
     * @param member 친구 목록을 가져올 사용자 객체
     * @return 사용자의 친구 목록의 DTO 리스트
     */
    public List<FriendDto> getFriends(Member member) {
        List<Friend> friends = friendRepository.findAllFriends(member);
        return friends.stream()
                .map(friend -> {
                    // 상대방을 찾습니다.
                    Member friendMember = friend.getMember().equals(member) ? friend.getToMember() : friend.getMember();
                    return convertToFriendDto(friendMember, friend);
                })
                .map(friendDto -> {
                    // 자신의 아이디를 기반으로 비교하여 필터링
                    if (friendDto.getMember().getEmail().equals(member.getEmail())) {
                        friendDto.setMember(null);
                    }
                    if (friendDto.getToMember().getEmail().equals(member.getEmail())) {
                        friendDto.setToMember(null);
                    }
                    return friendDto;
                })
                .collect(Collectors.toList());
    }

    /**
     * Friend 엔티티를 FriendDto로 변환합니다.
     *
     * @param friendMember 친구 관계의 상대방 사용자 객체
     * @param friend       Friend 엔티티 객체
     * @return 변환된 FriendDto 객체
     */
    private FriendDto convertToFriendDto(Member friendMember, Friend friend) {
        FriendDto friendDTO = new FriendDto();
        friendDTO.setFriendId(friend.getFriendId());
        friendDTO.setMember(friend.getMember()); // 추가
        friendDTO.setToMember(friend.getToMember()); // 추가
        friendDTO.setCheckFriend(friend.getCheckFriend());
        return friendDTO;
    }


    /**
     * 두 사용자가 친구인지 확인합니다.
     *
     * @param member   첫 번째 사용자 객체
     * @param toMember 두 번째 사용자 객체
     * @return 두 사용자가 친구인 경우 true, 그렇지 않은 경우 false
     */
    public boolean areFriends(Member member, Member toMember) {
        // 두 사용자가 친구인지 확인합니다 (양방향 확인).
        Friend friend1 = friendRepository.findByMemberAndToMember(member, toMember);
        Friend friend2 = friendRepository.findByMemberAndToMember(toMember, member);

        // 둘 중 하나라도 친구 관계가 성립되면 true 반환
        if ((friend1 != null && friend1.getCheckFriend()) ||
                (friend2 != null && friend2.getCheckFriend())) {
            return true;
        }
        return false;
    }

    /**
     * 대기 중인 친구 요청 목록을 가져옵니다.
     *
     * @param member 친구 요청을 받는 사용자 객체
     * @return 대기 중인 친구 요청 목록의 DTO 리스트
     */
    public List<FriendDto> getPendingFriendRequests(Member member) {
        // 사용자가 받은 대기 중인 친구 요청 목록을 가져옵니다.
        List<Friend> friends = friendRepository.findByToMemberAndCheckFriend(member, false);
        // Friend 엔티티를 FriendDto로 변환하여 반환합니다.
        return friends.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 친구 요청을 수락합니다.
     *
     * @param member   친구 요청을 받는 사용자 객체
     * @param toMember 친구 요청을 보낸 사용자 객체
     */
    @Transactional
    public List<FriendDto> acceptFriendRequest(Member member, Member toMember) {
        // friendRepository를 사용하여 특정 사용자(member)와 친구가 될 사용자(toMember) 사이의 친구 요청을 찾습니다.
        Friend friend = friendRepository.findByMemberAndToMember(member, toMember);

        // 만약 친구 요청이 존재하면 (null이 아니면)
        if (friend != null) {
            // 친구 요청의 checkFriend 필드를 true로 설정합니다.
            friend.setCheckFriend(true);

            // friendRepository를 사용하여 변경된 상태를 데이터베이스에 저장합니다.
            friendRepository.save(friend);

            ReadMessage readMessage = new ReadMessage();
            readMessage.setMember1(member);
            readMessage.setMember2(toMember);
            readMessage.setReadCheck(true);
            readMessageRepository.save(readMessage);

            ReadMessage readMessage2 = new ReadMessage();
            readMessage2.setMember1(toMember);
            readMessage2.setMember2(member);
            readMessage2.setReadCheck(true);
            readMessageRepository.save(readMessage2);

        }
        return getFriends(member);
    }

    /**
     * 친구 요청을 거절하고 요청을 삭제합니다.
     *
     * @param member   친구 요청을 받는 사용자 객체
     * @param toMember 친구 요청을 보낸 사용자 객체
     */
    @Transactional
    public List<FriendDto> rejectFriendRequest(Member member, Member toMember) {
        // 특정 사용자(member)와 친구가 될 사용자(toMember) 사이의 친구 요청을 삭제합니다.
        friendRepository.deleteByMemberAndToMember(member, toMember);
        return getPendingFriendRequests(member);
    }

    /**
     * Friend 엔티티를 FriendDto로 변환합니다.
     *
     * @param friend Friend 엔티티 객체
     * @return 변환된 FriendDto 객체
     */
    private FriendDto convertToDto(Friend friend) {
        // Friend 엔티티의 필드를 FriendDto로 복사하여 반환합니다.
        FriendDto friendDTO = new FriendDto();
        friendDTO.setFriendId(friend.getFriendId());
        friendDTO.setMember(friend.getMember());
        friendDTO.setToMember(friend.getToMember());
        friendDTO.setCheckFriend(friend.getCheckFriend());
        return friendDTO;
    }

    /**
     * 친구 관계를 삭제합니다.
     *
     * @param member 친구 관계를 삭제할 사용자 객체
     * @param friend 친구 관계를 삭제할 친구 객체
     */
    @Modifying
    @Transactional
    public void deleteFriend(Member member, Member friend) {
        // 친구 관계를 삭제합니다.
        friendRepository.deleteFriend(member, friend);
        deleteMessagesBetweenMembers(member, friend);
        deleteReadMessage(member, friend);
    }


    private void deleteMessagesBetweenMembers(Member member1, Member member2) {
        // member1이 보낸 메시지와 member2가 받은 메시지, 또는 member2가 보낸 메시지와 member1이 받은 메시지를 모두 삭제
        List<PostMsg> messagesToDelete = postMsgRepository.findAllBySendMemberAndReceiveMemberOrSendMemberAndReceiveMemberOrderByReceiveTimeDesc(member1, member2, member2, member1);
        postMsgRepository.deleteAll(messagesToDelete);
    }


    public void deleteReadMessage(Member member, Member friend) {
        List<ReadMessage> readMessagesToDelete = readMessageRepository.findAllByMembers(member, friend);
        readMessageRepository.deleteAll(readMessagesToDelete);
    }



}