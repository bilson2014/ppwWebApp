package com.panfeng.film.resource.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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

import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.domain.SessionInfo;
import com.panfeng.film.resource.model.Indent;
import com.panfeng.film.resource.model.Item;
import com.panfeng.film.resource.model.Job;
import com.panfeng.film.resource.model.Product;
import com.panfeng.film.resource.model.Service;
import com.panfeng.film.resource.model.Staff;
import com.panfeng.film.resource.model.Team;
import com.panfeng.film.resource.model.User;
import com.panfeng.film.resource.view.ProductView;
import com.panfeng.film.service.SmsService;
import com.panfeng.film.util.DataUtil;
import com.panfeng.film.util.HttpUtil;
import com.panfeng.film.util.IndentUtil;
import com.panfeng.film.util.JsonUtil;
import com.panfeng.film.util.ValidateUtil;

/**
 * PC端 控制器
 * 
 * @author GY
 */
@RestController
public class PCController extends BaseController {

	@Autowired
	private SmsService smsService = null;

	final Logger serLogger = LoggerFactory.getLogger("service"); // service log

	final Logger logger = LoggerFactory.getLogger("error");

	static String URL_PREFIX = null;

	static private String TELEPHONE = null;

	//private static String PROVIDER_SESSION = "provider_session";

	public PCController() {
		if (URL_PREFIX == null || "".equals(URL_PREFIX)) {
			final InputStream is = this.getClass().getClassLoader()
					.getResourceAsStream("jdbc.properties");
			try {
				Properties propertis = new Properties();
				propertis.load(is);
				URL_PREFIX = propertis.getProperty("urlPrefix");
				TELEPHONE = propertis.getProperty("service_tel");
			} catch (IOException e) {
				logger.error("PCController method:constructor load Properties fail ...");
				e.printStackTrace();
			}
		}
	}

	/**
	 * 获取本地ip地址+端口号
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
		serLogger.info("PCController method:getAddress() Get address success:"
				+ localUrl.toString());
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

	// 跳转 订单页
	@RequestMapping("/order")
	public ModelAndView orderView(final HttpServletRequest request,
			final HttpServletResponse response, final ModelMap model)
			throws UnsupportedEncodingException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");

		final String json = request.getParameter("json");
		final Indent indent = new Indent().fromString(json, Indent.class);
		final String productName = URLDecoder.decode(indent.getProduct_name(),
				"UTF-8");
		indent.setProduct_name(productName);

		final User user = (User) request.getSession().getAttribute("username");
		// modify by Jack,2016-06-21 12:06 begin
		// -> to promote security for order
		// change hidden input to encrypt token
		/*model.addAttribute("teamId", indent.getTeamId());
		model.addAttribute("productId", indent.getProductId());
		model.addAttribute("serviceId", indent.getServiceId());
		model.addAttribute("indentPrice", indent.getIndentPrice());
		model.addAttribute("second", indent.getSecond());
		model.addAttribute("product_name", productName);*/
		model.addAttribute("telephone", user != null ? user.getTelephone() : "");
		
