package com.weavewhisper.dtos;

import com.weavewhisper.enums.ColorType;
import com.weavewhisper.enums.SizeType;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CartRequestDto {
	private Long productId;
	private Long customerId;
	private ColorType color;
	private SizeType size;
}
