package com.panfeng.film.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paipianwang.pat.common.constant.PmsConstant;
import com.paipianwang.pat.common.entity.SessionInfo;
import com.paipianwang.pat.common.util.JsonUtil;
import com.paipianwang.pat.facade.product.entity.PmsProduct;
import com.paipianwang.pat.facade.product.service.PmsProductFacade;
import com.panfeng.film.model.Product;
import com.panfeng.film.service.ProductService;

@Service("productService")
public class ProductServiceImpl implements ProductService {

	@Autowired
	private PmsProductFacade facade = null;

	@Autowired
	private HttpServletRequest request = null;

	@Override
	public List<PmsProduct> findProductList(long teamId) {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("teamId", teamId);
		List<PmsProduct> list = facade.findProductsByCondition(paramMap);
		return list;
	}

	public Product findProductById(long productId) {
		SessionInfo info = (SessionInfo) request.getSession().getAttribute(PmsConstant.SESSION_INFO);
		System.err.println(info.getReqiureId());
		if (productId > 0) {
			PmsProduct pmsProduct = facade.findProductById(productId);
			String json = JsonUtil.toJson(pmsProduct);
			Product product = JsonUtil.toBean(json, Product.class);
			return product;
		}

		return new Product();
	}

}
