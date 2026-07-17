package com.jsp.backend.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionRequestDto {

	@JsonProperty("accountID")
	private Long accountId;
	private Long accountNumber;
	private String accountName;

	private Long senderAccountNo;
	private String senderName;
	private Long reciverAccountNo;
	private String reciverName;

	private String amount;
	private String description;
	private String type;
	private String date;
}
