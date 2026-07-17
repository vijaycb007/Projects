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
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("AccountNumber")
    @Column(name = "account_number", nullable = false, unique = true)
    private Long accountNumber;

    @JsonProperty("AccName")
    @Column(name = "acc_name", nullable = false, length = 150)
    private String accName;

    @JsonProperty("Acctype")
    @Column(name = "acc_type", nullable = false, length = 30)
    private String accType;

    @JsonProperty("InitialBalance")
    @Column(name = "initial_balance", nullable = false)
    private double initialBalance;
}
