package com.panfeng.film.model;

import java.io.Serializable;
import java.util.List;

public class Product implements Serializable {

	private static final long serialVersionUID = -5854020218298837117L;

	/** 视频名称 */
	private String productName = null;

	/** 视频连接 */
	private String videoUrl = null;

	/** 视频描述 */
	private String videoDescription = null;

	/** 作品描述 */
	private String pDescription = null;

	/** 封面 */
	private String picLDUrl = null;

	/** 截图 */
	private String picHDUrl = null;

	/** 项目类别 */
	private int productType = 0;

	/** 上传时间 */
	private String uploadDate = null;

	/** 推荐值 */
	private int recommend = 0;

	/** 点赞 */
	private long supportCount = 0;

	/** 视频长度 */
	private String videoLength = "0";

	/** 团队ID */
	private Long teamId = null;

	/** 审核状态 */
	private int flag = 0;

	/** 产品是否可见 (0:可见,1:不可见) */
	private int visible = 0;

	/** 外链(优酷/土豆等) */
	private String hret = "";

	/** 更新日期 */
	private String updateDate = null;

	/** 标签字段 */
	private String tags = null;

	/** 默认开启图文显示 */
	private int showType = 1;

	/** 创作时间 */
	private String creationTime = null;

	/** 推荐作品，0为正常 1 为推荐 */
	private Integer masterWork = null;

	/** 审核详情 */
	private String checkDetails = null;

	/** 0 未转换 1 转换成功 2转换失败 */
	private int convertStatus = 0;

	/** 提交审核时间，该字段只会在前端修改提交后修改 */
	private String submitTime = null;

	/** 项目类别名称 */
	private String productTypeName = null;

	private String teamName = null;

	/** 团队照片 */
	private String teamPhotoUrl = null;

	/** 团队状态 */
	private String teamFlag = null;

	/** 团队介绍 */
	private String teamDescription = null;

	/** 服务编号 */
	private long serviceId = 0l;

	/** 服务真实价格 */
	private double servicePrice = 0.0d;

	/** 折扣后价格 */
	private double serviceRealPrice = 0.0d;

	/** 服务-影片长度 */
	private long mcoms = 0l;

	/** 临时文件夹 */
	private String SessionId = null;

	/** 类型名称 */
	private String itemName = null;

	private long productId = 0l;

	private String priceDetail = null;

	private List<String> tagsArray = null;

	/** 项目编号 */
	private Long indentProjectId = 0l;

	private String sceneTag; // 场景标签
	private Long chanpinId = null; // 产品ID
	private Long chanPinConfigurationId = null; // 服务/配置ID

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

	public String getVideoDescription() {
		return videoDescription;
	}

	public void setVideoDescription(String videoDescription) {
		this.videoDescription = videoDescription;
	}

	public String getpDescription() {
		return pDescription;
	}

	public void setpDescription(String pDescription) {
		this.pDescription = pDescription;
	}

	public String getPicLDUrl() {
		return picLDUrl;
	}

	public void setPicLDUrl(String picLDUrl) {
		this.picLDUrl = picLDUrl;
	}

	public String getPicHDUrl() {
		return picHDUrl;
	}

	public void setPicHDUrl(String picHDUrl) {
		this.picHDUrl = picHDUrl;
	}

	public int getProductType() {
		return productType;
	}

	public void setProductType(int productType) {
		this.productType = productType;
	}

	public String getUploadDate() {
		return uploadDate;
	}

	public void setUploadDate(String uploadDate) {
		this.uploadDate = uploadDate;
	}

	public int getRecommend() {
		return recommend;
	}

	public void setRecommend(int recommend) {
		this.recommend = recommend;
	}

	public long getSupportCount() {
		return supportCount;
	}

	public void setSupportCount(long supportCount) {
		this.supportCount = supportCount;
	}

	public String getVideoLength() {
		return videoLength;
	}

	public void setVideoLength(String videoLength) {
		this.videoLength = videoLength;
	}

	public Long getTeamId() {
		return teamId;
	}

