package com.jsp.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jsp.backend.dto.request.LoginRequestDto;
import com.jsp.backend.dto.response.ApiResponse;
import com.jsp.backend.dto.response.UserResponseDto;
import com.jsp.backend.service.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:3000" })
@AllArgsConstructor
public class AuthController {

	private final UserService userService;

	@PostMapping
	public ResponseEntity<ApiResponse<UserResponseDto>> login(@Valid @RequestBody LoginRequestDto request) {
		return userService.login(request);
	}
}
