package com.weavewhisper.custom_exceptions;

public class DuplicateEmailException extends RuntimeException {
	public DuplicateEmailException(String msg) {
	super(msg);
	}
}
