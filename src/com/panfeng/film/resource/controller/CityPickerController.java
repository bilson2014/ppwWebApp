package com.panfeng.film.resource.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.resource.model.City;
import com.panfeng.film.resource.model.Province;
import com.panfeng.film.util.HttpUtil;
import com.panfeng.film.util.JsonUtil;

@RestController
public class CityPickerController extends BaseController {

	@RequestMapping("/get/provinces")
	public List<Province> getAllProvince(HttpServletRequest request) {
		final String url = GlobalConstant.URL_PREFIX + "portal/get/provinces";
		String str = HttpUtil.httpGet(url, request);
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		}
		return new ArrayList<Province>(); // 没查到返回空
	}

	@RequestMapping("/get/citys")
	public List<City> getCitys(@RequestBody HashMap<String, String> provinceId, HttpServletRequest request) {
		final String url = GlobalConstant.URL_PREFIX + "portal/get/citys/" + provinceId.get("provinceId");
		String str = HttpUtil.httpGet(url, request);
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		}
		return new ArrayList<City>(); // 没查到返回空
	}
}