	public void setTeamId(Long teamId) {
		this.teamId = teamId;
	}

	public int getFlag() {
		return flag;
	}

	public void setFlag(int flag) {
		this.flag = flag;
	}

	public int getVisible() {
		return visible;
	}

	public void setVisible(int visible) {
		this.visible = visible;
	}

	public String getHret() {
		return hret;
	}

	public void setHret(String hret) {
		this.hret = hret;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}

	public String getTags() {
		return tags;
	}

	public void setTags(String tags) {
		this.tags = tags;
	}

	public int getShowType() {
		return showType;
	}

	public void setShowType(int showType) {
		this.showType = showType;
	}

	public String getCreationTime() {
		return creationTime;
	}

	public void setCreationTime(String creationTime) {
		this.creationTime = creationTime;
	}

	public Integer getMasterWork() {
		return masterWork;
	}

	public void setMasterWork(Integer masterWork) {
		this.masterWork = masterWork;
	}

	public String getCheckDetails() {
		return checkDetails;
	}

	public void setCheckDetails(String checkDetails) {
		this.checkDetails = checkDetails;
	}

	public int getConvertStatus() {
		return convertStatus;
	}

	public void setConvertStatus(int convertStatus) {
		this.convertStatus = convertStatus;
	}

	public String getSubmitTime() {
		return submitTime;
	}

	public void setSubmitTime(String submitTime) {
		this.submitTime = submitTime;
	}

	public String getProductTypeName() {
		return productTypeName;
	}

	public void setProductTypeName(String productTypeName) {
		this.productTypeName = productTypeName;
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	public String getTeamPhotoUrl() {
		return teamPhotoUrl;
	}

	public void setTeamPhotoUrl(String teamPhotoUrl) {
		this.teamPhotoUrl = teamPhotoUrl;
	}

	public String getTeamFlag() {
		return teamFlag;
	}

	public void setTeamFlag(String teamFlag) {
		this.teamFlag = teamFlag;
	}

	public String getTeamDescription() {
		return teamDescription;
	}

	public void setTeamDescription(String teamDescription) {
		this.teamDescription = teamDescription;
	}

	public long getServiceId() {
		return serviceId;
	}

	public void setServiceId(long serviceId) {
		this.serviceId = serviceId;
	}

	public double getServicePrice() {
		return servicePrice;
	}

	public void setServicePrice(double servicePrice) {
		this.servicePrice = servicePrice;
	}

	public double getServiceRealPrice() {
		return serviceRealPrice;
	}

	public void setServiceRealPrice(double serviceRealPrice) {
		this.serviceRealPrice = serviceRealPrice;
	}

	public long getMcoms() {
		return mcoms;
	}

	public void setMcoms(long mcoms) {
		this.mcoms = mcoms;
	}

	public String getSessionId() {
		return SessionId;
	}

	public void setSessionId(String sessionId) {
		SessionId = sessionId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public long getProductId() {
		return productId;
	}

	public void setProductId(long productId) {
		this.productId = productId;
	}

	public String getPriceDetail() {
		return priceDetail;
	}

	public void setPriceDetail(String priceDetail) {
		this.priceDetail = priceDetail;
	}

	public List<String> getTagsArray() {
		return tagsArray;
	}

	public void setTagsArray(List<String> tagsArray) {
		this.tagsArray = tagsArray;
	}

	public Long getIndentProjectId() {
		return indentProjectId;
	}

	public void setIndentProjectId(Long indentProjectId) {
		this.indentProjectId = indentProjectId;
	}

	public String getSceneTag() {
		return sceneTag;
	}

	public void setSceneTag(String sceneTag) {
		this.sceneTag = sceneTag;
	}

	public Long getChanpinId() {
		return chanpinId;
	}

	public void setChanpinId(Long chanpinId) {
		this.chanpinId = chanpinId;
	}

	public Long getChanPinConfigurationId() {
		return chanPinConfigurationId;
	}

	public void setChanPinConfigurationId(Long chanPinConfigurationId) {
		this.chanPinConfigurationId = chanPinConfigurationId;
	}

}
