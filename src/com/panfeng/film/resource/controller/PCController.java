package com.panfeng.film.resource.controller;

import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.panfeng.film.domain.BaseMsg;
import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.domain.SessionInfo;
import com.panfeng.film.resource.model.Indent;
import com.panfeng.film.resource.model.Item;
import com.panfeng.film.resource.model.Job;
import com.panfeng.film.resource.model.Product;
import com.panfeng.film.resource.model.ProductModule;
import com.panfeng.film.resource.model.Service;
import com.panfeng.film.resource.model.Solr;
import com.panfeng.film.resource.model.Staff;
import com.panfeng.film.resource.model.Team;
import com.panfeng.film.resource.model.User;
import com.panfeng.film.resource.view.ProductView;
import com.panfeng.film.resource.view.SolrView;
import com.panfeng.film.service.UserService;
import com.panfeng.film.util.DataUtil;
import com.panfeng.film.util.HttpUtil;
import com.panfeng.film.util.IndentUtil;
import com.panfeng.film.util.JsonUtil;
import com.panfeng.film.util.Log;
import com.panfeng.film.util.News;
import com.panfeng.film.util.ValidateUtil;

/**
 * PC端 控制器
 * 
 * @author GY
 */
@RestController
public class PCController extends BaseController {

	@Autowired
	private UserService userService;

	final Logger serLogger = LoggerFactory.getLogger("service"); // service log

	final Logger logger = LoggerFactory.getLogger("error");

	static String URL_PREFIX = null;

	public PCController() {
		if (URL_PREFIX == null || "".equals(URL_PREFIX)) {
			final InputStream is = this.getClass().getClassLoader().getResourceAsStream("jdbc.properties");
			try {
				Properties propertis = new Properties();
				propertis.load(is);
				URL_PREFIX = propertis.getProperty("urlPrefix");
			} catch (IOException e) {
				Log.error("PCController method:constructor load Properties fail ...", null);
				e.printStackTrace();
			}
		}
	}

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

