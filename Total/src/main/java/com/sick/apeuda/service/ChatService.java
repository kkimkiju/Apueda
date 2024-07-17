// ChatService.java
package com.sick.apeuda.service;

import com.sick.apeuda.dto.ChatManageDto;
import com.sick.apeuda.dto.ChatMsgDto;
import com.sick.apeuda.dto.ProjectReqDto;
import com.sick.apeuda.entity.*;
import com.sick.apeuda.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

import static com.sick.apeuda.security.SecurityUtil.getCurrentMemberId;

import java.util.stream.Collectors;

@Slf4j
@Service
public class ChatService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMsgRepository chatMsgRepository;
    private final ChatManageRepository chatManageRepository;
    private final MemberRepository memberRepository;
    private final ApplyRepository applyRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final ProjectRepository projectRepository;
    public ChatService(ChatRoomRepository chatRoomRepository, ChatMsgRepository chatMsgRepository, MemberRepository memberRepository, ChatManageRepository chatManageRepository, ApplyRepository applyRepository, SimpMessagingTemplate messagingTemplate, ProjectRepository projectRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.chatMsgRepository = chatMsgRepository;
        this.memberRepository = memberRepository;
        this.chatManageRepository = chatManageRepository;
        this.applyRepository = applyRepository;
        this.messagingTemplate = messagingTemplate;
        this.projectRepository = projectRepository;
    }

    // 방생성
    public ChatRoom createRoom(String roomName, String max_count, String memberId) {
        //사용자 확인
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new RuntimeException("Member with ID " + memberId + " does not exist")
        );
        // 중복된 방 이름 확인
        Optional<ChatRoom> existingRoom = chatRoomRepository.findByRoomName(roomName);
        if (existingRoom.isPresent()) {
            throw new RuntimeException("Room with name " + roomName + " already exists.");
        }
        // ChatRoom 테이블 정보 등록
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setRoomName(roomName);
        chatRoom.setCurrentCount(+1);
        chatRoom.setMaxCount(Integer.valueOf(max_count));
        chatRoom.setPostType(true); // status 에서 PostType으로 변수명 변경

        // ChatRoom 저장
        ChatRoom savedChatRoom = chatRoomRepository.save(chatRoom);

        // ChatManage 테이블 정보 등록
        ChatManage chatManage = new ChatManage();
        chatManage.setChatRoom(savedChatRoom);
        chatManage.setMember(member); // 방장권한을 식별하는 member_id는  ChatManage 테이블에서 관리하는 것으로 변경
        chatManage.setHost(true); // 방생성되면 그 Member는 방장권한을 가지도록 설정
        chatManageRepository.save(chatManage); // ChatManage 테이블에 정보 등록

        // 입장 메시지 생성 및 저장
        ChatMsg enterMsg = new ChatMsg();
        enterMsg.setSender(member);
        enterMsg.setNickName(member.getNickname());
        enterMsg.setProfileImgPath(member.getProfileImgPath());
        enterMsg.setChatRoom(chatRoom);
        enterMsg.setContent(member.getName() + "님이 입장하셨습니다.");
        enterMsg.setType(ChatMsgDto.MessageType.ENTER);
        enterMsg.setLocalDateTime(String.valueOf(LocalDateTime.now()));
        chatMsgRepository.save(enterMsg);
        // 입장 메시지 전송
        ChatMsgDto enterMsgDto = new ChatMsgDto();
        enterMsgDto.setSenderId(member.getEmail());
        enterMsgDto.setSenderNickname(enterMsg.getNickName());
        enterMsgDto.setProfileImgPath(enterMsg.getProfileImgPath());
        enterMsgDto.setRoomId(chatRoom.getRoomId());
        enterMsgDto.setContent(enterMsg.getContent());
        enterMsgDto.setType(ChatMsgDto.MessageType.ENTER);
        enterMsgDto.setLocalDateTime(enterMsg.getLocalDateTime());
        messagingTemplate.convertAndSend("/topic/room/" + chatRoom.getRoomId(), enterMsgDto);

        return savedChatRoom; // 최종적으로 생성된 ChatRoom 정보반환
    }
    public ChatRoom createOpenChat(String roomName, String memberId) {
        //사용자 확인
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new RuntimeException("Member with ID " + memberId + " does not exist")
        );
        // 중복된 방 이름 확인 중복 허용시 삭제
        Optional<ChatRoom> existingRoom = chatRoomRepository.findByRoomName(roomName);
        if (existingRoom.isPresent()) {
            throw new RuntimeException("Room with name " + roomName + " already exists.");
        }
        // ChatRoom 테이블 정보 등록
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setRoomName(roomName);
        chatRoom.setCurrentCount(+1);
        chatRoom.setPostType(false); // status 에서 PostType으로 변수명 변경

        // ChatRoom 저장
        ChatRoom savedChatRoom = chatRoomRepository.save(chatRoom);

        // ChatManage 테이블 정보 등록
        ChatManage chatManage = new ChatManage();
        chatManage.setChatRoom(savedChatRoom);
        chatManage.setMember(member); // 방장권한을 식별하는 member_id는  ChatManage 테이블에서 관리하는 것으로 변경
        chatManage.setHost(true); // 방생성되면 그 Member는 방장권한을 가지도록 설정
        chatManageRepository.save(chatManage); // ChatManage 테이블에 정보 등록

        // 입장 메시지 생성 및 저장
        ChatMsg enterMsg = new ChatMsg();
        enterMsg.setSender(member);
        enterMsg.setNickName(member.getNickname());
        enterMsg.setProfileImgPath(member.getProfileImgPath());
        enterMsg.setChatRoom(chatRoom);
        enterMsg.setContent(member.getName() + "님이 입장하셨습니다.");
        enterMsg.setType(ChatMsgDto.MessageType.ENTER);
        enterMsg.setLocalDateTime(String.valueOf(LocalDateTime.now()));
        chatMsgRepository.save(enterMsg);
        // 입장 메시지 전송
        ChatMsgDto enterMsgDto = new ChatMsgDto();
        enterMsgDto.setSenderId(member.getEmail());
        enterMsgDto.setSenderNickname(enterMsg.getNickName());
        enterMsgDto.setProfileImgPath(enterMsg.getProfileImgPath());
        enterMsgDto.setRoomId(chatRoom.getRoomId());
        enterMsgDto.setContent(enterMsg.getContent());
        enterMsgDto.setType(ChatMsgDto.MessageType.ENTER);
        enterMsgDto.setLocalDateTime(enterMsg.getLocalDateTime());
        messagingTemplate.convertAndSend("/topic/room/" + chatRoom.getRoomId(), enterMsgDto);

        return savedChatRoom; // 최종적으로 생성된 ChatRoom 정보반환
    }
    // 새로운 유저 방 입장
    @Transactional
    public void joinRoom(String roomId, String memberId) { // 방아이디와 유저아이디를 받음
        // 채팅방 찾기
        ChatRoom chatRoom = chatRoomRepository.findById(roomId).orElseThrow( // 채팅방이 없을 때 오류 예외처리
                () -> new RuntimeException("ChatRoom with ID " + roomId + " does not exist")
        );
        // 멤버 찾기
        Member member = memberRepository.findByEmail(getCurrentMemberId()).orElseThrow( // 현재 유저가 DB에 없을 때 오류 처리
                () -> new RuntimeException("Member with email " + getCurrentMemberId() + " does not exist")
        );
        // 유저가 이미 참여하고 있는지 확인
        Optional<ChatManage> checkJoinedMember = chatManageRepository.findByChatRoomAndMember(chatRoom, member);
        if (checkJoinedMember.isPresent()) {
            //throw new RuntimeException("Member is already in the chat room");
            return;
        }
        // 채팅방 인원 증가
        chatRoom.setCurrentCount(chatRoom.getCurrentCount() + 1);
        // ChatManage 테이블 정보 등록
        ChatManage chatManage = new ChatManage();
        chatManage.setChatRoom(chatRoom);
        chatManage.setMember(member);
        chatManage.setHost(false); // 권한없는 일반 멤버로 설정
        chatManageRepository.save(chatManage); // ChatManage 테이블에 정보 등록
        // 입장 메시지 생성 및 저장
        ChatMsg enterMsg = new ChatMsg();
        enterMsg.setSender(member);
        enterMsg.setNickName(member.getNickname());
        enterMsg.setProfileImgPath(member.getProfileImgPath());
        enterMsg.setChatRoom(chatRoom);
        enterMsg.setContent(member.getName() + "님이 입장하셨습니다.");
        enterMsg.setType(ChatMsgDto.MessageType.ENTER);
        enterMsg.setLocalDateTime(String.valueOf(LocalDateTime.now()));
        chatMsgRepository.save(enterMsg);
        // 입장 메시지 전송
        ChatMsgDto enterMsgDto = new ChatMsgDto();
        enterMsgDto.setSenderId(member.getEmail());
        enterMsgDto.setSenderNickname(enterMsg.getNickName());
        enterMsgDto.setProfileImgPath(enterMsg.getProfileImgPath());
        enterMsgDto.setRoomId(chatRoom.getRoomId());
        enterMsgDto.setContent(enterMsg.getContent());
        enterMsgDto.setType(ChatMsgDto.MessageType.ENTER);
        enterMsgDto.setLocalDateTime(enterMsg.getLocalDateTime());
        messagingTemplate.convertAndSend("/topic/room/" + roomId, enterMsgDto);
    }

    // 유저 방 퇴장
    @Transactional
    public void exitRoom(String roomId, String memberId) { // 방아이디와 유저아이디를 받음
        // 채팅방 찾기
        ChatRoom chatRoom = chatRoomRepository.findById(roomId).orElseThrow(
                () -> new RuntimeException("ChatRoom with ID " + roomId + " does not exist")
        );
        // 멤버 찾기
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new RuntimeException("Member with ID " + memberId + " does not exist")
        );
        // ChatManage DB 조회
        ChatManage chatManage = chatManageRepository.findByChatRoomAndMember(chatRoom, member).orElseThrow(
                () -> new RuntimeException("Member is not in the chat room")
        );
        // ChatRoom 테이블 인원제거
        chatRoom.setCurrentCount(chatRoom.getCurrentCount() -1);
        // 퇴장 메시지 생성 및 저장
        ChatMsg leaveMsg = new ChatMsg();
        leaveMsg.setSender(member);
        leaveMsg.setNickName(member.getNickname());

        leaveMsg.setProfileImgPath(member.getProfileImgPath());
        leaveMsg.setChatRoom(chatRoom);
        leaveMsg.setContent(member.getName() + "님이 나가셨습니다.");
        leaveMsg.setType(ChatMsgDto.MessageType.ENTER);
        leaveMsg.setLocalDateTime(String.valueOf(LocalDateTime.now()));
        chatMsgRepository.save(leaveMsg);
        // 퇴장 메시지 전송
        ChatMsgDto leaveMsgDto = new ChatMsgDto();
        leaveMsgDto.setSenderId(member.getEmail());
        leaveMsgDto.setSenderNickname(leaveMsg.getNickName());

        leaveMsgDto.setProfileImgPath(leaveMsg.getProfileImgPath());
        leaveMsgDto.setRoomId(chatRoom.getRoomId());
        leaveMsgDto.setContent(leaveMsg.getContent());
        leaveMsgDto.setType(ChatMsgDto.MessageType.ENTER);
        leaveMsgDto.setLocalDateTime(leaveMsg.getLocalDateTime());
        messagingTemplate.convertAndSend("/topic/room/" + roomId, leaveMsgDto);
        // ChatManage DB에서 삭제
        chatManageRepository.delete(chatManage);
    }
    // 호스트멤버 다른유저 강퇴기능
    public void kickMemberByHost(String roomId, String hostId, String memberId) {
        // 채팅방 찾기
        ChatRoom chatRoom = chatRoomRepository.findById(roomId).orElseThrow(
                () -> new RuntimeException("ChatRoom with ID " + roomId + " does not exist")
        );
        // 호스트 찾기
        Member host = memberRepository.findById(hostId).orElseThrow(
                () -> new RuntimeException("Host with ID " + hostId + " does not exist")
        );
        // 멤버 찾기
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new RuntimeException("Member with ID " + memberId + " does not exist")
        );
        // 호스트가 맞는지 확인
        Optional<ChatManage> checkHost = chatManageRepository.findByChatRoomAndMemberAndHost(chatRoom, host, true);
        if (!checkHost.isPresent()) {
            throw new RuntimeException("The user is not the host of the chat room");
        }
        // 대상 멤버가 방에 있는지 확인
        Optional<ChatManage> checkJoinedMember = chatManageRepository.findByChatRoomAndMember(chatRoom, member);
        if (!checkJoinedMember.isPresent()) {
            throw new RuntimeException("Member is not in the chat room");
        }
        // ChatManage DB에서 삭제
        chatManageRepository.delete(checkJoinedMember.get());
    }
    // 입장 중인 방 리스트 찾기
    public List<ChatRoom> getJoinedRooms(String memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new RuntimeException("Member with ID " + memberId + " does not exist")
        );

        // 유저가 참여하고 있는 ChatManage 목록 찾기
        List<ChatManage> chatManages = chatManageRepository.findByMember(member);

        // 유저가 참여하고 있는 ChatRoom 목록 필터링
        List<ChatRoom> joinedChatRooms = chatManages.stream()
                .map(ChatManage::getChatRoom)
                .filter(ChatRoom::getPostType) // postType이 true인 경우만 필터링
                .collect(Collectors.toList());

        return joinedChatRooms;
    }
    // 입장 중인 오픈채팅방 리스트 찾기
    public List<ChatRoom> getJoinedOpenChatRooms(String memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new RuntimeException("Member with ID " + memberId + " does not exist")
        );
        List<ChatRoom> chatRooms = chatRoomRepository.findByPostType(true);
        List<ChatManage> chatManages = chatManageRepository.findByMember(member);
        log.info("ChatManages for member {}: {}", memberId, chatManages);

        List<ChatRoom> openChatRooms = chatManages.stream()
                .map(ChatManage::getChatRoom)
                .filter(chatRoom -> chatRoom.getPostType() != null && !chatRoom.getPostType()) // postType이 false인 경우
                .collect(Collectors.toList());

        log.info("Filtered Open ChatRooms (postType=false) for member {}: {}", memberId, openChatRooms);
        return openChatRooms;
    }
    // 오픈채팅방 전체 리스트 찾기
    public List<ChatRoom> getOpenchatList(boolean postType) {
        return chatRoomRepository.findByPostType(postType).stream()
                .filter(chatRoom -> chatRoom.getCurrentCount() > 0)
                .collect(Collectors.toList());
    }


    public List<ChatManageDto> getManage(String memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new RuntimeException("Member with ID " + memberId + " does not exist")
        );

        // 1. 멤버에 해당하는 ChatManage 객체들의 ID를 조회
        List<String> chatManageIds = chatManageRepository.findByEmail(member.getEmail());
        log.warn("챗매니지id : {}",chatManageIds);

        List<ChatManageDto> chatManageDtos = new ArrayList<>();
        for (String r : chatManageIds){
            List<ChatManage> chatManages = chatManageRepository.findByRoomId(r);
            ChatManageDto chatManageDto = new ChatManageDto();
            chatManageDto.setChatManages(chatManages);
            chatManageDtos.add(chatManageDto);
        }
        return chatManageDtos;
    }

    // 방이름으로 채팅방 찾기
    public Optional<ChatRoom> findRoomByRoomName(String roomName) {
        return chatRoomRepository.findByRoomName(roomName);
    }

    // ++++++++++++++++채팅 메시지 관리 ++++++++++++++++++

    // 메시지 가져오기
    public List<ChatMsg> getMessages(String roomId) {
        ChatRoom chatRoom = chatRoomRepository.findById(roomId).orElseThrow(
                () -> new RuntimeException("ChatRoom with ID " + roomId + " does not exist")
        );
        return chatMsgRepository.findByChatRoom(chatRoom);
    }
    // 메세지 저장
    public ChatMsg saveMessage(ChatMsgDto chatMsgDto) {
        log.debug("Saving message from sender: {}", chatMsgDto.getSenderId());
        if (chatMsgDto.getSenderId() == null || chatMsgDto.getRoomId() == null) {
            throw new IllegalArgumentException("SenderId and RoomId must not be null");
        }
        Member sender = memberRepository.findById(chatMsgDto.getSenderId()).orElseThrow(
                () -> new RuntimeException("Member with ID " + chatMsgDto.getSenderId() + " does not exist")
        );

        ChatRoom chatRoom = chatRoomRepository.findById(chatMsgDto.getRoomId()).orElseThrow(
                () -> new RuntimeException("ChatRoom with ID " + chatMsgDto.getRoomId() + " does not exist")
        );
        ChatMsg chatMsg = new ChatMsg();
        chatMsg.setSender(sender);
        chatMsg.setContent(chatMsgDto.getContent());
        chatMsg.setChatRoom(chatRoom);
        chatMsg.setType(chatMsgDto.getType());
        chatMsg.setLocalDateTime(chatMsgDto.getLocalDateTime());
        chatMsg.setProfileImgPath(chatMsgDto.getProfileImgPath());
        chatMsg.setNickName(sender.getNickname());
        log.warn("닉네임: {}", sender.getNickname());
        log.debug("ChatMessage entity created: {}", chatMsg);
        ChatMsg savedChatMessage = chatMsgRepository.save(chatMsg);
        log.debug("ChatMessage entity saved: {}", savedChatMessage);
        return chatMsgRepository.save(chatMsg);
    }


    // 메세지 준비
    public ChatMsgDto prepareMessage(ChatMsgDto chatMsgDto) {
        Member sender = memberRepository.findById(chatMsgDto.getSenderId()).orElseThrow(
                () -> new RuntimeException("Member with ID " + chatMsgDto.getSenderId() + " does not exist")
        );

        chatMsgDto.setProfileImgPath(sender.getProfileImgPath());
        return chatMsgDto;
    }

    @Transactional
    public boolean kickProjectMember(String roomId, String memberId, Long projectId) {
        try {
            chatManageRepository.kickMember(roomId, memberId); //채팅방 나가기
            applyRepository.kickMember(memberId, projectId); //프로젝트 지원 사라짐
            chatRoomRepository.decreaseCurrentConunt(roomId); //현재 인원 -1시키기

            Optional<ChatRoom> optionalRoom = chatRoomRepository.findByRoomId(roomId);
            if (optionalRoom.isPresent()) {
                ChatRoom room = optionalRoom.get();
                if (room.getCurrentCount() == 0) {
                    chatMsgRepository.deleteByMsg(roomId);
//                    chatRoomRepository.deleteByRoomId(roomId);
//                    projectRepository.UpdateRoomId(roomId);
                }
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    @Transactional
    public boolean exitProject(String roomId, String memberId) {
        try {
            chatManageRepository.kickMember(roomId, memberId); //채팅방 나가기
            projectRepository.existStatusUpdate(roomId); //방장이 나가면 더 이상 신청 못하게 하는 것
            chatRoomRepository.decreaseCurrentConunt(roomId);

            //현재 인원이 0명이 되면 삭제할 거임
            Optional<ChatRoom> optionalRoom = chatRoomRepository.findByRoomId(roomId);
            log.warn("김기주입니다1{} : ",roomId);
            log.warn("김기주입니다2{} : ",memberId);
            log.warn("김기주입니다3{} : ",optionalRoom);
            if (optionalRoom.isPresent()) {
                ChatRoom room = optionalRoom.get();
                if (room.getCurrentCount() == 0) {
                    chatMsgRepository.deleteByMsg(roomId);
//                    projectRepository.UpdateRoomId(roomId);
//                    chatRoomRepository.deleteByRoomId(roomId);

                }
            }

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}