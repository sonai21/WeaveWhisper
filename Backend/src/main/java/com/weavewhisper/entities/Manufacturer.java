package com.weavewhisper.entities;

import java.util.ArrayList;
import java.util.List;

import com.weavewhisper.enums.ManufacturerAccountStatusType;
import com.weavewhisper.enums.UserType;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@PrimaryKeyJoinColumn(name = "user_id")
@Entity
@Table(name = "manufacturers")
@Getter
@Setter
@ToString(callSuper = true, exclude = {})
@NoArgsConstructor
public class Manufacturer extends BaseUser {
	@Column(length = 50, nullable = false, unique = true)
	private String brandName;
	@Column(length = 10, nullable = false, unique = true)
	private String panNumber;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private ManufacturerAccountStatusType accountStatus = ManufacturerAccountStatusType.REQUESTED;

	@OneToMany(mappedBy = "manufacturer", cascade = CascadeType.ALL)
	List<Product> productList = new ArrayList<>();

	public void addProduct(Product product) {
		productList.add(product);
		product.setManufacturer(this);
	}

	public void removeProduct(Product product) {
		product.setInventoryCount(0);
		product.setManufacturer(null);
	}

}
