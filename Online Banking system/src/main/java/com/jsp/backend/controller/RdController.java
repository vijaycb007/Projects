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

import com.jsp.backend.dto.request.RdRequestDto;
import com.jsp.backend.dto.response.ApiResponse;
import com.jsp.backend.entity.Rd;
import com.jsp.backend.service.RdService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/rd")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
@AllArgsConstructor
public class RdController {

    private final RdService rdService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Rd>>> getAllRds() {
        return rdService.getAllRds();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Rd>> getById(@PathVariable Long id) {
        return rdService.getById(id);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Rd>> openRd(@Valid @RequestBody RdRequestDto request) {
        return rdService.openRd(request);
    }
}
