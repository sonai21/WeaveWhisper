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
public class ProductResponseDto {
	private Long id;
	private String name;
	private String description;
	private double actualPrice;
	private double sellingPrice;
	private int inventoryCount;
	private String brandName;
	private GenderType gender;
	private CategoryType category;
	private List<String> imageNames;
	private Set<String> colors;
	private Set<String> sizes;
	private List<ReviewResponseDto> productReviews;
	private double avgRating;
}
