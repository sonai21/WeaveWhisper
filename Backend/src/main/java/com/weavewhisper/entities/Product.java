package com.weavewhisper.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.weavewhisper.enums.CategoryType;
import com.weavewhisper.enums.GenderType;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/*
 *  {
    name: 'Allen Solly',
    description: 'Best Shirt ever!!',
    actualPrice: 2500,
    sellingPrice: 2400,
    inventoryCount: 10,
    category: 'SHIRT'
    gender: 'MEN',
    imageUrls: [],
    colors: [ 'BLUE', 'RED', 'GREEN', 'YELLOW' ],
    sizes: [ 'S', 'M' ],
    
  }
 * 
 */

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true, exclude = { "sizeSet", "colorSet", "imageList", "reviewList", "manufacturer" })
public class Product extends BaseEntity {

	@Column(nullable = false, unique = true)
	private String name;
	@Column(nullable = false, length = 1000)
	private String description;
	@Column(nullable = false)
	private Double actualPrice;
	@Column(nullable = false)
	private Double sellingPrice;
	@Column(nullable = false)
	@Min(0)
	private int inventoryCount;
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private GenderType gender;
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private CategoryType category;

	private LocalDateTime createdAt = LocalDateTime.now();

	@ManyToOne
	@JoinColumn(name = "manufacture_id")
	private Manufacturer manufacturer;

	@OneToMany(mappedBy = "productRef", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<ProductSize> sizeSet = new HashSet<>();

	@OneToMany(mappedBy = "productRef", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<ProductColor> colorSet = new HashSet<>();

	@OneToMany(mappedBy = "productRef", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ProductImage> imageList = new ArrayList<>();

	@OneToMany(mappedBy = "productRef", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ProductReview> reviewList = new ArrayList<>();

	public Product(String name, String description, Double actualPrice, Double sellingPrice, GenderType gender,
			CategoryType category) {
		super();
		this.name = name;
		this.description = description;
		this.actualPrice = actualPrice;
		this.sellingPrice = sellingPrice;
		this.gender = gender;
		this.category = category;
	}

	public void addSize(ProductSize size) {
		sizeSet.add(size);
		size.setProductRef(this);
	}

	public void removeSize(ProductSize size) {
		sizeSet.remove(size);
		size.setProductRef(null);
	}

	public void addColor(ProductColor color) {
		colorSet.add(color);
		color.setProductRef(this);
	}

	public void removeColor(ProductColor color) {
		colorSet.remove(color);
		color.setProductRef(null);
	}

	public void addImage(ProductImage image) {
		imageList.add(image);
		image.setProductRef(this);
	}

	public void removeImage(ProductImage image) {
		imageList.remove(image);
		image.setProductRef(null);
	}

	public void addReview(ProductReview review) {
		reviewList.add(review);
		review.setProductRef(this);
	}

	public void removeReview(ProductReview review) {
		reviewList.remove(review);
		review.setProductRef(null);
	}

}
