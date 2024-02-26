package com.weavewhisper.entities;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import com.weavewhisper.enums.SizeType;

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
@Table(name = "productsizes")
@Getter
@Setter
@ToString(callSuper = true, exclude = { "productRef" })
@NoArgsConstructor
public class ProductSize extends BaseEntity {
	@Column(length = 10, nullable = false)
	@Enumerated(EnumType.STRING)
	private SizeType size;

	@ManyToOne
	@Cascade(CascadeType.ALL)
	@JoinColumn(name = "product_id", nullable = false)
	private Product productRef;

	public ProductSize(SizeType size) {
		super();
		this.size = size;
	}

}
