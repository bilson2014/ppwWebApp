package com.panfeng.film.service;

import java.util.List;
import java.util.Map;

import com.paipianwang.pat.facade.information.entity.PmsNews;
import com.paipianwang.pat.facade.information.entity.PmsProductSolr;
import com.paipianwang.pat.facade.team.entity.PmsTeam;

public interface PortalService {

	/**
	 * 首页加载 热门爆款 以及 精品案例
	 * @param solrUrl
	 * @return
	 */
	Map<String, List<PmsProductSolr>> getPortalProductFromSolr(String solrUrl);

	/**
	 * 首页加载推荐供应商
	 * @return
	 */
	List<PmsTeam> getRecommodTeam();

	/**
	 * 首页加载推荐新闻
	 * @return
	 */
	List<PmsNews> getRecommodNews();
}
