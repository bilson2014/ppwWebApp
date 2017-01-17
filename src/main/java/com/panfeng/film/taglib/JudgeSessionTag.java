package com.panfeng.film.taglib;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.domain.SessionInfo;
import com.panfeng.film.service.SessionInfoService;

/**
 * 该自定义标签用于判断是否登陆
 * 如果登陆，则不显示;反之则显示
 * @author Jack
 *
 */
public class JudgeSessionTag extends TagSupport {

	private static final long serialVersionUID = 1009368661198300917L;
	
	public int doStartTag() throws JspException {
		final ServletContext sc = pageContext.getServletContext();
		WebApplicationContext  wc = WebApplicationContextUtils.findWebApplicationContext(sc);
		final SessionInfoService sessionService = (SessionInfoService) wc.getBean("sessionInfoService");
		
		final SessionInfo info = (SessionInfo) sessionService.getSessionWithField((HttpServletRequest)pageContext.getRequest(), GlobalConstant.SESSION_INFO);
		if(info != null){
			return SKIP_BODY;
		}
		
		return EVAL_BODY_INCLUDE;
	}

}
