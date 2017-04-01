package com.panfeng.film.filter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;


import com.paipianwang.pat.common.constant.PmsConstant;
import com.paipianwang.pat.common.entity.SessionInfo;

/**
 * 用作验证是否cookie登录
 * 
 * @author Jack
 *
 */
public class LoginInterceptor extends HandlerInterceptorAdapter {

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		String requestType = request.getHeader("X-Requested-With");
		if (null == requestType || !"XMLHttpRequest".equals(requestType)) {// 非ajax
			final SessionInfo info = (SessionInfo) request.getSession().getAttribute(PmsConstant.SESSION_INFO);
			if (info != null) {
				return true;
			}
			// 新客户端 ,获取cookie，检测客户端是否存在七天内登陆
			// return checkAutoLogin(request,response);
		}
		return true;
	}

	/*private boolean checkAutoLogin(HttpSerPmsConstantquest,HttpServletResponse response) {
		// 检测版本的cookie文件
		String token = null;
		Cookie[] cookie = request.getCookies();
		if (cookie != null) {
			if (cookie.length > 0) {
				for (Cookie c : cookie) {
					if ("token".equals(c.getName())) {
						token = c.getValue();
					}
				}
				if (null != token) {
					// 如果有cookie文件
					final HttpSession session = request.getSession();
					//final SessionInfo info = (SessionInfo) service.getSessionInfoWithToken(request, token);
					final SessionInfo info = (SessionInfo) session.getAttribute(PmsConstant.SESSION_INFO);
					final String str = sessionInfoService.getOriginalSession(token);
					if (info != null) {
						// 将info重新放入session redis键改为当前sessionId
						info.setToken(DataUtil.md5(request.getSession().getId()));
						// TODO session检测
						// service.addSessionSeveralTime(request, map, 60 * 60 * 24 * 7);// 登陆用户存放七天
						request.getSession().setAttribute(PmsConstant.SESSION_INFO, info);
						
						Cookie cookieUsername = new Cookie("token", request.getSession().getId());
						cookieUsername.setPath("/");
						cookieUsername.setDomain(com.panfeng.film.util.Constants.COOKIES_SCOPE);
						cookieUsername.setMaxAge(60 * 60 * 24 * 7);  设置cookie的有效期为 7 天 
						response.addCookie(cookieUsername);
						request.getSession().removeAttribute(PmsConstant.SESSION_INFO);
					}
				}
			}
		}
		return true;
	}*/

}
