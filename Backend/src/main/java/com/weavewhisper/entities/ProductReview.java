package com.weavewhisper.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
@Table(name = "productreviews")
@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true, exclude = { "productRef" })
public class ProductReview extends BaseEntity {
	@Column(length = 5)
	private int rating;
	@Column(length = 500)
	private String review;
	private LocalDateTime createdAt= LocalDateTime.now().withNano(0);
	@Column(length = 50)
	private String customerFullName;

	@ManyToOne
	@Cascade(CascadeType.ALL)
	@JoinColumn(name = "product_id", nullable = false)
	private Product productRef;

	public ProductReview(int rating, String review) {
		super();
		this.rating = rating;
		this.review = review;
	}
}
