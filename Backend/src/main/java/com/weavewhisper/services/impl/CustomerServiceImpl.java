package com.weavewhisper.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.weavewhisper.custom_exceptions.DuplicateEmailException;
import com.weavewhisper.custom_exceptions.ResourceNotFoundException;
import com.weavewhisper.custom_exceptions.UnauthorizedException;
import com.weavewhisper.dtos.RegisterUserDto;
import com.weavewhisper.dtos.UserResponseDto;
import com.weavewhisper.entities.Customer;
import com.weavewhisper.repositories.CartDao;
import com.weavewhisper.repositories.CustomerDao;
import com.weavewhisper.repositories.UserDao;
import com.weavewhisper.services.CustomerService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private CustomerDao customerDao;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private CartDao cartDao;

	@Value("${balance.starting-balance}")
	private double firstTimeRegisterOffer;

	@Override
	public void registerCustomer(RegisterUserDto customerDto) {

		System.out.println(firstTimeRegisterOffer);

		if (userDao.existsByEmail(customerDto.getEmail())) {
			throw new DuplicateEmailException("User with this email already exists!");
		} else {
			Customer customer = modelMapper.map(customerDto, Customer.class);
			customer.setBalance(firstTimeRegisterOffer);
			customerDao.save(customer);
		}
	}

	@Override
	public UserResponseDto updateCustomer(RegisterUserDto user) {
		Customer customer = customerDao.findById(user.getUserId())
				.orElseThrow(() -> new ResourceNotFoundException("No such user found with that id"));
		if (customer.getPassword().equals(user.getPassword())) {
			Customer newCustomer = modelMapper.map(user, Customer.class);
			System.out.println(newCustomer);
			newCustomer.setId(user.getUserId());
			System.out.println(newCustomer);
			Customer savedCustomer = customerDao.save(newCustomer);
			UserResponseDto userResponseDto = modelMapper.map(savedCustomer, UserResponseDto.class);
			userResponseDto.setCartCount(cartDao.findByCustomerRef(customer).size());
			return (userResponseDto);

		} else {
			throw new UnauthorizedException("Wrong password");
		}
	}

}
