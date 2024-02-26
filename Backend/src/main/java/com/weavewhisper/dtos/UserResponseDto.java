package com.weavewhisper.dtos;

import com.weavewhisper.enums.UserType;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserResponseDto {
	private Long id;
	private String email;
	private UserType type;
	private String fullName;
	private String phoneNumber;
	private String address;
	private String brandName;
	private double balance;
	private int cartCount;
}
