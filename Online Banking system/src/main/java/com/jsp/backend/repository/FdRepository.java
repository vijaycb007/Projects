package com.jsp.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jsp.backend.entity.Fd;

import java.util.Optional;

public interface FdRepository extends JpaRepository<Fd, Long> {
    Optional<Fd> findByAccountNumber(Long accountNumber);
    boolean existsByAccountNumber(Long accountNumber);
}
