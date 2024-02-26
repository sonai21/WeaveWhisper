package com.weavewhisper.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProductCreatedApiResponseDto {
	private Long productId;
	private boolean success;
	private String message;
}
