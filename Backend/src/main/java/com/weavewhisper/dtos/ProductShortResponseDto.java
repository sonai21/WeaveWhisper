package com.weavewhisper.dtos;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductShortResponseDto {
	private Long id;
	private String name;
	private String imageName;
}
