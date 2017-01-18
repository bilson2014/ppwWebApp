package com.panfeng.film.resource.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.panfeng.domain.SessionInfo;
import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.domain.Result;
import com.panfeng.film.resource.model.Indent;
import com.panfeng.film.security.AESUtil;
import com.panfeng.film.util.HttpUtil;
import com.panfeng.film.util.JsonUtil;
import com.panfeng.film.util.Log;

@RestController
@RequestMapping("/order")
public class IndentController extends BaseController {

	static private String TELEPHONE = null;
	
	final Logger logger = LoggerFactory.getLogger("error");
	
	static private String URL_PREFIX = null;
	
	public IndentController() {
		if(URL_PREFIX == null || "".equals(URL_PREFIX) || TELEPHONE == null || "".equals(TELEPHONE)){
			final InputStream is = this.getClass().getClassLoader().getResourceAsStream("jdbc.properties"); 
			try {
				Properties propertis = new Properties();
				propertis.load(is);
				URL_PREFIX = propertis.getProperty("urlPrefix");
				TELEPHONE = propertis.getProperty("service_tel");
			} catch (IOException e) {
				Log.error("IndentController method:constructor load Properties fail ...", null);
				e.printStackTrace();
			}
		}
	}
	/**
	 * PC端直接下单，跳转成功页面
	 */
	@RequestMapping(value = "/submit", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public ModelAndView successView(final Indent indent,final HttpServletRequest request) throws UnsupportedEncodingException {
		
		request.setCharacterEncoding("UTF-8");
		final String url = URL_PREFIX + "portal/indent/order";
		try {
			indent.setIndentName(URLEncoder.encode(indent.getIndentName(), "UTF-8"));
			if(indent.getIndent_recomment() != null && !"".equals(indent.getIndent_recomment())) {
				indent.setIndent_recomment(URLEncoder.encode(indent.getIndent_recomment(), "UTF-8"));
			}
			String token = indent.getToken();
			// token 解密
			token = AESUtil.Decrypt(token, GlobalConstant.ORDER_TOKEN_UNIQUE_KEY);
			final Indent nIndent = JsonUtil.toBean(token, Indent.class);
			indent.setTeamId(nIndent.getTeamId());
			indent.setProductId(nIndent.getProductId());
			indent.setServiceId(nIndent.getServiceId());
			String str = HttpUtil.httpPost(url, indent,request);
			if(str != null && !"".equals(str)){
				final Result result = JsonUtil.toBean(str, Result.class);
				if(result.isRet()){
					return new ModelAndView("redirect:/success");
				}
				
			}
		} catch (Exception e) {
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("IndentController method:successView() Order encode Failure ...",sessionInfo);
			e.printStackTrace();
		}
		return new ModelAndView("redirect:/error");
	}
	
	/**
	 * PC端-ajax
	 * 提交订单
	 */
	@RequestMapping(value = "/deliver", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public Result successView(final Indent indent,final HttpServletRequest request,@RequestParam(required=false)String phoneCode) throws UnsupportedEncodingException {
		
		String code = (String) request.getSession().getAttribute("code");
		String codeOfPhone = (String) request.getSession().getAttribute("codeOfphone");
		boolean flag = false;
		if(null!=phoneCode && phoneCode.equals("-1")){
			flag = true;
		}else{
			if(null != code && null!=codeOfPhone && null!=phoneCode && code.equals(phoneCode) &&
					codeOfPhone.equals(indent.getIndent_tele()) ){
				flag = true;
			}
		}
		if(flag){
			request.setCharacterEncoding("UTF-8");
			final String url = URL_PREFIX + "portal/indent/order";
			try {
				indent.setIndentName(URLEncoder.encode(indent.getIndentName(), "UTF-8"));
				if(indent.getIndent_recomment() != null && !"".equals(indent.getIndent_recomment())) {
					indent.setIndent_recomment(URLEncoder.encode(indent.getIndent_recomment(), "UTF-8"));
				}
				String str = HttpUtil.httpPost(url, indent,request);
				if(str != null && !"".equals(str)){
					final Result result = JsonUtil.toBean(str, Result.class);
					return result;
				}
			} catch (Exception e) {
				SessionInfo sessionInfo = getCurrentInfo(request);
				Log.error("IndentController method:successView() Order encode Failure ...",sessionInfo);
				e.printStackTrace();
			}
		}
		return new Result(false,"参数错误");
	}
}
