package com.weavewhisper.dtos;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AdminHomePageResponseDto {
	private boolean success;
	private long requestedManufacturerCount;
	private long activeManufacturerCount;
}
