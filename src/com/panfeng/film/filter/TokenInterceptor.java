package com.panfeng.film.filter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.panfeng.film.util.DataUtil;
import com.panfeng.film.util.ValidateUtil;

/**
 * URL拦截器 添加token访问机制
 * 
 * @author Jack
 *
 */
public class TokenInterceptor extends HandlerInterceptorAdapter {



	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		// 获取session
		final HttpSession session = request.getSession();
		// 获取session的token
		String stoken = (String) session.getAttribute("csrftoken");

		if (!ValidateUtil.isValid(stoken)) {
			// 如果没有，则创建
			stoken = DataUtil.getUuid();
			session.setAttribute("csrftoken", stoken);
			
		}

		// add by Lw,2016-06-21 19:45 begin
		// to prevent the repeat
		String rtoken = (String) session.getAttribute("rtoken");
		if (!ValidateUtil.isValid(rtoken)) {
			// 如果没有，则创建
			stoken = DataUtil.getUuid();
			session.setAttribute("rtoken", stoken);
		}
		return true;
	}

}
