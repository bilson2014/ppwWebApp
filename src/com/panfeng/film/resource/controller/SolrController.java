package com.panfeng.film.resource.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.panfeng.film.domain.BaseMsg;
import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.domain.SessionInfo;
import com.panfeng.film.resource.model.Solr;
import com.panfeng.film.resource.model.Team;
import com.panfeng.film.resource.view.SolrView;
import com.panfeng.film.util.HttpUtil;
import com.panfeng.film.util.JsonUtil;
import com.panfeng.film.util.Log;

@RestController
public class SolrController extends BaseController {

	private static String URL_PREFIX = null;

	public SolrController() {
		if (URL_PREFIX == null || "".equals(URL_PREFIX)) {
			final InputStream is = this.getClass().getClassLoader()
					.getResourceAsStream("jdbc.properties");
			try {
				Properties propertis = new Properties();
				propertis.load(is);
				URL_PREFIX = propertis.getProperty("urlPrefix");
			} catch (IOException e) {
				Log.error("SolrController method:constructor load Properties fail ...",null);
				e.printStackTrace();
			}
		}
	}

	@RequestMapping("/search")
	public ModelAndView searchView(String q, final String item,
			final String length, final String price, final ModelMap model,
			final HttpServletRequest request)
			throws Exception {

		if("".equals(q)){
			q = "*";
		}

		model.addAttribute("q", q);
		model.addAttribute("price",price );
		model.addAttribute("length", length);
		model.addAttribute("item",item);
		final SolrView view = new SolrView();
		view.setCondition(URLEncoder.encode(q, "UTF-8"));
		view.setItemFq(item);
		view.setLengthFq(length);
		view.setPriceFq(price);
		view.setLimit(20l);
		try {
			final String url = URL_PREFIX + "portal/solr/query";
			final String json = HttpUtil.httpPost(url,view,request);
			long total = 0l;
			if (json != null && !"".equals(json)) {
				List<Solr> list = JsonUtil.fromJsonArray(json, Solr.class);
				if (list != null && !list.isEmpty()) {
					final Solr s = list.get(0);
					if(s != null){
						total = s.getTotal(); // 设置总数
					}
				}
				model.addAttribute("list", list);
				model.addAttribute("total", total);
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("SolrController method:searchView() encode failue,q="
					+ q,sessionInfo);
		}
		return new ModelAndView("search", model);
	}
	
	// 搜索分页
	@RequestMapping("/search/pagination")
	public List<Solr> searchPagination(@RequestBody final SolrView view,
			final HttpServletRequest request)
			throws Exception {

		view.setCondition(URLEncoder.encode(view.getCondition(), "UTF-8"));
		
		try {
			String url = URL_PREFIX + "portal/solr/query";
			final String json = HttpUtil.httpPost(url,view,request);
			
			if (json != null && !"".equals(json)) {
				List<Solr> list = JsonUtil.fromJsonArray(json, Solr.class);
				return list;
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("SolrController method:searchPagination() encode failue,q="
					+ view.getCondition(),sessionInfo);
		}
		return null;
	}
	
	@RequestMapping("/suggest/{token}")
	public List<Solr> suggest(@PathVariable("token") final String token,
			final HttpServletRequest request){
		
		if(token != null && !"".equals(token)){
			try {
				final String word = URLDecoder.decode(token, "UTF-8");
				
				String url = URL_PREFIX + "portal/solr/suggest/" + word;
				final String json = HttpUtil.httpGet(url,request);
				if (json != null && !"".equals(json)) {
					List<Solr> list = JsonUtil.fromJsonArray(json, Solr.class);
					if (list != null && list.size() > 0) {
					}
					return list;
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return null;
	}
	

	/**
	 * 播放界面获取更多导演作品
	 */
	@RequestMapping("/team/product/more")
	public BaseMsg getMoreProduct(final HttpServletRequest request, @RequestBody final Team team) {
		BaseMsg baseMsg = new BaseMsg();
		final String url = GlobalConstant.URL_PREFIX + "portal/product/more";
		final String json = HttpUtil.httpPost(url, team, request);
		if (null != json && !"".equals(json)) {
			List<Solr> list = JsonUtil.toList(json);
			baseMsg.setCode(1);
			baseMsg.setResult(list);
			return baseMsg;
		} else {
			baseMsg.setErrorCode(BaseMsg.ERROR);
			baseMsg.setErrorMsg("list is null");
		}
		return baseMsg;
	}
	/**
	 * 播放界面获取更多推荐作品
	 * 根据tags来搜索
	 * 参数：condition  表示tag标签
	 */
	@RequestMapping("/tags/product/search")
	public BaseMsg getMoreProductByTags(final HttpServletRequest request,@RequestBody final SolrView slorView) {
		BaseMsg baseMsg = new BaseMsg();
		Map<String, Object> map = new HashMap<>();
		long total = 0l;
		final String url = GlobalConstant.URL_PREFIX + "portal/tags/search";
		final String json = HttpUtil.httpPost(url, slorView, request);
		if (null != json && !"".equals(json)) {
			List<Solr> list;
			try {
				list = JsonUtil.fromJsonArray(json, Solr.class);
				if(list.size()>0){
					total = list.get(0).getTotal();
				}
				map.put("total", total);
				map.put("result", list);
			} catch (Exception e) {
				e.printStackTrace();
			}
			baseMsg.setCode(1);
			baseMsg.setResult(map);
			return baseMsg;
		} else {
			baseMsg.setErrorCode(BaseMsg.ERROR);
			baseMsg.setErrorMsg("list is null");
		}
		return baseMsg;
	}
}
