package com.panfeng.film.filter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.util.ValidateUtil;

/** 
 * URL拦截器 验证token访问机制
 * 
 * @author Jack
 *
 */
public class ValidateTokenInterceptor extends HandlerInterceptorAdapter {

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		// 获取session
		final HttpSession session = request.getSession();

		// 获取session的token
		final String stoken = (String) session.getAttribute("csrftoken");

		// 获取request中的token
		String token = request.getParameter("csrftoken");

		final String referer = request.getHeader("Referer");

		if (ValidateUtil.isValid(referer) && referer.indexOf(GlobalConstant.HTTP_REFERER) > -1) {
			// 判断来源地址为 www.apaipian.com
			if (ValidateUtil.isValid(stoken) && ValidateUtil.isValid(token)) {
				// session中的token 与 url中的token不为空
				if (stoken.equals(token)) {
					// 判断是否相等

					return true;
				}
			}
		}

		// 来源地址为空 或者 来源地址不是 www.apaipian.com
		// 认为是伪网站
		response.sendRedirect(request.getContextPath() + "/error");
		return false;
	}

}
