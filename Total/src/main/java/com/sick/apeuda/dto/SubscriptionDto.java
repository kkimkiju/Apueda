package com.sick.apeuda.dto;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class SubscriptionDto {
    private Long subscriptionId;
    private String memberEmail;
    private String customerUid; // 포트원에서 발급한 고객 UID
    private String transactionId;
    private LocalDateTime paymentDate;
    private LocalDateTime createdAt;
    private LocalDateTime validUntil;
    private String merchantuid;
    private LocalDateTime billingKeyCreatedAt; // 빌링키 생성 시간
    private String status;
}