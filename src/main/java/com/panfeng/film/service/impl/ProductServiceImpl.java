package com.panfeng.film.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paipianwang.pat.common.util.JsonUtil;
import com.paipianwang.pat.facade.product.entity.PmsProduct;
import com.paipianwang.pat.facade.product.service.PmsProductFacade;
import com.panfeng.film.model.Product;
import com.panfeng.film.service.ProductService;

@Service("productService")
public class ProductServiceImpl implements ProductService {

	@Autowired
	private PmsProductFacade facade = null;
	
	@Override
	public List<PmsProduct> findProductList(long teamId) {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("teamId", teamId);
		List<PmsProduct> list = facade.findProductsByCondition(paramMap);
		return list;
	}
	
	public boolean updateInfo(Product product) {
		System.err.println(product);
		// update product
		return true;
	}
	
	public Product findProductById(long productId) {
		
		if(productId > 0) {
			PmsProduct pmsProduct = facade.findProductById(productId);
			String json = JsonUtil.toJson(pmsProduct);
			Product product = JsonUtil.toBean(json, Product.class);
			return product;
		}
		
		return null;
	}

}
