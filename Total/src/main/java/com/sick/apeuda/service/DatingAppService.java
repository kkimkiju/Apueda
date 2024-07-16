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

    // 구독 여부 확인
    public boolean checkSubscriptionStatus(String accessToken) {
        if (!tokenProvider.validateToken(accessToken)) {
            throw new RuntimeException("Invalid access token");
        }
        String memberEmail = tokenProvider.getAuthentication(accessToken).getName();
        Member member = memberRepository.findByEmail(memberEmail)
                .orElseThrow(() -> new RuntimeException("회원이 존재하지 않습니다"));
        List<Subscription> subscriptions = subscriptionRepository.findByMember(member);
        return !subscriptions.isEmpty();
    }

    // 본인을 제외한 유저 리스트 출력
    public List<MemberDto> getFilteredMemberList(String currentUserEmail) {
        Member currentUser = datingAppRepository.findById(currentUserEmail).orElseThrow(
                () -> new RuntimeException("Member with email " + currentUserEmail + " does not exist")
        );

        if (isSubscribed(currentUser)) {
            return getMemberList(currentUserEmail, 5);
        } else {
            checkNonSubscriberUsage(currentUserEmail);
            return getMemberList(currentUserEmail, 5);
        }
    }

    // 구독 상태 확인
    private boolean isSubscribed(Member member) {
        Optional<Subscription> subscription = subscriptionRepository.findByMemberAndStatus(member, "구독");
        return subscription.isPresent();
    }

    // 비구독자 사용 제한 확인
    private void checkNonSubscriberUsage(String currentUserEmail) {
        Timestamp lastUsage = nonSubscriberUsageMap.get(currentUserEmail);
        if (lastUsage != null) {
            LocalDateTime lastUsageTime = lastUsage.toLocalDateTime();
            LocalDateTime currentTime = LocalDateTime.now();
            long hoursDifference = ChronoUnit.HOURS.between(lastUsageTime, currentTime);
            if (hoursDifference < 0.01) { // 테스트용 시간 변경
                throw new TooManyRequestsException("허용된 횟수를 초과했습니다. 24시간 뒤 다시 시도해주세요.");
            }
        }
        nonSubscriberUsageMap.put(currentUserEmail, Timestamp.valueOf(LocalDateTime.now()));
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
