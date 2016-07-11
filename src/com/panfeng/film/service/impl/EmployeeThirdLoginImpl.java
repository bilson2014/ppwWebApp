package com.panfeng.film.service.impl;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.resource.model.Employee;
import com.panfeng.film.resource.model.Wechat;
import com.panfeng.film.service.EmployeeThirdLogin;
import com.panfeng.film.util.HttpUtil;
import com.panfeng.film.util.JsonUtil;
import com.panfeng.film.util.ValidateUtil;

@Service
public class EmployeeThirdLoginImpl implements EmployeeThirdLogin {
	final static String url = GlobalConstant.URL_PREFIX + "portal/manager/thirdLogin/isExist";
	final Logger logger = LoggerFactory.getLogger("error");

	@Override
	public boolean login(Employee employee, HttpServletRequest request) {
		final String json = HttpUtil.httpPost(url, employee, request);
		if (ValidateUtil.isValid(json)) {
			return JsonUtil.toBean(json, Boolean.class);
		} else {
			return false;
		}
	}
	@Override
	public Wechat decodeWechatToken(String code, HttpServletRequest request) {
		return null;
	}

}
