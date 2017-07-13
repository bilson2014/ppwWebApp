package com.panfeng.film.model;

import java.io.Serializable;

public class Product implements Serializable {

	private static final long serialVersionUID = -5854020218298837117L;

	/** 视频名称 */
	private String productName = null;

	/** 视频连接 */
	private String videoUrl = null;

	/** 封面 */
	private String picLDUrl = null;

	/** 团队ID */
	private Long teamId = null;

	/** 作品ID */
	private long productId = 0l;

	/** 创作时间 */
	private String creationTime = null;
	
	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getVideoUrl() {
		return videoUrl;
	}

	public void setVideoUrl(String videoUrl) {
		this.videoUrl = videoUrl;
	}

	public String getPicLDUrl() {
		return picLDUrl;
	}

	public void setPicLDUrl(String picLDUrl) {
		this.picLDUrl = picLDUrl;
	}

	public String getCreationTime() {
		return creationTime;
	}

	public void setCreationTime(String creationTime) {
		this.creationTime = creationTime;
	}

	public Long getTeamId() {
		return teamId;
	}

	public void setTeamId(Long teamId) {
		this.teamId = teamId;
	}

	public long getProductId() {
		return productId;
	}

	public void setProductId(long productId) {
		this.productId = productId;
	}

}
