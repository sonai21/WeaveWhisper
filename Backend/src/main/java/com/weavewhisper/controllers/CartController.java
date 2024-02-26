package com.weavewhisper.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.RazorpayException;
import com.weavewhisper.dtos.ApiResponse;
import com.weavewhisper.dtos.CartCountResponseDto;
import com.weavewhisper.dtos.CartRequestDto;
import com.weavewhisper.dtos.CartResponseDto;
import com.weavewhisper.dtos.PaymentSuccessRequestDto;
import com.weavewhisper.dtos.PlaceOrderRequestDto;
import com.weavewhisper.dtos.PlaceOrderResponseDto;
import com.weavewhisper.services.CartService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cart")
public class CartController {

	@Autowired
	private CartService cartService;
	
	@GetMapping("/getcount/customer/{customerId}")
	public ResponseEntity<?> getCartCount(@PathVariable Long customerId){
		CartCountResponseDto cartCountResponseDto = cartService.getCartCount(customerId);
		return ResponseEntity.status(HttpStatus.OK).body(cartCountResponseDto);
	}
	

	@PostMapping("/add")
	public ResponseEntity<?> addProductInCart(@RequestBody CartRequestDto cartRequestDto) {
		System.out.println(cartRequestDto);
		ApiResponse apiRes = cartService.addCart(cartRequestDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(apiRes);
	}

	@DeleteMapping("/{cartId}/customer/{customerId}")
	public ResponseEntity<?> deleteProductFromCart(@PathVariable Long cartId, @PathVariable Long customerId) {
		ApiResponse apiRes = cartService.removeCart(cartId, customerId);
		return ResponseEntity.status(HttpStatus.OK).body(apiRes);
	}

	@GetMapping("/{customerId}")
	public ResponseEntity<?> getCartItems(@PathVariable Long customerId) {
		List<CartResponseDto> cartResList = cartService.getCartItemsForCustomer(customerId);
		return ResponseEntity.status(HttpStatus.OK).body(cartResList);
	}
	
	@PostMapping("/placeorderrequest")
	public ResponseEntity<?> handlePlaceOrderRequest(@RequestBody PlaceOrderRequestDto placeOrderRequestDto) throws RazorpayException{
		PlaceOrderResponseDto placeOrderResponseDto = cartService.handlePlaceOrderRequest(placeOrderRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(placeOrderResponseDto);
	}
	
	@PostMapping("/placeordersuccess")
	public ResponseEntity<?> handlePlaceOrderSuccess(
			@RequestBody @Valid PaymentSuccessRequestDto paymentSuccessRequestDto) throws RazorpayException {
		ApiResponse apiResponse = cartService.handlePlaceOrderSuccess(paymentSuccessRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
	}
	
	@PostMapping("/placeorderbywallet")
	public ResponseEntity<?> handlePlaceOrderByWalletRequest(@RequestBody PlaceOrderRequestDto placeOrderRequestDto) throws RazorpayException{
		ApiResponse apiResponse = cartService.handlePlaceOrderByWallet(placeOrderRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
	}

}
