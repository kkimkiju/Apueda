package com.sick.apeuda.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PaymentHistoryDto {
    private Long paymentHistoryId;
    private String member;
    private String name;
    private LocalDateTime paymentDate;
    private String paymentStatus;
    private String transactionId;
    private Long amount;
}