package com.panfeng.film.filter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.paipianwang.pat.common.constant.PmsConstant;
import com.paipianwang.pat.common.entity.SessionInfo;

public class OrderInterceptor extends HandlerInterceptorAdapter {

	public boolean preHandle(HttpServletRequest req,
			HttpServletResponse resp, Object handler) throws Exception {
		
		final String contextPath = req.getContextPath();
		final SessionInfo info = (SessionInfo) req.getSession().getAttribute(PmsConstant.SESSION_INFO);
		if(info != null){
			final String identity = info.getSessionType();
			if(PmsConstant.ROLE_EMPLOYEE.equals(identity)) 
				return true;
		}
		
		resp.sendRedirect(contextPath + "/mgr/login");
		return false;
	}
}
