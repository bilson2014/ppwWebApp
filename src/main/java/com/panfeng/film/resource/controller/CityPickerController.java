package com.panfeng.film.resource.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.paipianwang.pat.common.util.ValidateUtil;
import com.paipianwang.pat.facade.right.entity.SessionInfo;
import com.paipianwang.pat.facade.team.entity.PmsCity;
import com.paipianwang.pat.facade.team.service.PmsCityFacade;
import com.panfeng.film.util.Log;

@RestController
public class CityPickerController extends BaseController {
	
	@Autowired
	private PmsCityFacade pmsCityFacade;

	/*@RequestMapping("/get/provinces")
	public List<Province> getAllProvince(HttpServletRequest request) {
		final String url = GlobalConstant.URL_PREFIX + "portal/get/provinces";
		String str = HttpUtil.httpGet(url, request);
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		}
		return new ArrayList<Province>(); // 没查到返回空
	}*/

	@RequestMapping("/get/citys")
	public List<PmsCity> getCitys(@RequestBody HashMap<String, String> provinceId, HttpServletRequest request) {
		if (ValidateUtil.isValid(provinceId)) {
			final List<PmsCity> citys = pmsCityFacade.findCitysByProvinceId(provinceId.get("provinceId"));
			return citys;
		} else {
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("provinceId is null ...",sessionInfo);
			return new ArrayList<>();
		}
	}
}
