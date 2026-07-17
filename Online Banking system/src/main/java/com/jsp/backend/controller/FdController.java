package com.jsp.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jsp.backend.dto.request.FdRequestDto;
import com.jsp.backend.dto.response.ApiResponse;
import com.jsp.backend.entity.Fd;
import com.jsp.backend.service.FdService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/fd")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:3000" })
@AllArgsConstructor
public class FdController {

	private final FdService fdService;

	@GetMapping
	public ResponseEntity<ApiResponse<List<Fd>>> getAllFds() {
		return fdService.getAllFds();
	}

	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<Fd>> getById(@PathVariable Long id) {
		return fdService.getById(id);
	}

	@PostMapping
	public ResponseEntity<ApiResponse<Fd>> openFd(@Valid @RequestBody FdRequestDto request) {
		return fdService.openFd(request);
	}
}
