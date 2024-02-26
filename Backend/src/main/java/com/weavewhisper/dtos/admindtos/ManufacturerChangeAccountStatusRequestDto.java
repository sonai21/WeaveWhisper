package com.weavewhisper.dtos.admindtos;

import com.weavewhisper.enums.ManufacturerAccountStatusType;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ManufacturerChangeAccountStatusRequestDto {
	private Long manufacturerId;
	private ManufacturerAccountStatusType accountStatus;
}
