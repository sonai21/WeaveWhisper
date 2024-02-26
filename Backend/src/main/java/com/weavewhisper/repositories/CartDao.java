package com.weavewhisper.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.weavewhisper.entities.Cart;
import com.weavewhisper.entities.Customer;

public interface CartDao extends JpaRepository<Cart, Long> {
	boolean existsByIdAndCustomerRef(Long cartId, Customer customerRef);
	List<Cart> findByCustomerRef(Customer customerRef);
}
