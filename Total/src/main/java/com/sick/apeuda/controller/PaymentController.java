package com.sick.apeuda.controller;

import com.sick.apeuda.dto.PaymentHistoryDto;
import com.sick.apeuda.dto.PaymentInfoDto;
import com.sick.apeuda.dto.SubscriptionDto;
import com.sick.apeuda.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;



@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;



    @PostMapping("/save")
    public ResponseEntity<Boolean> savePaymentHistory(@RequestBody PaymentHistoryDto paymentHistoryDto) {
        boolean isTrue = paymentService.savePaymentHistory(paymentHistoryDto);
        return ResponseEntity.ok(isTrue);
    }

    @PostMapping("/info")
    public ResponseEntity<Boolean> savePaymentinfo(@RequestBody PaymentInfoDto paymentInfoDto){
        boolean isTrue=paymentService.savePaymentinfo(paymentInfoDto);
        System.out.println("controller save test"+paymentInfoDto.getEmail());
        return ResponseEntity.ok(isTrue);
    }

    @PostMapping("/subscriptions")
    public ResponseEntity<Boolean> saveSubscriptions(@RequestBody SubscriptionDto subscriptionDto){
        boolean isTrue=paymentService.saveSubscriptions(subscriptionDto);
        return ResponseEntity.ok(isTrue);
    }

    @PostMapping("/unsubscriptions")
    public ResponseEntity<Boolean> unsaveSubscriptions(@RequestBody SubscriptionDto subscriptionDto){
        boolean isTrue=paymentService.unsaveSubscriptions(subscriptionDto);
        return ResponseEntity.ok(isTrue);
    }

    @GetMapping("/detail/{member}")
    public ResponseEntity<Map<String, Object>> historydetail(@PathVariable String member,
                                                             @RequestParam(defaultValue = "0") int page,
                                                             @RequestParam(defaultValue = "7") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Map<String, Object> result = paymentService.getHistory(member, pageable);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/deadline/{member}")
    public ResponseEntity<List<SubscriptionDto>> deadline(@PathVariable String member){
        List<SubscriptionDto> subscriptionDtos=paymentService.getdeadline(member);
        return ResponseEntity.ok(subscriptionDtos);
    }

}