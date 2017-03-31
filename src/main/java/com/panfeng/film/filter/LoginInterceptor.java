package com.panfeng.film.filter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.paipianwang.pat.common.entity.SessionInfo;
import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.service.SessionInfoService;
import com.panfeng.film.util.DataUtil;

/**
 * 用作验证是否cookie登录
 * 
 * @author Jack
 *
 */
public class LoginInterceptor extends HandlerInterceptorAdapter {

	@Autowired
	final SessionInfoService sessionInfoService = null;
	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		String requestType = request.getHeader("X-Requested-With");
		if (null == requestType || !"XMLHttpRequest".equals(requestType)) {// 非ajax
			final SessionInfo info = (SessionInfo) request.getSession().getAttribute(GlobalConstant.SESSION_INFO);
			// final String str = sessionInfoService.getOriginalSession(request.getSession().getId());
			if (info != null) {
				return true;
			}
			// 新客户端 ,获取cookie，检测客户端是否存在七天内登陆
			// return checkAutoLogin(request,response);
		}
		return true;
	}

	private boolean checkAutoLogin(HttpServletRequest request,HttpServletResponse response) {
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
					final SessionInfo info = (SessionInfo) session.getAttribute(GlobalConstant.SESSION_INFO);
					final String str = sessionInfoService.getOriginalSession(token);
					if (info != null) {
						// 将info重新放入session redis键改为当前sessionId
						info.setToken(DataUtil.md5(request.getSession().getId()));
						/*Map<String, Object> map = new HashMap<String, Object>();
						map.put(GlobalConstant.SESSION_INFO, info);*/
						// TODO session检测
						// service.addSessionSeveralTime(request, map, 60 * 60 * 24 * 7);// 登陆用户存放七天
						request.getSession().setAttribute(GlobalConstant.SESSION_INFO, info);
						
						Cookie cookieUsername = new Cookie("token", request.getSession().getId());
						cookieUsername.setPath("/");
						cookieUsername.setDomain(com.panfeng.film.util.Constants.COOKIES_SCOPE);
						cookieUsername.setMaxAge(60 * 60 * 24 * 7); /* 设置cookie的有效期为 7 天 */
						response.addCookie(cookieUsername);
						// service.removeSessionByToken(request,token);
						request.getSession().removeAttribute(GlobalConstant.SESSION_INFO);
					}
				}
			}
		}
		return true;
	}

}
