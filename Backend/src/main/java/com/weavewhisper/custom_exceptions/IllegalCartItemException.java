package com.weavewhisper.custom_exceptions;

public class IllegalCartItemException extends RuntimeException {
	public IllegalCartItemException(String msg) {
		super(msg);
	}
}
