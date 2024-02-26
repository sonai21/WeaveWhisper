package com.weavewhisper.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.weavewhisper.dtos.ApiResponse;
import com.weavewhisper.dtos.WishListRequestDto;
import com.weavewhisper.dtos.WishListResponseDto;
import com.weavewhisper.services.WishListService;

@RestController
@RequestMapping("/api/wishlists")
public class WishListController {
	@Autowired
	private WishListService wishListService;

	@PostMapping("/add")
	public ResponseEntity<?> addWishList(@RequestBody WishListRequestDto wishListRequestDto) {
		ApiResponse apiRes = wishListService.addWishList(wishListRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(apiRes);
	}

	@GetMapping("/customer/{customerId}")
	public ResponseEntity<?> getAllWishListsPerCustomer(@PathVariable Long customerId) {
		return ResponseEntity.status(HttpStatus.OK).body(wishListService.getAllWishListForCustomer(customerId));
	}

	@PostMapping("/delete")
	public ResponseEntity<?> deleteWishList(@RequestBody WishListRequestDto wishListRequestDto) {
		ApiResponse apiRes = wishListService.removeWishList(wishListRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(apiRes);
	}

	@PostMapping("/check")
	public ResponseEntity<?> checkIfInWishList(@RequestBody WishListRequestDto wishListRequestDto) {
		WishListResponseDto wishListResponseDto = wishListService.checkIfInWishList(wishListRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(wishListResponseDto);
	}
	
	@GetMapping("/getproductids/customer/{customerId}")
	public ResponseEntity<?> getAllProductIdsWishlistedPerCustomer(@PathVariable Long customerId) {
		return ResponseEntity.status(HttpStatus.OK).body(wishListService.getAllProductIdsWishlistedPerCustomer(customerId));
	}
}
