package com.weavewhisper.dtos;

import com.weavewhisper.enums.ColorType;
import com.weavewhisper.enums.OrderStatusType;
import com.weavewhisper.enums.SizeType;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ManufacturerSoldProductResponseDto {

	private Long orderHistoryId;

	private Long productId;

	private String orderDate;

	private String imageName;

	private ColorType color;

	private SizeType size;
	
	private String name;

	private String receipt;
	
	private OrderStatusType orderStatus;

	private String address;

	private String phoneNumber;
}
