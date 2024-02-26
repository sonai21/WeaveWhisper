package com.weavewhisper.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class AddBalanceResponseDto {
	private boolean success;
	private String orderId;
	private String fullName;
	private String email;
	private String address;
	private String phoneNumber;
}
