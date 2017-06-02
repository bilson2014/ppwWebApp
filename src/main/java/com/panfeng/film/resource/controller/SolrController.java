package com.panfeng.film.resource.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.solr.client.solrj.SolrQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.paipianwang.pat.common.config.PublicConfig;
import com.paipianwang.pat.common.util.SolrUtil;
import com.paipianwang.pat.common.util.ValidateUtil;
import com.paipianwang.pat.common.web.domain.ResourceToken;
import com.paipianwang.pat.facade.information.entity.PmsNewsSolr;
import com.paipianwang.pat.facade.information.entity.PmsProductSolr;
import com.panfeng.film.domain.BaseMsg;
import com.panfeng.film.resource.view.SolrView;
import com.panfeng.film.service.SolrService;

@RestController
public class SolrController extends BaseController {

	@Autowired
	private SolrService solrService = null;

	@RequestMapping("/search")
	public ModelAndView searchView(String q, final String industry, final String genre, final String production,
			final String price, final boolean isMore, final ModelMap model, final HttpServletRequest request)
			throws Exception {

		q = q.replaceAll("“+", "\"").replaceAll("”+", "\"");
		model.addAttribute("q", q);
		model.addAttribute("price", price);
		model.addAttribute("production", production);
		model.addAttribute("industry", industry);
		model.addAttribute("genre", genre);
		model.addAttribute("isMore", isMore);

		final SolrView view = new SolrView();
		view.setCondition(q);
		view.setIndustry(industry);
		view.setGenre(genre);
		view.setProduction(production);
		view.setPriceFq(price);
		// 设置是否是从相关性推荐过来的
		view.setMore(isMore);
		view.setLimit(20l);

		final List<PmsProductSolr> list = solrService.listWithPagination(view, request);

		long total = 0l;
		if (list != null && !list.isEmpty()) {
			final PmsProductSolr s = list.get(0);
			if (s != null) {
				total = s.getTotal(); // 设置总数
			}
		}

		model.addAttribute("list", list);
		model.addAttribute("total", total);
		return new ModelAndView("search", model);
	}

	// 搜索分页
	@RequestMapping("/search/pagination")
	public List<PmsProductSolr> searchPagination(@RequestBody final SolrView view, final HttpServletRequest request)
			throws Exception {
		final List<PmsProductSolr> list = solrService.listWithPagination(view, request);
		return list;
	}

