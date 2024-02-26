package com.weavewhisper.dtos.admindtos;

import com.weavewhisper.enums.UserType;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AdminRegistrationRequestDto {

	@Email(message = "Invalid email address")
	private String email;
	@NotBlank
	@Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.* ).{6,20}$", message = "Invalid password")
	private String password;
}
