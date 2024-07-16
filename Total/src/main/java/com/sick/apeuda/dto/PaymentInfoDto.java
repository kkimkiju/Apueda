package com.sick.apeuda.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PaymentInfoDto {
    private Long paymentInfoId;
    private String email;
    private String paymentMethodCode;
    private String paymentDetails;
}