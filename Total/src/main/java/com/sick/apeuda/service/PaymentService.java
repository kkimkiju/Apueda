package com.sick.apeuda.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.sick.apeuda.dto.*;
import com.sick.apeuda.entity.*;
import com.sick.apeuda.repository.*;

import static com.sick.apeuda.security.SecurityUtil.getCurrentMemberId;

import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;


@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentHistoryRepository paymentHistoryRepository;
    private final PaymentInfoRepository paymentInfoRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final MemberRepository memberRepository;

    public boolean savePaymentHistory(PaymentHistoryDto paymentHistoryDto) {
        try {
            String memberId = paymentHistoryDto.getMember();
            Member member = memberRepository.findById(paymentHistoryDto.getMember())
                    .orElseThrow(() -> new RuntimeException("Member not found"));

            // member_id로 기존 구독 정보 조회
            Subscription subscription = subscriptionRepository.findByMemberId(memberId);
            System.out.println("subscription 값은 : "+subscription);
            PaymentHistory paymentHistory = new PaymentHistory();
            paymentHistory.setMember(member);
            paymentHistory.setPaymentDate(paymentHistoryDto.getPaymentDate());
            paymentHistory.setPaymentStatus(paymentHistoryDto.getPaymentStatus());
            paymentHistory.setTransactionId(paymentHistoryDto.getTransactionId());
            paymentHistory.setName(paymentHistoryDto.getName());
            paymentHistory.setAmount(paymentHistoryDto.getAmount());

            paymentHistoryRepository.save(paymentHistory);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean savePaymentinfo(PaymentInfoDto paymentInfoDto) {
        try {
            String memberId = paymentInfoDto.getEmail();
            System.out.println("service test"+ paymentInfoDto.getEmail());
            System.out.println("memberId" + memberId);
            Member member = memberRepository.findById(paymentInfoDto.getEmail())
                    .orElseThrow(() -> new RuntimeException("Member not found"));
            PaymentInfo paymentInfo = new PaymentInfo();
            paymentInfo.setMember(member);
            paymentInfo.setPaymentMethodCode(paymentInfoDto.getPaymentMethodCode());
            paymentInfo.setPaymentDetails(paymentInfoDto.getPaymentDetails());

            paymentInfoRepository.save(paymentInfo);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean saveSubscriptions(SubscriptionDto subscriptionDto) {
        try {
            String memberId = subscriptionDto.getCustomerUid();

            Member member = memberRepository.findById(subscriptionDto.getCustomerUid())
                    .orElseThrow(() -> new RuntimeException("Member not found"));

            // member_id로 기존 구독 정보 조회
            Subscription subscription = subscriptionRepository.findByMemberId(memberId);
            System.out.println("subscription 값은 : "+subscription);
            if (subscription == null) {
                // 새로운 구독 정보 생성
                subscription = new Subscription();
                subscription.setMember(member);
                subscription.setCustomerUid(subscriptionDto.getCustomerUid());
                subscription.setTransactionId(subscriptionDto.getTransactionId());
                subscription.setPaymentDate(subscriptionDto.getPaymentDate());
                subscription.setCreatedAt(subscriptionDto.getCreatedAt());
                subscription.setValidUntil(subscriptionDto.getValidUntil());
                subscription.setMerchantuid(subscriptionDto.getMerchantuid());
                subscription.setStatus(subscriptionDto.getStatus());
                subscription.setBillingKeyCreatedAt(subscriptionDto.getBillingKeyCreatedAt());
                System.out.println("subscription insert : "+subscription);
                subscriptionRepository.save(subscription);

            } else {
                // 기존 구독 정보 업데이트
                subscription.setCustomerUid(subscriptionDto.getCustomerUid());
                subscription.setPaymentDate(subscriptionDto.getPaymentDate());
                subscription.setCreatedAt(subscriptionDto.getCreatedAt());
                subscription.setValidUntil(subscriptionDto.getValidUntil());
                subscription.setMerchantuid(subscriptionDto.getMerchantuid());
                subscription.setStatus(subscriptionDto.getStatus());

                System.out.println("subscription update : "+subscription);
                subscriptionRepository.save(subscription);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    public boolean unsaveSubscriptions(SubscriptionDto subscriptionDto) {
        try {
            String memberId = SecurityContextHolder.getContext().getAuthentication().getName(); // JWT 토큰에서 사용자 ID를 추출합니다.
            Member member = memberRepository.findById(memberId)
                    .orElseThrow(() -> new RuntimeException("Member not found"));

            // member_id로 기존 구독 정보 조회
            Subscription subscription = subscriptionRepository.findByMemberId("kimfjd");
            System.out.println("subscription 값은 : " + subscription);
            subscription.setStatus(subscriptionDto.getStatus());
            System.out.println("subscription update : " + subscription);
            subscriptionRepository.save(subscription);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public Map<String, Object> getHistory(String memberEmail, Pageable pageable) {
        Member member = memberRepository.findByEmail(memberEmail)
                .orElseThrow(() -> new RuntimeException("회원이 존재하지 않습니다"));

        Page<PaymentHistory> paymentHistoryPage = paymentHistoryRepository.findByMemberOrderByPaymentDateDesc(member, pageable);
        if (paymentHistoryPage.isEmpty()) {
            throw new RuntimeException("결제 내역이 존재하지 않습니다");
        }

        List<PaymentHistoryDto> paymentHistoryDtos = paymentHistoryPage.getContent()
                .stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());

        Map<String, Object> result = new HashMap<>();
        result.put("paymentHistory", paymentHistoryDtos);
        result.put("totalPages", paymentHistoryPage.getTotalPages());
        result.put("totalItems", paymentHistoryPage.getTotalElements()); // totalItems 추가
        return result;
    }


    private PaymentHistoryDto convertEntityToDto(PaymentHistory paymentHistory) {
        PaymentHistoryDto paymentHistoryDto = new PaymentHistoryDto();
        paymentHistoryDto.setMember(paymentHistory.getMember().getEmail());
        paymentHistoryDto.setPaymentHistoryId(paymentHistory.getPaymentHistoryId());
        paymentHistoryDto.setPaymentDate(paymentHistory.getPaymentDate());
        paymentHistoryDto.setName(paymentHistory.getName());
        paymentHistoryDto.setAmount(paymentHistory.getAmount());
        return paymentHistoryDto;
    }
    public List<SubscriptionDto> getdeadline(String memberEmail) {
        Member member = memberRepository.findByEmail(memberEmail)
                .orElseThrow(() -> new RuntimeException("회원이 존재하지 않습니다"));
        List<Subscription> subscriptions= subscriptionRepository.findByMember(member);
        if(subscriptions.isEmpty()){
            SubscriptionDto nullSubscriptionDto = new SubscriptionDto();
            nullSubscriptionDto.setValidUntil(null);
            nullSubscriptionDto.setStatus(null);
            nullSubscriptionDto.setMerchantuid(null);
            return Collections.singletonList(nullSubscriptionDto);
        }
        return subscriptions.stream().map(this::convertEntityToDto1).collect(Collectors.toList());
    }
    private SubscriptionDto convertEntityToDto1(Subscription subscription){
        SubscriptionDto subscriptionDto = new SubscriptionDto();
        subscriptionDto.setValidUntil(subscription.getValidUntil());
        subscriptionDto.setStatus(subscription.getStatus());
        subscriptionDto.setMerchantuid(subscription.getMerchantuid());
        return subscriptionDto;
    }
//    @Scheduled(cron = "0 */10 * * * *") // 10분마다 실행
    @Scheduled(cron = "0 * * * * *") // 매분마다 실행
    public void updateExpiredSubscriptions() {
        LocalDateTime  today = LocalDateTime .now();
        System.out.println("now Time : "+today);
        List<Subscription> subscriptions = subscriptionRepository.findAll();

        for (Subscription subscription : subscriptions) {
            LocalDateTime validUntil = LocalDateTime .from(subscription.getValidUntil()); // 만료 날짜 가져오기
            if (validUntil.isBefore(today) && !"만료".equals(subscription.getStatus())) {
                subscription.setStatus("만료");
                subscriptionRepository.save(subscription);
                log.info("Subscription for member {} has expired.", subscription.getMember().getEmail());
            }
        }
    }
}