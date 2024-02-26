package com.weavewhisper.services;

import java.util.List;

import com.weavewhisper.dtos.ApiResponse;
import com.weavewhisper.dtos.ManufacturerChnageOrderStatusDto;
import com.weavewhisper.dtos.ManufacturerChnageReturnStatusDto;
import com.weavewhisper.dtos.ManufacturerHomepageResponseDto;
import com.weavewhisper.dtos.ManufacturerSoldProductResponseDto;
import com.weavewhisper.dtos.ProductShortResponseDto;
import com.weavewhisper.dtos.RegisterUserDto;

public interface ManufacturerService {
	void registerManufacturer(RegisterUserDto manufacturer);

	ApiResponse deleteManufacturerListings(Long manufacturerId);

	ApiResponse deleteManufacturer(Long manufacturerId);

	List<ProductShortResponseDto> getAllProducts(Long manufacturerId);

	List<String> getAllManufacturerBrandNames();

	List<ManufacturerSoldProductResponseDto> getAllSoldProducts(Long manufacturerId);

	List<ManufacturerSoldProductResponseDto> getReturnProducts(Long manufacturerId);
	
	ManufacturerHomepageResponseDto getHomepageDetails(Long manucaturerId);

	ApiResponse changeSoldProductStatus(ManufacturerChnageOrderStatusDto manufacturerChnageOrderStatusDto);
	
	ApiResponse changeReturnProductStatus(ManufacturerChnageReturnStatusDto manufacturerChnageReturnStatusDto);
}
