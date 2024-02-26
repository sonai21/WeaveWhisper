package com.weavewhisper.entities;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import com.weavewhisper.enums.ColorType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "productcolors")
@Getter
@Setter
@ToString(callSuper = true, exclude = { "productRef" })
@NoArgsConstructor
public class ProductColor extends BaseEntity {
	@Column(length = 30)
	@Enumerated(EnumType.STRING)
	private ColorType color;

	@ManyToOne
	@Cascade(CascadeType.ALL)
	@JoinColumn(name = "product_id", nullable = false)
	private Product productRef;

	public ProductColor(ColorType color) {
		super();
		this.color = color;
	}

}
