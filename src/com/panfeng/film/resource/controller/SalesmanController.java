package com.panfeng.film.resource.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.resource.model.Indent;
import com.panfeng.film.resource.model.Product;
import com.panfeng.film.service.SmsService;
import com.panfeng.film.util.HttpUtil;
import com.panfeng.film.util.JsonUtil;
import com.panfeng.film.util.ValidateUtil;

@RestController
@RequestMapping("/phone/salesman")
public class SalesmanController extends BaseController {

	@Autowired
	private SmsService smsService = null;
	
	final Logger serLogger = LoggerFactory.getLogger("service"); // service log
	
	final Logger logger = LoggerFactory.getLogger("error");
	
	/**
	 * 手机分销人直接下单页
	 */
	@RequestMapping("/order/{uniqueId}")
	public ModelAndView orderView(@PathVariable("uniqueId") final String uniqueId,final HttpServletRequest request,final ModelMap model){
		
		model.addAttribute("teamId", -1);
		model.addAttribute("productId", -1);
		model.addAttribute("serviceId", -1);
		model.addAttribute("indentPrice", 0);
		model.addAttribute("second", 0);
		model.addAttribute("product_name", null);
		model.addAttribute("indentName", null);
		model.addAttribute("uniqueId", uniqueId);

		return new ModelAndView("/phone/salesman/order", model);
	}
	
	/**
	 * 手机分销人直接下单页
	 */
	@RequestMapping("/order/{productId}/{uniqueId}")
	public ModelAndView orderView(@PathVariable("productId") final Long productId, @PathVariable("uniqueId") final String uniqueId,final ModelMap model,final HttpServletRequest request){
		
		final String url = GlobalConstant.URL_PREFIX + "portal/product/static/information/" + productId;
		String json = HttpUtil.httpGet(url, request);
		Product product = null;
		if(ValidateUtil.isValid(json)){
			product = JsonUtil.toBean(json, Product.class);
		}
		model.addAttribute("teamId", -1);
		model.addAttribute("productId", product.getProductId());
		model.addAttribute("serviceId", product.getServiceId());
		model.addAttribute("indentPrice", product.getServiceRealPrice());
		model.addAttribute("second", product.getMcoms());
		model.addAttribute("product_name", product.getProductName());
		model.addAttribute("indentName", "BD分销渠道订单");
		model.addAttribute("uniqueId", uniqueId);
		
		return new ModelAndView("/phone/salesman/order", model);
	}
	
	/**
	 * 分销人移动端-提交订单
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping(value = "/order/submit", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public ModelAndView successViewOnPhone(final Indent indent,final HttpServletRequest request,final ModelMap model) throws UnsupportedEncodingException {
		
		request.setCharacterEncoding("UTF-8");
		final String custom = "BD分销渠道客户";
		final String url = GlobalConstant.URL_PREFIX + "portal/indent/order";
		try {
			indent.setIndentName(URLEncoder.encode(indent.getIndentName(), "UTF-8"));
			if(indent.getIndent_recomment() != null && !"".equals(indent.getIndent_recomment())) {
				indent.setIndent_recomment(URLEncoder.encode(indent.getIndent_recomment(), "UTF-8"));
			}
			String str = HttpUtil.httpPost(url, indent,request);
			if(str != null && !"".equals(str)){
				
				// 当前系统时间
				DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String currentTime = format.format(new Date());
				
				final StringBuffer info = new StringBuffer();
				info.append("下单提示信息：手机号码为【" + indent.getIndent_tele() + "】,");
				info.append("用户名为【" + custom + "】 的客户,");
				info.append("于" + currentTime);
				info.append("下单购买【" + indent.getProduct_name() + "】,");
				info.append("请您及时处理！");
				// 发送短信
				smsService.smsSend(GlobalConstant.PHONENUMBER_ORDER, info.toString());
				
				serLogger.info("Salesman Order submit at Phone,Message is " + info.toString());
				model.addAttribute("uniqueId", indent.getSalesmanUniqueId());
				return new ModelAndView("/phone/salesman/success");
			}
		} catch (UnsupportedEncodingException e) {
			logger.error("SalesmanController method:successViewOnPhone() Order encode Failure ...");
			e.printStackTrace();
		}
		return new ModelAndView("/phone/salesman/error");
	}
	
	@RequestMapping("/{uniqueId}")
	public ModelAndView page(@PathVariable("uniqueId") final String uniqueId,final ModelMap model){
		
		model.addAttribute("uniqueId", uniqueId);
		return new ModelAndView("/phone/salesman/portal");
	}
	
	@RequestMapping("/load/product")
	public List<Product> loadSalesProduct(final HttpServletRequest request){
		
		final String url = GlobalConstant.URL_PREFIX + "portal/product/static/data/salesproduct";
		final String json = HttpUtil.httpGet(url, request);
		if(ValidateUtil.isValid(json)){
			try {
				final List<Product> list = JsonUtil.fromJsonArray(json, Product.class);
				return list;
			} catch (Exception e) {
				logger.error("Load Salesman product error ...");
				e.printStackTrace();
			}
		}
		
		return null;
	}
}
