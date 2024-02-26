package com.weavewhisper.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.weavewhisper.dtos.AdminHomePageResponseDto;
import com.weavewhisper.dtos.ApiResponse;
import com.weavewhisper.dtos.admindtos.AdminLoginRequestDto;
import com.weavewhisper.dtos.admindtos.AdminLoginResponseDto;
import com.weavewhisper.dtos.admindtos.AdminRegistrationRequestDto;
import com.weavewhisper.dtos.admindtos.ManufacturerChangeAccountStatusRequestDto;
import com.weavewhisper.services.AdminService;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

	@Autowired
	private AdminService adminService;

	@PostMapping("/register")
	public ResponseEntity<?> registerAdmin(@RequestBody AdminRegistrationRequestDto adminRegistrationRequestDto) {
		ApiResponse apiResp = adminService.register(adminRegistrationRequestDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(apiResp);
	}

	@PostMapping("/login")
	public ResponseEntity<?> loginAdmin(@RequestBody AdminLoginRequestDto adminLoginRequestDto) {
		AdminLoginResponseDto adminLoginResponseDto = adminService.login(adminLoginRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(adminLoginResponseDto);
	}

	@GetMapping("/gethomepagedetails")
	public ResponseEntity<?> getHomePageDetails() {
		AdminHomePageResponseDto resDto = adminService.getHomePageDetails();
		return ResponseEntity.status(HttpStatus.OK).body(resDto);
	}

	@GetMapping("/getrequestedmanufacturerregistration")
	public ResponseEntity<?> getRequestedManufacturerRegistration() {
		List<?> reqManufacturerList = adminService.getRequestedManufacturerRegistration();
		return ResponseEntity.status(HttpStatus.OK).body(reqManufacturerList);
	}

	@PostMapping("/changemanufactureraccountstatus")
	public ResponseEntity<?> handleChangeManufacturerAccountStatus(
			@RequestBody ManufacturerChangeAccountStatusRequestDto manufacturerChangeAccountStatusRequestDto) {
		ApiResponse apiRes = adminService.changeManufacturerAccountStatus(manufacturerChangeAccountStatusRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(apiRes);
	}

	@GetMapping("/getallmanufacturers")
	public ResponseEntity<?> getAllManufacturers() {
		List<?> manufacturerList = adminService.getAllManufacturers();
		return ResponseEntity.status(HttpStatus.OK).body(manufacturerList);
	}

}
