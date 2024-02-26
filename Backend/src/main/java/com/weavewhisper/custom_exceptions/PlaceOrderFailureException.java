package com.weavewhisper.custom_exceptions;

public class PlaceOrderFailureException extends RuntimeException {
	public PlaceOrderFailureException(String msg) {
		super(msg);
	}
}
