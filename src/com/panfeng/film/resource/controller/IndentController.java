package com.panfeng.film.resource.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.domain.Result;
import com.panfeng.film.resource.model.Indent;
import com.panfeng.film.security.AESUtil;
import com.panfeng.film.service.SmsService;
import com.panfeng.film.util.HttpUtil;
import com.panfeng.film.util.JsonUtil;

@RestController
@RequestMapping("/order")
public class IndentController extends BaseController {

	@Autowired
	private SmsService smsService = null;
	
	static private String TELEPHONE = null;
	
	final Logger serLogger = LoggerFactory.getLogger("service"); // service log
	
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
				logger.error("IndentController method:constructor load Properties fail ...");
				e.printStackTrace();
			}
		}
	}

	/**
	 * PC端-提交订单
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping(value = "/submit", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public ModelAndView successView(final Indent indent,final HttpServletRequest request) throws UnsupportedEncodingException {
		
		request.setCharacterEncoding("UTF-8");
		final String custom = indent.getIndentName().trim();
		final String url = URL_PREFIX + "portal/indent/order";
		try {
			indent.setIndentName(URLEncoder.encode(indent.getIndentName(), "UTF-8"));
			if(indent.getIndent_recomment() != null && !"".equals(indent.getIndent_recomment())) {
				indent.setIndent_recomment(URLEncoder.encode(indent.getIndent_recomment(), "UTF-8"));
			}
			
			// add by Jack,2016-06-21 19:45 begin
			// -> to promote security for order
			String token = indent.getToken();
			// token 解密
			token = AESUtil.Decrypt(token, GlobalConstant.ORDER_TOKEN_UNIQUE_KEY);
			
			final Indent nIndent = JsonUtil.toBean(token, Indent.class);
			indent.setTeamId(nIndent.getTeamId());
			indent.setProductId(nIndent.getProductId());
			indent.setServiceId(nIndent.getServiceId());
			// add by Jack,2016-06-21 19:45 end
			
			String str = HttpUtil.httpPost(url, indent,request);
			if(str != null && !"".equals(str)){
				
				final Result result = JsonUtil.toBean(str, Result.class);
				if(result.isRet()){
					
					// 当前系统时间
					DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					String currentTime = format.format(new Date());
					
					final StringBuffer info = new StringBuffer();
					info.append("下单提示信息：手机号码为【" + indent.getIndent_tele() + "】,");
					info.append("用户名为【" + custom + "】 的客户,");
					info.append("于" + currentTime);
					final String pName = result.getMessage() == null ? "" : result.getMessage();
					info.append("下单购买【" + pName + "】,");
					info.append("请您及时处理！");
					// 发送短信
					smsService.smsSend(TELEPHONE, info.toString());
					
					serLogger.info("Order submit at PC,Message is " + info.toString());
					return new ModelAndView("redirect:/success");
				}
				
			}
		} catch (Exception e) {
			logger.error("IndentController method:successView() Order encode Failure ...");
			e.printStackTrace();
		}
		return new ModelAndView("redirect:/error");
	}
	
	/**
	 * 移动端-提交订单
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping(value = "/phone/submit", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public ModelAndView successViewOnPhone(final Indent indent,final HttpServletRequest request) throws UnsupportedEncodingException {
		
		request.setCharacterEncoding("UTF-8");
		final String custom = indent.getIndentName().trim();
		final String url = URL_PREFIX + "portal/indent/order";
		try {
			indent.setIndentName(URLEncoder.encode(indent.getIndentName(), "UTF-8"));
			if(indent.getIndent_recomment() != null && !"".equals(indent.getIndent_recomment())) {
				indent.setIndent_recomment(URLEncoder.encode(indent.getIndent_recomment(), "UTF-8"));
			}
			
			// add by Jack,2016-06-22 19:45 begin
			// -> to promote security for order
			String token = indent.getToken();
			// token 解密
			token = AESUtil.Decrypt(token, GlobalConstant.ORDER_TOKEN_UNIQUE_KEY);
			
			final Indent nIndent = JsonUtil.toBean(token, Indent.class);
			indent.setTeamId(nIndent.getTeamId());
			indent.setProductId(nIndent.getProductId());
			indent.setServiceId(nIndent.getServiceId());
			// add by Jack,2016-06-22 19:45 end
			
			String str = HttpUtil.httpPost(url, indent,request);
			if(str != null && !"".equals(str)){
				final Result result = JsonUtil.toBean(str, Result.class);
				if(result.isRet()){
					
					// 当前系统时间
					DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					String currentTime = format.format(new Date());
					
					final StringBuffer info = new StringBuffer();
					info.append("下单提示信息：手机号码为【" + indent.getIndent_tele() + "】,");
					info.append("用户名为【" + custom + "】 的客户,");
					info.append("于" + currentTime);
					final String pName = result.getMessage() == null ? "" : result.getMessage();
					info.append("下单购买【" + pName + "】,");
					info.append("请您及时处理！");
					// 发送短信
					smsService.smsSend(TELEPHONE, info.toString());
					
					serLogger.info("Order submit at Phone,Message is " + info.toString());
					return new ModelAndView("redirect:/phone/success");
				}
			}
		} catch (Exception e) {
			logger.error("IndentController method:successViewOnPhone() Order encode Failure ...");
			e.printStackTrace();
		}
		return new ModelAndView("redirect:/phone/error");
	}
	
}
