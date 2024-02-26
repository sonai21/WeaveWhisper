package com.weavewhisper.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.weavewhisper.entities.BaseUser;

public interface UserDao extends JpaRepository<BaseUser, Long> {

	BaseUser findByEmailAndPassword(String email, String password);

	boolean existsByEmail(String email);
}
