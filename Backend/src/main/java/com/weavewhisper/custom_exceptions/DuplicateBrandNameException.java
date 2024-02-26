package com.weavewhisper.custom_exceptions;

public class DuplicateBrandNameException extends RuntimeException {
public DuplicateBrandNameException(String msg) {
	super(msg);
}
}
