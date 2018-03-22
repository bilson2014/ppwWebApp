package com.panfeng.film.intercepter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.paipianwang.pat.common.constant.PmsConstant;
import com.paipianwang.pat.common.entity.SessionInfo;
import com.paipianwang.pat.common.util.UrlResourceUtils;
import com.paipianwang.pat.common.util.ValidateUtil;
import com.paipianwang.pat.facade.right.entity.PmsRight;
import com.panfeng.film.util.Log;
import com.panfeng.film.util.RightUtil;


/**
 * 
 * 权限验证
 *
 */
public class SecurityInterceptor extends HandlerInterceptorAdapter {
	
	@Autowired
	private RightUtil rightUtil;

	@Override
	public boolean preHandle(HttpServletRequest req, HttpServletResponse resp, Object handler)
			throws Exception {
		
		final String contextPath = req.getContextPath();
		final SessionInfo info = (SessionInfo) req.getSession().getAttribute(PmsConstant.SESSION_INFO);
		
		final String url = req.getRequestURI();
		//提取uri，末尾/去掉
		String uri = UrlResourceUtils.URLResolver(url,req.getServletContext().getContextPath());
		if(uri.endsWith("/")){
			uri=uri.substring(0, uri.length()-1);
		}
		
		PmsRight right=rightUtil.getRight(uri);
		System.out.println(uri+":"+right);
		//公共权限
		if(right==null || right.getIsCommon()){
			return true;
		}
		
		if(info != null){
			//校验权限
			if (ValidateUtil.hasRight(url, req, req.getServletContext(), right, resp, info)) {
				return true;
			} else {
				// 没有权限
				Log.error("没有权限", null);
				resp.sendRedirect(contextPath + "/404");
				return false;
			}			
		}else{
			// 未登录
			Log.error("没有权限，请先登录", null);
			//记录当前的URL，目的是实现在详情页登录后，还调回到这里
			req.getSession().setAttribute("prePage", uri);
			
			resp.sendRedirect(contextPath + "/mgr/login");
		}
		return false;
	}

}
