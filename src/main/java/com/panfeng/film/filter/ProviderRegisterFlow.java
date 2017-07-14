package com.panfeng.film.filter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.paipianwang.pat.common.constant.PmsConstant;
import com.paipianwang.pat.common.entity.SessionInfo;
import com.panfeng.film.util.Log;


/**
 * 供应商管理拦截器
 * 拦截未登录用户做登陆使用
 * @author Jack
 *
 */
public class ProviderRegisterFlow extends HandlerInterceptorAdapter {
	
	public boolean preHandle(HttpServletRequest req,
		HttpServletResponse resp, Object handler) throws Exception {
		
		final String contextPath = req.getContextPath();
		final SessionInfo info = (SessionInfo) req.getSession().getAttribute(PmsConstant.SESSION_INFO);
		if(info == null){
			// 未登录
			Log.error("没有权限，请先登录", null);
			resp.sendRedirect(contextPath + "/login");
			return false;
		}
		return true;
	}
}
