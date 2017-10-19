package com.panfeng.film.service.impl;

import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrQuery.ORDER;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.springframework.stereotype.Service;

import com.paipianwang.pat.common.config.PublicConfig;
import com.paipianwang.pat.common.constant.PmsConstant;
import com.paipianwang.pat.common.entity.SessionInfo;
import com.paipianwang.pat.common.util.ValidateUtil;
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
		final SessionInfo info = (SessionInfo) request.getSession().getAttribute(PmsConstant.SESSION_INFO);
		String condition = view.getCondition();

		// 组装 行业 和 类型 业务逻辑
		try {
			final SolrQuery query = new SolrQuery();
			query.set("defType", "edismax");
			query.set("qf", "productName^80 tags^70 teamName^10");
			query.set("q.alt", "*:*");

			// 整合bf，增强搜索字段的权重
			if (ValidateUtil.isValid(condition)) {
				// 分词
				String freq = condition.replaceAll(",", " ").replaceAll(" +", " ");
				List<String> words = this.getAnalysis(token.getSolrUrl(), freq);
				if (ValidateUtil.isValid(words)) {
					StringBuffer sb = new StringBuffer();
					for (int i = 0; i < words.size(); i++) {
						String str = words.get(i);
						if (ValidateUtil.isValid(str)) {
							sb.append("termfreq(productName,*");
							sb.append(str);
							sb.append("*),");
							sb.append("termfreq(tags,*");
							sb.append(str);
							if (i == (words.size() - 1))
								sb.append("*)");
							else
								sb.append("*),");
						}
					}

					// query 注入 termfreq 函数
					query.set("bf", "sum(" + sb.toString() + ")^1500");
				}
			}

			// 判断当前如果是供应商的话，那么看到公共的和自己的作品
			String search_words = KeywordUtils.mergeQConcition(view);
			if (info != null) {
				if (PmsConstant.ROLE_PROVIDER.equals(info.getSessionType())
						&& PublicConfig.SOLR_URL.equals(token.getSolrUrl())) {
					StringBuffer buffer = new StringBuffer(search_words);
					buffer.append(" AND (recommend:[1 TO *] OR ");
					buffer.append("teamId:" + info.getReqiureId());
					buffer.append(")");
					search_words = buffer.toString();
				}
			}

			query.setQuery(search_words);
			query.set("pf", "productName tags teamName");
			query.set("tie", "0.1");

			if (view.getIdFq() != null && !"".equals(view.getIdFq())) {
				query.addFilterQuery("-id:" + view.getIdFq());
			}
			query.setFields(
					"teamId,teamName,productId,productName,orignalPrice,price,picLDUrl,tags,indentProjectId,teamPhotoUrl,teamFlag");

			query.setStart(Integer.parseInt(String.valueOf(view.getBegin())));
			query.setRows(Integer.parseInt(String.valueOf(view.getLimit())));

			// 如果价格区间为空，则设置为全部
			if (view.getPriceFq() != null && !"".equals(view.getPriceFq())) {
				query.addFilterQuery("price:" + view.getPriceFq());
			}

			// 如果来源不为空，则设置为全部
			final String source = view.getSourceFq();
			if (StringUtils.isNotBlank(source)) {
				if("paipianwang".equals(source)) {
					query.addFilterQuery("teamFlag:1");
					query.addFilterQuery("-indentProjectId:0");
				} else if("case".equals(source)) {
					query.addFilterQuery("teamFlag:4");
				} else if("team".equals(source)) {
					query.addFilterQuery("teamFlag:1");
					query.addFilterQuery("indentProjectId:0");
				}
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

		// 设置ID区间
		if (view.getIdFq() != null && !"".equals(view.getIdFq())) {
			query.addFilterQuery("-id:" + view.getIdFq());
		}

		query.setStart(Integer.parseInt(String.valueOf(view.getBegin())));
		query.setRows(Integer.parseInt(String.valueOf(view.getLimit())));
		return this.queryNewDocs(solrUrl, query);
	}
}
