package com.weavewhisper.controllers;

import java.util.List;

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
import com.weavewhisper.dtos.ApiResponse;
import com.weavewhisper.dtos.CancelOrderRequestDto;
import com.weavewhisper.dtos.OrderHistoryResponseDto;
import com.weavewhisper.services.OrderHistoryService;

@RestController
@RequestMapping("/api/orderhistory")
public class OrderHistoryController {

	@Autowired
	private OrderHistoryService orderHistoryService;

	@GetMapping("/{customerId}")
	public ResponseEntity<?> getCustomerOrderHistory(@PathVariable Long customerId) {
		List<OrderHistoryResponseDto> oHistResList = orderHistoryService.getOrderHistoryOfCustomer(customerId);
		return ResponseEntity.status(HttpStatus.OK).body(oHistResList);
	}

	@PostMapping("/cancelorder")
	public ResponseEntity<?> handleCancelOrder(@RequestBody CancelOrderRequestDto cancelOrderRequestDto) {
		ApiResponse apiRes = orderHistoryService.cancelOrder(cancelOrderRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(apiRes);
	}
	
	@PostMapping("/returnorder")
	public ResponseEntity<?> handleReturnOrder(@RequestBody CancelOrderRequestDto returnOrderRequestDto) {
		ApiResponse apiRes = orderHistoryService.returnOrder(returnOrderRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(apiRes);
	}

}
