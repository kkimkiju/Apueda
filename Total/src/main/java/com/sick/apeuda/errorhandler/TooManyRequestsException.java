package com.sick.apeuda.errorhandler;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// 에러코드 429 반환
@ResponseStatus(value = HttpStatus.TOO_MANY_REQUESTS, reason = "너무 많은 요청을 보냈습니다.")
public class TooManyRequestsException extends RuntimeException {
    public TooManyRequestsException(String message) {
        super(message);
    }
}