package com.weavewhisper.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.weavewhisper.entities.Manufacturer;
import com.weavewhisper.enums.ManufacturerAccountStatusType;

public interface ManufacturerDao extends JpaRepository<Manufacturer, Long> {
	Manufacturer findByEmailAndPassword(String email, String password);

	boolean existsByBrandName(String brandName);

	boolean existsByPanNumber(String panNumber);

	List<Manufacturer> findByAccountStatus(ManufacturerAccountStatusType accountStatus);

}
