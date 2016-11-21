package com.panfeng.film.filter;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.domain.SessionInfo;
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
	private final SessionInfoService service = null;

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		String requestType = request.getHeader("X-Requested-With");
		if (null == requestType || !"XMLHttpRequest".equals(requestType)) {// 非ajax
			final SessionInfo info = (SessionInfo) service.getSessionWithField(request, GlobalConstant.SESSION_INFO);
			if (info != null) {
				return true;
			}
			// 新客户端 ,获取cookie，检测客户端是否存在七天内登陆
			return checkAutoLogin(request);
		}
		return true;
	}

	private boolean checkAutoLogin(HttpServletRequest request) {
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
					final SessionInfo info = (SessionInfo) service.getSessionInfoWithToken(request, token);
					if (info != null) {
						// 将info重新放入session redis键改为当前sessionId
						info.setToken(DataUtil.md5(request.getSession().getId()));
						Map<String, Object> map = new HashMap<String, Object>();
						map.put(GlobalConstant.SESSION_INFO, info);
						service.addSessionSeveralTime(request, map, 60 * 60 * 24 * 7);// 登陆用户存放七天
						// service.removeSessionByToken(request,token);
					}
				}
			}
		}
		return true;
	}

}
