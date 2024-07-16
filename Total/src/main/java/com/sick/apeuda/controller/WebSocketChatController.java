//WebSocketChatController.java
package com.sick.apeuda.controller;

import com.sick.apeuda.dto.ChatMsgDto;
import com.sick.apeuda.entity.ChatMsg;
import com.sick.apeuda.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class WebSocketChatController {
    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;


    @MessageMapping("/sendMessage")
    @SendTo("/topic/public")
    public ChatMsg sendMessage(ChatMsgDto chatMsgDto) {
        ChatMsgDto preparedMsg = chatService.prepareMessage(chatMsgDto);
        ChatMsg chatMessage = chatService.saveMessage(preparedMsg);
        messagingTemplate.convertAndSend("/topic/room/" + chatMsgDto.getRoomId(), preparedMsg);
        return chatMessage;
    }
}
