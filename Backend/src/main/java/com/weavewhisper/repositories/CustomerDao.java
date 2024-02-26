package com.weavewhisper.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.weavewhisper.entities.Customer;
import java.util.List;


public interface CustomerDao extends JpaRepository<Customer, Long> {
	Customer findByEmailAndPassword(String email, String password);
}
