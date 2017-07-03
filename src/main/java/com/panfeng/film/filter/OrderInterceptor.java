package com.panfeng.film.filter;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.paipianwang.pat.common.constant.PmsConstant;
import com.paipianwang.pat.common.entity.SessionInfo;
import com.paipianwang.pat.common.util.UrlResourceUtils;
import com.paipianwang.pat.common.util.ValidateUtil;
import com.paipianwang.pat.facade.right.entity.PmsRight;
import com.paipianwang.pat.facade.right.service.PmsRightFacade;
import com.panfeng.film.util.Log;

public class OrderInterceptor extends HandlerInterceptorAdapter {

	@Autowired
	private final PmsRightFacade pmsRightFacade = null;

	public boolean preHandle(HttpServletRequest req, HttpServletResponse resp, Object handler) throws Exception {

		final String contextPath = req.getContextPath();
		final SessionInfo info = (SessionInfo) req.getSession().getAttribute(PmsConstant.SESSION_INFO);
		if (info == null) {
			// 未登录
			Log.error("没有权限，请先登录", null);
			resp.sendRedirect(contextPath + "/mgr/login");
			return false;
		} else {
			final String url = req.getRequestURI();
			final ServletContext sc = req.getServletContext();
			final String uri = UrlResourceUtils.URLResolver(url, sc.getContextPath());
			final PmsRight right = pmsRightFacade.getRightFromRedis(uri);
			if (ValidateUtil.hasRight(url, req, sc, right, resp, info)) {
				return true;
			} else {
				// 没有权限
				Log.error("没有权限，请先登录", null);
				resp.sendRedirect(contextPath + "/mgr/login");
				return false;
			}
		}
	}
}
