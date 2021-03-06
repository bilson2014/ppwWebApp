package com.panfeng.film.filter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.paipianwang.pat.common.constant.PmsConstant;
import com.paipianwang.pat.common.entity.SessionInfo;
import com.paipianwang.pat.common.util.UrlResourceUtils;
import com.paipianwang.pat.facade.right.entity.PmsRight;
import com.panfeng.film.util.Log;
import com.panfeng.film.util.RightUtil;

public class ProductCaseInterceptor extends HandlerInterceptorAdapter {
	
	@Autowired
	private RightUtil rightUtil;

	public boolean preHandle(HttpServletRequest req,
			HttpServletResponse resp, Object handler) throws Exception {
		
		final String contextPath = req.getContextPath();
		final SessionInfo info = (SessionInfo) req.getSession().getAttribute(PmsConstant.SESSION_INFO);
		
		PmsRight right=rightUtil.getRight("/provider/portal");
		System.out.println(right);
		right=rightUtil.getRight("/provider/delete/product/1254");
		System.out.println(right);
		
		if(info != null){
			final String identity = info.getSessionType();
			if(PmsConstant.ROLE_EMPLOYEE.equals(identity)) 
				return true;
			//
			Log.error("没有权限", null);
			resp.sendRedirect(contextPath + "/404");
		}else{
			// 未登录
			Log.error("没有权限，请先登录", null);

			final String url = req.getRequestURI();
			//记录当前的URL，目的是实现在详情页登录后，还调回到这里
			final String uri = UrlResourceUtils.URLResolver(url,req.getServletContext().getContextPath());
			
			right=rightUtil.getRight(uri);
			System.out.println(right);
			
			//处理请求参数
			//存入到session中，登录时调用
			req.getSession().setAttribute("prePage", uri);
			
			resp.sendRedirect(contextPath + "/mgr/login");
		}
		return false;
	}
}
