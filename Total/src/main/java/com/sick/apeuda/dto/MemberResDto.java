package com.sick.apeuda.dto;

import com.sick.apeuda.constant.Authority;
import com.sick.apeuda.entity.Member;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberResDto {
    private String email;
    private String password;
    private String name;
    private String nickname;
    private String identityNumber;
    private String profileImgPath;
    private String skill;
    private String myInfo;


    public static MemberResDto of(Member member) {
        return MemberResDto.builder()
                .email(member.getEmail())
                .name(member.getName())
                .password(member.getPassword())
                .nickname(member.getNickname())
                .identityNumber(member.getIdentityNumber())
                .profileImgPath(member.getProfileImgPath())
                .skill(member.getSkill())
                .myInfo(member.getMyInfo())
                .build();

    }
}



