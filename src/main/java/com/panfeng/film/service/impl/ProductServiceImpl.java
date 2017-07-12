package com.panfeng.film.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paipianwang.pat.facade.product.entity.PmsProduct;
import com.paipianwang.pat.facade.product.service.PmsProductFacade;
import com.panfeng.film.service.ProductService;

@Service("productService")
public class ProductServiceImpl implements ProductService {

	@Autowired
	private PmsProductFacade facade = null;
	
	@Override
	public List<PmsProduct> findProductList(long teamId) {
		return facade.loadProductByTeam(teamId);
	}

}
