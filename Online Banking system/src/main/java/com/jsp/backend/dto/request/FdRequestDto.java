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
public class FdRequestDto {

    @JsonProperty("CustomerName")
    @NotBlank(message = "CustomerName is required")
    private String customerName;

    @JsonProperty("AccountNumber")
    private Long accountNumber;

    @JsonProperty("PANNumber")
    private String panNumber;

    @JsonProperty("MobileNumber")
    private String mobileNumber;

    @JsonProperty("DepositAmount")
    private double depositAmount;

    @JsonProperty("Tenure")
    @NotBlank(message = "Tenure is required")
    private String tenure;

    @JsonProperty("InterestPayout")
    private String interestPayout;

    @JsonProperty("NomineeName")
    private String nomineeName;

    @JsonProperty("RelationshipWithNominee")
    private String relationshipWithNominee;
}
