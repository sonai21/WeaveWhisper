package com.weavewhisper.dtos.admindtos;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RequestedManufacturerRegistrationResponseDto {
	private Long id;
	private String email;
	private String createdDate;
	private String brandName;
	private String panNumber;
}
