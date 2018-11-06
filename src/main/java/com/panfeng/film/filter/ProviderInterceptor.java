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
import com.panfeng.film.util.Log;
import com.panfeng.film.util.RightUtil;


/**
 * 供应商管理拦截器
 * 拦截未登录用户做登陆使用
 * @author Jack
 *
 */
public class ProviderInterceptor extends HandlerInterceptorAdapter {
	
//	@Autowired
//	private final PmsRightFacade pmsRightFacade = null;
	@Autowired
	private RightUtil rightUtil;

	
	public boolean preHandle(HttpServletRequest req,
		HttpServletResponse resp, Object handler) throws Exception {
		
		final String contextPath = req.getContextPath();
		final SessionInfo info = (SessionInfo) req.getSession().getAttribute(PmsConstant.SESSION_INFO);
		if(info == null){
			// 未登录
			Log.error("没有权限，请先登录", null);
			resp.sendRedirect(contextPath + "/login");
			return false;
		}else{
			final String url = req.getRequestURI();
			final ServletContext sc = req.getServletContext();
			String uri = UrlResourceUtils.URLResolver(url, sc.getContextPath());
			if(uri.endsWith("/")){
				uri=uri.substring(0, uri.length()-1);
			}
			
			PmsRight right=rightUtil.getRight(uri);
			/*final PmsRight right = pmsRightFacade.getRightFromRedis(uri);*/
			if(ValidateUtil.hasRight(url, req, sc,right,resp,info)){
				// 即使有权限，那么判断当前供应商是否已经审核通过了
				if("/provider/portal".equals(uri) || "/mgr/index".equals(uri)) {
					if(info.getProviderFlag() == 3) {//如果是供应商走这个；如果不是供应商也有权限，flag默认是３
						// 未提交审核
						Log.error("请先完成审核", info);
						resp.sendRedirect(contextPath + "/registerflow.html?teamId=" + info.getReqiureId());
						return false;
					}
					
					if(info.getProviderFlag() == 0 || info.getProviderFlag() == 2) {
						// 正在审核  或者 审核未通过
						Log.error("正在审核，请稍候", info);
						resp.sendRedirect(contextPath + "/provider/information");
						return false;
					}
					
					if(info.getProviderFlag() == 1) {
						// 正在审核  或者 审核未通过
						return true;
					}
					
				}
				return true;
			} else {
				// 没有权限
				Log.error("没有权限，请先登录", null);
				resp.sendRedirect(contextPath + "/login");
				return false;
			}
		}
	}
}
