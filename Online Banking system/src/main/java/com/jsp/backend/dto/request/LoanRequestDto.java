package com.jsp.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoanRequestDto {

    @NotBlank(message = "applicantName is required")
    private String applicantName;

    @NotBlank(message = "accountNumber is required")
    private String accountNumber;

    @NotBlank(message = "loanType is required")
    private String loanType;

    @NotBlank(message = "amount is required")
    private String amount;

    @NotBlank(message = "tenure is required")
    private String tenure;

    @NotBlank(message = "income is required")
    private String income;

    private String purpose;
}
