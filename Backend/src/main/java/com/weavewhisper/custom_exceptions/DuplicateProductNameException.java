package com.weavewhisper.custom_exceptions;

public class DuplicateProductNameException extends RuntimeException {
	public DuplicateProductNameException(String msg) {
		super(msg);
	}
}
