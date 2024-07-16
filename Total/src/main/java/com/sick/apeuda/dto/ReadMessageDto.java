package com.sick.apeuda.dto;


import com.sick.apeuda.entity.Member;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReadMessageDto {
    private Member member2;
    private boolean readCheck;
}
