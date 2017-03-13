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

import org.apache.commons.lang.StringUtils;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.paipianwang.pat.facade.right.entity.SessionInfo;
import com.panfeng.film.domain.BaseMsg;
import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.resource.model.NewsSolr;
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
			final InputStream is = this.getClass().getClassLoader().getResourceAsStream("jdbc.properties");
			try {
				Properties propertis = new Properties();
				propertis.load(is);
				URL_PREFIX = propertis.getProperty("urlPrefix");
			} catch (IOException e) {
				Log.error("SolrController method:constructor load Properties fail ...", null);
				e.printStackTrace();
			}
		}
	}

	@RequestMapping("/search")
	public ModelAndView searchView(String q, final String industry, final String genre, final String length,
			final String price, final boolean isMore, final ModelMap model, final HttpServletRequest request)
			throws Exception {

		model.addAttribute("q", q);
		model.addAttribute("price", price);
		model.addAttribute("length", length);
		model.addAttribute("industry", industry);
		model.addAttribute("genre", genre);
		model.addAttribute("isMore", isMore);
		final SolrView view = new SolrView();

		if (StringUtils.isNotBlank(q))
			view.setCondition(URLEncoder.encode(q, "UTF-8"));
		if (StringUtils.isNotBlank(industry))
			view.setIndustry(URLEncoder.encode(industry, "UTF-8"));
		if (StringUtils.isNotBlank(genre))
			view.setGenre(URLEncoder.encode(genre, "UTF-8"));

		view.setLengthFq(length);
		view.setPriceFq(price);

		// 设置是否是从相关性推荐过来的
		view.setMore(isMore);

		view.setLimit(20l);
		try {
			final String url = URL_PREFIX + "portal/solr/query";
			final String json = HttpUtil.httpPost(url, view, request);
			long total = 0l;
			if (json != null && !"".equals(json)) {
				List<Solr> list = JsonUtil.fromJsonArray(json, Solr.class);
				if (list != null && !list.isEmpty()) {
					final Solr s = list.get(0);
					if (s != null) {
						total = s.getTotal(); // 设置总数
					}
				}
				model.addAttribute("list", list);
				model.addAttribute("total", total);
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("SolrController method:searchView() encode failue,q=" + q, sessionInfo);
		}
		return new ModelAndView("search", model);
	}

	// 搜索分页
	@RequestMapping("/search/pagination")
	public List<Solr> searchPagination(@RequestBody final SolrView view, final HttpServletRequest request)
			throws Exception {

		final String condition = view.getCondition();
		final String industry = view.getIndustry();
		final String genre = view.getGenre();

		if (StringUtils.isNotBlank(condition))
			view.setCondition(URLEncoder.encode(view.getCondition(), "UTF-8"));

		if (StringUtils.isNotBlank(industry))
			view.setIndustry(URLEncoder.encode(industry, "UTF-8"));

		if (StringUtils.isNotBlank(genre))
			view.setGenre(URLEncoder.encode(genre, "UTF-8"));

		try {
			String url = URL_PREFIX + "portal/solr/query";
			final String json = HttpUtil.httpPost(url, view, request);

			if (json != null && !"".equals(json)) {
				List<Solr> list = JsonUtil.fromJsonArray(json, Solr.class);
				return list;
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("SolrController method:searchPagination() encode failue,q=" + view.getCondition(), sessionInfo);
		}
		return null;
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
		model.addAttribute("q", q);
		
		if (StringUtils.isNotBlank(q))
			view.setCondition(URLEncoder.encode(q, "UTF-8"));

		view.setLimit(20l);
		try {
			final String url = URL_PREFIX + "portal/solr/query/news";
			final String json = HttpUtil.httpPost(url, view, request);
			long total = 0l;
			if (json != null && !"".equals(json)) {
				List<NewsSolr> list = JsonUtil.fromJsonArray(json, NewsSolr.class);
				if (list != null && !list.isEmpty()) {
					final NewsSolr s = list.get(0);
					if (s != null) {
						total = s.getTotal(); // 设置总数
					}
				}
				model.addAttribute("list", list);
				model.addAttribute("total", total);
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("SolrController method:searchNewView() encode failue,q=" + q, sessionInfo);
		}
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
		if (StringUtils.isNotBlank(q))
			view.setCondition(URLEncoder.encode(q, "UTF-8"));

		view.setLimit(20l);
		try {
			final String url = URL_PREFIX + "portal/solr/query/news";
			final String json = HttpUtil.httpPost(url, view, request);
			if (json != null && !"".equals(json)) {
				List<NewsSolr> list = JsonUtil.fromJsonArray(json, NewsSolr.class);
				baseMsg.setCode(BaseMsg.NORMAL);
				baseMsg.setResult(list);
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("SolrController method:searchNewView() encode failue,q=" + q, sessionInfo);
			baseMsg.setCode(BaseMsg.ERROR);
			baseMsg.setErrorMsg("服务器通信失败！");
		}
		return baseMsg;
	}
	
<<<<<<< HEAD
	/**
	 * 新闻列表视图页
	 * @param q
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/news-list.html")
	public ModelAndView searchNewView(String q, final ModelMap model,
			final HttpServletRequest request)
			throws Exception {

		final SolrView view = new SolrView();
		if("最热资讯".equals(q)) {
			// 筛选 推荐值大于0 的新闻
			view.setRecomendFq("[1 TO *]");
			q = null;
		}
		model.addAttribute("q", q);
		
		
		
		if(StringUtils.isNotBlank(q))
			view.setCondition(URLEncoder.encode(q, "UTF-8"));
		
		view.setLimit(20l);
		try {
			final String url = URL_PREFIX + "portal/solr/query/news";
			final String json = HttpUtil.httpPost(url,view,request);
			long total = 0l;
			if (json != null && !"".equals(json)) {
				List<NewsSolr> list = JsonUtil.fromJsonArray(json, NewsSolr.class);
				if (list != null && !list.isEmpty()) {
					final NewsSolr s = list.get(0);
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
			Log.error("SolrController method:searchNewView() encode failue,q="
					+ q,sessionInfo);
		}
		return new ModelAndView("newsInfo", model);
	}
	
	
	// 搜索分页
	@RequestMapping("/search/news/pagination")
	public List<NewsSolr> searchNewsPagination(@RequestBody final SolrView view,
			final HttpServletRequest request)
			throws Exception {

		final String condition = view.getCondition();
		
		if("最热资讯".equals(condition)) {
			// 筛选 推荐值大于0 的新闻
			view.setRecomendFq("[1 TO *]");
		}
		
		if(StringUtils.isNotBlank(condition)) 
=======
	// 搜索分页
	@RequestMapping("/search/news/pagination")
	public List<NewsSolr> searchNewsPagination(@RequestBody final SolrView view, final HttpServletRequest request)
			throws Exception {

		final String condition = view.getCondition();

		if ("最热资讯".equals(condition)) {
			// 筛选 推荐值大于0 的新闻
			view.setRecomendFq("[1 TO *]");
		}

		if (StringUtils.isNotBlank(condition))
>>>>>>> web3.0
			view.setCondition(URLEncoder.encode(view.getCondition(), "UTF-8"));

		try {
			String url = URL_PREFIX + "portal/solr/query/news";
<<<<<<< HEAD
			final String json = HttpUtil.httpPost(url,view,request);
			
=======
			final String json = HttpUtil.httpPost(url, view, request);

>>>>>>> web3.0
			if (json != null && !"".equals(json)) {
				List<NewsSolr> list = JsonUtil.fromJsonArray(json, NewsSolr.class);
				return list;
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			SessionInfo sessionInfo = getCurrentInfo(request);
<<<<<<< HEAD
			Log.error("SolrController searchNewsPagination() encode failue,q="
					+ view.getCondition(),sessionInfo);
		}
		return null;
	}
	
=======
			Log.error("SolrController searchNewsPagination() encode failue,q=" + view.getCondition(), sessionInfo);
		}
		return null;
	}

>>>>>>> web3.0
	@RequestMapping("/suggest/{token}")
	public List<Solr> suggest(@PathVariable("token") final String token, final HttpServletRequest request) {

		if (token != null && !"".equals(token)) {
			try {
				final String word = URLDecoder.decode(token, "UTF-8");

				String url = URL_PREFIX + "portal/solr/suggest/" + word;
				final String json = HttpUtil.httpGet(url, request);
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
	 * 播放界面获取更多推荐作品 根据tags来搜索 参数：condition 表示tag标签
	 */
	@RequestMapping("/tags/product/search")
	public BaseMsg getMoreProductByTags(final HttpServletRequest request, @RequestBody final SolrView solrView) {
		BaseMsg baseMsg = new BaseMsg();

		final String condition = solrView.getCondition();
		try {
			if (StringUtils.isNotBlank(condition))
				solrView.setCondition(URLEncoder.encode(condition, "UTF-8"));
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}

		Map<String, Object> map = new HashMap<>();
		long total = 0l;
		final String url = GlobalConstant.URL_PREFIX + "portal/tags/search";
		final String json = HttpUtil.httpPost(url, solrView, request);
		if (null != json && !"".equals(json)) {
			List<Solr> list;
			try {
				list = JsonUtil.fromJsonArray(json, Solr.class);
				if (list.size() > 0) {
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
