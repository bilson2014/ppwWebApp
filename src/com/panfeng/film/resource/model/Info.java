package com.panfeng.film.resource.model;

import com.panfeng.film.domain.BaseObject;

public class Info extends BaseObject {

	private static final long serialVersionUID = 7515582658401005217L;

	private boolean key = false;
	
	private String value = null;

	public boolean isKey() {
		return key;
	}

	public void setKey(boolean key) {
		this.key = key;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
	
}
