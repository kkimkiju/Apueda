package com.sick.apeuda.repository;

import com.sick.apeuda.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, String> {
    Optional<Token> findByRefreshToken(String refreshToken);
}
