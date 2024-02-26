package com.weavewhisper.custom_exceptions;

public class DuplicatePanNumberException extends RuntimeException {
	public DuplicatePanNumberException(String msg) {
		super(msg);
	}
}
