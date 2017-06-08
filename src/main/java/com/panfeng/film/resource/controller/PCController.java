package com.panfeng.film.resource.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrQuery.ORDER;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.paipianwang.pat.common.config.PublicConfig;
import com.paipianwang.pat.common.entity.SessionInfo;
import com.paipianwang.pat.common.util.DataUtil;
import com.paipianwang.pat.common.util.DateUtils;
import com.paipianwang.pat.common.util.ValidateUtil;
import com.paipianwang.pat.common.web.domain.ResourceToken;
import com.paipianwang.pat.facade.employee.entity.PmsJob;
import com.paipianwang.pat.facade.employee.entity.PmsStaff;
import com.paipianwang.pat.facade.employee.service.PmsJobFacade;
import com.paipianwang.pat.facade.employee.service.PmsStaffFacade;
import com.paipianwang.pat.facade.indent.entity.PmsIndent;
import com.paipianwang.pat.facade.indent.service.PmsIndentFacade;
import com.paipianwang.pat.facade.information.entity.PmsNews;
import com.paipianwang.pat.facade.information.entity.PmsProductSolr;
import com.paipianwang.pat.facade.information.service.PmsNewsFacade;
import com.paipianwang.pat.facade.product.entity.PmsProduct;
import com.paipianwang.pat.facade.product.entity.PmsProductModule;
import com.paipianwang.pat.facade.product.service.PmsProductFacade;
import com.paipianwang.pat.facade.product.service.PmsProductModuleFacade;
import com.paipianwang.pat.facade.team.entity.PmsTeam;
import com.paipianwang.pat.facade.team.service.PmsTeamFacade;
import com.paipianwang.pat.facade.user.entity.PmsUser;
import com.paipianwang.pat.facade.user.service.PmsUserFacade;
import com.panfeng.film.mq.service.SmsMQService;
import com.panfeng.film.resource.model.Indent;
import com.panfeng.film.resource.model.Product;
import com.panfeng.film.resource.model.User;
import com.panfeng.film.resource.view.SolrView;
import com.panfeng.film.service.SolrService;
import com.panfeng.film.util.IndentUtil;
import com.panfeng.film.util.Log;

/**
 * PC端 控制器
 * 
 * @author GY
 */
@RestController
public class PCController extends BaseController {

	final Logger serLogger = LoggerFactory.getLogger("service"); // service log

	final Logger logger = LoggerFactory.getLogger("error");

	@Autowired
	private PmsUserFacade pmsUserFacade = null;
	
	@Autowired
	private PmsTeamFacade pmsTeamFacade = null;
	
	@Autowired
	private PmsProductModuleFacade pmsProductModuleFacade = null;
	
	@Autowired
	private PmsProductFacade pmsProductFacade = null;
	
	@Autowired
	private SmsMQService smsMQService = null;
	
	@Autowired
	private PmsIndentFacade pmsIndentFacade = null;
	
	@Autowired
	private PmsStaffFacade pmsStaffFacade = null;
	
	@Autowired
	private PmsJobFacade pmsJobFacade = null;
	
	@Autowired
	private SolrService solrService = null;
	
	@Autowired
	private PmsNewsFacade pmsNewsFacade = null;

	/**
	 * 获取本地ip地址+端口号
	 * 
	 * @return 本地ip地址+端口号
	 */
	@RequestMapping("/local/address")
	public Product getAddress(final HttpServletRequest request) {
		final StringBuffer localUrl = new StringBuffer();
		localUrl.append("http://");
		localUrl.append(request.getLocalAddr());
		localUrl.append(":");
		localUrl.append(request.getLocalPort());
		Product product = new Product();
		product.setPicHDUrl(localUrl.toString());
		SessionInfo sessionInfo = getCurrentInfo(request);
		Log.error("PCController method:getAddress() Get address success:" + localUrl.toString(), sessionInfo);
		return product;
	}

	/**
	 * 联系我们视图
	 */
	@RequestMapping("/contactUs")
	public ModelAndView contactUsView(final HttpServletRequest request) {

		return new ModelAndView("/static/contactUs");
	}

	// 跳转 header
	@RequestMapping("/header")
	public ModelAndView headerView() {

		return new ModelAndView("header");
	}

	// 下单成功后跳转至成功页面
	@RequestMapping("/success")
	public ModelAndView successView(final ModelMap model) {

		return new ModelAndView("success", model);
	}

	// 跳转 login
	@RequestMapping("/login")
	public ModelAndView loginView(final ModelMap model) {

		model.addAttribute("isLogin", "login");
		return new ModelAndView("login", model);
	}

	// 跳转注册页面
	@RequestMapping("/register")
	public ModelAndView register(final ModelMap model) {
		return new ModelAndView("register", model);
	}

