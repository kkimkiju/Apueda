//UnlikeMemberDto.java
package com.sick.apeuda.dto;


import com.sick.apeuda.entity.Member;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class UnlikeMemberDto {

    private Long id;
    private Member member;
    private Member unlikeMember;
    private Timestamp timestamp;
}
