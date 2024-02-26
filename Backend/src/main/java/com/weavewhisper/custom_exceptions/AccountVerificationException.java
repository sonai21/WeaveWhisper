package com.weavewhisper.custom_exceptions;

public class AccountVerificationException extends RuntimeException {
	public AccountVerificationException(String msg) {
		super(msg);
	}
}
