package com.jsp.backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.jsp.backend.dao.UserDao;
import com.jsp.backend.dto.request.LoginRequestDto;
import com.jsp.backend.dto.request.RegisterRequestDto;
import com.jsp.backend.dto.response.ApiResponse;
import com.jsp.backend.dto.response.UserResponseDto;
import com.jsp.backend.entity.User;
import com.jsp.backend.exception.DuplicateResourceException;
import com.jsp.backend.exception.InvalidRequestException;
import com.jsp.backend.exception.ResourceNotFoundException;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {

    private final UserDao userDao;

    public ResponseEntity<ApiResponse<List<User>>> getAllUsersRaw() {
        List<User> users = userDao.findAll();
        ApiResponse<List<User>> body = new ApiResponse<>(HttpStatus.OK.value(), "Users fetched successfully", users);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse<User>> getById(Long id) {
        User user = userDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        ApiResponse<User> body = new ApiResponse<>(HttpStatus.OK.value(), "User fetched successfully", user);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse<User>> register(RegisterRequestDto request) {
        if (userDao.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("An account with email '" + request.getEmail() + "' already exists");
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(request.getPassword())
                .phNum(request.getPhNum())
                .build();
        User saved = userDao.save(user);

        ApiResponse<User> body = new ApiResponse<>(HttpStatus.CREATED.value(), "User registered successfully", saved);
        return new ResponseEntity<>(body, HttpStatus.CREATED);
    }

    /** Proper server-side authentication check for a future /login integration. */
    public ResponseEntity<ApiResponse<UserResponseDto>> login(LoginRequestDto request) {
        User user = userDao.findByEmail(request.getEmail())
                .orElseThrow(() -> new InvalidRequestException("Invalid email or password"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new InvalidRequestException("Invalid email or password");
        }

        UserResponseDto dto = UserResponseDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .phNum(user.getPhNum())
                .build();

        ApiResponse<UserResponseDto> body = new ApiResponse<>(HttpStatus.OK.value(), "Login successful", dto);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }
}
