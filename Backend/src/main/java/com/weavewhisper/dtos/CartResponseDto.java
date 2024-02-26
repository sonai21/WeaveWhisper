package com.weavewhisper.dtos;

import com.weavewhisper.enums.CategoryType;
import com.weavewhisper.enums.ColorType;
import com.weavewhisper.enums.GenderType;
import com.weavewhisper.enums.SizeType;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CartResponseDto {
	private Long cartId;
	private String name;
	private double actualPrice;
	private double sellingPrice;
	private String imageName;
	private boolean active;
	private int inventoryCount;
	private String brandName;
	private SizeType size;
	private ColorType color;
	private Long productId;
}
