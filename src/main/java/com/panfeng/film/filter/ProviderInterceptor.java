package com.panfeng.film.filter;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.paipianwang.pat.common.util.GlobalConstant;
import com.paipianwang.pat.facade.right.entity.PmsRight;
import com.paipianwang.pat.facade.right.entity.SessionInfo;
import com.paipianwang.pat.facade.right.service.PmsRightFacade;
import com.paipianwang.pat.facade.right.util.ValidateUtil;
import com.panfeng.film.util.UrlResourceUtils;


/**
 * 供应商管理拦截器
 * 拦截未登录用户做登陆使用
 * @author Jack
 *
 */
public class ProviderInterceptor extends HandlerInterceptorAdapter {
	
	@Autowired
	private final PmsRightFacade pmsRightFacade = null;
	
	
	
	public boolean preHandle(HttpServletRequest req,
		HttpServletResponse resp, Object handler) throws Exception {
		

		final String contextPath = req.getContextPath();

		// final SessionInfo info = (SessionInfo) service.getSessionWithField(request, GlobalConstant.SESSION_INFO);
		final SessionInfo info = (SessionInfo) req.getSession().getAttribute(GlobalConstant.SESSION_INFO);
		
		if(info == null){
			// 未登录
			resp.sendRedirect(contextPath + "/login");
			return false;
		}else{
			
			final String url = req.getRequestURI();
			final ServletContext sc = req.getServletContext();
			final String uri = UrlResourceUtils.URLResolver(url, sc.getContextPath());
			final PmsRight right = pmsRightFacade.getRightFromRedis(uri);
			
			if(ValidateUtil.hasRight(url, req, sc,right,resp,info)){ 
				return true;
			} else {
				// 没有权限
				resp.sendRedirect(contextPath + "/login");
				return false;
			}
		}
	}
	
}
