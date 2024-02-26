package com.weavewhisper.dtos;

import java.util.List;

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
public class SearchProductDto {
	private int pageNumber;
	private int offset;
	private String searchTerm;
	private List<GenderType> genders;
	private List<ColorType> colors;
	private List<SizeType> sizes;
	private List<CategoryType> categories;
	private double priceMin;
	private double priceMax;
	private List<String> brandNames;
	private String sortBy;
}
