package com.panfeng.film.resource.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.panfeng.film.resource.model.Indent;
import com.panfeng.film.resource.model.Product;
import com.panfeng.film.resource.model.Team;
import com.panfeng.film.util.HttpUtil;
import com.panfeng.film.util.IndentUtil;
import com.panfeng.film.util.JsonUtil;

@RestController
@RequestMapping("/phone")
public class PhoneController extends BaseController {

	final Logger serLogger = LoggerFactory.getLogger("service"); // service log

	final Logger logger = LoggerFactory.getLogger("error");

	static String URL_PREFIX = null;

	public PhoneController() {
		if (URL_PREFIX == null || "".equals(URL_PREFIX)) {
			final InputStream is = this.getClass().getClassLoader()
					.getResourceAsStream("jdbc.properties");
			try {
				Properties propertis = new Properties();
				propertis.load(is);
				URL_PREFIX = propertis.getProperty("urlPrefix");
			} catch (IOException e) {
				logger.error("PhoneController method:constructor load Properties fail ...");
				e.printStackTrace();
			}
		}

	}

	@RequestMapping("/portal")
	public ModelAndView portalView(final ModelMap model) {

		return new ModelAndView("/phone/portal", model);
	}

	/**
	 * 手机端 作者页跳转
	 */
	@RequestMapping("/author/{teamId}")
	public ModelAndView authorView(@PathVariable("teamId") final Long teamId,
			final ModelMap model,
			final HttpServletRequest request) {

		// 加载team 信息
		Team team = new Team();
		final String url = URL_PREFIX + "portal/team/static/data/" + teamId;
		String json = HttpUtil.httpGet(url,request);
		if (json != null && !"".equals(json)) {
			team = JsonUtil.toBean(json, Team.class);
		}
		model.addAttribute("team", team);

		serLogger.info("Team information at Phone,teamName: "
				+ team.getTeamName());
		return new ModelAndView("/phone/author", model);
	}

	/**
	 * 加载 作品集 列表
	 */
	@RequestMapping("/team/product/list/{teamId}")
	public List<Product> list(@PathVariable("teamId") final Long teamId,
							  final HttpServletRequest request) {

		List<Product> list = new ArrayList<Product>();
		final String url = URL_PREFIX + "portal/product/static/team/" + teamId;
		String json = HttpUtil.httpGet(url,request);
		if (json != null && !"".equals(json)) {
			list = JsonUtil.toList(json);
		}

		serLogger.info("Load products By TeamId at phone,teamId:" + teamId
				+ " ,total number : " + list.size());
		return list;
	}

	/**
	 * 播放页面 跳转
	 */
	@RequestMapping("/play/{productId}")
	public ModelAndView playView(@PathVariable("productId") final Long productId,
			final ModelMap model,
			final HttpServletRequest request) {

		// 加载 作品
		Product product = new Product();
		final String url = URL_PREFIX + "portal/product/static/information/"
				+ productId;
		String json = HttpUtil.httpGet(url,request);
		if (json != null && !"".equals(json)) {
			product = JsonUtil.toBean(json, Product.class);
		}
		model.addAttribute("product", product);

		serLogger.info("Play video at Phone,productId:" + productId
				+ " ,productName:" + product.getProductName());
		return new ModelAndView("/phone/play", model);
	}

	/**
	 * 订单跳转页面
	 * 
	 * @param productId 产品编号
	 */
	// 跳转 订单页
	@RequestMapping("/order")
	public ModelAndView orderView(final HttpServletRequest request,
								  final ModelMap model) {
		final String json = request.getParameter("json");
		final Indent indent = new Indent().fromString(json, Indent.class);
		try {
			final String productName = URLDecoder.decode(
					indent.getProduct_name(), "UTF-8");
			indent.setProduct_name(productName);
			// modify by Jack, 2016-06-22 19:36 begin
			// to promote security for order
			// change hidden input to encrypt token
			/*model.addAttribute("teamId", indent.getTeamId());
			model.addAttribute("productId", indent.getProductId());
			model.addAttribute("serviceId", indent.getServiceId());
			model.addAttribute("indentPrice", indent.getIndentPrice());
			model.addAttribute("second", indent.getSecond());
			model.addAttribute("product_name", productName);*/

			final String token = IndentUtil.generateOrderToken(request, indent);
			model.addAttribute("token", token);
			// modify by Jack, 2016-06-22 19:36 end
			
			serLogger.info("Order at Phone,teamId:" + indent.getTeamId()
					+ " ,productId:" + indent.getProductId() + " ,indentPrice:"
					+ indent.getIndentPrice());
		} catch (Exception e) {
			logger.error("phone order is error ...");
			logger.error("method PhoneController orderView ,order has error,bacase generate order use AES Decrypt token error ...");
			e.printStackTrace();
		}

		return new ModelAndView("/phone/order", model);
	}

