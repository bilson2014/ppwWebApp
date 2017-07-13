package com.panfeng.film.resource.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.paipianwang.pat.common.entity.SessionInfo;
import com.paipianwang.pat.common.util.ValidateUtil;
import com.paipianwang.pat.facade.team.entity.PmsCity;
import com.paipianwang.pat.facade.team.entity.PmsProvince;
import com.paipianwang.pat.facade.team.service.PmsCityFacade;
import com.paipianwang.pat.facade.team.service.PmsProvinceFacade;
import com.panfeng.film.util.Log;

@RestController
public class CityPickerController extends BaseController {

	@Autowired
	private PmsCityFacade pmsCityFacade;
	@Autowired
	private PmsProvinceFacade pmsProvinceFacade;

	@RequestMapping("/get/citys")
	public List<PmsCity> getCitys(@RequestBody HashMap<String, String> provinceId, HttpServletRequest request) {
		if (ValidateUtil.isValid(provinceId)) {
			final List<PmsCity> citys = pmsCityFacade.findCitysByProvinceId(provinceId.get("provinceId"));
			return citys;
		} else {
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("provinceId is null ...", sessionInfo);
			return new ArrayList<>();
		}
	}

	@RequestMapping("/get/provinces")
	public List<PmsProvince> getProvinces() {
		List<PmsProvince> all = pmsProvinceFacade.getAll();
		return all;
	}
}
