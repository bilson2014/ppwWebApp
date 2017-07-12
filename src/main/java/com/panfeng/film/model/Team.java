package com.panfeng.film.model;

import java.io.Serializable;

import com.paipianwang.pat.facade.team.entity.PmsCity;
import com.paipianwang.pat.facade.team.entity.PmsProvince;

public class Team implements Serializable {

	private static final long serialVersionUID = -1519996155634444771L;

	/** 团队名称 **/
	private String teamName = null;
	/** 团队照片 **/
	private String teamPhotoUrl = null;
	/** 团队介绍 **/
	private String teamDescription = null;
	/** 创建时间 **/
	private String createDate = null;
	/** 用于排序 **/
	private int od;
	/** 更新时间 **/
	private String updateDate = null;
	/** 123456 密码 **/
	private String password = "E10ADC3949BA59ABBE56E057F20F883E";
	/** 联系电话 **/
	private String phoneNumber = null;
	/** 邮箱 **/
	private String email = null;
	/** 公司地址 **/
	private String address = null;
	/** 状态位 0未审核1审核通过2审核未通过 **/
	private int flag = 0;
	/** 登陆名 **/
	private String loginName = null;
	/** 审核意见 **/
	private String recommendation = null;
	/** 联系人 **/
	private String linkman = null;
	/** 微信号 **/
	private String webchat = null;
	/** QQ号 **/
	private String qq = null;
	/** 官方网站 **/
	private String officialSite = null;
	/** 公司规模 **/
	private String scale = null;
	/** 公司成立时间 **/
	private String establishDate = null;
	/** 客户描述 **/
	private String businessDesc = null;
	/** 价格区间 **/
	private int priceRange;
	/** 客户要求 **/
	private String demand;
	/** 获知渠道 **/
	private int infoResource = 0;
	/** 备注 **/
	private String description = null;
	/** QQToken **/
	private String qqUnique = null;
	/** 微博Token **/
	private String wbUnique = null;
	/** 微信Token **/
	private String wechatUnique = null;
	/** 三方登录唯一ID **/
	private String uniqueId = null;
	/** 城市ID **/
	private PmsCity pmsCity;
	/** 省ID **/
	private PmsProvince pmsProvince;
	/** 是否推荐到主页 **/
	private Boolean recommend;
	/** 主页推荐排序 **/
	private Integer recommendSort;
	private long teamId = 0l;
	private int city = 0; // 城市

	/** 业务范围 **/
	private String business = null;

	private String teamCity = null; // 城市ID

	private String teamProvince = null; // 省ID

	// 冗余字段
	private String teamProvinceName = null;// 省名

	private String teamCityName = null; // 城市名

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

	public String getTeamDescription() {
		return teamDescription;
	}

	public void setTeamDescription(String teamDescription) {
		this.teamDescription = teamDescription;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public int getOd() {
		return od;
	}

	public void setOd(int od) {
		this.od = od;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
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

	public int getFlag() {
		return flag;
	}

	public void setFlag(int flag) {
		this.flag = flag;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getRecommendation() {
		return recommendation;
	}

	public void setRecommendation(String recommendation) {
		this.recommendation = recommendation;
	}

	public String getLinkman() {
		return linkman;
	}

	public void setLinkman(String linkman) {
		this.linkman = linkman;
	}

	public String getWebchat() {
		return webchat;
	}

	public void setWebchat(String webchat) {
		this.webchat = webchat;
	}

	public String getQq() {
		return qq;
	}

	public void setQq(String qq) {
		this.qq = qq;
	}

	public String getOfficialSite() {
		return officialSite;
	}

	public void setOfficialSite(String officialSite) {
		this.officialSite = officialSite;
	}

	public String getScale() {
		return scale;
	}

	public void setScale(String scale) {
		this.scale = scale;
	}

	public String getEstablishDate() {
		return establishDate;
	}

	public void setEstablishDate(String establishDate) {
		this.establishDate = establishDate;
	}

	public String getBusinessDesc() {
		return businessDesc;
	}

	public void setBusinessDesc(String businessDesc) {
		this.businessDesc = businessDesc;
	}

	public int getPriceRange() {
		return priceRange;
	}

	public void setPriceRange(int priceRange) {
		this.priceRange = priceRange;
	}

	public String getDemand() {
		return demand;
	}

	public void setDemand(String demand) {
		this.demand = demand;
	}

	public int getInfoResource() {
		return infoResource;
	}

	public void setInfoResource(int infoResource) {
		this.infoResource = infoResource;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getQqUnique() {
		return qqUnique;
	}

	public void setQqUnique(String qqUnique) {
		this.qqUnique = qqUnique;
	}

	public String getWbUnique() {
		return wbUnique;
	}

	public void setWbUnique(String wbUnique) {
		this.wbUnique = wbUnique;
	}

	public String getWechatUnique() {
		return wechatUnique;
	}

	public void setWechatUnique(String wechatUnique) {
		this.wechatUnique = wechatUnique;
	}

	public String getUniqueId() {
		return uniqueId;
	}

	public void setUniqueId(String uniqueId) {
		this.uniqueId = uniqueId;
	}

	public PmsCity getPmsCity() {
		return pmsCity;
	}

	public void setPmsCity(PmsCity pmsCity) {
		this.pmsCity = pmsCity;
	}

	public PmsProvince getPmsProvince() {
		return pmsProvince;
	}

	public void setPmsProvince(PmsProvince pmsProvince) {
		this.pmsProvince = pmsProvince;
	}

	public Boolean getRecommend() {
		return recommend;
	}

	public void setRecommend(Boolean recommend) {
		this.recommend = recommend;
	}

	public Integer getRecommendSort() {
		return recommendSort;
	}

	public void setRecommendSort(Integer recommendSort) {
		this.recommendSort = recommendSort;
	}

	public long getTeamId() {
		return teamId;
	}

	public void setTeamId(long teamId) {
		this.teamId = teamId;
	}

	public int getCity() {
		return city;
	}

	public void setCity(int city) {
		this.city = city;
	}

	public String getBusiness() {
		return business;
	}

	public void setBusiness(String business) {
		this.business = business;
	}

	public String getTeamCity() {
		return teamCity;
	}

	public void setTeamCity(String teamCity) {
		this.teamCity = teamCity;
	}

	public String getTeamProvince() {
		return teamProvince;
	}

	public void setTeamProvince(String teamProvince) {
		this.teamProvince = teamProvince;
	}

	public String getTeamProvinceName() {
		return teamProvinceName;
	}

	public void setTeamProvinceName(String teamProvinceName) {
		this.teamProvinceName = teamProvinceName;
	}

	public String getTeamCityName() {
		return teamCityName;
	}

	public void setTeamCityName(String teamCityName) {
		this.teamCityName = teamCityName;
	}

}
