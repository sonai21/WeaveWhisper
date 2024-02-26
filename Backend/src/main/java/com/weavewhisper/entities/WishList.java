package com.weavewhisper.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "wishlists")
@Getter
@Setter
@ToString(callSuper = true, exclude = {})
@NoArgsConstructor
public class WishList extends BaseEntity {

	private LocalDateTime createdAt = LocalDateTime.now();

	@ManyToOne
	@JoinColumn(name = "product_id", nullable = false, unique = false)
	private Product productRef;

	@ManyToOne
	@JoinColumn(name = "customer_id", nullable = false, unique = false)
	private Customer customerRef;

	public WishList(Product productRef, Customer customerRef) {
		super();
		this.productRef = productRef;
		this.customerRef = customerRef;
	}

}
