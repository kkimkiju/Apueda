package com.sick.apeuda.service;

import com.sick.apeuda.dto.MemberDto;
import com.sick.apeuda.entity.Member;
import com.sick.apeuda.entity.Subscription;
import com.sick.apeuda.entity.UnlikeMember;
import com.sick.apeuda.errorhandler.TooManyRequestsException;
import com.sick.apeuda.jwt.TokenProvider;
import com.sick.apeuda.repository.DatingAppRepository;
import com.sick.apeuda.repository.MemberRepository;
import com.sick.apeuda.repository.SubscriptionRepository;
import com.sick.apeuda.repository.UnlikeMemberRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DatingAppService {

    @Autowired
    private DatingAppRepository datingAppRepository;
    @Autowired
    private UnlikeMemberRepository unlikeMemberRepository;
    @Autowired
    private SubscriptionRepository subscriptionRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private TokenProvider tokenProvider;
    private final Map<String, Timestamp> nonSubscriberUsageMap = new HashMap<>();
    // 구독 상태 확인
    private boolean isSubscribed(Member member) {
        Optional<Subscription> subscription = subscriptionRepository.findByMemberAndStatus(member, "구독");
        return subscription.isPresent();
    }
    // 구독 여부 확인
    public boolean checkSubscriptionStatus(String accessToken) {
        // 토큰이 유효성 확인
        if (!tokenProvider.validateToken(accessToken)) {
            throw new RuntimeException("Invalid access token");
        }
        // 토큰에서 사용자 이메일(Name)추출
        String memberEmail = tokenProvider.getAuthentication(accessToken).getName();
        // 이메일로 회원 정보 조회
        Member member = memberRepository.findByEmail(memberEmail)
                .orElseThrow(() -> new RuntimeException("회원이 존재하지 않습니다"));
        // 조회된 회원의 구독 정보 객체에 담기
        Optional<Subscription> subscriptions = subscriptionRepository.findByMemberAndStatus(member,"구독");
        // 구독 정보가 존재여부를 반환합니다. 존재하면 true 존재하지 않으면 false 존재하는데 구독이 아닐 가능성 확인
        return !subscriptions.isEmpty();
    }
    // 비구독자 사용 제한 하기
    private void checkNonSubscriberUsage(String currentUserEmail) {
        Timestamp lastUsage = nonSubscriberUsageMap.get(currentUserEmail);
        if (lastUsage != null) {
            LocalDateTime lastUsageTime = lastUsage.toLocalDateTime();
            LocalDateTime currentTime = LocalDateTime.now();
            long hoursDifference = ChronoUnit.HOURS.between(lastUsageTime, currentTime);
            if (hoursDifference < 24) { // 테스트용 시간 변경
                throw new TooManyRequestsException("허용된 횟수를 초과했습니다. 24시간 뒤 다시 시도해주세요.");
            }
        }
        nonSubscriberUsageMap.put(currentUserEmail, Timestamp.valueOf(LocalDateTime.now()));
    }

    // 본인, 친구, 이미친구신청한 유저 싫어요한 유저 제외한 유저 리스트 출력
    public List<MemberDto> getFilteredMemberList(String currentUserEmail) {
        List<Member> members = datingAppRepository.findFilteredMember(currentUserEmail);
        return members.stream()
                .limit(5) // 5개의 유저만 가져오기
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    private List<MemberDto> getMemberList(String currentUserEmail, int limit) {
        List<Member> members = datingAppRepository.findFilteredMember(currentUserEmail);
        return members.stream()
                .limit(limit)
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private MemberDto convertToDto(Member member) {
        MemberDto dto = new MemberDto();
        dto.setEmail(member.getEmail());
        dto.setNickname(member.getNickname());
        dto.setProfileImgPath(member.getProfileImgPath());
        dto.setSkill(member.getSkill());
        dto.setMyInfo(member.getMyInfo());
        return dto;
    }

    // 싫어하는 유저 저장
    @Transactional
    public void saveUnlikeMember(String memberEmail, String unlikeMemberEmail) {
        Member member = datingAppRepository.findById(memberEmail).orElseThrow();
        Member unlikeMember = datingAppRepository.findById(unlikeMemberEmail).orElseThrow();
        UnlikeMember unlike = new UnlikeMember();
        unlike.setMember(member);
        unlike.setUnlikeMember(unlikeMember);
        unlike.setTimestamp(new Timestamp(System.currentTimeMillis()));
        unlikeMemberRepository.save(unlike);
        System.out.println("Unlike member saved: " + unlike.toString());
    }
}
