package com.sick.apeuda.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AccessTokenDto {
    private String grantType;
    private String accessToken;
    private long accessTokenExpiresIn;
}
