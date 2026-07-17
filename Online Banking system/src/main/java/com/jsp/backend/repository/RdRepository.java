package com.jsp.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jsp.backend.entity.Rd;

import java.util.List;

public interface RdRepository extends JpaRepository<Rd, Long> {
    List<Rd> findByAccountNumber(Long accountNumber);
}
