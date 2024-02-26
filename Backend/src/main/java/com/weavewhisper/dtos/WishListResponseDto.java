package com.weavewhisper.dtos;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class WishListResponseDto {
	private Long id;
	private boolean isInWishList;
}
