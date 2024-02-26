package com.weavewhisper.services;

import java.util.List;

import com.weavewhisper.dtos.ApiResponse;
import com.weavewhisper.dtos.CancelOrderRequestDto;
import com.weavewhisper.dtos.OrderHistoryResponseDto;

public interface OrderHistoryService {
	List<OrderHistoryResponseDto> getOrderHistoryOfCustomer(Long customerId);

	ApiResponse cancelOrder(CancelOrderRequestDto cancelOrderRequestDto);
	
	ApiResponse returnOrder(CancelOrderRequestDto returnOrderRequestDto);
}
