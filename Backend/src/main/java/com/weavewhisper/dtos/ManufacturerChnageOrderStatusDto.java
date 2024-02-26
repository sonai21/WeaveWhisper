package com.weavewhisper.dtos;

import com.weavewhisper.enums.OrderStatusType;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ManufacturerChnageOrderStatusDto {

	private Long manufacturerId;

	private Long productId;

	private Long orderId;

	private OrderStatusType orderStatusType;
}
