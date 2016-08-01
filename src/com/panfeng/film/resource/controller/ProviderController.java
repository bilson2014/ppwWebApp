package com.panfeng.film.resource.controller;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.websocket.server.PathParam;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.panfeng.film.domain.BaseMsg;
import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.domain.SessionInfo;
import com.panfeng.film.resource.model.City;
import com.panfeng.film.resource.model.Info;
import com.panfeng.film.resource.model.Item;
import com.panfeng.film.resource.model.Product;
import com.panfeng.film.resource.model.Province;
import com.panfeng.film.resource.model.Team;
import com.panfeng.film.resource.model.Wechat;
import com.panfeng.film.security.AESUtil;
import com.panfeng.film.service.KindeditorService;
import com.panfeng.film.service.ProviderThirdLogin;
import com.panfeng.film.service.SessionInfoService;
import com.panfeng.film.util.Constants.loginType;
import com.panfeng.film.util.DataUtil;
import com.panfeng.film.util.FileUtils;
import com.panfeng.film.util.HttpUtil;
import com.panfeng.film.util.JsonUtil;
import com.panfeng.film.util.ValidateUtil;
import com.panfeng.film.util.WechatUtils;

/**
 * 供应商模块 控制器
 * 
 * @author Jack
 *
 */
@RestController
@RequestMapping("/provider")
public class ProviderController extends BaseController {

	final Logger logger = LoggerFactory.getLogger("error");

	final Logger serLogger = LoggerFactory.getLogger("service");

	private static String URL_PREFIX = null;

	private static String IMAGE_MAX_SIZE = null;

	private static String PRODUCT_IMAGE_MAX_SIZE = null;

	private static String VIDEO_MAX_SIZE = null;

	private static String ALLOW_IMAGE_TYPE = null;

	private static String ALLOW_VIDEO_TYPE = null;

	private static String FILE_PROFIX = null; // 文件路径前缀

	private static String TEAM_IMAGE_PATH = null; // 团队logo

	private static String PRODUCT_VIDEO_PATH = null; // video文件路径

	private static String PRODUCT_IMAGE_PATH = null; // 产品图片路径

	private static String UNIQUE_KEY = "0102030405060708"; // AES 加密key

	@Autowired
	private ProviderThirdLogin providerThirdLogin;

	@Autowired
	private KindeditorService kindService;

	@Autowired
	private SessionInfoService sessionService = null;

	static String UNIQUE = "unique_s"; // 三方登录凭证
	static String LINKMAN = "username_s";// 用户名
	static String ORIGINAL = "original";// 源对象
	static String TYPE = "type_s";// 当前处理任务类型，（注册）
	static String LTYPE = "ltype_s"; // 三方登录类型

	static String REGISTER_KET = "register";

	public ProviderController() {
		if (URL_PREFIX == null || "".equals(URL_PREFIX)) {
			final InputStream is = this.getClass().getClassLoader().getResourceAsStream("jdbc.properties");
			try {
				Properties propertis = new Properties();
				propertis.load(is);
				URL_PREFIX = propertis.getProperty("urlPrefix");
				IMAGE_MAX_SIZE = propertis.getProperty("imageMaxSize");
				ALLOW_IMAGE_TYPE = propertis.getProperty("imageType");
				PRODUCT_IMAGE_MAX_SIZE = propertis.getProperty("productMaxSize");
				VIDEO_MAX_SIZE = propertis.getProperty("videoMaxSize");
				ALLOW_VIDEO_TYPE = propertis.getProperty("videoType");
				FILE_PROFIX = propertis.getProperty("file.prefix");
				TEAM_IMAGE_PATH = propertis.getProperty("upload.server.team.image");
				PRODUCT_VIDEO_PATH = propertis.getProperty("upload.server.product.video");
				PRODUCT_IMAGE_PATH = propertis.getProperty("upload.server.product.image");
			} catch (IOException e) {
				logger.error("ProviderController method:constructor load Properties fail ...");
				e.printStackTrace();
			}
		}
	}

	/**
	 * 跳转至 公司基本信息页
	 * 
	 * @throws Exception
	 */
	@RequestMapping("/company-info")
	public ModelAndView infoView(final HttpServletRequest request, final ModelMap model) throws Exception {

		final Team team = getCurrentTeam(request);
		model.addAttribute("provider", team);
		// 第一次填充省
		String url = GlobalConstant.URL_PREFIX + "portal/get/provinces";
		String str = HttpUtil.httpGet(url, request);
		if (str != null && !"".equals(str)) {
			List<Province> provinces = JsonUtil.fromJsonArray(str, Province.class);
			model.addAttribute("provinces", provinces);
			if (ValidateUtil.isValid(team.getTeamCity())) {
				// 填充第一次市区
				url = GlobalConstant.URL_PREFIX + "portal/get/citys/" + team.getTeamProvince();
				String str1 = HttpUtil.httpGet(url, request);
				if (str1 != null && !"".equals(str1)) {
					List<City> citys = JsonUtil.toList(str1);
					model.addAttribute("citys", citys);
				}
			} else {
				// 填充默认市！
				if (ValidateUtil.isValid(provinces)) {
					url = GlobalConstant.URL_PREFIX + "portal/get/citys/" + provinces.get(0).getProvinceID();
					String str1 = HttpUtil.httpGet(url, request);
					if (str1 != null && !"".equals(str1)) {
						List<City> citys = JsonUtil.toList(str1);
						model.addAttribute("citys", citys);
					}
				}
			}
		}

		return new ModelAndView("provider/info", model);
	}

	/**
	 * 跳转至 视频列表页
	 */
	@RequestMapping("/video-list")
	public ModelAndView videoView(final HttpServletRequest request, final ModelMap model) {

		final Team team = getCurrentTeam(request);
		final String url = URL_PREFIX + "portal/product/static/data/loadProducts/" + team.getTeamId();
		final String json = HttpUtil.httpGet(url, request);
		List<Product> list = new ArrayList<Product>();
		List<Product> lists = new ArrayList<Product>();
		if (json != null && !"".equals(json)) {
			try {
				list = JsonUtil.fromJsonArray(json, Product.class);
				for (final Product product : list) {
					String imagePath = product.getPicLDUrl();
					if (imagePath != null && !"".equals(imagePath)) {
						imagePath = imagePath.split(PRODUCT_IMAGE_PATH)[1];
						product.setPicLDUrl(imagePath);
					}
					lists.add(product);
				}
			} catch (Exception e) {
				logger.error("Json Parse Product error ...");
				e.printStackTrace();
			}
		}
		model.addAttribute("list", lists);
		model.addAttribute("cKey", team.getTeamId());
		model.addAttribute("cType", team.getFlag());
		return new ModelAndView("provider/video-list", model);
	}

	/**
	 * 跳转至 审核状态页
	 */
	@RequestMapping("/company-status")
	public ModelAndView statusView(final HttpServletRequest request, final ModelMap model) {

		// final Team team = (Team)
		// request.getSession().getAttribute(PROVIDER_SESSION);
		final Team team = getCurrentTeam(request);
		model.addAttribute("status", team.getFlag());
		model.addAttribute("cKey", team.getTeamId());
		model.addAttribute("recomment", team.getRecommendation());
		return new ModelAndView("provider/status", model);
	}

