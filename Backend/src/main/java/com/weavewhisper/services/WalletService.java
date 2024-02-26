package com.weavewhisper.services;

import com.razorpay.RazorpayException;
import com.weavewhisper.dtos.AddBalanceRequestDto;
import com.weavewhisper.dtos.AddBalanceResponseDto;
import com.weavewhisper.dtos.ApiResponse;
import com.weavewhisper.dtos.PaymentSuccessRequestDto;

public interface WalletService {
	double getBalance(Long userId);
	AddBalanceResponseDto addBalanceRequest(AddBalanceRequestDto addBalanceRequestDto) throws RazorpayException;
	ApiResponse addBalanceSuccess(PaymentSuccessRequestDto paymentSuccessRequestDto) throws RazorpayException;
	ApiResponse addBalanceFalure(PaymentSuccessRequestDto paymentSuccessRequestDto) throws RazorpayException;
}
