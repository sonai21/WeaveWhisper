package com.weavewhisper.dtos;

import com.weavewhisper.enums.UserType;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AuthDto {
	@Email(message = "Invalid email address")
	private String email;
	@NotBlank
	private String password;
}
