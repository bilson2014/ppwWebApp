package com.panfeng.film.resource.model;

import com.panfeng.film.domain.BaseObject;

public class Provider extends BaseObject {

	private static final long serialVersionUID = -1427354605820238372L;

	private long providerId = 0l; // 供应商唯一编号
	
	private String providerName = null; // 供应商名称
	
	private String password = null; // 密码
	
	private String phoneNumber = null; // 公司电话
	
	private String email = null; // 邮箱
	
	private String address = null; // 公司地址
	
	private String foxNumber = null; // 传真
	
	private int od = 0; // 排序
	
	private String flag = null; // 状态位
	
	private String updateDate = null; // 更新时间
	
	private String createDate = null; // 创建时间
	
	private Team team = null; // 一对一关系

	public long getProviderId() {
		return providerId;
	}

	public void setProviderId(long providerId) {
		this.providerId = providerId;
	}

	public String getProviderName() {
		return providerName;
	}

	public void setProviderName(String providerName) {
		this.providerName = providerName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getFoxNumber() {
		return foxNumber;
	}

	public void setFoxNumber(String foxNumber) {
		this.foxNumber = foxNumber;
	}

	public int getOd() {
		return od;
	}

	public void setOd(int od) {
		this.od = od;
	}
	
	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public Team getTeam() {
		return team;
	}

	public void setTeam(Team team) {
		this.team = team;
	}
	
}
