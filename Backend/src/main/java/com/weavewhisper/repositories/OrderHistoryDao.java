package com.weavewhisper.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.weavewhisper.entities.Customer;
import com.weavewhisper.entities.OrderHistory;
import com.weavewhisper.entities.Product;
import com.weavewhisper.entities.Manufacturer;

public interface OrderHistoryDao extends JpaRepository<OrderHistory, Long> {
	List<OrderHistory> findByCustomerRef(Customer customer);

	List<OrderHistory> findByManufacturer(Manufacturer manufacturer);

	boolean existsByIdAndProductRefAndCustomerRef(Long id, Product productRef, Customer customerRef);

	boolean existsByIdAndProductRefAndManufacturer(Long id, Product productRef, Manufacturer manufacturer);
}
