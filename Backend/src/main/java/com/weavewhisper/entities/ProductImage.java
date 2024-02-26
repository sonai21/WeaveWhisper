package com.weavewhisper.entities;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "productimages")
@Getter
@Setter
@ToString(callSuper = true, exclude = {"productRef"})
@NoArgsConstructor
public class ProductImage extends BaseEntity {

	@Column(length = 100, nullable = false)
	private String imageName;

	@ManyToOne
	@Cascade(CascadeType.ALL)
	@JoinColumn(name = "product_id", nullable = false)
	private Product productRef;

	public ProductImage(String imageName) {
		super();
		this.imageName = imageName;
	}
}
