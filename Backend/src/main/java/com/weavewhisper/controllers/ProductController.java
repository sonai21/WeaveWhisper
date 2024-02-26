package com.weavewhisper.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.weavewhisper.dtos.ApiResponse;
import com.weavewhisper.dtos.ProductRequestDto;
import com.weavewhisper.dtos.ProductResponseDto;
import com.weavewhisper.dtos.ProductShortResponseDto;
import com.weavewhisper.dtos.ReviewResquestDto;
import com.weavewhisper.dtos.SearchProductDto;
import com.weavewhisper.dtos.SearchResponseDto;
import com.weavewhisper.dtos.ProductCreatedApiResponseDto;
import com.weavewhisper.services.ManufacturerService;
import com.weavewhisper.services.ProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/products")
public class ProductController {

	@Autowired
	private ProductService productService;
	
	@Autowired
	private ManufacturerService manufacturerService;
	
	
	@PostMapping
	public ResponseEntity<?> getAllProducts(@RequestBody SearchProductDto searchProductDto){
		SearchResponseDto searchResponseDto = productService.getAllProducts(searchProductDto);
		return ResponseEntity.status(HttpStatus.OK).body(searchResponseDto);
		
	}

	@PostMapping("/add")
	public ResponseEntity<?> addProduct(@RequestBody ProductRequestDto productRequestDto) {
		ProductCreatedApiResponseDto productCreatedApiResponseDto = productService.addProduct(productRequestDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(productCreatedApiResponseDto);
	}

	@PutMapping("/update")
	public ResponseEntity<?> updateProduct(@RequestBody ProductRequestDto productRequestDto) {
		ApiResponse apiResponse = productService.updateProduct(productRequestDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
	}

	@GetMapping("/get/{productId}")
	public ResponseEntity<?> getProductById(@PathVariable Long productId) {
		ProductResponseDto productResponseDto = productService.getSingleProduct(productId);
		return ResponseEntity.status(HttpStatus.OK).body(productResponseDto);
	}

	@DeleteMapping("/delete/{productId}/manufacturer/{manufacturerId}")
	public ResponseEntity<?> deleteProductById(@PathVariable Long productId, @PathVariable Long manufacturerId) {
		ApiResponse apiRes = productService.deleteSingleProduct(productId, manufacturerId);
		return ResponseEntity.status(HttpStatus.OK).body(apiRes);
	}
	
	@GetMapping("/get/manufacturer/brandnames")
	public ResponseEntity<?> getAllManufacturerBrandNames(){
		List<String> manufacturerBrandNames = manufacturerService.getAllManufacturerBrandNames();
		return ResponseEntity.status(HttpStatus.OK).body(manufacturerBrandNames);
	}
	
	@GetMapping("/getsizes")
	public ResponseEntity<?> getAllProductSizes(){
		return ResponseEntity.status(HttpStatus.OK).body(productService.getAllProductSizes());
	}
	
	@GetMapping("/getcolors")
	public ResponseEntity<?> getAllProductColors(){
		return ResponseEntity.status(HttpStatus.OK).body(productService.getAllProductColors());
	}
	
	@GetMapping("/getcategories")
	public ResponseEntity<?> getAllProductCategories(){
		return ResponseEntity.status(HttpStatus.OK).body(productService.getAllProductCategories());
	}
	
	@PostMapping("/addreview")
	public ResponseEntity<?> addProductReview(@RequestBody @Valid ReviewResquestDto reviewResquestDto){
		ApiResponse apiRes = productService.addReview(reviewResquestDto);
		return ResponseEntity.status(HttpStatus.OK).body(apiRes);
	}
	
	@GetMapping("/getallreview/product/{productId}")
	public ResponseEntity<?> getAllProductReview(@PathVariable Long productId){
		return ResponseEntity.status(HttpStatus.OK).body(productService.getAllReviewsForAProduct(productId));
	}

}
