package com.panfeng.film.resource.model;

/**
 * 视频管家
 * @author GY
 *
 */

public class VersionManager extends Customer {

	private static final long serialVersionUID = 48288303184376522L;

	private long managerId = 0l; // 视频管家ID
	
	private String managerLoginName = null; // 视频管家登录名
	
	private String managerRealName = null; // 视频管家真实姓名
	
	private String managerPassword = null; // 登陆密码
	
	private String managerDescription = null; // 视频管家描述
	
	private String createDate = null; // 创建时间
	
	private String updateDate = null; // 更新时间
	
	private String managerEmail = null; // 邮箱
	
	private String verification_code = null; // 图片验证码
	
	private String phoneNumber = null; // 手机号码

	public long getManagerId() {
		return managerId;
	}

	public void setManagerId(long managerId) {
		this.managerId = managerId;
	}

	public String getManagerLoginName() {
		return managerLoginName;
	}

	public void setManagerLoginName(String managerLoginName) {
		this.managerLoginName = managerLoginName;
	}

	public String getManagerRealName() {
		return managerRealName;
	}

	public void setManagerRealName(String managerRealName) {
		this.managerRealName = managerRealName;
	}

	public String getManagerPassword() {
		return managerPassword;
	}

	public void setManagerPassword(String managerPassword) {
		this.managerPassword = managerPassword;
	}

	public String getManagerDescription() {
		return managerDescription;
	}

	public void setManagerDescription(String managerDescription) {
		this.managerDescription = managerDescription;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}

	public String getManagerEmail() {
		return managerEmail;
	}

	public void setManagerEmail(String managerEmail) {
		this.managerEmail = managerEmail;
	}

	public String getVerification_code() {
		return verification_code;
	}

	public void setVerification_code(String verification_code) {
		this.verification_code = verification_code;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	
}