	// 跳转 密码找回
	@RequestMapping("/recover")
	public ModelAndView recoverView(final ModelMap model) {

		model.addAttribute("isLogin", "recover");
		return new ModelAndView("login", model);
	}

	// 跳转 about
	@RequestMapping("/about")
	public ModelAndView aboutView(final ModelMap model) {

		return new ModelAndView("about", model);
	}

	// 我要拍片 跳转
	@RequestMapping("/direct/order")
	public ModelAndView patView(final HttpServletRequest request, final ModelMap model) {

		final User user = (User) request.getSession().getAttribute("username");
		model.addAttribute("telephone", user != null ? user.getTelephone() : "");
		final Indent indent = new Indent();
		indent.setTeamId(-1l);
		indent.setProductId(-1l);
		indent.setServiceId(-1l);
		try {
			final String token = IndentUtil.generateOrderToken(request, indent);
			model.addAttribute("token", token);
		} catch (Exception e) {
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error(
					"method PCController patView ,direct order has error,bacase generate order use AES Decrypt token error ...",
					sessionInfo);
			e.printStackTrace();
		}
		return new ModelAndView("order", model);
	}

	/**
	 * 分销人下单
	 * 
	 * @param uniqueId
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping("/salesman/order/{uniqueId}")
	public ModelAndView order(@PathVariable("uniqueId") final String uniqueId, final HttpServletRequest request,
			final ModelMap model) {

		final User user = (User) request.getSession().getAttribute("username");
		model.addAttribute("telephone", user != null ? user.getTelephone() : "");

		final Indent indent = new Indent();
		indent.setTeamId(-1l);
		indent.setProductId(-1l);
		indent.setServiceId(-1l);
		indent.setSalesmanUniqueId(uniqueId);
		try {
			final String token = IndentUtil.generateOrderToken(request, indent);
			model.addAttribute("token", token);
		} catch (Exception e) {
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error(
					"method PCController order ,salesman order page has error,bacase generate order use AES Decrypt token error ...",
					sessionInfo);
			e.printStackTrace();
		}
		// modify by Jack,2016-06-21 12:35 end

		return new ModelAndView("order", model);
	}

	@RequestMapping("/play/{teamId}_{productId}.html")
	public ModelAndView play(@PathVariable("teamId") final Long teamId,
			@PathVariable("productId") final Integer productId, final ModelMap model,
			final HttpServletRequest request) {
		SessionInfo sessionInfo = getCurrentInfo(request);
		model.addAttribute("teamId", teamId);
		model.addAttribute("productId", productId);
		String priceDetail = null;
		final PmsProduct product = pmsProductFacade.loadProduct(productId);
		if (null != product && product.getTeamId() != null && !"".equals(product.getTeamId())) {
			priceDetail = product.getPriceDetail();
			final PmsTeam team = pmsTeamFacade.findTeamById(product.getTeamId());
			if (team != null) {
				product.setTeamDescription(team.getTeamDescription());
				product.setTeamName(team.getTeamName());
				product.setTeamPhotoUrl(team.getTeamPhotoUrl());
			}
		}
		model.addAttribute("product", product);
		if (ValidateUtil.isValid(priceDetail)) {
			Map<String, Object> ids = new HashMap<>();
			String[] priceDetails = priceDetail.split("\\,");
			ids.put("ids", priceDetails);
			List<PmsProductModule> productModules = pmsProductModuleFacade.findListByIds(ids);
			model.addAttribute("productModules", productModules);
		}
		if (teamId != null) {
			PmsTeam team = pmsTeamFacade.getTeamInfo(teamId);
			if (team != null) {
				model.addAttribute("teamFlag", team.getFlag());
			} else {
				Log.error("team is null ...", sessionInfo);
			}
		}
		
		Log.error("Redirect team page,teamId:" + teamId + " ,productId:" + productId, sessionInfo);
		return new ModelAndView("play", model);
	}

	/**
	 * 根据 团队名称 去solr中 加载 产品列表
	 * 
	 * @param teamName
	 */
	@RequestMapping("/product/order/loadWithTeamName")
	public List<PmsProductSolr> productInformationByTeamOrder(@RequestBody final SolrView solrView,
			final HttpServletRequest request) {

		final ResourceToken token = (ResourceToken) request.getAttribute("resourceToken"); // 访问资源库令牌
		String condition = solrView.getCondition();
		final SolrQuery query = new SolrQuery();
		query.set("defType", "edismax");
		query.set("q.alt", "*:*");
		query.set("qf", "teamName");
		if (StringUtils.isNotBlank(condition)) {
			query.setQuery(condition);
		} else {
			return null;
		}
		query.setSort("creationTime", ORDER.desc);
		query.set("pf", "teamName");
		query.set("tie", "0.1");
		query.setFields("teamId,productId,productName,orignalPrice,price,picLDUrl,tags,creationTime,pDescription");
		query.setStart(Integer.parseInt(String.valueOf(solrView.getBegin())));
		query.setRows(Integer.parseInt(String.valueOf(solrView.getLimit())));

		final List<PmsProductSolr> list = solrService.queryDocs(token.getSolrUrl(), query);
		for (PmsProductSolr pmsProductSolr : list) {
			String tags = pmsProductSolr.getTags();
			if(StringUtils.isNotBlank(tags))
				pmsProductSolr.setTags(tags.trim().replaceAll("(\\s*)(,|，|\\s+)(\\s*)", " "));
		}
		return list;
	}

