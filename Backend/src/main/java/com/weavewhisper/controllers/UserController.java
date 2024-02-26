package com.weavewhisper.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.weavewhisper.dtos.ApiResponse;
import com.weavewhisper.dtos.AuthDto;
import com.weavewhisper.dtos.ProductShortResponseDto;
import com.weavewhisper.dtos.RegisterUserDto;
import com.weavewhisper.dtos.UserResponseDto;
import com.weavewhisper.enums.UserType;
import com.weavewhisper.services.CustomerService;
import com.weavewhisper.services.ManufacturerService;
import com.weavewhisper.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	public CustomerService customerService;

	@Autowired
	public ManufacturerService manufacturerService;

	@Autowired
	public UserService userService;

	@PostMapping("/sign-up")
	public ResponseEntity<?> registerUser(@RequestBody @Valid RegisterUserDto user) {
		if (user.getType().equals(UserType.CUSTOMER)) {
			customerService.registerCustomer(user);
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(new ApiResponse(true, "Customer registered successfully!"));
		} else if (user.getType().equals(UserType.MANUFACTURER)) {
			manufacturerService.registerManufacturer(user);
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(new ApiResponse(true, "Manufacturer registered successfully!"));
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Something went wrong!"));
		}
	}

	@PutMapping("/update")
	public ResponseEntity<?> updateUser(@RequestBody RegisterUserDto user) {
		if (user.getType().equals(UserType.CUSTOMER)) {
			UserResponseDto userResponseDto = customerService.updateCustomer(user);
			return ResponseEntity.status(HttpStatus.OK).body(userResponseDto);
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Something went wrong!"));
		}
	}

	@PostMapping("/sign-in")
	public ResponseEntity<?> loginUser(@RequestBody @Valid AuthDto authDto) {
		System.out.println(authDto);
		UserResponseDto userResponseDto = userService.loginUser(authDto);
		return ResponseEntity.status(HttpStatus.OK).body(userResponseDto);
	}

	@DeleteMapping("/delete/{manudacturerId}")
	public ResponseEntity<?> deleteManufacturer(@PathVariable Long manudacturerId) {
		ApiResponse apiResProductDelete = manufacturerService.deleteManufacturerListings(manudacturerId);
		ApiResponse apiRes = manufacturerService.deleteManufacturer(manudacturerId);
		return ResponseEntity.status(HttpStatus.OK).body(apiRes);
	}

	@GetMapping("/products/manufacturer/{manufacturerId}")
	public ResponseEntity<?> getProductForSpecificManufacturer(@PathVariable Long manufacturerId) {
		List<ProductShortResponseDto> productShortResponseDto = manufacturerService.getAllProducts(manufacturerId);
		return ResponseEntity.status(HttpStatus.OK).body(productShortResponseDto);
	}

}
