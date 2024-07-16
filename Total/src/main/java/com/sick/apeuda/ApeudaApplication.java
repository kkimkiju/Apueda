package com.sick.apeuda;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class ApeudaApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApeudaApplication.class, args);
	}

}
