package com.panfeng.film.filter;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.domain.SessionInfo;
import com.panfeng.film.service.SessionInfoService;
import com.panfeng.film.util.DataUtil;
import com.panfeng.film.util.ValidateUtil;

/**
 * URL拦截器
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
		
		final String referer = request.getHeader("Referer");
		
		System.out.println("referer : " + referer);
		
		System.err.println(request.getParameter("serviceId"));
		
		if(ValidateUtil.isValid(stoken)){
			// session中存在，则进行比对
			// 从 HTTP 头中取得 token
			final String xhrToken = request.getHeader("csrftoken");
			
			// 从请求参数中取得 token
			final String pToken = (String) request.getAttribute("csrftoken");
		}else{
			// 如果没有，则创建
			stoken = DataUtil.md5(session.getId());
			session.setAttribute("csrftoken", stoken);
		}
		
		session.setAttribute("token", "123456");
		
		return true;
	}
	
}
