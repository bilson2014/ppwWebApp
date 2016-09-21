package com.panfeng.film.resource.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.panfeng.film.resource.model.Product;
import com.panfeng.film.util.HttpUtil;
import com.panfeng.film.util.JsonUtil;

@RestController
@RequestMapping("/phone")
public class PhoneController extends BaseController {

	final Logger serLogger = LoggerFactory.getLogger("service"); // service log

	final Logger logger = LoggerFactory.getLogger("error");

	static String URL_PREFIX = null;

	public PhoneController() {
		if (URL_PREFIX == null || "".equals(URL_PREFIX)) {
			final InputStream is = this.getClass().getClassLoader().getResourceAsStream("jdbc.properties");
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

	/**
	 * 播放页面 跳转
	 */
	@RequestMapping("/play/{productId}")
	public ModelAndView playView(@PathVariable("productId") final Long productId, final ModelMap model,
			final HttpServletRequest request) {

		// 加载 作品
		Product product = new Product();
		final String url = URL_PREFIX + "portal/product/static/information/" + productId;
		String json = HttpUtil.httpGet(url, request);
		if (json != null && !"".equals(json)) {
			product = JsonUtil.toBean(json, Product.class);
		}
		model.addAttribute("product", product);

		serLogger.info("Play video at Phone,productId:" + productId + " ,productName:" + product.getProductName());
		return new ModelAndView("/phone/play", model);
	}

}
