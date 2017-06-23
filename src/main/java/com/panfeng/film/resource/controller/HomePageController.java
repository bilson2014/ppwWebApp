package com.panfeng.film.resource.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrQuery.ORDER;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.paipianwang.pat.common.config.PublicConfig;
import com.paipianwang.pat.common.entity.PageParam;
import com.paipianwang.pat.common.entity.SessionInfo;
import com.paipianwang.pat.common.util.ValidateUtil;
import com.paipianwang.pat.facade.information.entity.PmsNews;
import com.paipianwang.pat.facade.information.entity.PmsProductSolr;
import com.paipianwang.pat.facade.information.service.PmsNewsFacade;
import com.paipianwang.pat.facade.team.entity.PmsTeam;
import com.paipianwang.pat.facade.team.service.PmsTeamFacade;
import com.panfeng.film.domain.BaseMsg;
import com.panfeng.film.resource.view.SolrView;
import com.panfeng.film.service.SolrService;
import com.panfeng.film.util.Log;

@RestController
@RequestMapping("/home")
public class HomePageController extends BaseController {

	final Logger serLogger = LoggerFactory.getLogger("service"); // service log

	final Logger logger = LoggerFactory.getLogger("error");

	@Autowired
	private PmsTeamFacade pmsTeamFacade = null;

	@Autowired
	private PmsNewsFacade pmsNewsFacade = null;
	
	@Autowired
	private SolrService solrService = null;

	/**
	 * 加载 主页 视频列表
	 * 
	 * @return List<Solr> 产品列表
	 */
	@RequestMapping(value = "/product/loadProduct", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public BaseMsg productList(final HttpServletRequest request, @RequestBody SolrView solrView) {
		BaseMsg baseMsg = new BaseMsg();
		
		final SolrQuery query = new SolrQuery();
		query.set("qf", "productName^4 tags^3 teamName^2 pDescription^1");
		query.setQuery("*:*");
		query.setFields(
				"teamId,productId,productName,productType,itemName,teamName,orignalPrice,price,picLDUrl,length,pDescription,recommend,supportCount,tags,indentProjectId,teamPhotoUrl,teamFlag");
		query.setStart(0);
		query.setRows(Integer.MAX_VALUE);
		if (null != solrView.getSort()) {
			query.setSort(solrView.getSort(), ORDER.desc);
		}
		final List<PmsProductSolr> list = solrService.queryDocs(PublicConfig.SOLR_PORTAL_URL, query);
		if (null != list) {
			// 处理标签
			for (PmsProductSolr s : list) {
				String tags = s.getTags();
				if (StringUtils.isNotBlank(tags)) {
					// 匹配标签分割 空格，多个空格 中文逗号，英文逗号
					String[] tagsArr = tags.split("(\\s+)|(,)|(，)");
					int maxLength = tagsArr.length > 3 ? 3 : tagsArr.length;
					tags = "";
					for (int i = 0; i < maxLength; i++) {
						tags += tagsArr[i] + "/";
					}
					tags = tags.substring(0, tags.length() - 1);
					s.setTags(tags);
				}
			}
			baseMsg.setCode(1);
			baseMsg.setResult(list);
		} else {
			baseMsg.setErrorMsg("null list");
		}
		
		SessionInfo sessionInfo = getCurrentInfo(request);
		Log.error("Load portal page products", sessionInfo);
		return baseMsg;
	}

	/**
	 * 首页获取导演推荐
	 */
	@RequestMapping(value = "/team/recommend", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public BaseMsg getRecommendTeam(final HttpServletRequest request) {
		BaseMsg baseMsg = new BaseMsg();
		List<PmsTeam> teamRecommendList = pmsTeamFacade.teamRecommendList();
		if (null != teamRecommendList) {
			baseMsg.setCode(1);
			baseMsg.setResult(teamRecommendList);
		} else {
			baseMsg.setErrorMsg("list is null");
		}
		SessionInfo sessionInfo = getCurrentInfo(request);
		Log.error("homepage recommend team list ", sessionInfo);
		return baseMsg;
	}

	/**
	 * 首页获取新闻推荐
	 */
	@RequestMapping(value = "/news/recommend", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public BaseMsg getRecommendNews(final HttpServletRequest request,@RequestBody final PageParam pageParam) {
		BaseMsg baseMsg = new BaseMsg();

		Map<String, Object> paramMap = new HashMap<String, Object>();
		
		// 首页显示
		paramMap.put("status", 1);
		// 可见
		paramMap.put("visible", 0);
		List<PmsNews> list = pmsNewsFacade.listWithPagination(pageParam, paramMap).getRows();
		if (ValidateUtil.isValid(list)) {
			baseMsg.setCode(1);
			baseMsg.setResult(list);
		} else {
			baseMsg.setErrorMsg("list is null");
		}
		return baseMsg;
	}
}
