package com.panfeng.film.filter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.paipianwang.pat.common.entity.SessionInfo;
import com.panfeng.film.domain.GlobalConstant;

/**
 * 供应商管理拦截器
 * 拦截未登录用户做登陆使用
 * @author Jack
 *
 */
public class ManagerInterceptor extends HandlerInterceptorAdapter {
	
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		
		final String contextPath = request.getContextPath();

		final SessionInfo info = (SessionInfo) request.getSession().getAttribute(GlobalConstant.SESSION_INFO);
		
		if(info != null){
			return true;
		}
		
		response.sendRedirect(contextPath + "/mgr/login");
		return false;
	}
	
}
