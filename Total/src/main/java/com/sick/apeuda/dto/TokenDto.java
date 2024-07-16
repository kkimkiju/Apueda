package com.sick.apeuda.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenDto {
    private String grantType;
    private String accessToken; // 엑세스 토큰
    private Long tokenExpiresIn; // 엑세스 토큰 만료
    private String refreshToken; // 토큰 리프레시
    private Long refreshTokenExpiresIn; // 토크 리프레시 만료 시간 
}