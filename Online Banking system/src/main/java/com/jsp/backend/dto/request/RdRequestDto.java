package com.jsp.backend.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RdRequestDto {

    @JsonProperty("CustomerName")
    @NotBlank(message = "CustomerName is required")
    private String customerName;

    @JsonProperty("AccountNumber")
    private Long accountNumber;

    @JsonProperty("MonthlyDeposit")
    private double monthlyDeposit;

    @JsonProperty("Tenure")
    @NotBlank(message = "Tenure is required")
    private String tenure;

    @JsonProperty("NomineeName")
    private String nomineeName;

    @JsonProperty("RelationshipWithNominee")
    private String relationshipWithNominee;

    // The frontend computes and sends these itself today; accepted here too,
    // but the service recomputes them server-side as the source of truth.
    @JsonProperty("InterestRate")
    private double interestRate;

    @JsonProperty("MaturityAmount")
    private double maturityAmount;
}