	/**
	 * 作品页跳转
	 */
	@RequestMapping("/list.html")
	public ModelAndView listView(final ModelMap model, final HttpServletRequest request) {

		model.addAttribute("q", "*");

		// 该字段是为了验证是否是从list.html页面中来的
		model.addAttribute("validateP", "701511B4F6020EC61DE");

		try {
			final SolrView view = new SolrView();
			view.setCondition(URLEncoder.encode("*", "UTF-8"));
			view.setLimit(20l);
			List<PmsProductSolr> list = solrService.listWithPagination(view, request);
			/*String abc = "a";
			abc.indexOf("a");*/
			long total = 0l;
			if (ValidateUtil.isValid(list)) {
				final PmsProductSolr s = list.get(0);
				if (s != null) {
					total = s.getTotal(); // 设置总数
				}
				model.addAttribute("list", list);
				model.addAttribute("total", total);
			}
		} catch (Exception e) {
			e.printStackTrace();
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("PCController method:listView() encode failue,q=*", sessionInfo);
		}
		return new ModelAndView("search", model);
	}

	/**
	 * 供应商 头部信息
	 */
	@RequestMapping("/provider/header")
	public ModelAndView providerHeaderView(final ModelMap model) {

		return new ModelAndView("provider/header", model);
	}

	/**
	 * 供应商 管理页面
	 */
	@RequestMapping("/provider/portal")
	public ModelAndView providerPortalView(final HttpServletRequest request, final ModelMap model) {
		Integer flag = 4;
		final SessionInfo info = getCurrentInfo(request);
		final PmsTeam team = pmsTeamFacade.findTeamById(info.getReqiureId());
		team.setPassword(null);
		if (team != null) {
			model.addAttribute("provider", team);
		}
		final PmsTeam provider2 = getLatestTeam(request);
		if (provider2 != null) {
			model.addAttribute("provider2", provider2);
		}
		if (team != null) {
			Log.error("Redirect provider portal page,teamId : " + team.getTeamId() + " ,teamName : "
					+ team.getTeamName() + "flag is " + flag, info);
		}
		return new ModelAndView("provider/portal", model);
	}

	// 发送预约提示信息
	@RequestMapping("/appointment/{telephone}")
	public boolean appointment(final HttpServletRequest request, @PathVariable("telephone") final String telephone) {
		if (telephone != null && !"".equals(telephone)) {

			// 发送短信给业务部门
			smsMQService.sendMessage("131895", PublicConfig.PHONENUMBER_ORDER,
					new String[] { telephone, DateUtils.nowTime() });
			// 发送给客户
			smsMQService.sendMessage("134080", telephone, null);
			// 创建新订单
			PmsIndent indent = new PmsIndent();
			indent.setIndent_tele(telephone);
			indent.setIndentName("新订单");
			indent.setIndentType(0);
			indent.setServiceId(-1l);
			indent.setIndentPrice(0d);
			indent.setProductId(-1);
			indent.setTeamId(-1);
			indent.setSecond(0l);
			indent.setProductId(-1l);
			indent.setIndentNum(" ");
			long ret = pmsIndentFacade.save(indent);
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.info("send Message to telephone:" + telephone, sessionInfo);
			return ret > 0;

		}
		return false;
	}

