package com.panfeng.film.resource.model;

import java.util.List;

import com.panfeng.film.domain.BaseObject;

/**
 * 供应商业务类
 * 
 * @author GY
 */
public class Team extends BaseObject {

	private static final long serialVersionUID = -2618543190652423599L;

	private long teamId = 0l;

	private String password = "E10ADC3949BA59ABBE56E057F20F883E"; // 123456 密码

	private String phoneNumber = null; // 联系电话

	private String loginName = null; // 登陆名

	private String email = null; // 邮箱

	private String address = null; // 公司地址

	private int flag = 0; // 状态位

	private String teamName = null; // 团队名称

	private String teamPhotoUrl = null; // 团队照片

	private String teamDescription = null; // 团队介绍

	private String createDate = null; // 创建时间

	private String updateDate = null; // 更新时间

	private String verification_code = null; // 短信验证码

	private int od; // 用于排序

	private List<Product> proList = null; // 关联项目

	private String recommendation = null; // 审核意见

	private int city = 0; // 城市

	private String linkman = null; // 联系人

	private String webchat = null; // 微信号

	private String qq = null; // QQ号

	private String officialSite = null; // 官方网站

	private String scale = null; // 公司规模

	private String establishDate = null; // 公司成立时间

	private String business = null;

	private String businessDesc = null; // 主要客户/作品及价格

	private int priceRange; // 价格区间

	private String demand; // 对客户的要求

	private int infoResource = 0; // 获知渠道

	private String description = null; // 备注

	private String qqUnique = null; // QQToken

	private String wbUnique = null; // 微博Token

	private String wechatUnique = null; // 微信Token

	private String uniqueId = null; // 三方登录唯一ID

	private String thirdLoginType = null; // 第三方登录类型

	public final static String LTYPE_WEIBO = "weibo";

	public final static String LTYPE_QQ = "qq";

	public final static String LTYPE_WECHAT = "wechat";

	private String loginType;// 登录方式

	private String teamCity = null; // 城市ID

	private String teamProvince = null; // 省ID

	// 冗余字段
	private String teamProvinceName = null;// 省名

	private String teamCityName = null; // 城市名

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

	public String getLoginType() {
		return loginType;
	}

	public void setLoginType(String loginType) {
		this.loginType = loginType;
	}

	public long getTeamId() {
		return teamId;
	}

	public void setTeamId(long teamId) {
		this.teamId = teamId;
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

	public List<Product> getProList() {
		return proList;
	}

	public void setProList(List<Product> proList) {
		this.proList = proList;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
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

	public String getVerification_code() {
		return verification_code;
	}

	public void setVerification_code(String verification_code) {
		this.verification_code = verification_code;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}

	public String getRecommendation() {
		return recommendation;
	}

	public void setRecommendation(String recommendation) {
		this.recommendation = recommendation;
	}

	public int getCity() {
		return city;
	}

	public void setCity(int city) {
		this.city = city;
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

	public String getBusiness() {
		return business;
	}

	public void setBusiness(String business) {
		this.business = business;
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

	public String getThirdLoginType() {
		return thirdLoginType;
	}

	public void setThirdLoginType(String thirdLoginType) {
		this.thirdLoginType = thirdLoginType;
	}

	@Override
	public String toString() {
		StringBuffer stringBuffer = new StringBuffer();
		stringBuffer.append(this.teamName);
		stringBuffer.append(this.linkman);
		stringBuffer.append(this.webchat);
		stringBuffer.append(this.qq);
		stringBuffer.append(this.email);
		stringBuffer.append(this.address);
		stringBuffer.append(this.teamProvince);
		stringBuffer.append(this.teamCity);
		stringBuffer.append(this.priceRange);
		stringBuffer.append(this.infoResource);
		stringBuffer.append(this.business);
		stringBuffer.append(this.teamDescription);
		stringBuffer.append(this.scale);
		stringBuffer.append(this.demand);
		return stringBuffer.toString();
	}
}
