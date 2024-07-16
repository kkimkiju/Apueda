    package com.sick.apeuda.repository;


    import com.sick.apeuda.entity.Member;

    import com.sick.apeuda.entity.Subscription;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.data.jpa.repository.Query;
    import org.springframework.data.repository.query.Param;

    import java.util.List;
    import java.util.Optional;

    public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
        @Query("SELECT s FROM Subscription s WHERE s.member.id = :memberId")
        Subscription findByMemberId(@Param("memberId") String memberId);

        List<Subscription> findByMember(Member member);
        //해당유저가 구독상태인지 조회
        Optional<Subscription> findByMemberAndStatus(Member member, String status);
    }
