package com.jsp.backend.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.jsp.backend.entity.Fd;
import com.jsp.backend.repository.FdRepository;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class FdDao {

    private final FdRepository fdRepository;

    public Fd save(Fd fd) {
        return fdRepository.save(fd);
    }

    public List<Fd> findAll() {
        return fdRepository.findAll();
    }

    public Optional<Fd> findById(Long id) {
        return fdRepository.findById(id);
    }

    public Optional<Fd> findByAccountNumber(Long accountNumber) {
        return fdRepository.findByAccountNumber(accountNumber);
    }

    public boolean existsByAccountNumber(Long accountNumber) {
        return fdRepository.existsByAccountNumber(accountNumber);
    }
}
