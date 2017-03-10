package com.panfeng.film.resource.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.paipianwang.pat.facade.information.entity.PmsNews;
import com.paipianwang.pat.facade.information.service.PmsNewsFacade;
import com.paipianwang.pat.facade.right.entity.SessionInfo;
import com.paipianwang.pat.facade.team.entity.PmsTeam;
import com.paipianwang.pat.facade.team.service.PmsTeamFacade;
import com.panfeng.film.domain.BaseMsg;
import com.panfeng.film.resource.model.Solr;
import com.panfeng.film.resource.view.SolrView;
import com.panfeng.film.util.HttpUtil;
import com.panfeng.film.util.JsonUtil;
import com.panfeng.film.util.Log;

@RestController
@RequestMapping("/home")
public class HomePageController extends BaseController{
	

	final Logger serLogger = LoggerFactory.getLogger("service"); // service log

	final Logger logger = LoggerFactory.getLogger("error");

	static String URL_PREFIX = null;
	
	@Autowired
	private PmsTeamFacade pmsTeamFacade = null;
	@Autowired
	private PmsNewsFacade pmsNewsFacade = null;

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
	 * 加载 主页 视频列表
	 * @return List<Solr> 产品列表
	 */
	@RequestMapping(value = "/product/loadProduct", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public BaseMsg productList(final HttpServletRequest request,
			@RequestBody SolrView solrView) {
		BaseMsg baseMsg = new BaseMsg();
		final String url = URL_PREFIX + "portal/product/static/pc/list";
		String str = HttpUtil.httpPost(url, solrView, request);
		if (str != null && !"".equals(str)) {
			try {
				List<Solr> list = JsonUtil.fromJsonArray(str, Solr.class);
				if(null!=list){
					//处理标签
					for(Solr s : list){
						String tags = s.getTags();
						if(StringUtils.isNotBlank(tags)){
							//匹配标签分割 空格，多个空格 中文逗号，英文逗号
							String[] tagsArr = tags.split("(\\s+)|(,)|(，)");
							int maxLength = tagsArr.length>3?3:tagsArr.length;
							tags = "";
							for(int i=0;i<maxLength;i++){
								tags += tagsArr[i]+"/";
							}
							tags = tags.substring(0, tags.length()-1);
							s.setTags(tags);
						}
					}
					baseMsg.setCode(1);
					baseMsg.setResult(list);
				}else{
					baseMsg.setErrorMsg("null list");
				}
			} catch (Exception e) {
				e.printStackTrace();
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
		List<PmsTeam> teamRecommendList = pmsTeamFacade.teamRecommendList();
		if(null != teamRecommendList){
			baseMsg.setCode(1);
			baseMsg.setResult(teamRecommendList);
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
		
		List<PmsNews> list = pmsNewsFacade.RecommendNews();
		if(null != list){
			baseMsg.setCode(1);
			baseMsg.setResult(list);
		}else{
			baseMsg.setErrorMsg("list is null");
		}
		SessionInfo sessionInfo = getCurrentInfo(request);
		Log.error("homepage recommend news list",sessionInfo);
		return baseMsg;
	}
}
