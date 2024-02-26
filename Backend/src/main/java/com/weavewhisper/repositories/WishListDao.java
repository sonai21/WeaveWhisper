package com.weavewhisper.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.weavewhisper.entities.WishList;
import com.weavewhisper.entities.Product;
import com.weavewhisper.entities.Customer;



public interface WishListDao extends JpaRepository<WishList , Long> {
	List<WishList> findByProductRef(Product productRef);
	List<WishList> findByCustomerRef(Customer customerRef);
	boolean existsByCustomerRefAndProductRef(Customer customerRef, Product productRef);
	WishList findByCustomerRefAndProductRef(Customer customerRef, Product productRef);
	void deleteByProductRefAndCustomerRef(Product productRef, Customer customerRef);
}
