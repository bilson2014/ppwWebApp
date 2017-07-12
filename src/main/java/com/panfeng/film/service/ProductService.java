package com.panfeng.film.service;

import java.util.List;

import com.paipianwang.pat.facade.product.entity.PmsProduct;

public interface ProductService {

	public List<PmsProduct> findProductList(long teamId);
}
