package com.panfeng.film.filter;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.paipianwang.pat.facade.right.entity.SessionInfo;
import com.panfeng.film.domain.GlobalConstant;

/**
 * 用户信息拦截器
 * 拦截未登录用户做登陆使用
 * @author Jack
 *
 */
public class UserInfoInterceptor extends HandlerInterceptorAdapter {
	
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		final String contextPath = request.getContextPath();
		final SessionInfo info = (SessionInfo) request.getSession().getAttribute(GlobalConstant.SESSION_INFO);
		
		if(info != null){
			if(GlobalConstant.ROLE_CUSTOMER.equals(info.getSessionType())){
				return true;
			}
		}
		response.sendRedirect(contextPath + "/login");
		return false;
	}
}
