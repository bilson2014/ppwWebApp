package com.panfeng.film.service;

import javax.servlet.http.HttpServletRequest;

import com.panfeng.film.resource.model.Team;
import com.panfeng.film.resource.model.Wechat;

public interface OtherLogin {
	boolean login(Team team, HttpServletRequest request);

	Wechat decodeWechatToken(String code, HttpServletRequest request);

}
