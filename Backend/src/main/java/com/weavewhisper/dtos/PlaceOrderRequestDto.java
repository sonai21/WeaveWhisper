package com.weavewhisper.dtos;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PlaceOrderRequestDto {
	private Long customerId;
	private String address;
	private String phoneNumber;
}
