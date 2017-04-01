package com.panfeng.film.resource.model;

import com.paipianwang.pat.common.entity.BaseEntity;

/**
 * 对象差异中间类
 *2016-10-18 15:57:42
 */
public class DIffBean extends BaseEntity {

	private static final long serialVersionUID = 2944205758901122666L;
	
	private String property;//属性字段
	
	private String oldValue;//旧值
	
	private String newValue;//新值
	
	public String getProperty() {
		return property;
	}
	public void setProperty(String property) {
		this.property = property;
	}
	public String getOldValue() {
		return oldValue;
	}
	public void setOldValue(String oldValue) {
		this.oldValue = oldValue;
	}
	public String getNewValue() {
		return newValue;
	}
	public void setNewValue(String newValue) {
		this.newValue = newValue;
	}
}
