package com.weavewhisper.services;

import java.util.List;

import com.weavewhisper.dtos.AdminHomePageResponseDto;
import com.weavewhisper.dtos.ApiResponse;
import com.weavewhisper.dtos.admindtos.AdminLoginRequestDto;
import com.weavewhisper.dtos.admindtos.AdminLoginResponseDto;
import com.weavewhisper.dtos.admindtos.AdminRegistrationRequestDto;
import com.weavewhisper.dtos.admindtos.ManufacturerChangeAccountStatusRequestDto;

public interface AdminService {
	AdminLoginResponseDto login(AdminLoginRequestDto adminLoginRequestDto);

	ApiResponse register(AdminRegistrationRequestDto adminRegistrationRequestDto);

	List<?> getRequestedManufacturerRegistration();

	ApiResponse changeManufacturerAccountStatus(
			ManufacturerChangeAccountStatusRequestDto manufacturerChangeAccountStatusRequestDto);
	
	List<?> getAllManufacturers();
	
	AdminHomePageResponseDto getHomePageDetails();
}
