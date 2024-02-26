package com.weavewhisper.dtos;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CancelOrderRequestDto {
	private Long customerId;
	private Long productId;
	private Long orderId;
}
