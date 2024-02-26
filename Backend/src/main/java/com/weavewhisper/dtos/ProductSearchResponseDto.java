package com.weavewhisper.dtos;

import java.util.List;
import java.util.Set;

import com.weavewhisper.enums.CategoryType;
import com.weavewhisper.enums.GenderType;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductSearchResponseDto {
	private Long id;
	private String name;
	private double actualPrice;
	private double sellingPrice;
	private String brandName;
	private String imageName;
	private int reviewCount;
	private double avgRating;
	private int inventoryCount;
}
