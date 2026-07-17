package com.jsp.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "applicant_name", nullable = false, length = 150)
    private String applicantName;

    // Kept as String: the frontend sends the raw text-input value.
    @Column(name = "account_number", nullable = false, length = 20)
    private String accountNumber;

    @Column(name = "loan_type", nullable = false, length = 30)
    private String loanType;

    @Column(name = "amount", nullable = false, length = 20)
    private String amount;

    @Column(name = "tenure", nullable = false, length = 10)
    private String tenure;

    @Column(name = "income", nullable = false, length = 20)
    private String income;

    @Column(name = "purpose", length = 500)
    private String purpose;

    @Column(name = "account_id")
    private Long accountId;

    @Column(name = "account_name", length = 150)
    private String accountName;

    @Column(name = "rate")
    private double rate;

    @Column(name = "estimated_emi")
    private long estimatedEmi;

    // "Pre-approved" | "Under Review" | ... (also used for repayment/status
    // updates and the delete-loan action mentioned in the README).
    @Column(name = "status", length = 30)
    private String status;

    @Column(name = "applied_at", length = 60)
    private String appliedAt;
}
