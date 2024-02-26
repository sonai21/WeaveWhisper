package com.weavewhisper.custom_exceptions;

public class IllegalCancellationRequestException extends RuntimeException {
	public IllegalCancellationRequestException(String msg) {
		super(msg);
	}
}
