package com.jsp.backend.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.jsp.backend.entity.Loan;
import com.jsp.backend.repository.LoanRepository;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class LoanDao {

    private final LoanRepository loanRepository;

    public Loan save(Loan loan) {
        return loanRepository.save(loan);
    }

    public List<Loan> findAll() {
        return loanRepository.findAll();
    }

    public Optional<Loan> findById(Long id) {
        return loanRepository.findById(id);
    }

    public List<Loan> findByAccountNumber(String accountNumber) {
        return loanRepository.findByAccountNumber(accountNumber);
    }

    public void deleteById(Long id) {
        loanRepository.deleteById(id);
    }
}
