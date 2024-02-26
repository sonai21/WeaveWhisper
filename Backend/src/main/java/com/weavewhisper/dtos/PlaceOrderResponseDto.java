package com.weavewhisper.dtos;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PlaceOrderResponseDto {
	private boolean success;
	private String orderId;
	private double totalAmount;
	private String fullName;
	private String email;
	private String address;
	private String phoneNumber;
}
