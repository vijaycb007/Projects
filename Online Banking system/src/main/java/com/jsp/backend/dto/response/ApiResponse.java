package com.jsp.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {

	private int statusCode;
	private String message;
	private T data;

	public static <T> ApiResponse<T> of(int statusCode, String message, T data) {
		return new ApiResponse<>(statusCode, message, data);
	}
}
