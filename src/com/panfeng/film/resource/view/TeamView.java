package com.panfeng.film.resource.view;

public class TeamView extends Pagination{

	private static final long serialVersionUID = 7598528321076177988L;
	
	private String teamName = null; // 团队名称
	
	private String createDate = null; // 创建时间
	
	private String beginDate = null; // 开始时间
	
	private String endDate = null; // 结束时间

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getBeginDate() {
		return beginDate;
	}

	public void setBeginDate(String beginDate) {
		this.beginDate = beginDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	
}
