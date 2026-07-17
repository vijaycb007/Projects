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
public class Fd {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("CustomerName")
    @Column(name = "customer_name", nullable = false, length = 150)
    private String customerName;

    @JsonProperty("AccountNumber")
    @Column(name = "account_number", nullable = false)
    private Long accountNumber;

    @JsonProperty("PANNumber")
    @Column(name = "pan_number", length = 20)
    private String panNumber;

    @JsonProperty("MobileNumber")
    @Column(name = "mobile_number", length = 15)
    private String mobileNumber;

    @JsonProperty("DepositAmount")
    @Column(name = "deposit_amount", nullable = false)
    private double depositAmount;

    // Stored as text ("1 Year", "2 Years"...) to match the <select> options.
    @JsonProperty("Tenure")
    @Column(name = "tenure", nullable = false, length = 20)
    private String tenure;

    @JsonProperty("InterestPayout")
    @Column(name = "interest_payout", length = 20)
    private String interestPayout;

    @JsonProperty("NomineeName")
    @Column(name = "nominee_name", length = 150)
    private String nomineeName;

    @JsonProperty("RelationshipWithNominee")
    @Column(name = "relationship_with_nominee", length = 60)
    private String relationshipWithNominee;
}
