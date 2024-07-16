package com.sick.apeuda.dto;


import com.sick.apeuda.constant.Authority;
import com.sick.apeuda.entity.Member;
import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberReqDto {
    private String email;
    private String password;
    private String name;
    private String nickname;
    private String identityNumber;
    private String profileImgPath;
    private List<String> skill;
    private String myInfo;


    public Member toEntity(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .email(email)
                .name(name)
                .password(passwordEncoder.encode(password))
                .nickname(nickname)
                .identityNumber(identityNumber)
                .profileImgPath(profileImgPath)
                .skill(String.join(",", skill))
                .myInfo(myInfo)
                .authority(Authority.ROLE_USER)
                .build();
    }


    public void updateMember(Member member, PasswordEncoder passwordEncoder) {
        Member.builder()
                .password(password != null && !password.isEmpty() ? passwordEncoder.encode(password) : member.getPassword())
                .nickname(nickname != null ? nickname : member.getNickname())
                .profileImgPath(profileImgPath != null ? profileImgPath : member.getProfileImgPath())
                .skill(skill != null ? String.join(",", skill) : member.getSkill())
                .myInfo(myInfo != null ? myInfo : member.getMyInfo())
                .authority(Authority.ROLE_USER)
                .build();
    }



    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(email, password);
    }
}