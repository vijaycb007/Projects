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
public class AccountRequestDto {

    @JsonProperty("AccountNumber")
    private Long accountNumber;

    @JsonProperty("AccName")
    @NotBlank(message = "AccName is required")
    private String accName;

    @JsonProperty("Acctype")
    @NotBlank(message = "Acctype is required")
    private String accType;

    @JsonProperty("InitialBalance")
    private double initialBalance;
}
