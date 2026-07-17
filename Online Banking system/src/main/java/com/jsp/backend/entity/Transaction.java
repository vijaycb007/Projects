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
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // -------- deposit / withdraw fields --------
    @JsonProperty("accountID")
    @Column(name = "account_id")
    private Long accountId;

    @Column(name = "account_number")
    private Long accountNumber;

    @Column(name = "account_name", length = 150)
    private String accountName;

    // -------- transfer fields --------
    @Column(name = "sender_account_no")
    private Long senderAccountNo;

    @Column(name = "sender_name", length = 150)
    private String senderName;

    @Column(name = "reciver_account_no")
    private Long reciverAccountNo;

    @Column(name = "reciver_name", length = 150)
    private String reciverName;

    // -------- common fields --------
    // Kept as String to match the raw form-input values the React app posts.
    @Column(name = "amount", nullable = false, length = 30)
    private String amount;

    @Column(name = "description", length = 255)
    private String description;

    // "deposit" | "withdraw" | "Transfer"
    @Column(name = "type", nullable = false, length = 20)
    private String type;

    // Stored as the locale string the frontend already generates
    // (new Date().toLocaleString()), e.g. "7/2/2026, 9:02:18 AM".
    @Column(name = "txn_date", length = 60)
    private String date;
}
