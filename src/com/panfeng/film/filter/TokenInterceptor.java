package com.panfeng.film.filter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.panfeng.film.service.SessionInfoService;
import com.panfeng.film.util.DataUtil;
import com.panfeng.film.util.ValidateUtil;

/**
 * URL拦截器
 * 添加token访问机制
 * @author Jack
 *
 */
public class TokenInterceptor extends HandlerInterceptorAdapter {
	
	@Autowired
	final SessionInfoService service = null;

	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		
		// 获取session
		final HttpSession session = request.getSession();
		// 获取session的token
		String stoken = (String) session.getAttribute("csrftoken");
		
		if(!ValidateUtil.isValid(stoken)){
			// 如果没有，则创建
			stoken = DataUtil.getUuid();
			session.setAttribute("csrftoken", stoken);
		}
		
		return true;
	}
	
}
