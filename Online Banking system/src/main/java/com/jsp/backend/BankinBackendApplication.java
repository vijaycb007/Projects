package com.jsp.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for the Bankin backend REST API.
 *
 * This application intentionally does NOT include Spring Security, per project
 * requirements. All endpoints are open. If you plan to deploy this beyond local
 * development, add authentication/authorization before going live.
 */
@SpringBootApplication
public class BankinBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BankinBackendApplication.class, args);
    }
}
