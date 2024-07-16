package com.sick.apeuda.repository;


import com.sick.apeuda.entity.Member;
import com.sick.apeuda.entity.PaymentHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface PaymentHistoryRepository extends JpaRepository<PaymentHistory, Long> {
    Page<PaymentHistory> findByMemberOrderByPaymentDateDesc(Member member, Pageable pageable);
}