package com.weavewhisper.custom_exceptions;

public class IllegalStatusChangeException extends RuntimeException {
	public IllegalStatusChangeException(String msg) {
		super(msg);
	}
}
