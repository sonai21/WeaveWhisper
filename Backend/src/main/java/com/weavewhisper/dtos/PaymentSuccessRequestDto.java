package com.weavewhisper.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

//{
//    razorpay_payment_id: 'pay_NORl7G5jsw5x3P',
//    razorpay_order_id: 'order_NORkrv69EuwR6J',
//    razorpay_signature: 
//      '137b050fb65c1491088abc83e1d111dbd103a88afcfe3bdd71d36298dedae74a'
//  }

@Getter
@Setter
@ToString
public class PaymentSuccessRequestDto {
	@NotBlank
	private String razorpay_payment_id;
	@NotBlank
	private String razorpay_order_id;
	@NotBlank
	private String razorpay_signature;
}