	@RequestMapping(value = "/product/sessionId", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public Product getSessionId(final ModelMap map) {

		final String sessionId = DataUtil.getUuid();
		Product product = new Product();
		product.setSessionId(sessionId);
		return product;
	}

	/**
	 * 双十二活动页面 视图
	 */
	@RequestMapping("/active/12")
	public ModelAndView d12View(final HttpServletRequest request) {

		return new ModelAndView("/active/d12");
	}

	// 百度 推广
	@RequestMapping("/baidu_verify_xwk5yhHcpk.html")
	public ModelAndView popularize(final ModelMap model) {

		return new ModelAndView("baidu_verify_xwk5yhHcpk");
	}

	// 百度 推广
	@RequestMapping("/sitemap.html")
	public ModelAndView popularizeSiteMap(final ModelMap model) {

		return new ModelAndView("sitemap");
	}

	@RequestMapping("/member.html")
	public ModelAndView introduceView(final HttpServletRequest request, final ModelMap model) throws Exception {
		// 查询所有人信息
		final List<PmsStaff> list = pmsStaffFacade.getAll();
		if (null != list && list.size() > 0) {
			model.addAttribute("list", list);
		}
		final List<PmsJob> jobList = pmsJobFacade.getAll();
		if (null != jobList && jobList.size() > 0) {
			model.addAttribute("jobList", jobList);
		}
		return new ModelAndView("/member");
	}

	@RequestMapping("/introduce.html")
	public ModelAndView introduceView(final String model, final ModelMap map, final String direct) {

		if (ValidateUtil.isValid(model)) {

			map.addAttribute("page", model);
		} else {
			map.addAttribute("page", "about-us");
		}

		if (ValidateUtil.isValid(direct)) {
			map.addAttribute("direct", direct);
		}
		return new ModelAndView("/introduce");
	}

	@RequestMapping("/job/info/{id}")
	public PmsJob getJob(final HttpServletRequest request, @PathVariable("id") final Long id) {

		if (id != null) {
			final PmsJob job = pmsJobFacade.findJobById(id);
			return job;
		}
		return null;
	}

	/**
	 * 验证手机验证码是否正确
	 */
	@RequestMapping("/phone/validate")
	public boolean phoneValidate(@RequestBody final User user, final HttpServletRequest request) {

		final String code = (String) request.getSession().getAttribute("code");
		final String codeOfphone = (String) request.getSession().getAttribute("codeOfphone");
		if (ValidateUtil.isValid(code) && ValidateUtil.isValid(codeOfphone)) {
			return code.equals(user.getVerification_code()) && codeOfphone.equals(user.getTelephone());
		} else
			return false;
	}

	/**
	 * 验证登录者是否完善登录名,密码 ROLE_EMPLOYEE = "role_employee"; // 用户身份 -- 内部员工
	 * ROLE_CUSTOMER = "role_customer"; // 用户身份 -- 客户 ROLE_PROVIDER =
	 * "role_provider"; // 用户身份 -- 供应商
	 */
	@RequestMapping("/loginName/validate")
	public boolean loginNameValidate(final HttpServletRequest request) {
		SessionInfo sessionInfo = getCurrentInfo(request);
		if (null != sessionInfo) {
			String type = sessionInfo.getSessionType();
			switch (type) {
			case "role_customer":
				PmsUser user = pmsUserFacade.findUserById(sessionInfo.getReqiureId());
				if (ValidateUtil.isValid(user.getLoginName())) {
					return true;
				}
				return false;
			case "role_provider":
				PmsTeam team = pmsTeamFacade.findTeamById(sessionInfo.getReqiureId());
				if (ValidateUtil.isValid(team.getLoginName())) {
					return true;
				}
				return false;
			}
		}
		return true;
	}

	/**
	 * 跳转新闻详情
	 */
	@RequestMapping(value = "/news/article-{newId}.html")
	public ModelAndView getRecommendNews(@PathVariable("newId") final Long newId, String q,final HttpServletRequest request,
			final ModelMap model, PmsNews news) {
		
		// 当前新闻
		PmsNews pmsNews = new PmsNews();
		// 下一条新闻
		PmsNews nextNews = new PmsNews();
		// 上一条新闻
		PmsNews preNews = new PmsNews();
				
		// 获取新闻详情
		if(newId != null) {
			pmsNews = pmsNewsFacade.findNewsById(newId);
			String content = pmsNews.getContent();
			byte[] b;
			try {
				b = content.getBytes("UTF-8");
				content = new String(Base64Utils.decode(b), "UTF-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			pmsNews.setContent(content);
			
			// 推荐值
			Integer recommend = null;
			// 获取新该条新闻的上一条及下一条新闻
			if("最热资讯".equals(q)) {
				recommend = 1;
			}
			// 获取下一条新闻
			nextNews = pmsNewsFacade.findNextNew(q, Integer.parseInt(newId + ""), recommend);
			// 获取上一条新闻
			preNews = pmsNewsFacade.findPreNew(q, Integer.parseInt(newId + ""), recommend);
		} else {
			// 请求不存在的新闻
			return new ModelAndView("/error");
		}
		
		model.addAttribute("news", pmsNews);
		model.addAttribute("nextNews", nextNews);
		model.addAttribute("preNews", preNews);
		model.addAttribute("q", q);

		return new ModelAndView("/news");
	}

	/**
	 * 获取最新的供应商信息,最新代表,若存在待审核,则待审核是最新消息
	 * 
	 * @param request
	 * @return
	 */
	public PmsTeam getLatestTeam(final HttpServletRequest request) {
		final SessionInfo info = getCurrentInfo(request);
		final PmsTeam team = pmsTeamFacade.findLatestTeamById(info.getReqiureId());
		team.setPassword(null);
		return team;
	}

}
