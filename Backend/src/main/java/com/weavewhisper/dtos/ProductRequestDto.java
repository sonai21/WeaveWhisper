package com.weavewhisper.dtos;

import java.util.ArrayList;

import com.weavewhisper.enums.CategoryType;
import com.weavewhisper.enums.GenderType;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductRequestDto {
	private Long userId;
	private Long productId;
	private String name;
	private String description;
	private double actualPrice;
	private double sellingPrice;
	private int inventoryCount;
	private GenderType gender;
	private CategoryType category;
	private ArrayList<String> imageNames;
	private ArrayList<String> colors;
	private ArrayList<String> sizes;
}
