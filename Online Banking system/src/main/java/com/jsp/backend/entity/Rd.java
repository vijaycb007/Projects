package com.jsp.backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

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
public class Rd {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("CustomerName")
    @Column(name = "customer_name", nullable = false, length = 150)
    private String customerName;

    @JsonProperty("AccountNumber")
    @Column(name = "account_number", nullable = false)
    private Long accountNumber;

    @JsonProperty("MonthlyDeposit")
    @Column(name = "monthly_deposit", nullable = false)
    private double monthlyDeposit;

    // Stored as text months count e.g. "12", "24" to match the <select>.
    @JsonProperty("Tenure")
    @Column(name = "tenure", nullable = false, length = 10)
    private String tenure;

    @JsonProperty("NomineeName")
    @Column(name = "nominee_name", length = 150)
    private String nomineeName;

    @JsonProperty("RelationshipWithNominee")
    @Column(name = "relationship_with_nominee", length = 60)
    private String relationshipWithNominee;

    @JsonProperty("InterestRate")
    @Column(name = "interest_rate", nullable = false)
    private double interestRate;

    @JsonProperty("MaturityAmount")
    @Column(name = "maturity_amount", nullable = false)
    private double maturityAmount;

    @JsonProperty("CreatedAt")
    @Column(name = "created_at", length = 60)
    private String createdAt;
}
