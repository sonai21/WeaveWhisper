package com.weavewhisper.dtos.admindtos;

import com.weavewhisper.enums.UserType;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AdminLoginResponseDto {
	private Long id;
	private String email;
	private String password;
	private UserType type;
}
