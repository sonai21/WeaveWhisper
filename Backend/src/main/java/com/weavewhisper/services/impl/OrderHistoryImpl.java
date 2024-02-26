package com.weavewhisper.services.impl;

import java.time.LocalDateTime;
import java.time.chrono.ChronoLocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.json.JSONObject;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Refund;
import com.weavewhisper.custom_exceptions.IllegalCancellationRequestException;
import com.weavewhisper.custom_exceptions.IllegalStatusChangeException;
import com.weavewhisper.custom_exceptions.ResourceNotFoundException;
import com.weavewhisper.dtos.ApiResponse;
import com.weavewhisper.dtos.CancelOrderRequestDto;
import com.weavewhisper.dtos.OrderHistoryResponseDto;
import com.weavewhisper.entities.Customer;
import com.weavewhisper.entities.OrderHistory;
import com.weavewhisper.entities.Product;
import com.weavewhisper.enums.OrderReturnStatusType;
import com.weavewhisper.enums.OrderStatusType;
import com.weavewhisper.repositories.CustomerDao;
import com.weavewhisper.repositories.OrderHistoryDao;
import com.weavewhisper.repositories.ProductDao;
import com.weavewhisper.services.OrderHistoryService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class OrderHistoryImpl implements OrderHistoryService {

	@Autowired
	private CustomerDao customerDao;

	@Autowired
	private OrderHistoryDao orderHistoryDao;

	@Autowired
	private ProductDao productDao;

	@Autowired
	private ModelMapper modelMapper;

	@Value("${razorpay.key_id}")
	private String keyId;

	@Value("${razorpay.key_secret}")
	private String secret;

	@Override
	public List<OrderHistoryResponseDto> getOrderHistoryOfCustomer(Long customerId) {
		Customer customer = customerDao.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("No such customer exists with that id."));

		List<OrderHistory> orderHistoryList = orderHistoryDao.findByCustomerRef(customer).stream()
				.sorted((p1, p2) -> (-1) * p1.getCreatedAt().compareTo(p2.getCreatedAt())).collect(Collectors.toList());

		List<OrderHistoryResponseDto> orderHistoryResList = new ArrayList<>();

		for (int i = 0; i < orderHistoryList.size(); i++) {
			OrderHistory oHist = orderHistoryList.get(i);

			OrderHistoryResponseDto oHistRes = modelMapper.map(oHist, OrderHistoryResponseDto.class);

			if (oHist.getProductRef().getManufacturer() != null) {
				oHistRes.setBrandName(oHist.getProductRef().getManufacturer().getBrandName());
			}

			if (oHist.getOrderStatus().equals(OrderStatusType.DELIVERED)) {
				oHistRes.setDeliveryDate(
						oHist.getDeliveredAt().format(DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM)));
			}

			oHistRes.setName(oHist.getProductRef().getName());
			oHistRes.setImageName(oHist.getProductRef().getImageList().get(0).getImageName());
			oHistRes.setOrderHistoryId(oHist.getId());
			oHistRes.setProductId(oHist.getProductRef().getId());
			oHistRes.setOrderDate(oHist.getCreatedAt().format(DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM)));

			if (oHist.getOrderStatus().equals(OrderStatusType.DELIVERED)) {
				LocalDateTime returnExpDate = oHist.getDeliveredAt().plusDays(15);
				if (LocalDateTime.now().isBefore(returnExpDate)
						&& oHist.getReturnStatus().equals(OrderReturnStatusType.NOTREQUESTED)) {
					oHistRes.setReturnAvailable(true);
				} else {
					oHistRes.setReturnAvailable(false);
				}
			} else {
				oHistRes.setReturnAvailable(false);
			}

//			System.out.println(oHistRes);

			orderHistoryResList.add(oHistRes);
		}

		return orderHistoryResList;
	}

	@Override
	public ApiResponse cancelOrder(CancelOrderRequestDto cancelOrderRequestDto) {
		Product product = productDao.findById(cancelOrderRequestDto.getProductId())
				.orElseThrow(() -> new ResourceNotFoundException("No such product exists with that id."));
		Customer customer = customerDao.findById(cancelOrderRequestDto.getCustomerId())
				.orElseThrow(() -> new ResourceNotFoundException("No such customer exists with that id."));
		OrderHistory orderHistory = orderHistoryDao.findById(cancelOrderRequestDto.getOrderId())
				.orElseThrow(() -> new ResourceNotFoundException("No such order exists with that id."));

		if (orderHistoryDao.existsByIdAndProductRefAndCustomerRef(cancelOrderRequestDto.getOrderId(), product,
				customer)) {
			if (orderHistory.getOrderStatus().equals(OrderStatusType.PROCESSING)) {
				orderHistory.setOrderStatus(OrderStatusType.CANCELLED);
				product.setInventoryCount(product.getInventoryCount() + 1);

				customer.setBalance(customer.getBalance() + orderHistory.getSoldAtPrice());

				return new ApiResponse(true, "Order cancelled successfully. Refund will be credited to your wallet.");
			} else {
				throw new IllegalCancellationRequestException(
						"You can only cancel your oder if it is in processing stage.");
			}

		} else {
			throw new ResourceNotFoundException("No order exists with that id.");
		}

	}

	@Override
	public ApiResponse returnOrder(CancelOrderRequestDto returnOrderRequestDto) {

		Product product = productDao.findById(returnOrderRequestDto.getProductId())
				.orElseThrow(() -> new ResourceNotFoundException("No such product exists with that id."));
		Customer customer = customerDao.findById(returnOrderRequestDto.getCustomerId())
				.orElseThrow(() -> new ResourceNotFoundException("No such customer exists with that id."));
		OrderHistory orderHistory = orderHistoryDao.findById(returnOrderRequestDto.getOrderId())
				.orElseThrow(() -> new ResourceNotFoundException("No such order exists with that id."));

		if (orderHistoryDao.existsByIdAndProductRefAndCustomerRef(returnOrderRequestDto.getOrderId(), product,
				customer)) {
			if (orderHistory.getReturnStatus().equals(OrderReturnStatusType.NOTREQUESTED) && orderHistory.getOrderStatus().equals(OrderStatusType.DELIVERED) ) {

				orderHistory.setReturnStatus(OrderReturnStatusType.REQUESTED);

				return new ApiResponse(true, "Order return is requested successfully.");
			} else {
				throw new IllegalStatusChangeException(
						"You can only return your oder if it is in delivered and not requested stage.");
			}
		} else {
			throw new ResourceNotFoundException("No order exists with that id.");
		}

	}
}
