package com.panfeng.film.taglib;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import com.paipianwang.pat.common.constant.PmsConstant;
import com.paipianwang.pat.common.entity.SessionInfo;

/**
 * 该自定义标签用于判断是否登陆并且已分级
 * 如果已分级，则不显示;反之则显示
 * @author Jack
 *
 */
public class JudgeLevelTag extends TagSupport {

	private static final long serialVersionUID = 1009368661198300917L;
	
	public int doStartTag() throws JspException {
		final SessionInfo info = (SessionInfo) pageContext.getSession().getAttribute(PmsConstant.SESSION_INFO);
		
		if(info != null){
			if(info.getSessionType().indexOf("customer") > -1){
				if(info.getClientLevel() == null){
					
					return EVAL_BODY_INCLUDE;
				}
			}
		}

		return SKIP_BODY;
	}

}
