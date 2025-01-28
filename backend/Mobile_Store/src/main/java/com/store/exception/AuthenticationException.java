package com.store.exception;

public class AuthenticationException extends RuntimeException {
	public AuthenticationException(String errMesg) {
		super(errMesg);
	}
}