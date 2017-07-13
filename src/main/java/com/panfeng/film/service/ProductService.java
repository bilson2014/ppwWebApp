package com.panfeng.film.service;

import java.util.List;

import com.paipianwang.pat.facade.product.entity.PmsProduct;
import com.panfeng.film.model.Product;

public interface ProductService {

	public List<PmsProduct> findProductList(long teamId);
	
	public Product findProductById(long productId);
}
