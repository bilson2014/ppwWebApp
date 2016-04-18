package com.panfeng.film.resource.model;

import com.panfeng.film.domain.BaseObject;

public class Right extends BaseObject {

	private static final long serialVersionUID = 2821043977105046450L;

	private long rightId = 0l;
	
	private String rightName = null;
	
	private String url = null;

	private String rightDescription = null;
	
	private String createDate = null;
	
	private String updateDate = null;
	
	private int pos = 0;
	
	private long code = 0l;
	
	private boolean isCommon;
	
	
	public boolean getIsCommon() {
		return isCommon;
	}

	public void setIsCommon(boolean isCommon) {
		this.isCommon = isCommon;
	}

	public long getRightId() {
		return rightId;
	}

	public void setRightId(long rightId) {
		this.rightId = rightId;
	}

	public String getRightName() {
		return rightName;
	}

	public void setRightName(String rightName) {
		this.rightName = rightName;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getRightDescription() {
		return rightDescription;
	}

	public void setRightDescription(String rightDescription) {
		this.rightDescription = rightDescription;
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

	public int getPos() {
		return pos;
	}

	public void setPos(int pos) {
		this.pos = pos;
	}

	public long getCode() {
		return code;
	}

	public void setCode(long code) {
		this.code = code;
	}

	public void setCommon(boolean isCommon) {
		this.isCommon = isCommon;
	}

}
