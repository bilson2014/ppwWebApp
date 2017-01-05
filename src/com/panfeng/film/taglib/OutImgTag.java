package com.panfeng.film.taglib;

import java.io.IOException;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.domain.SessionInfo;
import com.panfeng.film.service.SessionInfoService;
import com.panfeng.film.util.ValidateUtil;

public class OutImgTag extends TagSupport {

	private static final long serialVersionUID = -2010299046537359253L;

	public int doStartTag() throws JspException {
		final ServletContext sc = pageContext.getServletContext();
		WebApplicationContext wc = WebApplicationContextUtils.findWebApplicationContext(sc);
		final SessionInfoService sessionService = (SessionInfoService) wc.getBean("sessionInfoService");

		final SessionInfo info = (SessionInfo) sessionService
				.getSessionWithField((HttpServletRequest) pageContext.getRequest(), GlobalConstant.SESSION_INFO);
		if (info != null) {
			final String photo = info.getPhoto();
			try {
				if (ValidateUtil.isValid(photo)) {
					pageContext.getOut().print(photo);
				} else {
					pageContext.getOut().print("");
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return EVAL_BODY_INCLUDE;
	}
}