		try {
			final String token = IndentUtil.generateOrderToken(request, indent);
			model.addAttribute("token", token);
		} catch (Exception e) {
			logger.error("method PCController orderView ,order page has error,bacase generate order use AES Decrypt token error ...");
			e.printStackTrace();
		}
		// modify by Jack,2016-06-21 12:10 end
		serLogger
				.info("PCController method:orderView() Redirect order page,product_id:"
						+ indent.getProductId()
						+ ",product_name:"
						+ indent.getIndentName());
		return new ModelAndView("order", model);
	}

	// 我要拍片 跳转
	@RequestMapping("/direct/order")
	public ModelAndView patView(final HttpServletRequest request,
			final ModelMap model) {
		final User user = (User) request.getSession().getAttribute("username");
		// modify by jack, 2016-06-21 12:00 begin
		// -> to promote security for order
		// change hidden input to encrypt token
		/*model.addAttribute("teamId", -1);
		model.addAttribute("productId", -1);
		model.addAttribute("serviceId", -1);
		model.addAttribute("indentPrice", 0);
		model.addAttribute("second", 0);*/
		model.addAttribute("telephone", user != null ? user.getTelephone() : "");
		
		final Indent indent = new Indent();
		indent.setTeamId(-1l);
		indent.setProductId(-1l);
		indent.setServiceId(-1l);
		try {
			final String token = IndentUtil.generateOrderToken(request,indent);
			model.addAttribute("token", token);
		} catch (Exception e) {
			logger.error("method PCController patView ,direct order has error,bacase generate order use AES Decrypt token error ...");
			e.printStackTrace();
		}
		// modify by Jack,2016-06-21 12:05 end
		

		return new ModelAndView("order", model);
	}

	/**
	 * 分销人下单
	 * @param uniqueId
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping("/salesman/order/{uniqueId}")
	public ModelAndView order(@PathVariable("uniqueId") final String uniqueId,final HttpServletRequest request,final ModelMap model){
		
		final User user = (User) request.getSession().getAttribute("username");
		// modify by Jack,2016-06-21 12:28 begin
		// to promote security for order
		// change hidden input to encrypt token
		/*model.addAttribute("teamId", -1);
		model.addAttribute("productId", -1);
		model.addAttribute("serviceId", -1);
		model.addAttribute("indentPrice", 0);
		model.addAttribute("second", 0);
		model.addAttribute("uniqueId", uniqueId);*/
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
			logger.error("method PCController order ,salesman order page has error,bacase generate order use AES Decrypt token error ...");
			e.printStackTrace();
		}
		// modify by Jack,2016-06-21 12:35 end
		
		return new ModelAndView("order", model);
	}

	/**
	 * 活动页面 下单
	 */
	@RequestMapping("/order/{teamId}/{productId}/{serviceId}/{indentPrice}/{productName}")
	public ModelAndView activeOrderView(final ModelMap model,
			final HttpServletRequest request,
			@PathVariable("teamId") final Long teamId,
			@PathVariable("productId") final Long productId,
			@PathVariable("serviceId") final Long serviceId,
			@PathVariable("indentPrice") final Double indentPrice,
			@PathVariable("productName") final String productName) {

		final User user = (User) request.getSession().getAttribute("username");
		model.addAttribute("teamId", teamId);
		model.addAttribute("productId", productId);
		model.addAttribute("serviceId", serviceId);
		model.addAttribute("indentPrice", indentPrice);
		model.addAttribute("second", 0);
		try {
			model.addAttribute("product_name",
					URLDecoder.decode(productName, "UTF-8"));
		} catch (UnsupportedEncodingException e) {
			logger.error("PCContronller method:activeOrderView() productName URLDecoder error ...");
			e.printStackTrace();
		}
		model.addAttribute("telephone", user != null ? user.getTelephone() : "");

		serLogger.info("PCController Redirect Activity order page,product_id:" + productId);
		return new ModelAndView("order", model);
	}

	/**
	 * 加载视频列表时，获取 视频总数
	 */
	@RequestMapping(value = "/product/size", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public long maxSize(@RequestBody final ProductView view,
			final HttpServletRequest request) {

		long pageSize = 0l;
		final String url = URL_PREFIX + "portal/product/static/pageSize";
		String str = HttpUtil.httpPost(url, view,request);
		if (str != null && !"".equals(str)) {
			pageSize = Long.parseLong(str);
		}

		serLogger.info("Load product size,productType:" + view.getProductType()
				+ " total number is " + pageSize);
		return pageSize;
	}

	/**
	 * 加载 视频列表
	 * 
	 * @param view 条件
	 * @return List<Product> 产品列表
	 */
	@RequestMapping(value = "/product/listWithCondition", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public List<Product> list(@RequestBody final ProductView view,
			final HttpServletRequest request) {

		List<Product> list = new ArrayList<Product>();
		final String url = URL_PREFIX
				+ "portal/product/static/listWithCondition";
		String str = HttpUtil.httpPost(url, view,request);
		if (str != null && !"".equals(str)) {
			list = JsonUtil.toList(str);
		}

		serLogger.info("List With Condition,productType:"
				+ view.getProductType());
		return list;
	}

	/**
	 * 加载 主页 视频列表
	 * 
	 * @param view 条件
	 * @return List<Product> 产品列表
	 */
	@RequestMapping(value = "/product/loadProduct", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public List<Product> productList(final HttpServletRequest request) {
			
		List<Product> list = new ArrayList<Product>();
		final String url = URL_PREFIX + "portal/product/static/pc/list";
		String str = HttpUtil.httpPost(url, null,request);
		if (str != null && !"".equals(str)) {
			list = JsonUtil.toList(str);
		}

		serLogger.info("Load portal page products,size:" + list.size());
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
			@PathVariable("productId") final Integer productId,
			final ModelMap model,
			final HttpServletRequest request) {
		model.addAttribute("teamId", teamId);
		model.addAttribute("productId", productId);
		Product product = new Product();
		final String url = URL_PREFIX + "portal/product/static/information/"
				+ productId;
		String json = HttpUtil.httpGet(url,request);
		product = JsonUtil.toBean(json, Product.class);
		model.addAttribute("product", product);

		serLogger.info("Redirect team page,teamId:" + teamId + " ,productId:"
				+ productId);
		return new ModelAndView("team", model);
	}
	
	@RequestMapping("/play/{teamId}_{productId}.html")
	public ModelAndView play(@PathVariable("teamId") final Integer teamId,
			@PathVariable("productId") final Integer productId,
			final ModelMap model,
			final HttpServletRequest request) {
		model.addAttribute("teamId", teamId);
		model.addAttribute("productId", productId);
		Product product = new Product();
		final String url = URL_PREFIX + "portal/product/static/information/"
				+ productId;
		String json = HttpUtil.httpGet(url,request);
		product = JsonUtil.toBean(json, Product.class);
		model.addAttribute("product", product);

		serLogger.info("Redirect team page,teamId:" + teamId + " ,productId:"
				+ productId);
		return new ModelAndView("play", model);
	}

	/**
	 * 根据 团队编号 加载 产品列表
	 * 
	 * @param teamId 产品编号
	 */
	@RequestMapping("/product/loadWithTeam/{teamId}")
	public List<Product> productInformationByTeam(@PathVariable("teamId") final Integer teamId,
			final HttpServletRequest request) {

		List<Product> list = new ArrayList<Product>();
		final String url = URL_PREFIX + "portal/product/static/team/" + teamId;
		String json = HttpUtil.httpGet(url,request);
		list = JsonUtil.toList(json);

		serLogger.info("Load products By TeamId,teamId:" + teamId
				+ " ,product's size:" + list.size());
		return list;
	}

	/**
	 * 根据 产品编号 获取 产品信息
	 * 
	 * @param productId 产品编号
	 */
	@RequestMapping("/product/information/{productId}")
	public Product productInformation(@PathVariable("productId") final Integer productId,
									  final HttpServletRequest request) {

		Product product = new Product();
		final String url = URL_PREFIX + "portal/product/static/information/"
				+ productId;
		String json = HttpUtil.httpGet(url,request);
		product = JsonUtil.toBean(json, Product.class);

		serLogger.info("Load product information,productId:" + productId);
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
		final String url = URL_PREFIX + "portal/service/static/loadService/"
				+ productId;
		String json = HttpUtil.httpGet(url,request);
		list = JsonUtil.toList(json);

		serLogger.info("Load All Service By Product,productId:" + productId);
		return list;
	}
	
	/**
	 * 作品页跳转
	 */
	@RequestMapping("/list.html")
	public ModelAndView listView(final ModelMap model) {

		return new ModelAndView("list", model);
	}

	/**
	 * 装载 视频类别
	 */
	@RequestMapping("/item/list")
	public List<Item> loadItem(final HttpServletRequest request) {

		List<Item> list = new ArrayList<Item>();
		final String url = URL_PREFIX + "portal/item/static/data";
		String json = HttpUtil.httpPost(url, null,request);
		list = JsonUtil.toList(json);

		serLogger.info("Load Video Item, total number is " + list.size());
		return list;
	}

	/**
	 * 用户信息设置界面
	 */
	@RequestMapping("/user/info")
	public ModelAndView userInfo(final HttpServletRequest request,
			final ModelMap model) {
		final SessionInfo info = getCurrentInfo(request);
		if (info != null) {
			final String url = URL_PREFIX + "portal/user/info/" + info.getReqiureId();
			String json = HttpUtil.httpGet(url,request);
			if (json != null && !"".equals(json)) {
				final User currentUser = JsonUtil.toBean(json, User.class);
				currentUser.setPassword(null);
				model.addAttribute("user", currentUser);
			}
			
			serLogger.info("Redirecting userInfo page,userId:" + info.getReqiureId());
		}

		return new ModelAndView("userInfo", model);
	}

	/**
	 * 跳转至 供应商 登录界面
	 */
	@RequestMapping("/provider/login")
	public ModelAndView providerLoginView(final ModelMap model) {

		model.addAttribute("action", "login");
		model.addAttribute("pageName", "供应商登录");

		return new ModelAndView("provider/login", model);
	}

	/**
	 * 跳转至 供应商 注册页面
	 */
	@RequestMapping("/provider/register")
	public ModelAndView providerRegisterView(final ModelMap model) {

		model.addAttribute("action", "register");
		model.addAttribute("pageName", "供应商注册");
		return new ModelAndView("provider/login", model);
	}

	/**
	 * 跳转至 供应商 密码找回页面
	 */
	@RequestMapping("/provider/recover")
	public ModelAndView providerRecover(final ModelMap model) {

		model.addAttribute("action", "recover");
		model.addAttribute("pageName", "供应商密码找回");

		return new ModelAndView("provider/login", model);
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
	public ModelAndView providerPortalView(final HttpServletRequest request,
			final ModelMap model) {
		Integer flag = 4;
		final SessionInfo info = getCurrentInfo(request);
		final String url = GlobalConstant.URL_PREFIX + "portal/team/static/data/" + info.getReqiureId();
		final String json = HttpUtil.httpGet(url, request);
		Team team  = null;
		if(ValidateUtil.isValid(json)){
			team = JsonUtil.toBean(json, Team.class);
		}
		if (team != null) {
			flag = team.getFlag();
		}
		model.addAttribute("flag", flag);

		serLogger.info("Redirect provider portal page,teamId : "
				+ team.getTeamId() + " ,teamName : " + team.getTeamName()
				+ "flag is " + flag);
		return new ModelAndView("provider/portal", model);
	}

	// 发送预约提示信息
	@RequestMapping("/appointment/{telephone}")
	public boolean appointment(final HttpServletRequest request,
			@PathVariable("telephone") final String telephone) {

		if (telephone != null && !"".equals(telephone)) {
			// 当前系统时间
			DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String currentTime = format.format(new Date());

			final StringBuffer info = new StringBuffer();
			info.append("顾客预约提示信息：手机号码: " + telephone);
			info.append(" 的客户,");
			info.append("于" + currentTime);
			info.append("请求致电,");
			info.append("请您及时处理！");
			// 发送短信
			final boolean result = smsService.smsSend(TELEPHONE,
					info.toString());

			serLogger.info("Appointment Message :" + info.toString()
					+ " ,telephone:" + telephone);
			return result;
		}
		return false;
	}
	
	
	@RequestMapping(value = "/product/sessionId",method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
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
	public ModelAndView introduceView(final HttpServletRequest request,final ModelMap model) throws Exception{
		
		// 查询所有人信息
		final String url = GlobalConstant.URL_PREFIX + "portal/staff/static/list";
		final String json = HttpUtil.httpGet(url, request);
		List<Staff> list = new ArrayList<Staff>();
		if(ValidateUtil.isValid(json)){
			list = JsonUtil.fromJsonArray(json, Staff.class);
			if(ValidateUtil.isValid(list)){
				for (final Staff staff : list) {
					final String path = staff.getStaffImageUrl();
					if(ValidateUtil.isValid(path)){
						staff.setStaffImageUrl(path.split(GlobalConstant.STAFF_IMAGE_PERIX)[1]);
					}
				}
			}
			model.addAttribute("list", list);
		}
		
		List<Job> jobList = new ArrayList<Job>();
		final String jobUrl = GlobalConstant.URL_PREFIX + "portal/job/static/list";
		final String str = HttpUtil.httpGet(jobUrl, request);
		if(ValidateUtil.isValid(str)){
			jobList = JsonUtil.fromJsonArray(str, Job.class);
			model.addAttribute("jobList", jobList);
		}
		return new ModelAndView("/member");
	}
	
	
	@RequestMapping("/introduce.html")
	public ModelAndView introduceView(final String model,final ModelMap map,final String direct) {
		
		if(ValidateUtil.isValid(model)){
			
			map.addAttribute("page",model);
		}else {
			map.addAttribute("page","about-us");
		}
		
		if(ValidateUtil.isValid(direct)){
			map.addAttribute("direct", direct);
		}
		return new ModelAndView("/introduce");
	}
	
	@RequestMapping("/job/info/{id}")
	public Job getJob(final HttpServletRequest request,@PathVariable("id") final Long id){
		
		if(id != null){
			final String url = GlobalConstant.URL_PREFIX + "portal/job/static/" + id;
			final String json = HttpUtil.httpGet(url, request);
			if(ValidateUtil.isValid(json)){
				final Job job = JsonUtil.toBean(json, Job.class);
				return job;
			}
		}
		
		return null;
	}

}
