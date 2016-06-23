package com.panfeng.film.resource.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
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
	public HashMap<String, String> getBillNo(final HttpServletRequest request) {
		final String url = GlobalConstant.URL_PREFIX + "/pay/get/billno";
		String str = HttpUtil.httpGet(url, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, HashMap.class);
		}
		return new HashMap<String, String>();
	}

	@RequestMapping(value = "/income", produces = "application/json; charset=UTF-8")
	public void payIncome(String token, final HttpServletRequest request, final HttpServletResponse response) {
		final String url = GlobalConstant.URL_PREFIX + "pay/income?token=" + token;
		Map<String, String> map = new HashMap<>();
		map.put("token", url);
		String str = HttpUtil.httpPost(url, map, request);
		String result = "";
		if (str != null && !"".equals(str)) {
			BaseMsg baseMsg = JsonUtil.toBean(str, BaseMsg.class);
			if (baseMsg.getErrorCode() == BaseMsg.NORMAL) {
				result = (String) baseMsg.getResult();
			} else {
				result = "待定|"+baseMsg.getErrorMsg();
			}
		}
		try {
			response.setContentType("text/html;charset=utf-8");
			PrintWriter out = response.getWriter();
			out.println(result);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value = "/get/deallogs", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public List<DealLog> getDealLogByProject(@RequestBody Map<String,Long> projectId, final HttpServletRequest request) {
		final String url = GlobalConstant.URL_PREFIX + "pay/get/deallogs";
		String str = HttpUtil.httpPost(url, projectId, request);
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		} else {
			return new ArrayList<>();
		}
	}

	@RequestMapping(value = "/sendpay", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public BaseMsg sendPay(@RequestBody DealLog dealLog, final HttpServletRequest request) {
		final String url = GlobalConstant.URL_PREFIX + "pay/sendpay";
		String str = HttpUtil.httpPost(url, dealLog, request);

		if (str != null && !"".equals(str)) {
			BaseMsg baseMsg = JsonUtil.toBean(str, BaseMsg.class);
			// 数据正常添加url前缀
			if (baseMsg.getErrorCode() == BaseMsg.NORMAL) {
				String token = (String) baseMsg.getResult();
				String urlview = "/pay/shareview?token=" + token;
				baseMsg.setResult(urlview);
				return baseMsg;
			}
		}

		return new BaseMsg(BaseMsg.ERROR, "发起失败", null);
	}

	@RequestMapping(value = "/shareurl", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public BaseMsg shareUrl(@RequestBody DealLog dealLog, final HttpServletRequest request) {
		final String url = GlobalConstant.URL_PREFIX + "pay/shareurl";
		String str = HttpUtil.httpGet(url, request);
		if (str != null && !"".equals(str)) {
			BaseMsg baseMsg = JsonUtil.toBean(str, BaseMsg.class);
			// 数据正常添加url前缀
			if (baseMsg.getErrorCode() == BaseMsg.NORMAL) {
				String token = (String) baseMsg.getResult();
				String urlview = "/pay/shareview?token=" + token;
				baseMsg.setResult(urlview);
			}
		}
		return new BaseMsg();
	}

	@RequestMapping("/shareview")
	public ModelAndView shareView(String token, final HttpServletRequest request, final ModelMap model) {
		// 去后台检查，页面的合法性
		final String url = GlobalConstant.URL_PREFIX + "pay/get/orderview?token=" + token;
		String str = HttpUtil.httpGet(url, request);
		if (str != null && !"".equals(str)) {
			DealLog dealLog = JsonUtil.toBean(str, DealLog.class);
			model.put("dealLog", dealLog);
			return new ModelAndView("/payment/payList", model);
		}
		return new ModelAndView("404");
	}

}
