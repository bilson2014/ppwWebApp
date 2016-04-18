package com.panfeng.film.listener;

import javax.servlet.http.HttpServletRequest;

import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.resource.view.CurrentCustomer;
import com.panfeng.film.util.HttpUtil;
import com.panfeng.film.util.JsonUtil;
import com.panfeng.film.util.ValidateUtil;

public abstract class BaseListener {

protected <T> T getCurrentInfo(final HttpServletRequest request,final String field,final Class<T> clazz){
		
		final String url = GlobalConstant.URL_PREFIX + "portal/common/loadCurrentUser";
		final CurrentCustomer current = new CurrentCustomer();
		current.setField(field);
		final String str = HttpUtil.httpPost(url, current, request);
		if(ValidateUtil.isValid(str)){
			return JsonUtil.toBean(str, clazz);
		}
		return null;
	}
	
	protected void updateSession(final HttpServletRequest request,final String field,final Object obj){
		
		final String url = GlobalConstant.URL_PREFIX + "portal/common/updateSession";
		final CurrentCustomer current = new CurrentCustomer();
		current.setField(field);
		current.setValue(JsonUtil.toJson(obj));
		HttpUtil.httpPost(url, current, request);
	}
}
