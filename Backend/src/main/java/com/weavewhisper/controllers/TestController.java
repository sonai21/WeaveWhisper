package com.weavewhisper.controllers;

import java.time.LocalDateTime;
import java.time.LocalTime;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.weavewhisper.dtos.ApiResponse;

@RestController
@RequestMapping("/api/tests")
public class TestController {

	@Value("${razorpay.key_id}")
	private String keyId;

	@Value("${razorpay.key_secret}")
	private String secret;

	@GetMapping("/test")
	public ResponseEntity<?> testMe() throws RazorpayException {

		RazorpayClient razorpayClient = new RazorpayClient(keyId, secret);
		JSONObject orderRequest = new JSONObject();
		orderRequest.put("amount", 10000);
		orderRequest.put("currency", "INR");
		orderRequest.put("receipt", "order_receipt_" + System.currentTimeMillis());

		Order order = razorpayClient.orders.create(orderRequest);

		System.out.println(order);

		String orderId = order.get("id");

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(orderId);
	}
}