	/**
	 * 订单跳转页面
	 * 
	 * @param productId 产品编号
	 */
	@RequestMapping("/redirect/order")
	public ModelAndView orderRedirectView(final HttpServletRequest request,
			final ModelMap model) throws UnsupportedEncodingException {

		// modify by Jack, 2016-06-22 19:38 begin
		// to promote security for order
		// change hidden input to encrypt token
		/*model.addAttribute("teamId", 0);
		model.addAttribute("productId", 0);
		model.addAttribute("serviceId", 0);
		model.addAttribute("indentPrice", 0);
		model.addAttribute("second", 0);
		model.addAttribute("product_name", null);
		model.addAttribute("indentName", null);*/
		
		try {
			final Indent indent = new Indent();
			indent.setTeamId(-1l);
			indent.setProductId(-1l);
			indent.setServiceId(-1l);
			final String token= IndentUtil.generateOrderToken(request, indent);
			model.addAttribute("token", token);
		} catch (Exception e) {
			logger.error("method PhoneController orderRedirectView ,direct order has error,bacase generate order use AES Decrypt token error ...");
			e.printStackTrace();
		}
		// modify by Jack, 2016-06-22 19:38 end
		
		return new ModelAndView("/phone/order", model);
	}
	
	/**
	 * 活动页面 下单
	 */
	@RequestMapping("/order/{teamId}/{productId}/{serviceId}/{indentPrice}/{productName}")
	public ModelAndView activeOrderView(final ModelMap model,
			final HttpServletRequest request,
			@PathVariable("teamId") final Long teamId,
			@PathVariable("productId") final Long productId,
			@PathVariable("serviceId") final Long serviceId,
			@PathVariable("indentPrice") final Double indentPrice,
			@PathVariable("productName") final String productName) {
		
		// modify by jack, 2016-06-22 20:00 begin
		// -> to promote security for order
		// change hidden input to encrypt token
		model.addAttribute("teamId", teamId);
		model.addAttribute("productId", productId);
		model.addAttribute("serviceId", serviceId);
		model.addAttribute("indentPrice", indentPrice);
		model.addAttribute("second", 0);
		
		
		try {
			model.addAttribute("product_name",
					URLDecoder.decode(productName, "UTF-8"));
		} catch (UnsupportedEncodingException e) {
			logger.error("PhoneController method:activeOrderView() URLDecoder error ...");
			e.printStackTrace();
		}

		serLogger.info("Activity order at Phone,teamId:" + teamId
				+ " ,productId:" + productId + " ,price:" + indentPrice);
		return new ModelAndView("/phone/order", model);
	}

	// 跳转至 移动端 下单成功页面
	@RequestMapping("/success")
	public ModelAndView success(final HttpServletRequest request) {

		return new ModelAndView("/phone/success");
	}

	// 跳转至 移动端 活动页面
	@RequestMapping("/activity")
	public ModelAndView activityView(final HttpServletRequest request) {

		return new ModelAndView("/phone/activity");
	}

	// 跳转至 移动端 分类页面
	@RequestMapping("/classify/{itemId}")
	public ModelAndView classifyView(final ModelMap model,
			@PathVariable("itemId") final long itemId) {

		model.addAttribute("itemNo", itemId);
		return new ModelAndView("/phone/classify");
	}

	@RequestMapping("/active/12")
	public ModelAndView d12View(final ModelMap model) {

		return new ModelAndView("/phone/active/d12", model);
	}
	
	@RequestMapping("/searchview")
	public ModelAndView searchView(final ModelMap model){
		
		return new ModelAndView("/phone/searchView",model);
	}
}
