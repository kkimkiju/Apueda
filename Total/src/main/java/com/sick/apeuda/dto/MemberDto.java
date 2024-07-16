//MemberDto.java
package com.sick.apeuda.dto;

import com.sick.apeuda.entity.Member;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberDto {
    private String email;
    private String password;
    private String name;
    private String nickname;
    private String identityNumber;
    private String profileImgPath;
    private String skill;
    private String myInfo;
    

    public static MemberDto of(Member member) {
        return MemberDto.builder()
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
