package com.weavewhisper.entities;

import java.time.LocalDateTime;

import com.weavewhisper.enums.UserType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true)
@Entity
@Table(name = "users")
public class BaseUser extends BaseEntity {

	private LocalDateTime createdAt = LocalDateTime.now();

	@Column(length = 50, nullable = false, unique = true)
	private String email;
	@Column(length = 20, nullable = false)
	private String password;
	@Column(length = 50)
	@Enumerated(EnumType.STRING)
	private UserType type;

}
