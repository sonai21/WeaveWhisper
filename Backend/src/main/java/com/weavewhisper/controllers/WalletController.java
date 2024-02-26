package com.weavewhisper.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.RazorpayException;
import com.weavewhisper.dtos.AddBalanceRequestDto;
import com.weavewhisper.dtos.AddBalanceResponseDto;
import com.weavewhisper.dtos.ApiResponse;
import com.weavewhisper.dtos.BalanceResponseDto;
import com.weavewhisper.dtos.PaymentSuccessRequestDto;
import com.weavewhisper.services.WalletService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/balance")
public class WalletController {

	@Autowired
	public WalletService walletService;

	@GetMapping("/user/{userId}")
	public ResponseEntity<?> getMethodName(@PathVariable Long userId) {
		double bal = walletService.getBalance(userId);
		return ResponseEntity.status(HttpStatus.OK).body(new BalanceResponseDto(true, bal));
	}

	@PostMapping("/addrequest")
	public ResponseEntity<?> addBalance(@RequestBody @Valid AddBalanceRequestDto addBalanceRequestDto)
			throws RazorpayException {
		AddBalanceResponseDto addBalanceResponseDto = walletService.addBalanceRequest(addBalanceRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(addBalanceResponseDto);
	}

	@PostMapping("/addsuccess")
	public ResponseEntity<?> handleAddBalanceSuccess(
			@RequestBody @Valid PaymentSuccessRequestDto paymentSuccessRequestDto) throws RazorpayException {
		ApiResponse apiResponse = walletService.addBalanceSuccess(paymentSuccessRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
	}

	@PostMapping("/addfailure")
	public ResponseEntity<?> handleAddBalanceFailure(
			@RequestBody @Valid PaymentSuccessRequestDto paymentSuccessRequestDto) throws RazorpayException {
		ApiResponse apiResponse = walletService.addBalanceFalure(paymentSuccessRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
	}

}
