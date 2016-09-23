package com.panfeng.film.resource.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;

import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.domain.SessionInfo;
import com.panfeng.film.resource.model.User;
import com.panfeng.film.service.SessionInfoService;
import com.panfeng.film.util.Log;

/**
 * 资源基类
 * 专用于继承
 * @author GY
 *
 */
public abstract class BaseController {

	
	@Autowired
	final SessionInfoService sessionService = null;
	
	// get current user
	protected User getUser (final HttpServletRequest request){
		
		User user = null;
		try {
			HttpSession session = request.getSession();
			user = (User) session.getAttribute("username");
		} catch (Exception e) {
			Log.error("Retrieve username error ...", null);
			e.printStackTrace();
		}
		if(user == null){
			user = new User();
			user.setUserName("缺省用户");
		}
		return user;
	}
	
	protected SessionInfo getCurrentInfo(final HttpServletRequest request){
		
		/*final String url = GlobalConstant.URL_PREFIX + "portal/common/loadCurrentUser";
		final CurrentCustomer current = new CurrentCustomer();
		current.setField(field);
		final String str = HttpUtil.httpPost(url, current, request);
		if(ValidateUtil.isValid(str)){
			return JsonUtil.toBean(str, clazz);
		}*/
		
		final SessionInfo info = (SessionInfo) sessionService.getSessionWithField(request, GlobalConstant.SESSION_INFO);
		return info;
	}
	
}
