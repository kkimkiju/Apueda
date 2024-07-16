//ChatMsgController.java
package com.sick.apeuda.controller;

import com.sick.apeuda.dto.ChatMsgDto;
import com.sick.apeuda.service.ChatService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
@Slf4j
@Controller
public class ChatMsgController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    public ChatMsgController(ChatService chatService, SimpMessagingTemplate messagingTemplate) {
        this.chatService = chatService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat/send")
    public void sendMessage(ChatMsgDto chatMsgDto) {
        try {
            log.debug("Received message: {}", chatMsgDto);
            chatService.saveMessage(chatMsgDto);
            messagingTemplate.convertAndSend("/topic/room/" + chatMsgDto.getRoomId(), chatMsgDto);
            messagingTemplate.convertAndSendToUser(chatMsgDto.getReceiver(), "/queue/reply", chatMsgDto);
        } catch (Exception e) {
            log.error("Error handling message: " + e.getMessage(), e);
        }
    }
}