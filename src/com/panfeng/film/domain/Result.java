package com.panfeng.film.domain;

public class Result extends BaseObject {

	private static final long serialVersionUID = 8198446999141773515L;

	private boolean ret = false;
	
	private String message = null;
	
	public Result() {
		super();
	}
	public Result(boolean ret, String message) {
		super();
		this.ret = ret;
		this.message = message;
	}

	public boolean isRet() {
		return ret;
	}

	public void setRet(boolean ret) {
		this.ret = ret;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
}
