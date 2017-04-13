package com.panfeng.film.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.solr.client.solrj.SolrQuery;

import com.paipianwang.pat.common.web.service.BaseSolrService;
import com.paipianwang.pat.facade.information.entity.PmsNewsSolr;
import com.paipianwang.pat.facade.information.entity.PmsProductSolr;
import com.panfeng.film.resource.view.SolrView;

public interface SolrService extends BaseSolrService{

	public List<PmsProductSolr> listWithPagination(final SolrView view, final HttpServletRequest request);

	public List<String> suggestDocs(String solrUrl, SolrQuery query);

	public List<PmsNewsSolr> queryNewDocs(String SOLR_NEWS_URL, SolrView view);
}
