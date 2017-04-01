package com.panfeng.film.resource.model;

import com.paipianwang.pat.common.entity.BaseEntity;

/**
 * wechat 
 */
public class Wechat extends BaseEntity {

	private static final long serialVersionUID = 2862541565626913853L;

	private String nickname = null; // 昵称
	
	private Integer sex = null; // 性别，1为男性，2为女性
	
	private String province = null; // 省份
	
	private String city = null; // 城市
	
	private String country = null; // 国家，如中国为CN
	
	private String headimgurl = null; // 用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空
	
	private String[] privilege = null; // 用户特权信息，json数组
	
	private String unionid = null; // 用户统一标识
	
	private Long errcode = null; // 错误编码
	
	private String errmsg = null; // 错误信息

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public Integer getSex() {
		return sex;
	}

	public void setSex(Integer sex) {
		this.sex = sex;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getHeadimgurl() {
		return headimgurl;
	}

	public void setHeadimgurl(String headimgurl) {
		this.headimgurl = headimgurl;
	}

	public String[] getPrivilege() {
		return privilege;
	}

	public void setPrivilege(String[] privilege) {
		this.privilege = privilege;
	}

	public String getUnionid() {
		return unionid;
	}

	public void setUnionid(String unionid) {
		this.unionid = unionid;
	}

	public Long getErrcode() {
		return errcode;
	}

	public void setErrcode(Long errcode) {
		this.errcode = errcode;
	}

	public String getErrmsg() {
		return errmsg;
	}

	public void setErrmsg(String errmsg) {
		this.errmsg = errmsg;
	}
	
}
