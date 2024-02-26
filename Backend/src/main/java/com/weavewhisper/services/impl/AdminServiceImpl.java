package com.weavewhisper.services.impl;

import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.joda.time.DateTime;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weavewhisper.custom_exceptions.ResourceNotFoundException;
import com.weavewhisper.dtos.AdminHomePageResponseDto;
import com.weavewhisper.dtos.ApiResponse;
import com.weavewhisper.dtos.admindtos.AdminLoginRequestDto;
import com.weavewhisper.dtos.admindtos.AdminLoginResponseDto;
import com.weavewhisper.dtos.admindtos.AdminRegistrationRequestDto;
import com.weavewhisper.dtos.admindtos.ManufacturerChangeAccountStatusRequestDto;
import com.weavewhisper.dtos.admindtos.RequestedManufacturerRegistrationResponseDto;
import com.weavewhisper.entities.BaseUser;
import com.weavewhisper.entities.Manufacturer;
import com.weavewhisper.enums.ManufacturerAccountStatusType;
import com.weavewhisper.enums.UserType;
import com.weavewhisper.repositories.ManufacturerDao;
import com.weavewhisper.repositories.UserDao;
import com.weavewhisper.services.AdminService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

	@Autowired
	private UserDao userDao;

	@Autowired
	private ManufacturerDao manufacturerDao;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public AdminLoginResponseDto login(AdminLoginRequestDto adminLoginRequestDto) {
		BaseUser user = userDao.findByEmailAndPassword(adminLoginRequestDto.getEmail(),
				adminLoginRequestDto.getPassword());

		if (user != null) {
			AdminLoginResponseDto adminLoginResponseDto = modelMapper.map(user, AdminLoginResponseDto.class);
			return adminLoginResponseDto;
		} else {
			throw new ResourceNotFoundException("No such user exists with that email and password!!");
		}
	}

	@Override
	public ApiResponse register(AdminRegistrationRequestDto adminRegistrationRequestDto) {
		BaseUser user = modelMapper.map(adminRegistrationRequestDto, BaseUser.class);
		user.setType(UserType.ADMIN);
		System.out.println(user);
		userDao.save(user);
		return new ApiResponse(true, "Successfully created an admin.");
	}

	@Override
	public List<?> getRequestedManufacturerRegistration() {
		List<Manufacturer> manufacturerList = manufacturerDao
				.findByAccountStatus(ManufacturerAccountStatusType.REQUESTED);
		List<RequestedManufacturerRegistrationResponseDto> reqManufacturerListDto = new ArrayList<>();
		for (int i = 0; i < manufacturerList.size(); i++) {
			Manufacturer manufacturer = manufacturerList.get(i);
			RequestedManufacturerRegistrationResponseDto resDto = modelMapper.map(manufacturer,
					RequestedManufacturerRegistrationResponseDto.class);
			resDto.setCreatedDate(manufacturer.getCreatedAt().format(DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM)));
			reqManufacturerListDto.add(resDto);
		}
		return reqManufacturerListDto;
	}

	@Override
	public ApiResponse changeManufacturerAccountStatus(
			ManufacturerChangeAccountStatusRequestDto manufacturerChangeAccountStatusRequestDto) {
		Manufacturer manufacturer = manufacturerDao
				.findById(manufacturerChangeAccountStatusRequestDto.getManufacturerId())
				.orElseThrow(() -> new ResourceNotFoundException("No such manufacturer exists with that id."));

		manufacturer.setAccountStatus(manufacturerChangeAccountStatusRequestDto.getAccountStatus());
		return new ApiResponse(true, "Successfully changed manufacturer account status.");
	}

	@Override
	public List<?> getAllManufacturers() {
		List<Manufacturer> manufacturerList = manufacturerDao
				.findByAccountStatus(ManufacturerAccountStatusType.ACCEPTED).stream()
				.sorted((m1, m2) -> (-1) * m1.getCreatedAt().compareTo(m2.getCreatedAt())).collect(Collectors.toList());
		List<RequestedManufacturerRegistrationResponseDto> reqManufacturerListDto = new ArrayList<>();
		for (int i = 0; i < manufacturerList.size(); i++) {
			Manufacturer manufacturer = manufacturerList.get(i);
			RequestedManufacturerRegistrationResponseDto resDto = modelMapper.map(manufacturer,
					RequestedManufacturerRegistrationResponseDto.class);
			resDto.setCreatedDate(manufacturer.getCreatedAt().format(DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM)));
			reqManufacturerListDto.add(resDto);
		}
		return reqManufacturerListDto;
	}

	@Override
	public AdminHomePageResponseDto getHomePageDetails() {
		List<Manufacturer> manufacturerList = manufacturerDao.findAll();
		long requestedManufacturerCount = manufacturerList.stream()
				.filter(m -> m.getAccountStatus().equals(ManufacturerAccountStatusType.REQUESTED)).count();
		long activeManufacturerCount = manufacturerList.stream()
				.filter(m -> m.getAccountStatus().equals(ManufacturerAccountStatusType.ACCEPTED)).count();

		AdminHomePageResponseDto resDto = new AdminHomePageResponseDto();
		resDto.setSuccess(true);
		resDto.setRequestedManufacturerCount(requestedManufacturerCount);
		resDto.setActiveManufacturerCount(activeManufacturerCount);
		return resDto;
	}

}
