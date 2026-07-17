package com.jsp.backend.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.jsp.backend.entity.Rd;
import com.jsp.backend.repository.RdRepository;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class RdDao {

    private final RdRepository rdRepository;

    public Rd save(Rd rd) {
        return rdRepository.save(rd);
    }

    public List<Rd> findAll() {
        return rdRepository.findAll();
    }

    public Optional<Rd> findById(Long id) {
        return rdRepository.findById(id);
    }

    public List<Rd> findByAccountNumber(Long accountNumber) {
        return rdRepository.findByAccountNumber(accountNumber);
    }
}
