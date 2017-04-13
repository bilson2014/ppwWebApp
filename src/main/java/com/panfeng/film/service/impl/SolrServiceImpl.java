package com.panfeng.film.service.impl;

import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrQuery.ORDER;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.springframework.stereotype.Service;

import com.paipianwang.pat.common.web.domain.ResourceToken;
import com.paipianwang.pat.common.web.service.impl.BaseSolrServiceImpl;
import com.paipianwang.pat.facade.information.entity.PmsNewsSolr;
import com.paipianwang.pat.facade.information.entity.PmsProductSolr;
import com.panfeng.film.resource.view.SolrView;
import com.panfeng.film.service.SolrService;
import com.panfeng.film.util.KeywordUtils;

@Service
public class SolrServiceImpl extends BaseSolrServiceImpl implements SolrService {

	@Override
	public List<PmsProductSolr> listWithPagination(final SolrView view, final HttpServletRequest request) {
		final ResourceToken token = (ResourceToken) request.getAttribute("resourceToken"); // 访问资源库令牌
		String condition = view.getCondition();

		// 组装 行业 和 类型 业务逻辑
		try {
			condition = KeywordUtils.mergeQConcition(view);
			final SolrQuery query = new SolrQuery();
			query.set("defType", "edismax");
			query.set("qf", "productName^2.3 tags teamName^0.4");
			query.set("q.alt", "*:*");

			query.setQuery(condition);
			query.set("pf", "productName tags teamName");
			query.set("tie", "0.1");
			query.setFields("teamId,productId,productName,orignalPrice,price,picLDUrl,tags");

			query.setStart(Integer.parseInt(String.valueOf(view.getBegin())));
			query.setRows(Integer.parseInt(String.valueOf(view.getLimit())));

			// 如果价格区间为空，则设置为全部
			if (view.getPriceFq() != null && !"".equals(view.getPriceFq())) {
				query.addFilterQuery("price:" + view.getPriceFq());
			}

			// 如果时长区间为空，则设置为全部
			if (view.getLengthFq() != null && !"".equals(view.getLengthFq())) {
				query.addFilterQuery("length:" + view.getLengthFq());
			}

			// 开启高亮
			query.setHighlight(true);
			query.set("hl.highlightMultiTerm", true);
			query.addHighlightField("productName");
			query.setHighlightFragsize(30);
			query.setHighlightSimplePre("<font color=\"red\">");
			query.setHighlightSimplePost("</font>");

			final List<PmsProductSolr> list = this.queryDocs(token.getSolrUrl(), query);
			return list;
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<String> suggestDocs(String solrUrl, SolrQuery query) {
		return this.suggestDocs(solrUrl, query);
	}

	@Override
	@SuppressWarnings("resource")
	public List<PmsNewsSolr> queryNewDocs(String solrUrl, SolrView view) {
		final HttpSolrClient client = new HttpSolrClient(solrUrl);
		client.setConnectionTimeout(5000);

		String condition = view.getCondition();
		final SolrQuery query = new SolrQuery();
		query.set("defType", "edismax");
		query.set("qf", "tags");
		query.set("q.alt", "*:*");

		query.setQuery(condition);
		query.set("pf", "tags");
		query.set("tie", "0.1");
		query.setFields("id title tags creationTime discription picLDUrl recommend");
		query.setSort("creationTime", ORDER.desc);

		// 设置推荐区间
		if (view.getRecomendFq() != null && !"".equals(view.getRecomendFq())) {
			query.addFilterQuery("recommend:" + view.getRecomendFq());
		}

		query.setStart(Integer.parseInt(String.valueOf(view.getBegin())));
		query.setRows(Integer.parseInt(String.valueOf(view.getLimit())));
		return this.queryNewDocs(solrUrl, query);
	}
}
