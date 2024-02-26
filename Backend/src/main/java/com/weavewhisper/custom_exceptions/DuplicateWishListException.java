package com.weavewhisper.custom_exceptions;

public class DuplicateWishListException extends RuntimeException {
	public DuplicateWishListException(String msg) {
		super(msg);
	}
}
