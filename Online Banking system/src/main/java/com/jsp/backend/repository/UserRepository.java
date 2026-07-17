package com.jsp.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jsp.backend.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndPassword(String email, String password);
    boolean existsByEmail(String email);
}
