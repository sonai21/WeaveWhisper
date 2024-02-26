package com.weavewhisper.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import com.weavewhisper.entities.Product;


@Repository
public interface ProductDao extends JpaRepository<Product, Long>, QuerydslPredicateExecutor<Product> {
	Product findByName(String name);
	boolean existsByName(String name);
}
