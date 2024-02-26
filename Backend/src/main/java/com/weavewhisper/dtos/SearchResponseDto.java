package com.weavewhisper.dtos;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SearchResponseDto {
	private int totalElements;
	private int pageNumber;
	private int offset;
	private List<ProductSearchResponseDto> productSearchResponseDto;
}