	/**
	 * 新闻列表视图页
	 * 
	 * @param q
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/news-list.html")
	public ModelAndView searchNewView(String q, final ModelMap model, final HttpServletRequest request)
			throws Exception {

		final SolrView view = new SolrView();
		if ("最热资讯".equals(q)) {
			// 筛选 推荐值大于0 的新闻
			view.setRecomendFq("[1 TO *]");
			q = null;
		}
		
		view.setCondition(q);
		model.addAttribute("q", q);
		view.setLimit(20l);

		final List<PmsNewsSolr> list = solrService.queryNewDocs(PublicConfig.SOLR_NEWS_URL, view);
		
		long total = 0l;
		if(ValidateUtil.isValid(list)) {
			final PmsNewsSolr s = list.get(0);
			if (s != null) {
				total = s.getTotal(); // 设置总数
			}
		}
		model.addAttribute("list", list);
		model.addAttribute("total", total);
		return new ModelAndView("newsInfo", model);
	}

	/**
	 * 新闻便签数据获取（最热，推荐）
	 * 
	 * @param q
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/get/news/tag")
	public BaseMsg searchNewByTagsView(String q, HttpServletRequest request) throws Exception {
		BaseMsg baseMsg = new BaseMsg();
		final SolrView view = new SolrView();
		if ("最热资讯".equals(q)) {
			// 筛选 推荐值大于0 的新闻
			view.setRecomendFq("[1 TO *]");
			q = null;
		}
		
		view.setCondition(q);
		view.setLimit(20l);
		final List<PmsNewsSolr> list = solrService.queryNewDocs(PublicConfig.SOLR_NEWS_URL, view);
		if (ValidateUtil.isValid(list)) {
			baseMsg.setCode(BaseMsg.NORMAL);
			baseMsg.setResult(list);
			return baseMsg;
		}

		baseMsg.setCode(BaseMsg.ERROR);
		baseMsg.setErrorMsg("服务器通信失败！");
		return baseMsg;
	}

	// 搜索分页
	@RequestMapping("/search/news/pagination")
	public List<PmsNewsSolr> searchNewsPagination(@RequestBody final SolrView view, final HttpServletRequest request)
			throws Exception {

		final String condition = view.getCondition();

		if ("最热资讯".equals(condition)) {
			// 筛选 推荐值大于0 的新闻
			view.setRecomendFq("[1 TO *]");
		}

		final List<PmsNewsSolr> list = solrService.queryNewDocs(PublicConfig.SOLR_NEWS_URL, view);
		return list;
	}

	@RequestMapping("/suggest/{token}")
	public List<PmsProductSolr> suggest(@PathVariable("token") final String token, final HttpServletRequest request) {

		if (token != null && !"".equals(token)) {

			final ResourceToken resourceToken = (ResourceToken) request.getAttribute("searchResourceToken"); // 访问资源库令牌
			String word = null;
			try {
				word = URLDecoder.decode(token, "UTF-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			final SolrQuery query = new SolrQuery();
			query.set("qt", "/suggest");
			query.set("q", word);
			query.set("spellcheck.build", "true");
			List<String> list = solrService.suggestDocs(resourceToken.getSolrUrl(), query);
			final List<PmsProductSolr> sList = new ArrayList<PmsProductSolr>();
			if (ValidateUtil.isValid(list)) {
				for (final String string : list) {
					final PmsProductSolr solr = new PmsProductSolr();
					solr.setCondition(string);
					sList.add(solr);
				}
			}
			return sList;
		}
		return null;
	}

	/**
	 * 播放界面获取更多推荐作品 根据tags来搜索 参数：condition 表示tag标签
	 */
	@RequestMapping("/tags/product/search")
	public BaseMsg getMoreProductByTags(final HttpServletRequest request, @RequestBody final SolrView solrView) {
		BaseMsg baseMsg = new BaseMsg();

		final ResourceToken token = (ResourceToken) request.getAttribute("resourceToken"); // 访问资源库令牌
		if (token != null) {
			String condition = solrView.getCondition();
			final SolrQuery query = new SolrQuery();
			query.set("defType", "edismax");
			query.set("q.alt", "*:*");
			query.set("qf", "productName^2.3 tags");

			if (StringUtils.isNotBlank(condition)) {
				// 如果有标签的话，那么判断condition按照标签搜索
				// 分析标签优先级顺序，按顺序权重依次降低
				condition = SolrUtil.ReweightingByTags(condition);
				query.setQuery(condition);
			} else {
				// 没有标签，则相关视频推荐为空
				return null;
			}
			query.set("pf", "tags^2.3 productName");
			query.set("tie", "0.1");
			query.setFields("teamId,teamName,productId,productName,orignalPrice,price,picLDUrl,tags,indentProjectId,teamPhotoUrl,teamFlag");
			query.setStart((int) solrView.getBegin());
			query.setRows((int) solrView.getLimit());

			final List<PmsProductSolr> list = solrService.queryDocs(token.getSolrUrl(), query);
			if (ValidateUtil.isValid(list)) {
				Map<String, Object> map = new HashMap<>();
				long total = 0;
				final PmsProductSolr product = list.get(0);
				
				if(product != null)
					total = list.get(0).getTotal();
				
				map.put("total", total);
				map.put("result", list);
				baseMsg.setCode(1);
				baseMsg.setResult(map);
				return baseMsg;
			}

		}

		baseMsg.setErrorCode(BaseMsg.ERROR);
		baseMsg.setErrorMsg("list is null");
		return baseMsg;
	}
}
