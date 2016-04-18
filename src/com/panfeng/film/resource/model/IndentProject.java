package com.panfeng.film.resource.model;

import java.util.HashMap;
import java.util.Map;

import com.panfeng.film.domain.BaseObject;

public class IndentProject extends BaseObject {

	private static final long serialVersionUID = 4610963805615371485L;

	private long id = -1;
	private String projectName = "";
	private String userName = "";
	private String userContact = "";
	private String userPhone = "";
	private String teamName = "";
	private String teamContact = "";
	private String teamPhone = "";
	private String price = "";
	private String description = "";
	private String serial = "";
	private String source = "";

	private String userType = "";
	private long userId = -1;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserContact() {
		return userContact;
	}

	public void setUserContact(String userContact) {
		this.userContact = userContact;
	}

	public String getUserPhone() {
		return userPhone;
	}

	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	public String getTeamContact() {
		return teamContact;
	}

	public void setTeamContact(String teamContact) {
		this.teamContact = teamContact;
	}

	public String getTeamPhone() {
		return teamPhone;
	}

	public void setTeamPhone(String teamPhone) {
		this.teamPhone = teamPhone;
	}

	public IndentProject() {
		super();
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getSerial() {
		return serial;
	}

	public void setSerial(String serial) {
		this.serial = serial;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	// -----------------------------
	// 冗余taskdate--------------------------------------

	private Map<String, String> time = new HashMap<>();
	private ActivitiTask task = new ActivitiTask();
	private String tag="";

	public ActivitiTask getTask() {
		return task;
	}

	public void setTask(ActivitiTask task) {
		this.task = task;
	}

	public Map<String, String> getTime() {
		return time;
	}

	public void setTime(Map<String, String> time) {
		this.time = time;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

}
