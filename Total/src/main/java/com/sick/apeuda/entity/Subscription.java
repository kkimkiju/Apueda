package com.sick.apeuda.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Entity
@Table(name = "Subscription")
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subscription_id")
    private Long subscriptionId;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "customer_uid", nullable = false)
    private String customerUid; // 포트원에서 발급한 고객 UID (고유 결제 식별자)

    @Column(name = "transaction_id", nullable = false)
    private String transactionId; //결제 트랜잭션 ID

    @Column(name = "payment_date", nullable = false)
    private LocalDateTime paymentDate; //결제가 이루어진 날짜와 시간

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt; //구독 정보 생성 시간

    @Column(name = "valid_until", nullable = false)
    private LocalDateTime validUntil; // 구독 만료일

    @Column(name= "merchant_uid", nullable = false)
    private String merchantuid; // 상품 번호

    @Column(name = "status", nullable = false)
    private String status; // 구독 상태 ("구독", "해지", "만료" 등)

    @Column(name = "billing_key_created_at")
    private LocalDateTime billingKeyCreatedAt; // 빌링키 생성 시간
}



