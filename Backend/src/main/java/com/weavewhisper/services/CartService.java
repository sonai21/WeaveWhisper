package com.weavewhisper.services;

import java.util.List;

import com.razorpay.RazorpayException;
import com.weavewhisper.dtos.ApiResponse;
import com.weavewhisper.dtos.CartCountResponseDto;
import com.weavewhisper.dtos.CartRequestDto;
import com.weavewhisper.dtos.CartResponseDto;
import com.weavewhisper.dtos.PaymentSuccessRequestDto;
import com.weavewhisper.dtos.PlaceOrderRequestDto;
import com.weavewhisper.dtos.PlaceOrderResponseDto;

public interface CartService {
	
	CartCountResponseDto getCartCount( Long customerId);

	ApiResponse addCart(CartRequestDto cartRequestDto);

	List<CartResponseDto> getCartItemsForCustomer(Long customerId);

	ApiResponse removeCart(Long CartId, Long customerId);

	PlaceOrderResponseDto handlePlaceOrderRequest(PlaceOrderRequestDto placeOrderRequestDto) throws RazorpayException;
	
	ApiResponse handlePlaceOrderSuccess(PaymentSuccessRequestDto paymentSuccessRequestDto) throws RazorpayException;
	
	ApiResponse handlePlaceOrderByWallet(PlaceOrderRequestDto placeOrderRequestDto);
}
