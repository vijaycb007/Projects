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
public class TransferRequestDto {

	private double amount;

	private Long receiverAccountNumber;

	@NotBlank(message = "receiver name is required")
	private String receiverName;

	private String description;
}
