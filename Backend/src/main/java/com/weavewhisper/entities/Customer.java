package com.weavewhisper.entities;

import org.springframework.beans.factory.annotation.Value;

import com.weavewhisper.enums.UserType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@PrimaryKeyJoinColumn(name = "user_id")
@Entity
@Table(name = "customers")
@Getter
@Setter
@ToString(callSuper = true, exclude = {})
@NoArgsConstructor
public class Customer extends BaseUser {
	@Column(length = 50, nullable = false)
	private String fullName;
	@Column(length = 10)
	private String phoneNumber;
	private String address;

	@Column(nullable = false)
	private boolean verified = false;

	@Column(nullable = false)
	private double balance = 0;

}
