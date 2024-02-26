package com.weavewhisper.custom_exceptions;

public class LowBalanceException extends RuntimeException {
	public LowBalanceException(String msg) {
		super(msg);
	}
}
