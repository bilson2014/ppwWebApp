package com.panfeng.film.resource.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.panfeng.film.domain.BaseMsg;
import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.resource.model.DealLog;
import com.panfeng.film.util.HttpUtil;
import com.panfeng.film.util.JsonUtil;

@RestController
@RequestMapping("/pay")
public class PayController extends BaseController {
	static String RETURN_KEY = "billNo";
	static String RESULT_KEY = "result";

	@RequestMapping("/get/billno")
	public HashMap<String, String> getBillNo() {
		final String url = GlobalConstant.URL_PREFIX + "/pay/get/billno";
		String str = HttpUtil.httpGet(url, null);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, HashMap.class);
		}
		return new HashMap<String, String>();
	}

	@RequestMapping(value = "/income", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public BaseMsg payIncome(String token) {
		final String url = GlobalConstant.URL_PREFIX + "/pay/income?token=" + token;
		String str = HttpUtil.httpGet(url, null);
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, BaseMsg.class);
		}
		return new BaseMsg();
	}

	@RequestMapping(value = "/get/deallogs", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public List<DealLog> getDealLogByProject(long projectId) {
		final String url = GlobalConstant.URL_PREFIX + "/pay/get/deallogs";
		String str = HttpUtil.httpPost(url, projectId, null);
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		} else {
			return new ArrayList<>();
		}
	}

	@RequestMapping(value = "/sendpay", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public BaseMsg sendPay(DealLog dealLog) {
		final String url = GlobalConstant.URL_PREFIX + "/pay/sendpay";
		String str = HttpUtil.httpGet(url, null);
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, BaseMsg.class);
		}
		return new BaseMsg();
	}

	@RequestMapping(value = "/shareurl", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public BaseMsg shareUrl(DealLog dealLog) {
		final String url = GlobalConstant.URL_PREFIX + "/pay/sendpay";
		String str = HttpUtil.httpGet(url, null);
		if (str != null && !"".equals(str)) {
			BaseMsg baseMsg = JsonUtil.toBean(str, BaseMsg.class);
			// 数据正常添加url前缀
			if (baseMsg.getErrorCode() == BaseMsg.NORMAL) {
				String token = (String) baseMsg.getResult();
				String urlview="/pay/shareview?token="+token;
				baseMsg.setResult(urlview);
			}
		}
		return new BaseMsg();
	}

	@RequestMapping("/shareview")
	public ModelAndView shareView(String token) {
		// 去后台检查，页面的合法性
		final String url = GlobalConstant.URL_PREFIX + "/pay/get/orderview/status?token=" + token;
		String str = HttpUtil.httpGet(url, null);
		if (str != null && !"".equals(str)) {
			Map<String, Boolean> map = JsonUtil.toBean(str, HashMap.class);
			boolean res = map.get(RESULT_KEY);
			if(res){
				return new ModelAndView();
			}else{
				return new ModelAndView();
			}
		}
		return new ModelAndView();
	}

}
