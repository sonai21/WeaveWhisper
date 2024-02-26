package com.weavewhisper.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class BalanceResponseDto {
	private boolean success;
	private double balance;
}
