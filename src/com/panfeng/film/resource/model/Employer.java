package com.panfeng.film.resource.model;

import java.util.List;

import com.panfeng.film.domain.BaseObject;

/**
 * 职工表
 * @author GY
 *
 */
public class Employer extends BaseObject {

	private static final long serialVersionUID = -2956477405160485997L;
	
	private long employerId = 0l; // 职工ID
	
	private String employerName = null; // 职工姓名
	
	private String employerDescription = null; // 职工描述
	
	private Long employerDept = null; // 部门ID
	
	private String createDate = null; // 创建时间
	
	private String updateDate = null; // 更新时间
	
	private List<Role> roles = null; // 角色集合

	public long getEmployerId() {
		return employerId;
	}

	public void setEmployerId(long employerId) {
		this.employerId = employerId;
	}

	public String getEmployerName() {
		return employerName;
	}

	public void setEmployerName(String employerName) {
		this.employerName = employerName;
	}

	public String getEmployerDescription() {
		return employerDescription;
	}

	public void setEmployerDescription(String employerDescription) {
		this.employerDescription = employerDescription;
	}

	public Long getEmployerDept() {
		return employerDept;
	}

	public void setEmployerDept(Long employerDept) {
		this.employerDept = employerDept;
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

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}
	
}
