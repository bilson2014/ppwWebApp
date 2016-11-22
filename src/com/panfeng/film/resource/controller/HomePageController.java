package com.panfeng.film.resource.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.panfeng.film.domain.BaseMsg;
import com.panfeng.film.domain.SessionInfo;
import com.panfeng.film.resource.model.Solr;
import com.panfeng.film.resource.model.Team;
import com.panfeng.film.util.HttpUtil;
import com.panfeng.film.util.JsonUtil;
import com.panfeng.film.util.Log;
import com.panfeng.film.util.News;

@RestController
@RequestMapping("/home")
public class HomePageController extends BaseController{
	

	final Logger serLogger = LoggerFactory.getLogger("service"); // service log

	final Logger logger = LoggerFactory.getLogger("error");

	static String URL_PREFIX = null;

	public HomePageController() {
		if (URL_PREFIX == null || "".equals(URL_PREFIX)) {
			final InputStream is = this.getClass().getClassLoader().getResourceAsStream("jdbc.properties");
			try {
				Properties propertis = new Properties();
				propertis.load(is);
				URL_PREFIX = propertis.getProperty("urlPrefix");
			} catch (IOException e) {
				Log.error("HomePageController method:constructor load Properties fail ...",null);
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * 跳转到home页
	 */
	/*@RequestMapping("/index")
	public ModelAndView home(final HttpServletRequest request) {
		return new ModelAndView("/homePage");
	}*/
	
	/**
	 * 加载 主页 视频列表
	 * @return List<Solr> 产品列表
	 */
	@RequestMapping(value = "/product/loadProduct", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public BaseMsg productList(final HttpServletRequest request) {
		BaseMsg baseMsg = new BaseMsg();
		final String url = URL_PREFIX + "portal/product/static/pc/list";
		String str = HttpUtil.httpPost(url, null, request);
		if (str != null && !"".equals(str)) {
			List<Solr> list = JsonUtil.toList(str);
			if(null!=list){
				baseMsg.setCode(1);
				baseMsg.setResult(list);
			}else{
				baseMsg.setErrorMsg("null list");
			}
		}
		SessionInfo sessionInfo = getCurrentInfo(request);
		Log.error("Load portal page products",sessionInfo);
		return baseMsg;
	}
	
	/**
	 * 首页获取导演推荐
	 */
	@RequestMapping(value = "/team/recommend", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public BaseMsg getRecommendTeam(final HttpServletRequest request) {
		BaseMsg baseMsg = new BaseMsg();
		final String url = URL_PREFIX + "portal/team/recommend";
		String str = HttpUtil.httpPost(url, null, request);
		if (str != null && !"".equals(str)) {
			List<Team> list = JsonUtil.toList(str);
			baseMsg.setCode(1);
			baseMsg.setResult(list);
		}else{
			baseMsg.setErrorMsg("list is null");
		}
		SessionInfo sessionInfo = getCurrentInfo(request);
		Log.error("homepage recommend team list ",sessionInfo);
		return baseMsg;
	}
	

	/**
	 * 首页获取新闻推荐
	 */
	@RequestMapping(value = "/news/recommend", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public BaseMsg getRecommendNews(final HttpServletRequest request) {
		BaseMsg baseMsg = new BaseMsg();
		final String url = URL_PREFIX + "portal/news/recommend";
		String str = HttpUtil.httpPost(url, null, request);
		if (str != null && !"".equals(str)) {
			List<News> list = JsonUtil.toList(str);
			baseMsg.setCode(1);
			baseMsg.setResult(list);
		}else{
			baseMsg.setErrorMsg("list is null");
		}
		SessionInfo sessionInfo = getCurrentInfo(request);
		Log.error("homepage recommend news list",sessionInfo);
		return baseMsg;
	}
	
	/**
	 * 跳转新闻详情
	 */
	@RequestMapping(value = "/news/info/{newId}")
	public ModelAndView getRecommendNews(@PathVariable("newId") final Integer newId,
			final HttpServletRequest request,final ModelMap model) {
		final String url = URL_PREFIX + "portal/news/info/"+newId;
		String str = HttpUtil.httpGet(url, request);
		if (str != null && !"".equals(str)) {
			News news = JsonUtil.toBean(str, News.class);
			model.addAttribute("news", news);
		}else{
			//请求不存在的新闻
			return new ModelAndView("/error");
		}
		SessionInfo sessionInfo = getCurrentInfo(request);
		Log.error("homepage news error",sessionInfo);
		return new ModelAndView("/news");
	}
}
