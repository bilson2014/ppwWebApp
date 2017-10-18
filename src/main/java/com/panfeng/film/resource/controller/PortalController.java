package com.panfeng.film.resource.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.paipianwang.pat.common.config.PublicConfig;
import com.paipianwang.pat.common.constant.PmsConstant;
import com.paipianwang.pat.common.entity.SessionInfo;
import com.paipianwang.pat.common.util.ValidateUtil;
import com.paipianwang.pat.facade.information.entity.PmsNews;
import com.paipianwang.pat.facade.information.entity.PmsProductSolr;
import com.paipianwang.pat.facade.team.entity.PmsTeam;
import com.panfeng.film.service.PortalService;

@RestController
public class PortalController extends BaseController {

	@Autowired
	private PortalService portalService = null;
	
	/**
	 * 首页跳转
	 * @return
	 */
	@RequestMapping("/")
	public ModelAndView portal(final HttpServletRequest request) {
		ModelAndView mv = new ModelAndView("index");
		
		String solrUrl = PublicConfig.SOLR_PORTAL_URL;
		SessionInfo sessionInfo = getCurrentInfo(request);
		if(sessionInfo != null) {
			String sessionType = sessionInfo.getSessionType();
			if(StringUtils.isNotBlank(sessionType)) {
				if(PmsConstant.ROLE_EMPLOYEE.equals(sessionType))
					// 替换成 员工首页数据源
					solrUrl = PublicConfig.SOLR_EMPLOYEE_URL;
			}
		}
		
		// 加载 精品案例以及 热门爆款
		Map<String, List<PmsProductSolr>> productMap = portalService.getPortalProductFromSolr(solrUrl);
		if(ValidateUtil.isValid(productMap)) {
			mv.addObject("hot_section", productMap.get("host"));
			mv.addObject("classical_section", productMap.get("classical"));
		}
		
		// 加载 推荐供应商
		List<PmsTeam> teamList = portalService.getRecommodTeam();
		if(ValidateUtil.isValid(teamList))
			mv.addObject("teamList", teamList);
		
		// 加载 热门新闻
		List<PmsNews> newsList = portalService.getRecommodNews();
		if(ValidateUtil.isValid(newsList))
			mv.addObject("newsList", newsList);
		return mv;
		
	}
}
