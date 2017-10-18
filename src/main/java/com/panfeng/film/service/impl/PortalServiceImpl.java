package com.panfeng.film.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrQuery.ORDER;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paipianwang.pat.common.entity.PageParam;
import com.paipianwang.pat.common.util.ValidateUtil;
import com.paipianwang.pat.facade.information.entity.PmsNews;
import com.paipianwang.pat.facade.information.entity.PmsProductSolr;
import com.paipianwang.pat.facade.information.service.PmsNewsFacade;
import com.paipianwang.pat.facade.team.entity.PmsTeam;
import com.paipianwang.pat.facade.team.service.PmsTeamFacade;
import com.panfeng.film.service.PortalService;
import com.panfeng.film.service.SolrService;

@Service
public class PortalServiceImpl implements PortalService {

	@Autowired
	private SolrService solrService = null;

	@Autowired
	private PmsTeamFacade pmsTeamFacade = null;
	
	@Autowired
	private PmsNewsFacade pmsNewsFacade = null;

	@Override
	public Map<String, List<PmsProductSolr>> getPortalProductFromSolr(String solrUrl) {
		final SolrQuery query = new SolrQuery();
		query.set("qf", "productName^4 tags^3 teamName^2 pDescription^1");
		query.setQuery("*:*");
		query.setFields(
				"teamId,productId,productName,teamName,orignalPrice,price,picLDUrl,recommend,supportCount,tags,teamFlag,teamPhotoUrl");
		query.setStart(0);
		query.setRows(30);
		query.setSort("supportCount", ORDER.desc);
		query.addFilterQuery("recommend:[1 TO 2]");

		final List<PmsProductSolr> list = solrService.queryDocs(solrUrl, query);
		if (ValidateUtil.isValid(list)) {
			Map<String, List<PmsProductSolr>> resultMap = new HashMap<String, List<PmsProductSolr>>();
			List<PmsProductSolr> hostList = new ArrayList<PmsProductSolr>();
			List<PmsProductSolr> recommodList = new ArrayList<PmsProductSolr>();
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
				if (s.getRecommend() == 1)
					hostList.add(s);
				else if (s.getRecommend() == 2)
					recommodList.add(s);

			}

			resultMap.put("host", hostList);
			resultMap.put("classical", recommodList);
			return resultMap;
		}

		return null;
	}

	@Override
	public List<PmsTeam> getRecommodTeam() {
		List<PmsTeam> teamRecommendList = pmsTeamFacade.teamRecommendList();
		if (ValidateUtil.isValid(teamRecommendList)) {
			// 优先使用昵称
			for (PmsTeam team : teamRecommendList) {
				if (ValidateUtil.isValid(team.getDisplayName())) {
					team.setTeamName(team.getDisplayName());
				}
				if (ValidateUtil.isValid(team.getDisplayImg())) {
					team.setTeamPhotoUrl(team.getDisplayImg());
				}
			}
			return teamRecommendList;
		}
		return null;
	}

	@Override
	public List<PmsNews> getRecommodNews() {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		PageParam pageParam = new PageParam();
		pageParam.setLimit(6);
		// 首页显示
		paramMap.put("status", 1);
		// 可见
		paramMap.put("visible", 0);
		List<PmsNews> list = pmsNewsFacade.listWithPagination(pageParam, paramMap).getRows();
		return list;
	}

}
