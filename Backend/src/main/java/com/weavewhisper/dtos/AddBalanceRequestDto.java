package com.weavewhisper.dtos;

import org.hibernate.validator.constraints.Range;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AddBalanceRequestDto {

	private final int INTMAXVALUE = Integer.MAX_VALUE;
	private final String AMOUNTMESSAGE = "Amount must be greater than 1rs and less than " + INTMAXVALUE+"rs.";

	private Long id;
	@Range(min = 1, max = INTMAXVALUE, message = AMOUNTMESSAGE)
	private int amount;
}
