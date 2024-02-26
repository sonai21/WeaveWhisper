package com.weavewhisper.services.impl;

import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.modelmapper.internal.bytebuddy.dynamic.loading.PackageDefinitionStrategy.Definition.Undefined;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.querydsl.core.QueryResults;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQuery;
import com.weavewhisper.custom_exceptions.DuplicateProductNameException;
import com.weavewhisper.custom_exceptions.ResourceNotFoundException;
import com.weavewhisper.dtos.ApiResponse;
import com.weavewhisper.dtos.ProductCreatedApiResponseDto;
import com.weavewhisper.dtos.ProductRequestDto;
import com.weavewhisper.dtos.ProductResponseDto;
import com.weavewhisper.dtos.ProductSearchResponseDto;
import com.weavewhisper.dtos.ReviewResponseDto;
import com.weavewhisper.dtos.ReviewResquestDto;
import com.weavewhisper.dtos.SearchProductDto;
import com.weavewhisper.dtos.SearchResponseDto;
import com.weavewhisper.entities.Manufacturer;
import com.weavewhisper.entities.Product;
import com.weavewhisper.entities.ProductColor;
import com.weavewhisper.entities.ProductImage;
import com.weavewhisper.entities.ProductReview;
import com.weavewhisper.entities.ProductSize;
import com.weavewhisper.entities.QManufacturer;
import com.weavewhisper.entities.QProduct;
import com.weavewhisper.entities.QProductColor;
import com.weavewhisper.entities.QProductSize;
import com.weavewhisper.enums.CategoryType;
import com.weavewhisper.enums.ColorType;
import com.weavewhisper.enums.GenderType;
import com.weavewhisper.enums.SizeType;
import com.weavewhisper.repositories.ManufacturerDao;
import com.weavewhisper.repositories.ProductDao;
import com.weavewhisper.services.ProductService;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private ProductDao productDao;

	@Autowired
	private ManufacturerDao manufacturerDao;

	@Autowired
	private EntityManager em;

	@Override
	public ProductCreatedApiResponseDto addProduct(ProductRequestDto productRequestDto) {

		if (productDao.existsByName(productRequestDto.getName())) {
			throw new DuplicateProductNameException("Dupicate product name.");
		}

		Manufacturer manufacturer = manufacturerDao.findById(productRequestDto.getUserId())
				.orElseThrow(() -> new ResourceNotFoundException("No user found with that user id"));

		Product product = modelMapper.map(productRequestDto, Product.class);

		ArrayList<String> colorList = productRequestDto.getColors();
		ArrayList<String> sizeList = productRequestDto.getSizes();
		ArrayList<String> imageList = productRequestDto.getImageNames();

		for (int i = 0; i < sizeList.size(); i++) {
			product.addSize(new ProductSize(SizeType.valueOf(sizeList.get(i))));
		}

		for (int i = 0; i < colorList.size(); i++) {
			product.addColor(new ProductColor(ColorType.valueOf(colorList.get(i))));
		}

		for (int i = 0; i < imageList.size(); i++) {
			product.addImage(new ProductImage(imageList.get(i)));
		}

		manufacturer.addProduct(product);

		Product savedProduct = productDao.findByName(product.getName());

		return new ProductCreatedApiResponseDto(savedProduct.getId(), true, "Product added successfully!");
	}

	@Override
	public ProductResponseDto getSingleProduct(Long productId) {
		Product product = productDao.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("No product found with that id"));
		if (product.getManufacturer() == null) {
			throw new ResourceNotFoundException("No product found with that id");
		}

		List<ReviewResponseDto> productReviews = product.getReviewList().stream()
				.sorted((p1, p2) -> (-1) * p1.getCreatedAt().compareTo(p2.getCreatedAt())).map(p -> {
					ReviewResponseDto reviewResponseDto = modelMapper.map(p, ReviewResponseDto.class);
					reviewResponseDto.setCreatedAt(
							p.getCreatedAt().format(DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM)));
					return reviewResponseDto;
				}).collect(Collectors.toList());

		ProductResponseDto productResponseDto = modelMapper.map(product, ProductResponseDto.class);
		productResponseDto
				.setColors(product.getColorSet().stream().map(s -> s.getColor().name()).collect(Collectors.toSet()));
		productResponseDto
				.setSizes(product.getSizeSet().stream().map(s -> s.getSize().name()).collect(Collectors.toSet()));
		productResponseDto
				.setImageNames(product.getImageList().stream().map(p -> p.getImageName()).collect(Collectors.toList()));

		productResponseDto.setBrandName(product.getManufacturer().getBrandName());
		productResponseDto.setProductReviews(productReviews);

		int count = 0;

		if (product.getReviewList().size() != 0) {
			int totalRating = 0;
			for (int j = 0; j < product.getReviewList().size(); j++) {
				if (product.getReviewList().get(j).getRating() != 0) {
					totalRating += product.getReviewList().get(j).getRating();
					count++;
				}
			}
			productResponseDto.setAvgRating(totalRating / (double) count);
		} else {
			productResponseDto.setAvgRating(0);
		}

		return productResponseDto;
	}

	@Override
	public ApiResponse deleteSingleProduct(Long productId, Long manufacturerId) {
		Manufacturer manufacturer = manufacturerDao.findById(manufacturerId)
				.orElseThrow(() -> new ResourceNotFoundException("No such manufacturer found with that id"));
		Product product = productDao.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("No product found with that id"));
		manufacturer.removeProduct(product);
		return new ApiResponse(true, "Product deleted successfully");
	}

	@Override
	public ApiResponse updateProduct(ProductRequestDto productRequestDto) {
		Manufacturer manufacturer = manufacturerDao.findById(productRequestDto.getUserId())
				.orElseThrow(() -> new ResourceNotFoundException("No such manufacturer found with that id!"));

		manufacturer.getProductList().forEach(p -> {
			if (p.getId() == productRequestDto.getProductId()) {
				p.setActualPrice(productRequestDto.getActualPrice());
				p.setSellingPrice(productRequestDto.getSellingPrice());
				p.setInventoryCount(productRequestDto.getInventoryCount());
				p.setDescription(productRequestDto.getDescription());
			}
		});

		return new ApiResponse(true, "Product updated successfully");
	}

	@Override
	public SearchResponseDto getAllProducts(SearchProductDto searchProductDto) {

		if (searchProductDto.getPageNumber() <= 0) {
			searchProductDto.setPageNumber(0);
		} else {
			searchProductDto.setPageNumber(searchProductDto.getPageNumber() - 1);
		}

		if (searchProductDto.getOffset() == 0) {
			searchProductDto.setOffset(8);
		}

		if (searchProductDto.getSearchTerm() == null) {
			searchProductDto.setSearchTerm("");
		}

		if (searchProductDto.getGenders() == null || searchProductDto.getGenders().size() == 0) {
			searchProductDto.setGenders(Arrays.asList(GenderType.values()));
		}

		if (searchProductDto.getColors() == null || searchProductDto.getColors().size() == 0) {
			searchProductDto.setColors(Arrays.asList(ColorType.values()));
		}

		if (searchProductDto.getSizes() == null || searchProductDto.getSizes().size() == 0) {
			searchProductDto.setSizes(Arrays.asList(SizeType.values()));
		}

		if (searchProductDto.getCategories() == null || searchProductDto.getCategories().size() == 0) {
			searchProductDto.setCategories(Arrays.asList(CategoryType.values()));
		}

		if (searchProductDto.getPriceMax() == 0) {
			searchProductDto.setPriceMax(Double.MAX_VALUE);
		}

		if (searchProductDto.getSortBy() == null || searchProductDto.getSortBy() == "") {
			searchProductDto.setSortBy("LATEST");
		}

		if (searchProductDto.getBrandNames() == null || searchProductDto.getBrandNames().size() == 0) {
			List<String> manufacturerNamesList = new ArrayList<>();
			List<Manufacturer> manufacturerList = manufacturerDao.findAll();
			for (int i = 0; i < manufacturerList.size(); i++) {
				manufacturerNamesList.add(manufacturerList.get(i).getBrandName());
			}
			searchProductDto.setBrandNames(manufacturerNamesList);
		}

		QProduct qProduct = QProduct.product;
		QProductColor productColor = QProductColor.productColor;
		QProductSize productSize = QProductSize.productSize;
		QManufacturer qManufacturer = QManufacturer.manufacturer;

		JPQLQuery<Product> query = new JPAQuery<Product>(em);

		List<Product> productList = query.select(qProduct).from(qProduct).innerJoin(productColor)
				.on(productColor.productRef.id.eq(qProduct.id)).innerJoin(productSize)
				.on(productSize.productRef.id.eq(qProduct.id)).innerJoin(qManufacturer)
				.on(qManufacturer.id.eq(qProduct.manufacturer.id))
				.where(qProduct.name.containsIgnoreCase(searchProductDto.getSearchTerm()))
				.where(qProduct.gender.in(searchProductDto.getGenders()))
				.where(productColor.color.in(searchProductDto.getColors()))
				.where(productSize.size.in(searchProductDto.getSizes()))
				.where(qProduct.category.in(searchProductDto.getCategories()))
				.where(qProduct.sellingPrice.between(searchProductDto.getPriceMin(), searchProductDto.getPriceMax()))
				.where(qManufacturer.brandName.in(searchProductDto.getBrandNames())).fetch();

		int totalElements = productList.size();

		SearchResponseDto searchResponseDto = new SearchResponseDto();

		List<ProductSearchResponseDto> productSearchResponseDtoList = new ArrayList<>();

		if (searchProductDto.getSortBy().equals("LATEST")) {
			productList = productList.stream().sorted((p1, p2) -> (-1) * p1.getCreatedAt().compareTo(p2.getCreatedAt()))
					.collect(Collectors.toList());
		} else if (searchProductDto.getSortBy().equals("OLDEST")) {
			productList = productList.stream().sorted((p1, p2) -> p1.getCreatedAt().compareTo(p2.getCreatedAt()))
					.collect(Collectors.toList());
		} else if (searchProductDto.getSortBy().equals("PRICE_ASC")) {
			productList = productList.stream().sorted((p1, p2) -> p1.getSellingPrice().compareTo(p2.getSellingPrice()))
					.collect(Collectors.toList());
		} else if (searchProductDto.getSortBy().equals("PRICE_DESC")) {
			productList = productList.stream()
					.sorted((p1, p2) -> (-1) * p1.getSellingPrice().compareTo(p2.getSellingPrice()))
					.collect(Collectors.toList());
		}

		int start = searchProductDto.getPageNumber() * searchProductDto.getOffset();
		int end = (searchProductDto.getPageNumber() + 1) * searchProductDto.getOffset();

		if (start > productList.size()) {
			searchResponseDto.setPageNumber(searchProductDto.getPageNumber() + 1);
			searchResponseDto.setOffset(searchProductDto.getOffset());
			searchResponseDto.setTotalElements(totalElements);
			searchResponseDto.setProductSearchResponseDto(productSearchResponseDtoList);
			return searchResponseDto;
		}
		if (end >= productList.size()) {
			end = productList.size();
		}

		for (int i = start; i < end; i++) {
			Product product = productList.get(i);
			if (product.getManufacturer() == null) {
				continue;
			}
			ProductSearchResponseDto productSearchResponseDto = modelMapper.map(product,
					ProductSearchResponseDto.class);
			productSearchResponseDto.setImageName(product.getImageList().get(0).getImageName());
			productSearchResponseDto.setBrandName(product.getManufacturer().getBrandName());
			productSearchResponseDto.setReviewCount(product.getReviewList().size());

			int count = 0;

			if (product.getReviewList().size() != 0) {
				int totalRating = 0;
				for (int j = 0; j < product.getReviewList().size(); j++) {
					if (product.getReviewList().get(j).getRating() != 0) {
						totalRating += product.getReviewList().get(j).getRating();
						count++;
					}
				}
				productSearchResponseDto.setAvgRating(totalRating / (double) count);
			} else {
				productSearchResponseDto.setAvgRating(0);
			}

			productSearchResponseDtoList.add(productSearchResponseDto);
		}

		searchResponseDto.setPageNumber(searchProductDto.getPageNumber() + 1);
		searchResponseDto.setOffset(searchProductDto.getOffset());
		searchResponseDto.setTotalElements(totalElements);
		searchResponseDto.setProductSearchResponseDto(productSearchResponseDtoList);

		return searchResponseDto;
	}

	@Override
	public List<String> getAllProductSizes() {
		return Arrays.asList(SizeType.values()).stream().map(s -> s.name()).collect(Collectors.toList());
	}

	@Override
	public List<String> getAllProductColors() {
		return Arrays.asList(ColorType.values()).stream().map(s -> s.name()).collect(Collectors.toList());
	}

	@Override
	public List<String> getAllProductCategories() {
		return Arrays.asList(CategoryType.values()).stream().map(s -> s.name()).collect(Collectors.toList());
	}

	@Override
	public ApiResponse addReview(ReviewResquestDto reviewResquestDto) {
		Product product = productDao.findById(reviewResquestDto.getProductId())
				.orElseThrow(() -> new ResourceNotFoundException("No such product found with that id"));
		product.addReview(modelMapper.map(reviewResquestDto, ProductReview.class));
		return new ApiResponse(true, "Review successfully added.");
	}

	@Override
	public List<ReviewResponseDto> getAllReviewsForAProduct(Long productId) {

		Product product = productDao.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("No product found with that id"));
		if (product.getManufacturer() == null) {
			throw new ResourceNotFoundException("No product found with that id");
		}

		List<ReviewResponseDto> productReviews = product.getReviewList().stream()
				.sorted((p1, p2) -> (-1) * p1.getCreatedAt().compareTo(p2.getCreatedAt())).map(p -> {
					ReviewResponseDto reviewResponseDto = modelMapper.map(p, ReviewResponseDto.class);
					reviewResponseDto.setCreatedAt(
							p.getCreatedAt().format(DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM)));
					return reviewResponseDto;
				}).collect(Collectors.toList());

		return productReviews;
	}

}