	/**
	 * 登录
	 * 
	 * @param original
	 *            登陆信息
	 * @return 登陆:true,失败:false
	 */
	@RequestMapping("/doLogin")
	public BaseMsg login(@RequestBody final Team original, final HttpServletRequest request) {
		if (original == null) {
			return new BaseMsg(BaseMsg.ERROR, "登陆错误", false);
		}
		if (original.getLoginType().equals(loginType.phone.getKey())) {// 手机号登录
			final String code = (String) request.getSession().getAttribute("code");
			final String codeOfphone = (String) request.getSession().getAttribute("codeOfphone");
			// 是否是测试程序
			boolean isTest = com.panfeng.film.util.Constants.AUTO_TEST.equals("yes") ? true : false;
			if (isTest || original.getVerification_code() != null && code.equals(original.getVerification_code())) {
				if (isTest || (null != codeOfphone && codeOfphone.equals(original.getPhoneNumber()))) {
					final String url = URL_PREFIX + "portal/team/static/data/doLogin";
					String json = HttpUtil.httpPost(url, original, request);
					if (json != null && !"".equals(json)) {
						boolean ret = JsonUtil.toBean(json, Boolean.class);
						if (ret) {
							return new BaseMsg(BaseMsg.NORMAL, "", true);
						} else {
							return new BaseMsg(BaseMsg.ERROR, "用户名或密码错误!", false);
						}
					}
				} else {
					serLogger.info("手机号错误");
					return new BaseMsg(BaseMsg.ERROR, "手机号错误", false);
				}
			} else {
				serLogger.info("Provider Verification_code timeout ...");
				return new BaseMsg(BaseMsg.ERROR, "短信验证码已过期", false);
			}
		} else {// 用户名登录
			final String pwd = original.getPassword();
			final String loginName = original.getLoginName();
			if (ValidateUtil.isValid(loginName) && ValidateUtil.isValid(pwd)) {
				try {// 解密
					final String password = AESUtil.Decrypt(pwd, GlobalConstant.UNIQUE_KEY);
					original.setPassword(DataUtil.md5(password));
					final String url = GlobalConstant.URL_PREFIX + "portal/team/static/data/doLogin";
					final String json = HttpUtil.httpPost(url, original, request);
					if (ValidateUtil.isValid(json)) {
						final boolean ret = JsonUtil.toBean(json, Boolean.class);
						if (ret) {
							return new BaseMsg(BaseMsg.NORMAL, "", true);
						} else {
							return new BaseMsg(BaseMsg.ERROR, "用户名或密码错误!", false);
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return new BaseMsg(BaseMsg.ERROR, "登陆错误", false);
	}

	@RequestMapping("/thirdLogin")
	public ModelAndView thirdLogin(String json, final HttpServletRequest request, ModelMap modelMap) {
		if (!ValidateUtil.isValid(json))
			return new ModelAndView("/provider/login");
		Team original = JsonUtil.toBean(json, Team.class);
		// TODO:
		boolean isBind = providerThirdLogin.login(original, request);
		if (isBind) {
			return new ModelAndView("/provider/portal");
		} else {
			HttpSession httpSession = request.getSession();
			String unique = "";
			switch (original.getThirdLoginType()) {
			case Team.LTYPE_QQ:
				unique = original.getQqUnique();
				break;
			case Team.LTYPE_WECHAT:
				unique = original.getWechatUnique();
				break;
			case Team.LTYPE_WEIBO:
				unique = original.getWbUnique();
				break;
			}
			httpSession.setAttribute(UNIQUE, unique);
			httpSession.setAttribute(LINKMAN, original.getLinkman());
			httpSession.setAttribute(LTYPE, original.getThirdLoginType());
			modelMap.put("linkMan", original.getLinkman());
			modelMap.put("LType", original.getThirdLoginType());
			return new ModelAndView("/provider/threeLogin", modelMap);
		}
	}

	/**
	 * 供应商系统登出操作
	 * 
	 * @return 供应商系统登录页面
	 */
	@RequestMapping("/loginout")
	public ModelAndView loginOut(final HttpServletRequest request) {

		sessionService.removeSession(request);
		return new ModelAndView("redirect:/provider/login");
	}

	/**
	 * 检测登录名是否可用
	 * 
	 * @param phoneNumber
	 *            注册的手机号码
	 * @return 标识可以注册，返回true;标识已注册，返回false
	 */
	@RequestMapping("/checkExisting")
	public boolean isExisting(@RequestBody final Team team, final HttpServletRequest request) {

		try {
			// 转码
			if (team.getLoginName() != null && !"".equals(team.getLoginName())) {
				team.setLoginName(URLEncoder.encode(team.getLoginName(), "UTF-8"));
			}
		} catch (UnsupportedEncodingException e) {

			logger.error("Encoder LoginName Error On isExisting Method ...");
			e.printStackTrace();
		}
		final String url = URL_PREFIX + "portal/team/static/checkIsExist";
		final String json = HttpUtil.httpPost(url, team, request);
		final boolean flag = JsonUtil.toBean(json, Boolean.class);
		return flag;
	}

	/**
	 * 注册
	 * 
	 * @param original
	 *            供应商信息
	 * @return 成功返回 true, 失败返回 false
	 */
	@RequestMapping("/info/register")
	public Info register(@RequestBody final Team original, final HttpServletRequest request) {
		// TODO：
		final String code = (String) request.getSession().getAttribute("code");
		final String codeOfphone = (String) request.getSession().getAttribute("codeOfphone");
		// 是否是测试程序
		boolean isTest = com.panfeng.film.util.Constants.AUTO_TEST.equals("yes") ? true : false;
		Info info = new Info(); // 信息载体
		// 判断验证码
		if (isTest || (!"".equals(code) && code != null)) {
			if (isTest || code.equals(original.getVerification_code())) {
				if (isTest || (null != codeOfphone && codeOfphone.equals(original.getPhoneNumber()))) {
					if (original != null && original.getPassword() != null && !"".equals(original.getPassword())) {
						HttpSession httpSession = request.getSession();
						Gson gson = new Gson();
						String json = gson.toJson(original);
						httpSession.setAttribute(ORIGINAL, json); // session
																	// 内不能存储对象，存储json字符串
						httpSession.setAttribute(TYPE, REGISTER_KET);
						info.setKey(true);
						return info;
					}
				} else {
					// 手机号错误
					info.setKey(false);
					info.setValue("手机号不正确!");
				}
			} else {
				// 验证码过期
				info.setKey(false);
				info.setValue("验证码输入错误!");
			}
		} else {
			// session 过期
			info.setKey(false);
			info.setValue("请重新获取验证码!");
		}

		return info;
	}

	/**
	 * 更改密码
	 * 
	 * @param original
	 *            供应商信息
	 * @return 成功返回 true, 失败返回 false
	 */
	@RequestMapping("/info/recover")
	public Info recoverPassword(final HttpServletRequest request, @RequestBody final Team original) {

		final String code = (String) request.getSession().getAttribute("code");
		Info info = new Info(); // 信息载体
		// 判断验证码
		if (!"".equals(code) && code != null) {
			if (code.equals(original.getVerification_code())) {
				if (original != null && original.getPassword() != null && !"".equals(original.getPassword())) {
					try {
						// AES 解密
						final String password = AESUtil.Decrypt(original.getPassword(), UNIQUE_KEY);

						// MD5 加密
						original.setPassword(DataUtil.md5(password));

						// 转码
						original.setPassword(URLEncoder.encode(original.getPassword(), "UTF-8"));

						// 连接远程服务器，传输数据
						final String url = URL_PREFIX + "portal/team/static/recoverPassword";
						final String json = HttpUtil.httpPost(url, original, request);
						if (json != null && !"".equals(json)) {
							final boolean flag = JsonUtil.toBean(json, Boolean.class);
							info.setKey(flag);
							return info;
						}
					} catch (Exception e) {
						logger.error(
								"ProviderController method:recoverPassword() Provider Password Decrypt Error On Provider Register ...");
						e.printStackTrace();
					}
				}
				info.setKey(false);
				return info;
			} else {
				info.setKey(false);
				info.setValue("短信验证码不正确");
				return info;
			}
		} else {
			info.setKey(false);
			info.setValue("短信验证码错误");
			return info;
		}

	}

	/**
	 * 更新供应商基本信息
	 * 
	 * @param team
	 *            团队信息(供应商名称、简介、地址、邮箱等)
	 * @return 成功返回 true, 失败返回 false
	 */
	@RequestMapping("/update/teamInfomation")
	public boolean updateTeamInformation(final HttpServletRequest request, @RequestBody final Team team) {

		if (team != null) {
			try {
				return updateInfo(team, request);
			} catch (UnsupportedEncodingException e) {
				logger.error(
						"ProviderController method:updateTeamInformation() Privder infomartion encode error On updateTeamInformation Method ...");
				e.printStackTrace();
			}
		}
		return false;
	}

	/**
	 * 供应商注册引导页信息保存
	 * 
	 * @param team
	 *            团队信息(供应商名称、简介、地址、邮箱等)
	 * @return 成功返回 true, 失败返回 false
	 */
	@RequestMapping("/update/leaderInfomation")
	public boolean leadUserupdateInformation(final HttpServletRequest request, @RequestBody final Team team) {
		if (team != null) {
			try {
				final boolean ret = updateInfo_register(team, request);
				return ret;
			} catch (UnsupportedEncodingException e) {
				logger.error(
						"ProviderController method:updateTeamInformation() Privder infomartion encode error On updateTeamInformation Method ...");
				e.printStackTrace();
			}
		}
		return false;
	}

	/**
	 * 检验密码是否正确
	 * 
	 * @param original
	 *            包含(登录名和密码)
	 */
	@RequestMapping("/validateLoginStatus")
	public Info validateLogin(@RequestBody final Team original, final HttpServletRequest request) {

		Info info = new Info();
		if (original != null && original.getPassword() != null && !"".equals(original.getPassword())
				&& original.getLoginName() != null && !"".equals(original.getLoginName())) {
			try {
				// AES 解密
				final String password = AESUtil.Decrypt(original.getPassword(), UNIQUE_KEY);

				// MD5 加密
				original.setPassword(DataUtil.md5(password));

				// 转码
				original.setLoginName(URLEncoder.encode(original.getLoginName(), "UTF-8"));
				original.setPassword(URLEncoder.encode(original.getPassword(), "UTF-8"));

				// 登录远程服务器进行比对
				final String url = URL_PREFIX + "portal/team/static/data/checkPwd";
				String json = HttpUtil.httpPost(url, original, request);
				if (json != null && !"".equals(json)) {
					final boolean ret = JsonUtil.toBean(json, Boolean.class);
					info.setKey(ret);
					if (!ret)
						info.setValue("密码输入错误!");
					return info;
				} else {
					info.setKey(false);
					info.setValue("密码输入错误!");
					return info;
				}
			} catch (Exception e) {
				logger.error(
						"ProviderController method:validateLogin() Provider Password Decrypt Error On Provider CheckLoginStatus ...");
				e.printStackTrace();
			}

		} else {
			serLogger.info("Provider Is Null On Provider CheckLoginStatus ...");
			info.setKey(false);
			info.setValue("密码不能为空!");
			return info;
		}
		info.setKey(false);
		return info;
	}

	/**
	 * 供应商信息界面-修改密码
	 * 
	 * @param original
	 *            包含(登录名和密码)
	 */
	@RequestMapping("/recover/password")
	public BaseMsg updatePasswordByLoginName(@RequestBody final Team team, final HttpServletRequest request) {
		BaseMsg msg = new BaseMsg(0, "信息修改失败，请刷新后再试!");
		final String code = (String) request.getSession().getAttribute("code");
		if (!"".equals(code) && code != null) {
			if (code.equals(team.getVerification_code())) {
				if (team != null && team.getPassword() != null && !"".equals(team.getPassword())
						&& team.getLoginName() != null && !"".equals(team.getLoginName())) {
					try {
						// AES 解密
						final String password = AESUtil.Decrypt(team.getPassword(), UNIQUE_KEY);

						// MD5 加密
						team.setPassword(DataUtil.md5(password));

						// 转码
						team.setPassword(URLEncoder.encode(team.getPassword(), "UTF-8"));
						team.setLoginName(URLEncoder.encode(team.getLoginName(), "UTF-8"));

						// 连接远程服务器，传输数据
						final String url = URL_PREFIX + "portal/team/static/updatePasswordByLoginName";
						final String json = HttpUtil.httpPost(url, team, request);
						if (ValidateUtil.isValid(json)) {
							final boolean flag = JsonUtil.toBean(json, Boolean.class);
							if (flag) {
								msg.setCode(1);
								msg.setResult("修改成功");
							}
						}
					} catch (Exception e) {
						logger.error(
								"ProviderController method:updatePasswordByLoginName() Provider Password Decrypt Error On Provider Register ...");
						e.printStackTrace();
					}
				}
			} else {
				msg.setResult("验证码错误");
			}
		}
		return msg;
	}

	/**
	 * 上传 供应商 logo 地址
	 * 
	 * @param file
	 *            上传的图片文件
	 * @param team
	 *            团队信息
	 * @return 成功返回 true, 失败返回 false
	 */
	@RequestMapping("/update/teamPhotoPath")
	public String updateTeamPhotoPath(final HttpServletRequest request, final HttpServletResponse response,
			@PathParam("file") final MultipartFile file, final Team team) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		// 如果文件为空，则不更新图片路径;反之亦然
		if (!file.isEmpty()) {

			final long fileSize = file.getSize(); // 上传文件大小
			final long maxSize = Long.parseLong(IMAGE_MAX_SIZE);
			final String extName = FileUtils.getExtName(file.getOriginalFilename(), "."); // 后缀名

			if (fileSize > maxSize * 1024) {
				// 文件大小超出规定范围
				serLogger.info("upload provider photo error,becase the photo (size:" + fileSize + ") more than "
						+ maxSize + "...");
				return "false@error=1";
			} else {
				if (ALLOW_IMAGE_TYPE.indexOf(extName.toLowerCase()) > -1) { // 文件格式正确
					// 公司Logo全路径
					final String imagePath = FILE_PROFIX + TEAM_IMAGE_PATH;

					// save file
					File imageDir = new File(imagePath);
					if (!imageDir.exists())
						imageDir.mkdir();

					StringBuffer fileName = new StringBuffer();
					fileName.append("team" + team.getTeamId());
					fileName.append("-");
					final Calendar calendar = new GregorianCalendar();
					fileName.append(calendar.get(Calendar.YEAR));
					fileName.append((calendar.get(Calendar.MONTH) + 1) < 10 ? "0" + (calendar.get(Calendar.MONTH) + 1)
							: (calendar.get(Calendar.MONTH) + 1));
					fileName.append(calendar.get(Calendar.DAY_OF_MONTH) < 10 ? "0" + calendar.get(Calendar.DAY_OF_MONTH)
							: calendar.get(Calendar.DAY_OF_MONTH));
					fileName.append(calendar.get(Calendar.HOUR_OF_DAY));
					fileName.append(calendar.get(Calendar.MINUTE));
					fileName.append(calendar.get(Calendar.SECOND));
					fileName.append(calendar.get(Calendar.MILLISECOND));
					fileName.append(".");
					fileName.append(extName);
					// get file path
					final String path = TEAM_IMAGE_PATH + "/" + fileName;
					File imageFile = new File(FILE_PROFIX + path);
					file.transferTo(imageFile);

					// 删除 原文件
					final String originalTeamUrl = URL_PREFIX + "portal/team/static/data/" + team.getTeamId();
					final String originalJson = HttpUtil.httpGet(originalTeamUrl, request);
					if (originalJson != null && !"".equals(originalJson)) {
						final Team originalTeam = JsonUtil.toBean(originalJson, Team.class);
						final String originalPath = originalTeam.getTeamPhotoUrl();
						FileUtils.deleteFile(FILE_PROFIX + originalPath);
					}

					team.setTeamPhotoUrl(path);
					// save photo path
					final String updateTeamUrl = URL_PREFIX + "portal/team/static/data/updateTeamPhotoPath";
					final String json = HttpUtil.httpPost(updateTeamUrl, team, request);
					final boolean flag = JsonUtil.toBean(json, Boolean.class);
					if (flag) {
						/*
						 * final Team teamInSession = (Team)
						 * request.getSession() .getAttribute(PROVIDER_SESSION);
						 * teamInSession.setTeamPhotoUrl(path);
						 * request.getSession().setAttribute(PROVIDER_SESSION,
						 * teamInSession);
						 */
						serLogger.info("upload provider photo success,photoUrl:" + path);
						return path;
					}
				} else {
					// 文件格式不正确
					serLogger.info("upload provider photo error,becase the photo type error...");
					return "false@error=2";
				}
			}

		}

		return null;
	}

	/**
	 * 更新 供应商审核状态为 审核中
	 * 
	 * @param team
	 *            包含 供应商唯一编号
	 */
	@RequestMapping("/change/status")
	public boolean updateStatus(final HttpServletRequest request, @RequestBody final Team team) {
		if (team != null) {
			final String url = URL_PREFIX + "portal/team/static/data/updateStatus";
			final String json = HttpUtil.httpPost(url, team, request);
			final boolean flag = JsonUtil.toBean(json, Boolean.class);
			/*
			 * final Team sTeam = (Team) request.getSession().getAttribute(
			 * PROVIDER_SESSION); if (sTeam != null) { if (flag) {
			 * sTeam.setFlag(0);
			 * request.getSession().setAttribute(PROVIDER_SESSION, sTeam); } }
			 */
			return flag;
		}
		return false;
	}

	/**
	 * 带有短信验证的供应商用户名密码注册
	 * 
	 * @param request
	 * @param team
	 * @return
	 */
	@RequestMapping("/add/account")
	public BaseMsg addAccount(final HttpServletRequest request, @RequestBody final Team team) {
		BaseMsg msg = new BaseMsg(0, "信息修改失败，请刷新后再试!");
		final String code = (String) request.getSession().getAttribute("code");
		if (!"".equals(code) && code != null) {
			if (code.equals(team.getVerification_code())) {
				if (team != null) {
					try {
						String password = AESUtil.Decrypt(team.getPassword(), GlobalConstant.UNIQUE_KEY);
						team.setPassword(DataUtil.md5(password));
					} catch (Exception e) {
						e.printStackTrace();
					}
					final String url = URL_PREFIX + "portal/team/static/data/add/account";
					final String json = HttpUtil.httpPost(url, team, request);
					final boolean flag = JsonUtil.toBean(json, Boolean.class);
					if (flag) {
						msg.setCode(1);
						msg.setResult("修改成功");
					}
				}
			} else
				msg.setResult("验证码错误");
		}
		return msg;
	}

	/**
	 * 不带有短信验证的供应商用户名密码注册
	 * 
	 * @param request
	 * @param team
	 * @return
	 */
	@RequestMapping("/add/account2")
	public BaseMsg addAccountNoMsgAuth(final HttpServletRequest request, @RequestBody final Team team) {
		BaseMsg msg = new BaseMsg(0, "信息修改失败，请刷新后再试!");
		if (team != null) {
			try {
				String password = AESUtil.Decrypt(team.getPassword(), GlobalConstant.UNIQUE_KEY);
				team.setPassword(DataUtil.md5(password));
			} catch (Exception e) {
				e.printStackTrace();
			}
			final String url = URL_PREFIX + "portal/team/static/data/add/account";
			final String json = HttpUtil.httpPost(url, team, request);
			final boolean flag = JsonUtil.toBean(json, Boolean.class);
			if (flag) {
				msg.setCode(1);
				msg.setResult("修改成功");
			}
		}
		return msg;
	}

	/**
	 * 供应商根据 视频ID 删除
	 * 
	 * @param productId
	 *            视频的唯一编号
	 */
	@RequestMapping("/delete/product/{productId}")
	public boolean deleteProviderProduct(@PathVariable("productId") final long productId,
			final HttpServletRequest request) {

		// 先删除文件，后删除数据
		Product original = new Product();
		final String originalUrl = URL_PREFIX + "portal/product/static/data/" + productId;
		final String result = HttpUtil.httpGet(originalUrl, request);
		if (result != null && !"".equals(result)) {
			original = JsonUtil.toBean(result, Product.class);
			// 删除 缩略图
			final String picLDUrl = original.getPicLDUrl();
			FileUtils.deleteFile(FILE_PROFIX + picLDUrl);

			// 删除 高清图
			final String picHDUrl = original.getPicHDUrl();
			FileUtils.deleteFile(FILE_PROFIX + picHDUrl);

			// 删除 视频
			final String videoUrl = original.getVideoUrl();
			FileUtils.deleteFile(FILE_PROFIX + videoUrl);

			// 删除产品编辑页图片
			String sessionId = original.getSessionId();
			if (sessionId != null && !"".equals(sessionId))
				kindService.deleteImageDir(original.getSessionId());

		}
		final String url = URL_PREFIX + "portal/product/static/data/deleteProduct/" + productId;
		final String json = HttpUtil.httpGet(url, request);
		boolean flag = true;
		if (!"".equals(json)) {
			flag = JsonUtil.toBean(json, Boolean.class);
			serLogger.info("Delete product By Product success,productId:" + productId);
		}
		return flag;
	}

	// 跳转至 上传页面
	@RequestMapping("/product/{action}/{providerId}/{productId}")
	public ModelAndView productView(@PathVariable("action") final String action,
			@PathVariable("providerId") final long providerId, @PathVariable("productId") final long productId,
			final ModelMap model, final HttpServletRequest request) {

		Product product = new Product();
		if (productId != 0 && "modify".equals(action)) {
			// 修改
			final String url = URL_PREFIX + "portal/product/static/data/" + productId;
			final String json = HttpUtil.httpGet(url, request);
			if (json != null && !"".equals(json)) {
				product = JsonUtil.toBean(json, Product.class);
				String sid = product.getSessionId();
				if (sid == null || "".equals(sid))
					product.setSessionId(DataUtil.getUuid());
			}
		}
		model.addAttribute("cKey", providerId);
		model.addAttribute("productKey", productId);
		model.addAttribute("action", action);
		model.addAttribute("sId", product.getServiceId());
		model.addAttribute("model", product);
		return new ModelAndView("provider/upload", model);
	}

	/**
	 * 加载 视频类型
	 */
	@RequestMapping("/load/videoType")
	public List<Item> loadVideoType(final HttpServletRequest request) {

		List<Item> list = new ArrayList<Item>();
		final String url = URL_PREFIX + "portal/item/static/data";
		final String json = HttpUtil.httpGet(url, request);
		if (!"".equals(json) && json != null) {
			list = JsonUtil.toList(json);
		}
		return list;
	}

	/**
	 * 新增视频
	 */
	@RequestMapping(value = "/save/product/info", method = RequestMethod.POST)
	public String saveProduct(final HttpServletRequest request, final HttpServletResponse response,
			@RequestParam final MultipartFile[] uploadFiles, final Product product) {

		response.setContentType("text/html;charset=UTF-8");
		if (uploadFiles != null) {
			final long img_MaxSize = Long.parseLong(PRODUCT_IMAGE_MAX_SIZE);
			final long video_MaxSize = Long.parseLong(VIDEO_MAX_SIZE);

			for (MultipartFile multipartFile : uploadFiles) {
				if (!multipartFile.isEmpty()) {
					// 检测文件类型
					final String extName = FileUtils.getExtName(multipartFile.getOriginalFilename(), ".");
					final short fileType = FileUtils.divideIntoGroup(extName, ALLOW_IMAGE_TYPE, ALLOW_VIDEO_TYPE);
					final long fileSize = multipartFile.getSize();
					switch (fileType) {
					case 0: // video
						// 检查视频大小
						if (fileSize > video_MaxSize * 1024 * 1024) {

							// 视频文件超过500M上限
							serLogger.info("Save Upload Video error,becase video size(" + fileSize
									+ ") more than video Max Size(" + video_MaxSize + ")");
							return "false@error=1";
						}
						break;
					case 1: // image
						// 检查图片大小
						if (fileSize > img_MaxSize * 1024) {

							// 图片文件超过250K上限
							serLogger.info("Save Upload Video error,becase picture size(" + fileSize
									+ ") more than image Max Size(" + img_MaxSize + ")");
							return "false@error=2";
						}
						break;
					case 2: // other
						throw new RuntimeException("file type error ...");
					}
				}
			}
		}

		try {
			// 转码
			product.setpDescription(URLEncoder.encode(product.getpDescription(), "UTF-8"));
			product.setProductName(URLEncoder.encode(product.getProductName(), "UTF-8"));
			product.setVideoLength(URLEncoder.encode(product.getVideoLength(), "UTF-8"));

			final String tag = product.getTags();
			if (tag != null && !"".equals(tag)) {
				product.setTags(URLEncoder.encode(tag, "UTF-8"));
			}

			// 保存 product
			long productId = 0;
			product.setFlag(1); // 默认设置 审核通过 状态
			final String url = URL_PREFIX + "portal/product/static/data/save/info";
			final String json = HttpUtil.httpPost(url, product, request);
			if (json != null && !"".equals(json)) {
				productId = JsonUtil.toBean(json, Long.class);
			}

			// 作品图片全路径
			final String imagePath = FILE_PROFIX + PRODUCT_IMAGE_PATH;
			// 视频全路径
			final String videoPath = FILE_PROFIX + PRODUCT_VIDEO_PATH;

			File videoDir = new File(videoPath);
			File imageDir = new File(imagePath);
			if (!videoDir.exists())
				videoDir.mkdir();
			if (!imageDir.exists())
				imageDir.mkdir();

			// 路径接收
			final List<String> pathList = new ArrayList<String>();

			for (int i = 0; i < uploadFiles.length; i++) {
				final MultipartFile multipartFile = uploadFiles[i];
				if (!multipartFile.isEmpty()) {
					// 分组保存video、image
					final String multipartFileName = multipartFile.getOriginalFilename();
					final String extName = FileUtils.getExtName(multipartFileName, ".");
					final short fileType = FileUtils.divideIntoGroup(extName, ALLOW_IMAGE_TYPE, ALLOW_VIDEO_TYPE);

					final StringBuffer fileName = new StringBuffer();
					fileName.append("product" + productId);
					fileName.append("-");
					final Calendar calendar = new GregorianCalendar();
					fileName.append(calendar.get(Calendar.YEAR));
					fileName.append((calendar.get(Calendar.MONTH) + 1) < 10 ? "0" + (calendar.get(Calendar.MONTH) + 1)
							: (calendar.get(Calendar.MONTH) + 1));
					fileName.append(calendar.get(Calendar.DAY_OF_MONTH) < 10 ? "0" + calendar.get(Calendar.DAY_OF_MONTH)
							: calendar.get(Calendar.DAY_OF_MONTH));
					fileName.append(calendar.get(Calendar.HOUR_OF_DAY));
					fileName.append(calendar.get(Calendar.MINUTE));
					fileName.append(calendar.get(Calendar.SECOND));
					fileName.append(calendar.get(Calendar.MILLISECOND));
					fileName.append(i);
					fileName.append(".");
					fileName.append(extName);
					String path = "";
					switch (fileType) {
					case 0: // video
						path += PRODUCT_VIDEO_PATH + "/" + fileName.toString();
						break;
					case 1: // image
						path += PRODUCT_IMAGE_PATH + "/" + fileName.toString();
						break;
					case 2: // other
						throw new RuntimeException("file type error ...");
					}
					File destFile = new File(FILE_PROFIX + path);
					multipartFile.transferTo(destFile);
					pathList.add(path);
				} else {
					pathList.add("");
				}
			}
			product.setVideoUrl(pathList.get(0));
			product.setPicHDUrl(pathList.get(1));
			product.setPicLDUrl(pathList.get(2));
			// 保存路径
			final String updateUrl = URL_PREFIX + "portal/product/static/data/updateFilePath";
			product.setProductId(productId);
			HttpUtil.httpPost(updateUrl, product, request);
			// request.getSession().setAttribute(PROVIDER_PRODUCT, productId);
			serLogger.info("Provider Save Product success,productId:" + productId + " ,productName:"
					+ product.getProductName() + " ,flag:" + product.getFlag());
		} catch (IOException e) {
			logger.error("ProviderController method:saveProduct() file upload error ...");
			e.printStackTrace();
			throw new RuntimeException("file upload error ...", e);
		}
		return "success";
	}

	/**
	 * 更新 视频 信息
	 */
	@RequestMapping(value = "/update/product/info", method = RequestMethod.POST)
	public String updateProduct(final HttpServletRequest request, final HttpServletResponse response,
			@RequestParam final MultipartFile[] uploadFiles, final Product product) {
		response.setContentType("text/html;charset=UTF-8");

		if (uploadFiles != null) {
			final long img_MaxSize = Long.parseLong(PRODUCT_IMAGE_MAX_SIZE);
			final long video_MaxSize = Long.parseLong(VIDEO_MAX_SIZE);

			for (MultipartFile multipartFile : uploadFiles) {
				if (!multipartFile.isEmpty()) {
					// 检测文件类型
					final String extName = FileUtils.getExtName(multipartFile.getOriginalFilename(), ".");
					final short fileType = FileUtils.divideIntoGroup(extName, ALLOW_IMAGE_TYPE, ALLOW_VIDEO_TYPE);
					final long fileSize = multipartFile.getSize();
					switch (fileType) {
					case 0: // video
						// 检查视频大小
						if (fileSize > video_MaxSize * 1024 * 1024) {

							// 视频文件超过500M上限
							serLogger.info("Update Upload Video error,becase video size(" + fileSize
									+ ") more than video Max Size(" + video_MaxSize + ")");
							return "false@error=1";
						}
						break;
					case 1: // image
						// 检查图片大小
						if (fileSize > img_MaxSize * 1024) {

							// 图片文件超过250K上限
							serLogger.info("Update Upload Video error,becase picture size(" + fileSize
									+ ") more than image Max Size(" + img_MaxSize + ")");
							return "false@error=2";
						}
						break;
					case 2: // other
						throw new RuntimeException("file type error ...");
					}
				}
			}
		}

		final long productId = product.getProductId(); // product id
		Product originalProduct = new Product(); // 获取 未更改前的 product
													// 对象,用于删除修改过的文件
		final String url = URL_PREFIX + "portal/product/static/data/" + productId;
		final String json = HttpUtil.httpGet(url, request);
		if (ValidateUtil.isValid(json)) {
			originalProduct = JsonUtil.toBean(json, Product.class);
		}
		final List<String> pathList = new ArrayList<String>(); // 路径集合

		try {

			// 作品图片全路径
			final String imagePath = FILE_PROFIX + PRODUCT_IMAGE_PATH;
			// 视频全路径
			final String videoPath = FILE_PROFIX + PRODUCT_VIDEO_PATH;

			File videoDir = new File(videoPath);
			File imageDir = new File(imagePath);
			if (!videoDir.exists())
				videoDir.mkdir();
			if (!imageDir.exists())
				imageDir.mkdir();

			for (int i = 0; i < uploadFiles.length; i++) {
				final MultipartFile multipartFile = uploadFiles[i];
				if (!multipartFile.isEmpty()) {
					// file字段 如果不为空,说明 更改了上传文件
					// 分组保存video、image
					final String multipartFileName = multipartFile.getOriginalFilename();
					final String extName = FileUtils.getExtName(multipartFileName, ".");
					final short fileType = FileUtils.divideIntoGroup(extName, ALLOW_IMAGE_TYPE, ALLOW_VIDEO_TYPE);

					final StringBuffer fileName = new StringBuffer();
					fileName.append("product" + productId);
					fileName.append("-");
					final Calendar calendar = new GregorianCalendar();
					fileName.append(calendar.get(Calendar.YEAR));
					fileName.append((calendar.get(Calendar.MONTH) + 1) < 10 ? "0" + (calendar.get(Calendar.MONTH) + 1)
							: (calendar.get(Calendar.MONTH) + 1));
					fileName.append(calendar.get(Calendar.DAY_OF_MONTH) < 10 ? "0" + calendar.get(Calendar.DAY_OF_MONTH)
							: calendar.get(Calendar.DAY_OF_MONTH));
					fileName.append(calendar.get(Calendar.HOUR_OF_DAY));
					fileName.append(calendar.get(Calendar.MINUTE));
					fileName.append(calendar.get(Calendar.SECOND));
					fileName.append(calendar.get(Calendar.MILLISECOND));
					fileName.append(i);
					fileName.append(".");
					fileName.append(extName);
					String path = "";
					switch (fileType) {
					case 0: // video
						path += PRODUCT_VIDEO_PATH + "/" + fileName.toString();
						break;
					case 1: // image
						path += PRODUCT_IMAGE_PATH + "/" + fileName.toString();
						break;
					case 2: // other
						throw new RuntimeException("file type error ...");
					}
					File destFile = new File(FILE_PROFIX + path);
					multipartFile.transferTo(destFile);
					pathList.add(path);
				} else {
					// file字段 如果为空,说明 未上传新文件
					pathList.add("");
				}
			}
			product.setVideoUrl(pathList.get(0));
			product.setPicHDUrl(pathList.get(1));
			product.setPicLDUrl(pathList.get(2));

			final String updatePath = URL_PREFIX + "portal/product/static/data/update/info";

			// 转码
			product.setpDescription(URLEncoder.encode(product.getpDescription(), "UTF-8"));
			product.setProductName(URLEncoder.encode(product.getProductName(), "UTF-8"));
			product.setVideoLength(URLEncoder.encode(product.getVideoLength(), "UTF-8"));

			final String tag = product.getTags();
			if (tag != null && !"".equals(tag)) {
				product.setTags(URLEncoder.encode(tag, "UTF-8"));
			}

			final String sId = HttpUtil.httpPost(updatePath, product, request);
			long serviceId = 0l;
			if (sId != null && !"".equals(sId)) {
				serviceId = JsonUtil.toBean(sId, Long.class);
			}

			if (originalProduct != null) {
				// 删除 原文件
				for (int i = 0; i < pathList.size(); i++) {
					final String newPath = pathList.get(i);
					if (newPath != null && !"".equals(newPath)) {
						// 发生更改，删除原文件
						String path = "";
						switch (i) {
						case 0: // videoFile
							path = originalProduct.getVideoUrl();
							break;
						case 1: // picHDFile
							path = originalProduct.getPicHDUrl();
							break;
						case 2: // picLDFile
							path = originalProduct.getPicLDUrl();
							break;
						default:
							continue;
						}
						if (path != null && !"".equals(path)) {
							FileUtils.deleteFile(FILE_PROFIX + path);
						}
					}
				}
			}
			serLogger.info("Provider Update Product success,productId:" + productId + " ,productName:"
					+ product.getProductName() + " ,flag:" + product.getFlag());
			return String.valueOf(serviceId);
		} catch (IOException e) {
			logger.error("ProviderController method:updateProduct() file upload error ...");
			e.printStackTrace();
			throw new RuntimeException("Product update error ...", e);
		}
	}

	/**
	 * 根据ID获取产品
	 * 
	 * @param productId
	 *            视频唯一标识
	 * @return 视频信息
	 */
	@RequestMapping("/product/data/{productId}")
	public Product loadProductById(final HttpServletRequest request, @PathVariable("productId") long productId) {
		// 如果 传来的ID值为-1，说明是 保存操作，从session中取值
		/*
		 * if (productId == -1) { productId = (Long)
		 * request.getSession().getAttribute( PROVIDER_PRODUCT); }
		 */
		final String url = URL_PREFIX + "portal/product/static/data/" + productId;
		final String json = HttpUtil.httpGet(url, request);
		Product product = new Product();
		if (json != null && !"".equals(json)) {
			product = JsonUtil.toBean(json, Product.class);
		}
		return product;
	}

	/**
	 * 获取唯一视频
	 * 
	 * @param providerId
	 *            供应商唯一编号
	 * @return 视频编号
	 */
	@RequestMapping("/loadVideo/{providerId}")
	public long loadProductByProviderId(@PathVariable("providerId") final long providerId,
			final HttpServletRequest request) {

		final String url = URL_PREFIX + "portal/product/static/data/loadSingleProduct/" + providerId;
		final String json = HttpUtil.httpGet(url, request);
		long productId = 0l;
		if (json != null && !"".equals(json)) {
			productId = JsonUtil.toBean(json, Long.class);
		}
		return productId;
	}

	@RequestMapping(value = "/multipUploadFile", method = RequestMethod.POST, produces = "text/html;charset=UTF-8")
	public String uploadFiles(final HttpServletRequest request, final HttpServletResponse response) {

		/*
		 * final Team team = (Team) request.getSession().getAttribute(
		 * PROVIDER_SESSION);
		 */
		final SessionInfo info = getCurrentInfo(request);
		final Long providerId = info.getReqiureId(); // 供应商ID

		MultipartHttpServletRequest multipartRquest = (MultipartHttpServletRequest) request;
		Map<String, MultipartFile> fileMap = multipartRquest.getFileMap();
		for (final Map.Entry<String, MultipartFile> entity : fileMap.entrySet()) {
			final MultipartFile file = entity.getValue();
			// 检测视频是否大于限制
			final String checkResult = checkFile(file);
			if ("success".equals(checkResult)) {
				// 插入数据
				Product product = new Product();
				product.setFlag(1); // 默认是 审核通过 状态
				final String name = file.getOriginalFilename();
				final String extName = FileUtils.getExtName(file.getOriginalFilename(), ".");
				String productName = name.split("." + extName)[0];
				// 转码
				try {
					productName = URLEncoder.encode(productName, "UTF-8");
				} catch (UnsupportedEncodingException e1) {
					logger.error("ProviderController method:uploadFiles() productName Encoder error, teamId="
							+ providerId + "...");
					e1.printStackTrace();
				}
				product.setProductName(productName);
				product.setRecommend(0); // 推荐值 为0
				product.setSupportCount(0); // 赞值 为0
				product.setTeamId(providerId);
				product.setVideoLength("0");
				product.setpDescription("");
				product.setVisible(1); // 默认可见
				// 保存数据
				long productId = 0;
				final String url = URL_PREFIX + "portal/product/static/data/save/info";
				final String json = HttpUtil.httpPost(url, product, request);

				if (json != null && !"".equals(json)) {
					productId = JsonUtil.toBean(json, Long.class);
					final String videoPath = FILE_PROFIX + PRODUCT_VIDEO_PATH;

					final StringBuffer fileName = new StringBuffer();
					fileName.append("product" + productId);
					fileName.append("-");
					final Calendar calendar = new GregorianCalendar();
					fileName.append(calendar.get(Calendar.YEAR));
					fileName.append((calendar.get(Calendar.MONTH) + 1) < 10 ? "0" + (calendar.get(Calendar.MONTH) + 1)
							: (calendar.get(Calendar.MONTH) + 1));
					fileName.append(calendar.get(Calendar.DAY_OF_MONTH) < 10 ? "0" + calendar.get(Calendar.DAY_OF_MONTH)
							: calendar.get(Calendar.DAY_OF_MONTH));
					fileName.append(calendar.get(Calendar.HOUR_OF_DAY));
					fileName.append(calendar.get(Calendar.MINUTE));
					fileName.append(calendar.get(Calendar.SECOND));
					fileName.append(calendar.get(Calendar.MILLISECOND));
					fileName.append(".");
					fileName.append(extName);
					String path = PRODUCT_VIDEO_PATH + "/" + fileName.toString();

					File videoDir = new File(videoPath);
					if (!videoDir.exists())
						videoDir.mkdir();

					File destFile = new File(FILE_PROFIX + path);
					product.setProductId(productId);
					product.setVideoUrl(path);
					// 更新文件路径
					final String updateUrl = URL_PREFIX + "portal/product/static/data/updateFilePath";
					HttpUtil.httpPost(updateUrl, product, request);

					try {
						file.transferTo(destFile);
						serLogger.info("ProviderController method:uploadFiles() file upload success,productId = "
								+ productId + " ...");
						return "success";
					} catch (IllegalStateException | IOException e) {
						logger.error("ProviderController method:uploadFiles() file upload error,productId = "
								+ productId + " ...");
						throw new RuntimeException(
								"ProviderController method:uploadFiles() file upload error,productId = " + productId
										+ " ...");
					}
				}
			} else {
				return checkResult;
			}
		}
		return "success";
	}

	// 检查文件是否符合规范
	public String checkFile(final MultipartFile file) {
		if (file != null && !file.isEmpty()) {
			final long img_MaxSize = Long.parseLong(PRODUCT_IMAGE_MAX_SIZE);
			final long video_MaxSize = Long.parseLong(VIDEO_MAX_SIZE);

			// 检测文件类型
			final String extName = FileUtils.getExtName(file.getOriginalFilename(), ".");
			final short fileType = FileUtils.divideIntoGroup(extName, ALLOW_IMAGE_TYPE, ALLOW_VIDEO_TYPE);
			final long fileSize = file.getSize();
			switch (fileType) {
			case 0: // video
				// 检查视频大小
				if (fileSize > video_MaxSize * 1024 * 1024) {

					// 视频文件超过500M上限
					return "false@error=1";
				}
				break;
			case 1: // image
				// 检查图片大小
				if (fileSize > img_MaxSize * 1024) {

					// 图片文件超过250K上限
					return "false@error=2";
				}
				break;
			case 2: // other
				throw new RuntimeException("file type error ...");
			}
			return "success";
		}
		return "false@error3";
	}

	@RequestMapping("/bind")
	public BaseMsg bind(@RequestBody final Team team, final HttpServletRequest request) {
		HttpSession httpSession = request.getSession();
		final String phone = team.getPhoneNumber();
		final String Ltype = team.getThirdLoginType();
		final Object objUnique = httpSession.getAttribute(UNIQUE);
		final Object objLinkman = httpSession.getAttribute(LINKMAN);
		final Object objCode = request.getSession().getAttribute("code");
		if (ValidateUtil.isValid(phone) && ValidateUtil.isValid(Ltype) && objUnique != null && objCode != null) {
			// 不需要输入验证码
			try {
				final String Unique = (String) objUnique;
				final String Linkman = (String) objLinkman;
				final String code = (String) objCode;

				// 不需要输入验证码 code == null dev code != null
				if (code != null && code.equals(team.getVerification_code())) {
					team.setLinkman(Linkman);
					if (ValidateUtil.isValid(Unique)) {
						switch (Ltype) {
						case Team.LTYPE_QQ:
							team.setQqUnique(Unique);
							break;
						case Team.LTYPE_WECHAT:
							team.setWechatUnique(Unique);
							break;
						case Team.LTYPE_WEIBO:
							team.setWbUnique(Unique);
							break;
						}
						// 后台绑定
						final String url = URL_PREFIX + "portal/team/thirdLogin/bind";
						final String json = HttpUtil.httpPost(url, team, request);
						if (ValidateUtil.isValid(json)) {
							final BaseMsg msg = JsonUtil.toBean(json, BaseMsg.class);
							if (msg.getErrorCode().equals(BaseMsg.NORMAL)) {
								// 删除 session
								httpSession.removeAttribute(UNIQUE);
								httpSession.removeAttribute(LINKMAN);
							} else if (msg.getErrorCode().equals(BaseMsg.WARNING)) {
								// 进入引导页
								Gson gson = new Gson();
								String str = gson.toJson(msg.getResult());
								httpSession.setAttribute(ORIGINAL, str); // session
																			// 内不能存储对象，存储json字符串
								httpSession.setAttribute(TYPE, REGISTER_KET);
							}
							return msg;
						}
					}
				}
			} catch (Exception e) {
				logger.error("Provider bind error,teamName is " + team.getLoginName());
				e.printStackTrace();
			}
		}
		logger.error("信息不完整");
		return new BaseMsg(BaseMsg.ERROR, "信息不完整", null);
	}

	@RequestMapping("/leader")
	public ModelAndView leader(final HttpServletRequest request, final ModelMap model) throws Exception {

		String url = GlobalConstant.URL_PREFIX + "portal/get/provinces";
		String str = HttpUtil.httpGet(url, request);
		if (str != null && !"".equals(str)) {
			List<Province> provinces = JsonUtil.fromJsonArray(str, Province.class);
			model.addAttribute("provinces", provinces);
			if (ValidateUtil.isValid(provinces)) {
				url = GlobalConstant.URL_PREFIX + "portal/get/citys/" + provinces.get(0).getProvinceID();
				String str1 = HttpUtil.httpGet(url, request);
				if (str1 != null && !"".equals(str1)) {
					List<City> citys = JsonUtil.fromJsonArray(str1, City.class);
					model.addAttribute("citys", citys);
				}
			}
		}

		HttpSession httpSession = request.getSession();
		Object object = httpSession.getAttribute(ORIGINAL);
		if (object != null) {
			return new ModelAndView("provider/leader");
		} else {
			return new ModelAndView("error");
		}
	}

	public Team getCurrentTeam(final HttpServletRequest request) {
		final SessionInfo info = getCurrentInfo(request);
		final String url = GlobalConstant.URL_PREFIX + "portal/team/static/data/" + info.getReqiureId();
		final String json = HttpUtil.httpGet(url, request);
		if (ValidateUtil.isValid(json)) {
			final Team team = JsonUtil.toBean(json, Team.class);
			return team;
		}

		return null;
	}

	public boolean updateInfo(final Team team, final HttpServletRequest request) throws UnsupportedEncodingException {
		// 转码
		final String teamName = team.getTeamName();
		final String teamDesc = team.getTeamDescription();
		final String address = team.getAddress();
		final String email = team.getEmail();
		final String linkman = team.getLinkman();
		final String webchat = team.getWebchat();
		final String officialSite = team.getOfficialSite();
		final String scale = team.getScale();
		final String businessDesc = team.getBusinessDesc();
		final String demand = team.getDemand();
		final String description = team.getDescription();

		if (teamName != null && !"".equals(teamName)) {
			team.setTeamName(URLEncoder.encode(teamName, "UTF-8"));
		}

		if (teamDesc != null && !"".equals(teamDesc)) {
			team.setTeamDescription(URLEncoder.encode(teamDesc, "UTF-8"));
		}

		if (address != null && !"".equals(address)) {
			team.setAddress(URLEncoder.encode(address, "UTF-8"));
		}

		if (email != null && !"".equals(email)) {
			team.setEmail(URLEncoder.encode(email, "UTF-8"));
		}

		if (linkman != null && !"".equals(linkman)) {
			team.setLinkman(URLEncoder.encode(linkman, "UTF-8"));
		}

		if (webchat != null && !"".equals(webchat)) {
			team.setWebchat(URLEncoder.encode(webchat, "UTF-8"));
		}

		if (officialSite != null && !"".equals(officialSite)) {
			team.setOfficialSite(URLEncoder.encode(officialSite, "UTF-8"));
		}

		if (scale != null && !"".equals(scale)) {
			team.setScale(URLEncoder.encode(scale, "UTF-8"));
		}

		if (businessDesc != null && !"".equals(businessDesc)) {
			team.setBusinessDesc(URLEncoder.encode(businessDesc, "UTF-8"));
		}

		if (demand != null && !"".equals(demand)) {
			team.setDemand(URLEncoder.encode(demand, "UTF-8"));
		}

		if (description != null && !"".equals(description)) {
			team.setDescription(URLEncoder.encode(description, "UTF-8"));
		}

		final String updateUrl = URL_PREFIX + "portal/team/static/data/updateTeamInformation";
		final String json = HttpUtil.httpPost(updateUrl, team, request);
		final boolean flag = JsonUtil.toBean(json, Boolean.class);
		return flag;
	}

	public boolean updateInfo_register(@RequestBody final Team team, final HttpServletRequest request)
			throws UnsupportedEncodingException {
		// 转码
		final String teamName = team.getTeamName();
		final String teamDesc = team.getTeamDescription();
		final String address = team.getAddress();
		final String email = team.getEmail();
		final String linkman = team.getLinkman();
		final String webchat = team.getWebchat();
		final String officialSite = team.getOfficialSite();
		final String scale = team.getScale();
		final String businessDesc = team.getBusinessDesc();
		final String demand = team.getDemand();
		final String description = team.getDescription();

		if (teamName != null && !"".equals(teamName)) {
			team.setTeamName(URLEncoder.encode(teamName, "UTF-8"));
		}

		if (teamDesc != null && !"".equals(teamDesc)) {
			team.setTeamDescription(URLEncoder.encode(teamDesc, "UTF-8"));
		}

		if (address != null && !"".equals(address)) {
			team.setAddress(URLEncoder.encode(address, "UTF-8"));
		}

		if (email != null && !"".equals(email)) {
			team.setEmail(URLEncoder.encode(email, "UTF-8"));
		}

		if (linkman != null && !"".equals(linkman)) {
			team.setLinkman(URLEncoder.encode(linkman, "UTF-8"));
		}

		if (webchat != null && !"".equals(webchat)) {
			team.setWebchat(URLEncoder.encode(webchat, "UTF-8"));
		}

		if (officialSite != null && !"".equals(officialSite)) {
			team.setOfficialSite(URLEncoder.encode(officialSite, "UTF-8"));
		}

		if (scale != null && !"".equals(scale)) {
			team.setScale(URLEncoder.encode(scale, "UTF-8"));
		}

		if (businessDesc != null && !"".equals(businessDesc)) {
			team.setBusinessDesc(URLEncoder.encode(businessDesc, "UTF-8"));
		}

		if (demand != null && !"".equals(demand)) {
			team.setDemand(URLEncoder.encode(demand, "UTF-8"));
		}

		if (description != null && !"".equals(description)) {
			team.setDescription(URLEncoder.encode(description, "UTF-8"));
		}

		try {
			HttpSession httpSession = request.getSession();
			// String unique = (String) httpSession.getAttribute(UNIQUE);
			// String ltype = (String) httpSession.getAttribute(LTYPE);
			String type = (String) httpSession.getAttribute(TYPE);
			String original_str = (String) httpSession.getAttribute(ORIGINAL);
			Gson gson = new Gson();
			Team original = gson.fromJson(original_str, Team.class);
			if (original != null && ValidateUtil.isValid(type) && type.equals(REGISTER_KET)) {
				team.setPhoneNumber(original.getPhoneNumber());
				if (ValidateUtil.isValid(original.getThirdLoginType())) {
					switch (original.getThirdLoginType()) {
					case Team.LTYPE_QQ:
						team.setQqUnique(original.getQqUnique());
						break;
					case Team.LTYPE_WECHAT:
						team.setQqUnique(original.getWechatUnique());
						break;
					case Team.LTYPE_WEIBO:
						team.setQqUnique(original.getWbUnique());
						break;
					}
				}
				team.setFlag(0);// 设置审核状态为审核中
				final String updateUrl = URL_PREFIX + "portal/team/static/data/registerteam";
				final String json = HttpUtil.httpPost(updateUrl, team, request);
				final boolean flag = JsonUtil.toBean(json, Boolean.class);
				return flag;
			} else {
				// 非法请求
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	@RequestMapping("/wechat/callback.do")
	public ModelAndView loginWithWeChat(@RequestParam("code") String code, final HttpServletRequest request,
			ModelMap modelMap) {
		Wechat wechat = WechatUtils.decodeWechatToken(code, request);
		SessionInfo sessionInfo = getCurrentInfo(request);
		if (wechat == null)
			return new ModelAndView("/provider/threeLogin");
		Team original = new Team();
		if (null != sessionInfo && ValidateUtil.isValid(sessionInfo.getReqiureId())) {// 用户已经登录,个人资料页绑定
			original.setUniqueId(wechat.getUnionid());
			original.setThirdLoginType(Team.LTYPE_WECHAT);
			original.setTeamId(sessionInfo.getReqiureId());
			final String url = URL_PREFIX + "portal/team/info/bind";
			String s = HttpUtil.httpPost(url, original, request);
			Boolean b = JsonUtil.toBean(s, Boolean.class);
			if (b) {
				modelMap.addAttribute("msg", "绑定成功");// 返回页面用作提示绑定成功
			} else
				modelMap.addAttribute("msg", "该账号已经存在绑定");
			return new ModelAndView("redirect:/provider/portal");
		} else {
			original.setLinkman(wechat.getNickname());
			// 这个是微信的唯一标识么?唯一标识不是token.getOpenid吗? 提出by wanglc
			original.setWechatUnique(wechat.getUnionid());
			original.setTeamPhotoUrl(wechat.getHeadimgurl());
			original.setThirdLoginType(Team.LTYPE_WECHAT);
			boolean isBind = providerThirdLogin.login(original, request);
			if (isBind) {
				return new ModelAndView("/provider/portal");
			} else {
				HttpSession httpSession = request.getSession();
				String unique = original.getWechatUnique();
				httpSession.setAttribute(UNIQUE, unique);
				modelMap.put("linkMan", original.getLinkman());
				modelMap.put("LType", original.getThirdLoginType());
				return new ModelAndView("/provider/threeLogin", modelMap);
			}
		}
	}

	@RequestMapping("/repwd")
	public ModelAndView repwd(ModelMap modelMap) {
		modelMap.addAttribute("userType", GlobalConstant.ROLE_PROVIDER);
		return new ModelAndView("/repwd", modelMap);
	}

	@RequestMapping("/updatePwd")
	public ModelAndView updatePwd(ModelMap modelMap, HttpServletRequest request) {
		modelMap.addAttribute("userType", GlobalConstant.ROLE_PROVIDER);
		SessionInfo sessionInfo = getCurrentInfo(request);
		modelMap.addAttribute("userLoginName", sessionInfo.getLoginName());
		modelMap.addAttribute("userId", sessionInfo.getReqiureId());
		return new ModelAndView("/updatePwd", modelMap);
	}

	@RequestMapping(value = "/set/masterWork", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public boolean setMasterWork(@RequestBody final Product product, HttpServletRequest request) {
		final String updateUrl = URL_PREFIX + "portal/set/masterWork";
		HttpUtil.httpPost(updateUrl, product, request);
		return true;
	}

	/**
	 * 第三方绑定状态
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/third/status")
	public Map<String, Object> thirdBindStatus(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		SessionInfo sessionInfo = getCurrentInfo(request);
		Team team = new Team();
		team.setTeamId(sessionInfo.getReqiureId());
		final String url = URL_PREFIX + "portal/team/third/status";
		final String json = HttpUtil.httpPost(url, team, request);
		result = JsonUtil.toBean(json, Map.class);
		return result;
	}

	/**
	 * 个人中心绑定第三方 如果第三方账号已经存在,不允许绑定
	 */
	@RequestMapping("/bind/third")
	public BaseMsg bindThird(final HttpServletRequest request, final HttpServletResponse response,
			@RequestBody final Team team) {
		BaseMsg baseMsg = new BaseMsg(0, "绑定失败");
		SessionInfo sessionInfo = getCurrentInfo(request);
		team.setTeamId(sessionInfo.getReqiureId());// 填充用户id
		final String url = URL_PREFIX + "portal/team/info/bind";
		String str = HttpUtil.httpPost(url, team, request);
		Boolean b = JsonUtil.toBean(str, Boolean.class);
		if (b) {
			baseMsg.setCode(1);
			baseMsg.setResult("绑定成功");
		} else
			baseMsg.setResult("账号存在绑定");
		return baseMsg;
	}

	/**
	 * 个人中心解除第三方绑定
	 */
	@RequestMapping("/unbind/third")
	public boolean unBindThird(@RequestBody final Team team, final HttpServletRequest request) {
		SessionInfo sessionInfo = getCurrentInfo(request);
		team.setTeamId(sessionInfo.getReqiureId());// 填充用户id
		// 查询该用户是否存在
		final String url = URL_PREFIX + "portal/team/info/unbind";
		String str = HttpUtil.httpPost(url, team, request);
		Boolean b = JsonUtil.toBean(str, Boolean.class);
		return b;
	}

	/**
	 * 修改供应商手机号码
	 */
	@RequestMapping("/modify/phone")
	public boolean modifyUserPhone(@RequestBody final Team team, final HttpServletRequest request) {
		if (team != null) {
			final String code = (String) request.getSession().getAttribute("code");
			if (code != null && !"".equals(code)) {
				if (code.equals(team.getVerification_code())) {
					// 修改 用户密码
					final String url = URL_PREFIX + "portal/team/modify/phone";
					final String json = HttpUtil.httpPost(url, team, request);
					final Boolean result = JsonUtil.toBean(json, Boolean.class);
					return result;
				}
			}
		}
		return false;
	}

	@RequestMapping("/info_{teamId}.html")
	public ModelAndView toProviderInfoView(HttpServletRequest request, ModelMap modelMap,@PathVariable("teamId") Long teamId) {
		// 传递导演信息
		String url = URL_PREFIX + "portal/team/info/" + teamId;
		String json = HttpUtil.httpGet(url, request);
		final Team result = JsonUtil.toBean(json, Team.class);
		if(result != null){
			modelMap.addAttribute("provider", result);
			// 加载导演标签
			url = URL_PREFIX + "portal/item/static/get/tags";
			String strtags=result.getBusiness();
			if(ValidateUtil.isValid(strtags)){
				try {
					String[] tagsarray= strtags.split("\\,");
					List<Long> ids =new ArrayList<>();
					for (int i = 0; i < tagsarray.length; i++) {
						ids.add(Long.parseLong(tagsarray[i]));
					}
					json = HttpUtil.httpPost(url, ids, request);
					if(ValidateUtil.isValid(json)){
						List<Item> items = JsonUtil.fromJsonArray(json, Item.class);
						List<String> tags = new  ArrayList<String>();
						for (int i = 0; i < items.size(); i++) {
							tags.add(items.get(i).getItemName());
						}
						modelMap.addAttribute("providerTags", JsonUtil.toJson(tags));
					}
				} catch (NumberFormatException e) {
					e.printStackTrace();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}else{
				logger.error("provider business is null ...");
			}
		}
		// 加载代表作
		url = URL_PREFIX + "portal/get/masterWork/" + teamId;
		json = HttpUtil.httpGet(url, request);
		final Product product = JsonUtil.toBean(json, Product.class);
		if(product != null){
			modelMap.addAttribute("product", product);
			String[] tags =  product.getTags().split("\\ ");
			modelMap.addAttribute("tags", tags);
		}
		return new ModelAndView("/provider/providerInfo", modelMap);
	}
}