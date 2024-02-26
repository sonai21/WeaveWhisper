package com.weavewhisper.dtos;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Max;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReviewResquestDto {
	@Max(value = 5)
	private int rating;
	@Length(max = 500)
	private String review;
	private String customerFullName;
	private Long productId;
}
