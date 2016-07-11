package com.panfeng.film.service;

import javax.servlet.http.HttpServletRequest;

import com.panfeng.film.resource.model.Employee;
import com.panfeng.film.resource.model.Wechat;

public interface EmployeeThirdLogin {
	boolean login(Employee team, HttpServletRequest request);

	Wechat decodeWechatToken(String code, HttpServletRequest request);

}
