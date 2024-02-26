package com.weavewhisper.services.impl;

import java.util.Date;

import org.json.JSONObject;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.Payment;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Refund;
import com.weavewhisper.custom_exceptions.ResourceNotFoundException;
import com.weavewhisper.dtos.AddBalanceRequestDto;
import com.weavewhisper.dtos.AddBalanceResponseDto;
import com.weavewhisper.dtos.ApiResponse;
import com.weavewhisper.dtos.PaymentSuccessRequestDto;
import com.weavewhisper.entities.Customer;
import com.weavewhisper.repositories.CustomerDao;
import com.weavewhisper.services.WalletService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class WalletServiceImpl implements WalletService {

	@Autowired
	private CustomerDao customerDao;

	@Value("${razorpay.key_id}")
	private String keyId;

	@Value("${razorpay.key_secret}")
	private String secret;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public double getBalance(Long userId) {
		Customer customer = customerDao.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("No such user found with that id"));
		return customer.getBalance();
	}

	@Override
	public AddBalanceResponseDto addBalanceRequest(AddBalanceRequestDto addBalanceRequestDto) throws RazorpayException {

		Customer customer = customerDao.findById(addBalanceRequestDto.getId())
				.orElseThrow(() -> new ResourceNotFoundException("No such user found with that id"));

		String reciept = "order#" + System.currentTimeMillis();

		RazorpayClient razorpayClient = new RazorpayClient(keyId, secret);

		JSONObject orderRequest = new JSONObject();
		orderRequest.put("amount", addBalanceRequestDto.getAmount() * 100);
		orderRequest.put("currency", "INR");
		orderRequest.put("receipt", reciept);

		JSONObject notes = new JSONObject();
		notes.put("id", customer.getId());
		notes.put("email", customer.getEmail());
		notes.put("fullName", customer.getFullName());
		notes.put("address", customer.getAddress());
		orderRequest.put("notes", notes);

		Order order = razorpayClient.orders.create(orderRequest);

		System.out.println(order);

		String orderId = order.get("id");

		AddBalanceResponseDto addBalanceResponseDto = modelMapper.map(customer, AddBalanceResponseDto.class);
		addBalanceResponseDto.setSuccess(true);
		addBalanceResponseDto.setOrderId(orderId);
		return addBalanceResponseDto;
	}

	@Override
	public ApiResponse addBalanceSuccess(PaymentSuccessRequestDto paymentSuccessRequestDto) throws RazorpayException {

		RazorpayClient razorpayClient = new RazorpayClient(keyId, secret);

//		Order order = razorpayClient.orders.fetch(paymentSuccessRequestDto.getRazorpay_order_id());
//		
//		System.out.println(order);

		Payment payment = razorpayClient.payments.fetch(paymentSuccessRequestDto.getRazorpay_payment_id());
		System.out.println(payment);

		int amount = payment.get("amount");
		amount /= 100;

		JSONObject notes = payment.get("notes");
		Long customerId = notes.getLong("id");
		String customerEmail = notes.getString("email");

		Customer customer = customerDao.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("No such user found with that id"));
		
		customer.setBalance(customer.getBalance()+amount*1.05);

		return new ApiResponse(true, "Amount successfully added to your wallet.");
	}

	@Override
	public ApiResponse addBalanceFalure(PaymentSuccessRequestDto paymentSuccessRequestDto) throws RazorpayException {
		RazorpayClient razorpayClient = new RazorpayClient(keyId, secret);
		
		JSONObject refundRequest = new JSONObject();
		refundRequest.put("payment_id", paymentSuccessRequestDto.getRazorpay_payment_id());
		Refund refund = razorpayClient.payments.refund(refundRequest);
		
		System.out.println(refund);

		return new ApiResponse(true, "Refund is being processed. Any amount deducted from your account will get refunded withing 4-7 business days.");
	}

}
