package com.weavewhisper.entities;

import java.time.LocalDateTime;

import com.weavewhisper.enums.ColorType;
import com.weavewhisper.enums.OrderReturnStatusType;
import com.weavewhisper.enums.OrderStatusType;
import com.weavewhisper.enums.PaymentType;
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
@Table(name = "orderhistory")
@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true, exclude = {})
public class OrderHistory extends BaseEntity {
	
	private LocalDateTime createdAt = LocalDateTime.now();

	@ManyToOne
	@JoinColumn(name = "customer_id", nullable = false, unique = false)
	private Customer customerRef;

	@ManyToOne
	@JoinColumn(name = "product_id", nullable = false, unique = false)
	private Product productRef;
	
	@ManyToOne
	@JoinColumn(name = "manufacture_id")
	private Manufacturer manufacturer;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private ColorType color;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private SizeType size;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private PaymentType paymentType;
	
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private OrderStatusType orderStatus = OrderStatusType.PROCESSING;
	
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private OrderReturnStatusType returnStatus = OrderReturnStatusType.NOTREQUESTED;

	@Column(nullable = false)
	private String address;
	
	@Column(nullable = false)
	private double soldAtPrice;

	@Column(nullable = false)
	private String phoneNumber;
	
	@Column(nullable = false)
	private String receipt;
	
	private LocalDateTime deliveredAt;

	private String razorpayOrderId;

	private String razorpayPaymentId;

	private String razorpaySignature;
	
	public void deleteManufacturer() {
		this.setManufacturer(null);
	}
}
