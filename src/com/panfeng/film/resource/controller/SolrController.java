package com.panfeng.film.resource.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.List;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.panfeng.film.resource.model.Solr;
import com.panfeng.film.resource.view.SolrView;
import com.panfeng.film.util.HttpUtil;
import com.panfeng.film.util.JsonUtil;

@RestController
public class SolrController extends BaseController {

	final Logger logger = LoggerFactory.getLogger("error");

	final Logger serLogger = LoggerFactory.getLogger("service");

	private static String URL_PREFIX = null;

	private static String VIDEO_IMAGE_PERFIX = null;

	public SolrController() {
		if (URL_PREFIX == null || "".equals(URL_PREFIX)) {
			final InputStream is = this.getClass().getClassLoader()
					.getResourceAsStream("jdbc.properties");
			try {
				Properties propertis = new Properties();
				propertis.load(is);
				URL_PREFIX = propertis.getProperty("urlPrefix");
				VIDEO_IMAGE_PERFIX = propertis
						.getProperty("upload.server.product.image");
			} catch (IOException e) {
				logger.error("SolrController method:constructor load Properties fail ...");
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
					for (final Solr solr : list) {
						if(solr.getPicLDUrl() != null && !"".equals(solr.getPicLDUrl())){
							solr.setPicLDUrl(solr.getPicLDUrl().split(VIDEO_IMAGE_PERFIX)[1]);
						}
					}
				}
				model.addAttribute("list", list);
				model.addAttribute("total", total);
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			logger.error("SolrController method:searchView() encode failue,q="
					+ q);
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
				if (list != null && list.size() > 0) {
					for (final Solr solr : list) {
						if(solr.getPicLDUrl() != null && !"".equals(solr.getPicLDUrl())){
							solr.setPicLDUrl(solr.getPicLDUrl().split(VIDEO_IMAGE_PERFIX)[1]);
						}
					}
				}
				return list;
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			logger.error("SolrController method:searchPagination() encode failue,q="
					+ view.getCondition());
		}
		return null;
	}
	
	@RequestMapping("/phone/search")
	public ModelAndView phoneSearchView(String q, final String sequence,
			final int sortord,final String item, final ModelMap model,
			final HttpServletRequest request) throws Exception{

		if("".equals(q)){
			q = "*";
		}
		model.addAttribute("q", q);
		model.addAttribute("sequence",sequence );
		model.addAttribute("sortord", sortord);
		model.addAttribute("item",item);
		SolrView view = new SolrView();
		view.setCondition(URLEncoder.encode(q, "UTF-8"));
		view.setItemFq(item);
		view.setSequence(sequence);
		view.setSortord(sortord);
		try {
			String url = URL_PREFIX + "portal/solr/phone/query";
			final String json = HttpUtil.httpPost(url,view,request);
			if (json != null && !"".equals(json)) {
				List<Solr> list = JsonUtil.fromJsonArray(json, Solr.class);
				if (list != null && list.size() > 0) {
					for (final Solr solr : list) {
						if(solr.getPicLDUrl() != null && !"".equals(solr.getPicLDUrl())){
							solr.setPicLDUrl(solr.getPicLDUrl().split(VIDEO_IMAGE_PERFIX)[1]);
						}
					}
				}
				model.addAttribute("list", list);
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			logger.error("SolrController method:phoneSearchView() encode failue,q="
					+ q);
		}
		return new ModelAndView("/phone/search");
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
}
