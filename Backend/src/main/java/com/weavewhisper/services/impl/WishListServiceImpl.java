package com.weavewhisper.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weavewhisper.custom_exceptions.DuplicateWishListException;
import com.weavewhisper.custom_exceptions.ResourceNotFoundException;
import com.weavewhisper.dtos.ApiResponse;
import com.weavewhisper.dtos.ProductResponseDto;
import com.weavewhisper.dtos.ProductSearchResponseDto;
import com.weavewhisper.dtos.WishListRequestDto;
import com.weavewhisper.dtos.WishListResponseDto;
import com.weavewhisper.entities.Customer;
import com.weavewhisper.entities.Product;
import com.weavewhisper.entities.WishList;
import com.weavewhisper.repositories.CustomerDao;
import com.weavewhisper.repositories.ProductDao;
import com.weavewhisper.repositories.WishListDao;
import com.weavewhisper.services.WishListService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class WishListServiceImpl implements WishListService {

	@Autowired
	private ProductDao productDao;

	@Autowired
	private CustomerDao customerDao;

	@Autowired
	private WishListDao wishListDao;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public ApiResponse addWishList(WishListRequestDto wishListRequestDto) {
		Product product = productDao.findById(wishListRequestDto.getProductId())
				.orElseThrow(() -> new ResourceNotFoundException("No such product exists with that id."));
		Customer customer = customerDao.findById(wishListRequestDto.getCustomerId())
				.orElseThrow(() -> new ResourceNotFoundException("No such customer exists with that id."));

		System.out.println(wishListRequestDto);

		if (wishListDao.existsByCustomerRefAndProductRef(customer, product)) {
			throw new DuplicateWishListException("This product is already in your wishlist.");
		} else {
			wishListDao.save(new WishList(product, customer));
		}

		return new ApiResponse(true, "Product successfully added to wishlist.");

	}

	@Override
	public List<ProductSearchResponseDto> getAllWishListForCustomer(Long customerId) {
		Customer customer = customerDao.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("No such customer exists with that id."));
		List<WishList> wishListArr = wishListDao.findByCustomerRef(customer).stream()
				.sorted((w1, w2) -> (-1) * w1.getCreatedAt().compareTo(w2.getCreatedAt())).collect(Collectors.toList());
		List<ProductSearchResponseDto> productSearchResponseDtoList = new ArrayList<>();
		for (int i = 0; i < wishListArr.size(); i++) {
			Product product = wishListArr.get(i).getProductRef();

			if (product.getManufacturer() == null) {
				continue;
			}

			ProductSearchResponseDto productSearchResponseDto = modelMapper.map(product,
					ProductSearchResponseDto.class);
			productSearchResponseDto.setImageName(product.getImageList().get(0).getImageName());
			productSearchResponseDto.setBrandName(product.getManufacturer().getBrandName());
			productSearchResponseDto.setReviewCount(product.getReviewList().size());

			if (product.getReviewList().size() != 0) {
				int totalRating = 0;
				for (int j = 0; j < product.getReviewList().size(); j++) {
					totalRating += product.getReviewList().get(j).getRating();
					System.out.println(totalRating);
				}
				productSearchResponseDto.setAvgRating(totalRating / (double) product.getReviewList().size());
			} else {
				productSearchResponseDto.setAvgRating(0);
			}

			productSearchResponseDtoList.add(productSearchResponseDto);

		}
		return productSearchResponseDtoList;
	}

	@Override
	public ApiResponse removeWishList(WishListRequestDto wishListRequestDto) {
		Product product = productDao.findById(wishListRequestDto.getProductId())
				.orElseThrow(() -> new ResourceNotFoundException("No such product exists with that id."));
		Customer customer = customerDao.findById(wishListRequestDto.getCustomerId())
				.orElseThrow(() -> new ResourceNotFoundException("No such customer exists with that id."));
		if (wishListDao.existsByCustomerRefAndProductRef(customer, product)) {
			wishListDao.deleteByProductRefAndCustomerRef(product, customer);
		} else {
			throw new ResourceNotFoundException("No such wishlist exist with that customer id and product id");
		}
		return new ApiResponse(true, "Product successfully removed from wishlist.");
	}

	@Override
	public WishListResponseDto checkIfInWishList(WishListRequestDto wishListRequestDto) {
		Product product = productDao.findById(wishListRequestDto.getProductId())
				.orElseThrow(() -> new ResourceNotFoundException("No such product exists with that id."));
		Customer customer = customerDao.findById(wishListRequestDto.getCustomerId())
				.orElseThrow(() -> new ResourceNotFoundException("No such customer exists with that id."));

		WishListResponseDto wishListResponseDto = new WishListResponseDto();

		if (wishListDao.existsByCustomerRefAndProductRef(customer, product)) {
			WishList wishlist = wishListDao.findByCustomerRefAndProductRef(customer, product);
			wishListResponseDto.setId(wishlist.getId());
			wishListResponseDto.setInWishList(true);
			return wishListResponseDto;
		} else {
			throw new ResourceNotFoundException("No such wishlist exist with that customer id and product id");
		}
	}

	@Override
	public List<Long> getAllProductIdsWishlistedPerCustomer(Long customerId) {
		Customer customer = customerDao.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("No such customer exists with that id."));
		List<WishList> wishListArr = wishListDao.findByCustomerRef(customer).stream().collect(Collectors.toList());
		List<Long> wishListIdList = new ArrayList<>();

		for (int i = 0; i < wishListArr.size(); i++) {
			Product product = wishListArr.get(i).getProductRef();

			if (product.getManufacturer() == null) {
				continue;
			}
			wishListIdList.add(wishListArr.get(i).getProductRef().getId());
		}

		return wishListIdList;
	}

}
