package com.weavewhisper.services;

import java.util.List;

import com.weavewhisper.dtos.ApiResponse;
import com.weavewhisper.dtos.ProductSearchResponseDto;
import com.weavewhisper.dtos.WishListRequestDto;
import com.weavewhisper.dtos.WishListResponseDto;

public interface WishListService {
	ApiResponse addWishList(WishListRequestDto wishListRequestDto);

	List<ProductSearchResponseDto> getAllWishListForCustomer(Long customerId);

	List<Long> getAllProductIdsWishlistedPerCustomer(Long customerId);

	ApiResponse removeWishList(WishListRequestDto wishListRequestDto);

	WishListResponseDto checkIfInWishList(WishListRequestDto wishListRequestDto);
}
