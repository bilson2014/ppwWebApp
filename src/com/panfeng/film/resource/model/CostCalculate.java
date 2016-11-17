package com.panfeng.film.resource.model;

/**
 *成本计算器实体
 */
public class CostCalculate {
	
	//视频类别：0活动视频 1产品广告(TVC)2企业宣传 3微电影 4融资路演 5众筹视频
	private int videoType;
	//团队 ： 0专业级导演团队 1广告级导演团队 2电影级导演团队
	private int team;
	//设备：0专业级拍摄设备 2K 1广告级拍摄设备 4K 2电影级拍摄设备 4K
	private int equipment;
	//演员： 0无演员 1自有演员 2普通演员 3一线演员
	private int actor;
	//动画：0无动画 1三维动画 2二维动画 3MG动画
	private int animation;
	//时长：0代表1分钟－3分钟     1代表3分钟－5分钟  2代表5-10分钟
	private int time;
	
	private String phone;
	
	private long indentId;
	
	private String description;//条件组合字符串：活动视频,专业级导演团队。。。。。
	
	public long getIndentId() {
		return indentId;
	}
	public void setIndentId(long indentId) {
		this.indentId = indentId;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public int getVideoType() {
		return videoType;
	}
	public void setVideoType(int videoType) {
		this.videoType = videoType;
	}
	public int getTeam() {
		return team;
	}
	public void setTeam(int team) {
		this.team = team;
	}
	public int getEquipment() {
		return equipment;
	}
	public void setEquipment(int equipment) {
		this.equipment = equipment;
	}
	public int getActor() {
		return actor;
	}
	public void setActor(int actor) {
		this.actor = actor;
	}
	public int getAnimation() {
		return animation;
	}
	public void setAnimation(int animation) {
		this.animation = animation;
	}
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
}
