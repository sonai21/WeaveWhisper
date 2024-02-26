package com.weavewhisper.services;

import com.weavewhisper.dtos.AuthDto;
import com.weavewhisper.dtos.UserResponseDto;

public interface UserService {
	UserResponseDto loginUser(AuthDto authDto);
}
