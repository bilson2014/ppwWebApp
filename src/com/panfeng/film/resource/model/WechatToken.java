package com.panfeng.film.resource.model;

import com.panfeng.film.domain.BaseObject;

/**
 * wechat token 
 */
public class WechatToken extends BaseObject {

	private static final long serialVersionUID = 2862541565626913853L;

	private String appid = null;
	
	private String secret = null;
	
	private String code = null; // 参数
	
	private String grant_type = null;
	
	private String access_token = null; // 接口调用凭证
	
	private Long expires_in = null; // access_token接口调用凭证超时时间，单位（秒）
	
	private String refresh_token = null; // 用户刷新access_token
	
	private String openid = null; // 授权用户唯一标识
	
	private String scope = null; // 用户授权的作用域，使用逗号（,）分隔
	
	private String unionid = null; // 只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。
	
	private Long errcode = null; // 错误标识
	
	private String errmsg = null; // 错误信息
	
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getGrant_type() {
		return grant_type;
	}

	public void setGrant_type(String grant_type) {
		this.grant_type = grant_type;
	}

	public String getAccess_token() {
		return access_token;
	}

	public void setAccess_token(String access_token) {
		this.access_token = access_token;
	}

	public Long getExpires_in() {
		return expires_in;
	}

	public void setExpires_in(Long expires_in) {
		this.expires_in = expires_in;
	}

	public String getRefresh_token() {
		return refresh_token;
	}

	public void setRefresh_token(String refresh_token) {
		this.refresh_token = refresh_token;
	}

	public String getOpenid() {
		return openid;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}

	public String getScope() {
		return scope;
	}

	public void setScope(String scope) {
		this.scope = scope;
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

	public String getAppid() {
		return appid;
	}

	public void setAppid(String appid) {
		this.appid = appid;
	}

	public String getSecret() {
		return secret;
	}

	public void setSecret(String secret) {
		this.secret = secret;
	}

}
