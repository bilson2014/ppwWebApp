package com.panfeng.film.taglib;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.panfeng.film.dao.RightDao;
import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.domain.SessionInfo;
import com.panfeng.film.resource.model.Right;
import com.panfeng.film.service.SessionInfoService;
import com.panfeng.film.util.UrlResourceUtils;
import com.panfeng.film.util.ValidateUtil;

public class SecurityTag extends TagSupport{

	private static final long serialVersionUID = 7559934431060093945L;

	private String uri = null;
	
	public int doStartTag() throws JspException {
		
		if(ValidateUtil.isValid(uri)){
			final ServletContext sc = pageContext.getServletContext();
			WebApplicationContext  wc = WebApplicationContextUtils.findWebApplicationContext(sc);
			final RightDao dao = (RightDao) wc.getBean("rightDao");
			final SessionInfoService sessionService = (SessionInfoService) wc.getBean("sessionInfoService");
			final String url = UrlResourceUtils.URLResolver(uri, sc.getContextPath());
			
			final SessionInfo info = (SessionInfo) sessionService.getSessionWithField((HttpServletRequest)pageContext.getRequest(), GlobalConstant.SESSION_INFO);
			
			if(info != null){
				if(info.isSuperAdmin()){
					// 超级管理员
					return EVAL_BODY_INCLUDE;
				}else {
					// session 存在
					Right right = dao.getRightFromRedis(url);
					if(right != null){
						if(info.hasRight(right)){
							
							return EVAL_BODY_INCLUDE;
						}
					}
				}
			}
		}
		return SKIP_BODY;
	}

	public void setUri(String uri) {
		this.uri = uri;
	}
	
}
