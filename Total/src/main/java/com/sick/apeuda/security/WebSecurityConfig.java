//WebSecurityConfig.java






package com.sick.apeuda.security;

import com.sick.apeuda.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@Component
public class WebSecurityConfig implements WebMvcConfigurer {

    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint; // 인증 실패 시 처리할 클래스
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler; // 인가 실패 시 처리할 클래스
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // BCrypt 암호화 객체를 Bean으로 등록
    }

    @Bean // SecurityFilterChain 객체를 Bean으로 등록
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http

                .httpBasic()
                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
                .and()
                .authorizeRequests()
                // board 로직 시험해보려고 추가해놓음 나중에 삭제 필요
                .antMatchers("/static/**","/","/auth/**", "/email/**","/friends/**","/payments/subscriptions","/payments/save","/payments/info","/kakaologin/**").permitAll()
                .antMatchers("/v2/api-docs", "/swagger-resources/**", "/swagger-ui.html", "/webjars/**", "/swagger/**", "/sign-api/exception","/unsubmodal/**","/mysub/**","/Unsubmodal/**","/Mysub/**").permitAll()
                // 웹소켓 확인을 위한 예외 처리주소
                .antMatchers("/ws/**", "app/**","/api/sample", "/swagger-ui.html#/**").permitAll()
                .antMatchers("/chat/**").authenticated() // 채팅시 jwt 검증 추가
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .antMatchers("/favicon.ico","/manifest.json", "/logo192.png", "/apueda/string").permitAll()
                .anyRequest().authenticated()
                .and()
                .apply(new JwtSecurityConfig(tokenProvider));

        return http.build();
    }

}
