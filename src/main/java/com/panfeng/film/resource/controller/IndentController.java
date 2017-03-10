package com.panfeng.film.resource.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.Properties;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.paipianwang.pat.common.util.DateUtils;
import com.paipianwang.pat.facade.indent.entity.PmsIndent;
import com.paipianwang.pat.facade.indent.service.PmsIndentFacade;
import com.paipianwang.pat.facade.product.entity.PmsProduct;
import com.paipianwang.pat.facade.product.entity.PmsService;
import com.paipianwang.pat.facade.product.service.PmsProductFacade;
import com.paipianwang.pat.facade.product.service.PmsServiceFacade;
import com.panfeng.film.domain.Result;
import com.panfeng.film.mq.service.SmsMQService;
import com.panfeng.film.util.Log;
import com.panfeng.film.util.PropertiesUtils;

@RestController
@RequestMapping("/order")
public class IndentController extends BaseController {

	static private String TELEPHONE = null;
	
	final Logger logger = LoggerFactory.getLogger("error");
	
	static private String URL_PREFIX = null;
	
	@Autowired
	private PmsProductFacade pmsProductFacade = null;
	@Autowired
	private PmsServiceFacade pmsServiceFacade = null;
	@Autowired
	private PmsIndentFacade pmsIndentFacade = null;
	@Autowired
	private SmsMQService smsMQService = null;
	
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
	/*@RequestMapping(value = "/submit", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public ModelAndView successView(final PmsIndent indent,final HttpServletRequest request) throws UnsupportedEncodingException {
		
		request.setCharacterEncoding("UTF-8");
		String token = indent.getToken();
		// token 解密
		try {
			token = AESUtil.Decrypt(token, GlobalConstant.ORDER_TOKEN_UNIQUE_KEY);
			final Indent nIndent = JsonUtil.toBean(token, Indent.class);
			final long teamId = nIndent.getTeamId();
			final long productId = nIndent.getProductId();
			final long serviceId = nIndent.getServiceId();
			String productName = null;
			// 如果按产品下单，那么下单之后的订单信息需要与数据库进行对比
			if (teamId != -1 && productId != -1 && serviceId != -1) {
				// 产品下单
				final PmsProduct product = pmsProductFacade.findProductById(productId);
				productName = product.getProductName();
				final PmsService ser = pmsServiceFacade.getServiceById(serviceId);
				indent.setSecond(ser.getMcoms());
				indent.setIndentPrice(ser.getServiceRealPrice());
			}
			boolean res = pmsIndentFacade.saveOrder(indent);
			if (res) {
				String telephone = PropertiesUtils.getProp("service_tel");
				if(indent.getSendToStaff()){
					if(StringUtils.isBlank(productName)){
						smsMQService.sendMessage("131844", telephone, new String[]{indent.getIndent_tele(),DateUtils.nowTime(),"【未指定具体影片】"});
					}else{
						smsMQService.sendMessage("131844", telephone, new String[]{indent.getIndent_tele(),DateUtils.nowTime(),"【" + productName + "】"});
					}
				}
				//发送短信给用户下单成功
				if(indent.getSendToUser()){
					smsMQService.sendMessage("131329", indent.getIndent_tele(), null);
				}
				return new ModelAndView("redirect:/success");
			}
		} catch (Exception e) {
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("IndentController method:successView() Order encode Failure ...",sessionInfo);
			e.printStackTrace();
		}
		return new ModelAndView("redirect:/error");	
		}*/
	
	/**
	 * PC端-ajax
	 * 提交订单
	 */
	@RequestMapping(value = "/deliver", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public Result successView(final PmsIndent indent,final HttpServletRequest request,@RequestParam(required=false)String phoneCode) throws UnsupportedEncodingException {
		final Result result = new Result();
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
			String productName = null;
			final long teamId = indent.getTeamId();
			final long productId = indent.getProductId();
			final long serviceId = indent.getServiceId();
			// 如果按产品下单，那么下单之后的订单信息需要与数据库进行对比
			if (teamId != -1 && productId != -1 && serviceId != -1) {
				// 产品下单
				final PmsProduct product = pmsProductFacade.findProductById(productId);
				productName = product.getProductName();
				final PmsService ser = pmsServiceFacade.getServiceById(serviceId);
				indent.setSecond(ser.getMcoms());
				indent.setIndentPrice(ser.getServiceRealPrice());
			}
			boolean res = pmsIndentFacade.saveOrder(indent);
			if (res) {
				result.setRet(true);
				String telephone = PropertiesUtils.getProp("service_tel");
				if(indent.getSendToStaff()){
					if(StringUtils.isBlank(productName)){
						smsMQService.sendMessage("131844", telephone, new String[]{indent.getIndent_tele(),DateUtils.nowTime(),"【未指定具体影片】"});
					}else{
						smsMQService.sendMessage("131844", telephone, new String[]{indent.getIndent_tele(),DateUtils.nowTime(),"【" + productName + "】"});
					}
				}
				//发送短信给用户下单成功
				if(indent.getSendToUser()){
					smsMQService.sendMessage("131329", indent.getIndent_tele(), null);
				}
			}
			return result;
		}
		return new Result(false,"参数错误");
	}
}