	/**
	 * 加载视频列表时，获取 视频总数
	 */
	@RequestMapping(value = "/product/size", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public long maxSize(@RequestBody final ProductView view, final HttpServletRequest request) {

		long pageSize = 0l;
		final String url = URL_PREFIX + "portal/product/static/pageSize";
		String str = HttpUtil.httpPost(url, view, request);
		if (str != null && !"".equals(str)) {
			pageSize = Long.parseLong(str);
		}

		SessionInfo sessionInfo = getCurrentInfo(request);
		Log.error("Load product size,productType:" + view.getProductType() + " total number is " + pageSize,
				sessionInfo);
		return pageSize;
	}

	/**
	 * 加载 视频列表
	 * 
	 * @param view
	 *            条件
	 * @return List<Product> 产品列表
	 */
	@RequestMapping(value = "/product/listWithCondition", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public List<Product> list(@RequestBody final ProductView view, final HttpServletRequest request) {

		List<Product> list = new ArrayList<Product>();
		final String url = URL_PREFIX + "portal/product/static/listWithCondition";
		String str = HttpUtil.httpPost(url, view, request);
		if (str != null && !"".equals(str)) {
			list = JsonUtil.toList(str);
		}

		SessionInfo sessionInfo = getCurrentInfo(request);
		Log.error("List With Condition,productType:", sessionInfo);
		return list;
	}

	/**
	 * 跳转 作者页，并加载当前产品信息
	 * 
	 * @param teamId
	 * @param productId
	 * @param model
	 * @return
	 */
	@RequestMapping("/product/view/{teamId}/{productId}")
	public ModelAndView redirect(@PathVariable("teamId") final Integer teamId,
			@PathVariable("productId") final Integer productId, final ModelMap model,
			final HttpServletRequest request) {
		model.addAttribute("teamId", teamId);
		model.addAttribute("productId", productId);
		Product product = new Product();
		final String url = URL_PREFIX + "portal/product/static/information/" + productId;
		String json = HttpUtil.httpGet(url, request);
		product = JsonUtil.toBean(json, Product.class);
		model.addAttribute("product", product);

		SessionInfo sessionInfo = getCurrentInfo(request);
		Log.error("Redirect team page,teamId:" + teamId + " ,productId:" + productId, sessionInfo);
		return new ModelAndView("team", model);
	}

	@RequestMapping("/play/{teamId}_{productId}.html")
	public ModelAndView play(@PathVariable("teamId") final Integer teamId,
			@PathVariable("productId") final Integer productId, final ModelMap model,
			final HttpServletRequest request) {
		model.addAttribute("teamId", teamId);
		model.addAttribute("productId", productId);
		Product product = new Product();
		String url = URL_PREFIX + "portal/product/static/information/" + productId;
		String json = HttpUtil.httpGet(url, request);
		if (ValidateUtil.isValid(json)) {
			product = JsonUtil.toBean(json, Product.class);
			model.addAttribute("product", product);
			url = URL_PREFIX + "portal/get/productModules";
			String priceDetail = product.getPriceDetail();
			if (ValidateUtil.isValid(priceDetail)) {
				Map<String, String[]> ids = new HashMap<>();
				String[] priceDetails = priceDetail.split("\\,");
				ids.put("ids", priceDetails);
				String json2 = HttpUtil.httpPost(url, ids, request);
				if (ValidateUtil.isValid(json2)) {
					try {
						List<ProductModule> productModules = JsonUtil.fromJsonArray(json2, ProductModule.class);
						model.addAttribute("productModules", productModules);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}
		if (teamId != null) {
			url = URL_PREFIX + "portal/team/info/" + teamId;
			String json3 = HttpUtil.httpGet(url, request);
			if (ValidateUtil.isValid(json3)) {
				Team team = JsonUtil.toBean(json3, Team.class);
				model.addAttribute("teamFlag", team.getFlag());
			}
		}
		SessionInfo sessionInfo = getCurrentInfo(request);
		Log.error("Redirect team page,teamId:" + teamId + " ,productId:" + productId, sessionInfo);
		return new ModelAndView("play", model);
	}

	/**
	 * 根据 团队编号 加载 产品列表
	 * 
	 * @param teamId
	 *            产品编号
	 */
	@RequestMapping("/product/loadWithTeam/{teamId}")
	public List<Product> productInformationByTeam(@PathVariable("teamId") final Integer teamId,
			final HttpServletRequest request) {

		List<Product> list = new ArrayList<Product>();
		final String url = URL_PREFIX + "portal/product/static/team/" + teamId;
		String json = HttpUtil.httpGet(url, request);
		list = JsonUtil.toList(json);

		SessionInfo sessionInfo = getCurrentInfo(request);
		Log.error("Load products By TeamId,teamId:" + teamId + " ,product's size:" + list.size(), sessionInfo);
		return list;
	}

	/**
	 * 根据 团队编号 加载 产品列表
	 * 
	 * @param teamId
	 *            产品编号
	 */
	@RequestMapping("/product/order/loadWithTeam/{teamId}")
	public List<Product> productInformationByTeamOrder(@PathVariable("teamId") final Integer teamId,
			final HttpServletRequest request) {

		List<Product> list = new ArrayList<Product>();
		final String url = URL_PREFIX + "portal/product/static/order/team/" + teamId;
		String json = HttpUtil.httpGet(url, request);
		list = JsonUtil.toList(json);

		SessionInfo sessionInfo = getCurrentInfo(request);
		Log.error("Load products By TeamId,teamId:" + teamId + " ,product's size:" + list.size(), sessionInfo);
		return list;
	}
	
	/**
	 * 根据 团队名称 去solr中 加载 产品列表
	 * @param teamName
	 */
	@RequestMapping("/product/order/loadWithTeamName")
	public List<Solr> productInformationByTeamOrder(@RequestBody final SolrView solrView,final HttpServletRequest request) {

		List<Solr> list = new ArrayList<Solr>();
		final String url = URL_PREFIX + "/portal/product/more";
		String json = HttpUtil.httpPost(url, solrView, request);
		list = JsonUtil.toList(json);
		SessionInfo sessionInfo = getCurrentInfo(request);
		Log.info("Load products By TeamName from solr,condition:" + solrView.getCondition() + " ,product's size:" + list.size(), sessionInfo);
		return list;
	}

	/**
	 * 根据 产品编号 获取 产品信息
	 * 
	 * @param productId
	 *            产品编号
	 */
	@RequestMapping("/product/information/{productId}")
	public Product productInformation(@PathVariable("productId") final Integer productId,
			final HttpServletRequest request) {

		Product product = new Product();
		final String url = URL_PREFIX + "portal/product/static/information/" + productId;
		String json = HttpUtil.httpGet(url, request);
		product = JsonUtil.toBean(json, Product.class);

		SessionInfo sessionInfo = getCurrentInfo(request);
		Log.error("Load product information,productId:" + productId, sessionInfo);
		return product;
	}

	/**
	 * 获取产品的服务信息
	 * 
	 * @param productId
	 * @return
	 */
	@RequestMapping("/service/loadService/{productId}")
	public List<Service> loadService(@PathVariable("productId") final Integer productId,
			final HttpServletRequest request) {

		List<Service> list = new ArrayList<Service>();
		final String url = URL_PREFIX + "portal/service/static/loadService/" + productId;
		String json = HttpUtil.httpGet(url, request);
		list = JsonUtil.toList(json);

		SessionInfo sessionInfo = getCurrentInfo(request);
		Log.error("Load All Service By Product,productId:" + productId, sessionInfo);
		return list;
	}

	/**
	 * 作品页跳转
	 */
	@RequestMapping("/list.html")
	public ModelAndView listView(final ModelMap model, final HttpServletRequest request) {

		// modify by jack,2016-07-06 18:12 begin
		// -> change search type database to solr
		// return new ModelAndView("list", model);

		model.addAttribute("q", "*");

		// 该字段是为了验证是否是从list.html页面中来的
		model.addAttribute("validateP", "701511B4F6020EC61DE");

		try {
			final SolrView view = new SolrView();
			view.setCondition(URLEncoder.encode("*", "UTF-8"));
			view.setLimit(20l);
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
		} catch (Exception e) {
			e.printStackTrace();
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("PCController method:listView() encode failue,q=*", sessionInfo);
		}
		return new ModelAndView("search", model);
		// modify by jack,2016-07-06 18:13 end
	}

	/**
	 * 装载 视频类别
	 */
	@RequestMapping("/item/list")
	public List<Item> loadItem(final HttpServletRequest request) {

		List<Item> list = new ArrayList<Item>();
		final String url = URL_PREFIX + "portal/item/static/data";
		String json = HttpUtil.httpPost(url, null, request);
		list = JsonUtil.toList(json);

		SessionInfo sessionInfo = getCurrentInfo(request);
		Log.error("Load Video Item, total number is " + list.size(), sessionInfo);
		return list;
	}

	/**
	 * 用户信息设置界面
	 */
	@RequestMapping("/user/info")
	public ModelAndView userInfo(final HttpServletRequest request, final ModelMap model) {
		final SessionInfo info = getCurrentInfo(request);
		if (info != null) {
			final String url = URL_PREFIX + "portal/user/info/" + info.getReqiureId();
			String json = HttpUtil.httpGet(url, request);
			if (ValidateUtil.isValid(json)) {
				final User currentUser = JsonUtil.toBean(json, User.class);
				currentUser.setPassword(null);
				model.addAttribute("user", currentUser);
			}
			Map<Integer, String> sourecs = userService.getCustomerSource();
			if (ValidateUtil.isValid(sourecs)) {
				model.addAttribute("userSource", sourecs);
			}
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("Redirecting userInfo page,userId:" + info.getReqiureId(), sessionInfo);
		}

		return new ModelAndView("userInfo", model);
	}

	/**
	 * 跳转至 供应商 登录界面
	 */
	/*@RequestMapping("/provider/login")
	public ModelAndView providerLoginView(final ModelMap model) {

		model.addAttribute("action", "login");
		model.addAttribute("pageName", "供应商登录");

		return new ModelAndView("provider/login", model);
	}*/

	/**
	 * 跳转至 供应商 注册页面
	 */
	/*@RequestMapping("/provider/register")
	public ModelAndView providerRegisterView(final ModelMap model) {

		model.addAttribute("action", "register");
		model.addAttribute("pageName", "供应商注册");
		return new ModelAndView("provider/login", model);
	}*/

	/**
	 * 跳转至 供应商 密码找回页面
	 */
	/*@RequestMapping("/provider/recover")
	public ModelAndView providerRecover(final ModelMap model) {

		model.addAttribute("action", "recover");
		model.addAttribute("pageName", "供应商密码找回");

		return new ModelAndView("provider/login", model);
	}*/

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
		final String url = GlobalConstant.URL_PREFIX + "portal/team/static/data/" + info.getReqiureId();
		final String json = HttpUtil.httpGet(url, request);
		Team team = null;
		if (ValidateUtil.isValid(json)) {
			team = JsonUtil.toBean(json, Team.class);
		}
		if (team != null) {
			model.addAttribute("provider", team);
		}
		SessionInfo sessionInfo = getCurrentInfo(request);
		Log.error("Redirect provider portal page,teamId : " + team.getTeamId() + " ,teamName : " + team.getTeamName()
				+ "flag is " + flag, sessionInfo);
		return new ModelAndView("provider/portal", model);
	}

	// 发送预约提示信息
	@RequestMapping("/appointment/{telephone}")
	public boolean appointment(final HttpServletRequest request, @PathVariable("telephone") final String telephone) {
		if (telephone != null && !"".equals(telephone)) {
			final String url = GlobalConstant.URL_PREFIX + "portal/indent/appointment/" + telephone;
			final String json = HttpUtil.httpGet(url, request);
			boolean result = JsonUtil.toBean(json, boolean.class);
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("send Message to telephone:" + telephone, sessionInfo);
			return result;
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
		final String url = GlobalConstant.URL_PREFIX + "portal/staff/static/list";
		final String json = HttpUtil.httpGet(url, request);
		List<Staff> list = new ArrayList<Staff>();
		if (ValidateUtil.isValid(json)) {
			list = JsonUtil.fromJsonArray(json, Staff.class);
			model.addAttribute("list", list);
		}

		List<Job> jobList = new ArrayList<Job>();
		final String jobUrl = GlobalConstant.URL_PREFIX + "portal/job/static/list";
		final String str = HttpUtil.httpGet(jobUrl, request);
		if (ValidateUtil.isValid(str)) {
			jobList = JsonUtil.fromJsonArray(str, Job.class);
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
	public Job getJob(final HttpServletRequest request, @PathVariable("id") final Long id) {

		if (id != null) {
			final String url = GlobalConstant.URL_PREFIX + "portal/job/static/" + id;
			final String json = HttpUtil.httpGet(url, request);
			if (ValidateUtil.isValid(json)) {
				final Job job = JsonUtil.toBean(json, Job.class);
				return job;
			}
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
		final String url = GlobalConstant.URL_PREFIX + "portal/loginName/validate";
		final String json = HttpUtil.httpGet(url, request);
		if (null != json && !"".equals(json)) {
			return JsonUtil.toBean(json, Boolean.class);
		}
		return true;
	}
	
	/**
	 * 新闻详情页推荐
	 * 
	 */
	@RequestMapping(value = "/news/info/recommend")
	public BaseMsg newsInfoRecommend(final HttpServletRequest request) {
		BaseMsg baseMsg = new BaseMsg();
		final String url = URL_PREFIX + "portal/news/info/recommend";
		String str = HttpUtil.httpGet(url, request);
		if (str != null && !"".equals(str)) {
			List<News> list = JsonUtil.toList(str);
			baseMsg.setCode(1);
			baseMsg.setResult(list);
		}else{
			baseMsg.setErrorMsg("list is null");
		}
		SessionInfo sessionInfo = getCurrentInfo(request);
		Log.error("get news info recommend",sessionInfo);
		return baseMsg;
	}
	
	/**
	 * 跳转新闻详情
	 */
	@RequestMapping(value = "/news/article-{newId}.html")
	public ModelAndView getRecommendNews(@PathVariable("newId") final Integer newId,
			final HttpServletRequest request,final ModelMap model) {
		final String url = URL_PREFIX + "portal/news/info/"+newId;
		String str = HttpUtil.httpGet(url, request);
		if (str != null && !"".equals(str)) {
			News news = JsonUtil.toBean(str, News.class);
			model.addAttribute("news", news);
		}else{
			//请求不存在的新闻
			return new ModelAndView("/error");
		}
		SessionInfo sessionInfo = getCurrentInfo(request);
		Log.error("homepage news info",sessionInfo);
		return new ModelAndView("/news");
	}
}
