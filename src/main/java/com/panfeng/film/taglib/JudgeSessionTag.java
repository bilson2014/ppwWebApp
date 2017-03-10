package com.panfeng.film.taglib;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import com.paipianwang.pat.facade.right.entity.SessionInfo;
import com.panfeng.film.domain.GlobalConstant;

/**
 * 该自定义标签用于判断是否登陆
 * 如果登陆，则不显示;反之则显示
 * @author Jack
 *
 */
public class JudgeSessionTag extends TagSupport {

	private static final long serialVersionUID = 1009368661198300917L;
	
	public int doStartTag() throws JspException {
		final SessionInfo info = (SessionInfo) pageContext.getSession().getAttribute(GlobalConstant.SESSION_INFO);
		
		if(info != null){
			return SKIP_BODY;
		}
		
		return EVAL_BODY_INCLUDE;
	}

}
