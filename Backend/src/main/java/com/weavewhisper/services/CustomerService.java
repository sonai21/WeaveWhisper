package com.weavewhisper.services;

import com.weavewhisper.dtos.RegisterUserDto;
import com.weavewhisper.dtos.UserResponseDto;

public interface CustomerService {
	void registerCustomer(RegisterUserDto customer);
	UserResponseDto updateCustomer(RegisterUserDto user);
}
