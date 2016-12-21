package com.panfeng.film.resource.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.websocket.server.PathParam;
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
import com.panfeng.film.service.FDFSService;
import com.panfeng.film.service.ProviderThirdLogin;
import com.panfeng.film.util.Constants.loginType;
import com.panfeng.film.util.DataUtil;
import com.panfeng.film.util.FileUtils;
import com.panfeng.film.util.HttpUtil;
import com.panfeng.film.util.JsonUtil;
import com.panfeng.film.util.Log;
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

	private static String URL_PREFIX = null;

	private static String IMAGE_MAX_SIZE = null;

	private static String PRODUCT_IMAGE_MAX_SIZE = null;

	private static String VIDEO_MAX_SIZE = null;

	private static String ALLOW_IMAGE_TYPE = null;

	private static String ALLOW_VIDEO_TYPE = null;

	// private static String TEAM_IMAGE_PATH = null; // 团队logo

	// private static String PRODUCT_VIDEO_PATH = null; // video文件路径

	// private static String PRODUCT_IMAGE_PATH = null; // 产品图片路径

	private static String UNIQUE_KEY = "0102030405060708"; // AES 加密key

	@Autowired
	private ProviderThirdLogin providerThirdLogin;

	@Autowired
	private final FDFSService DFSservice = null;

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
			} catch (IOException e) {
				Log.error("ProviderController method:constructor load Properties fail ...", null);
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

		final Team team = getLatestTeam(request);
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
		if (json != null && !"".equals(json)) {
			try {
				list = JsonUtil.fromJsonArray(json, Product.class);
			} catch (Exception e) {
				SessionInfo sessionInfo = getCurrentInfo(request);
				Log.error("Json Parse Product error ...", sessionInfo);
				e.printStackTrace();
			}
		}
		model.addAttribute("list", list);
		model.addAttribute("cKey", team.getTeamId());
		model.addAttribute("cType", team.getFlag());
		return new ModelAndView("provider/video-list", model);
	}
	
	/**
	 * 跳转至 安全设置页面
	 */
	@RequestMapping("/safe-info")
	public ModelAndView safeView(final HttpServletRequest request, final ModelMap model) {
		final Team team = getCurrentTeam(request);
		model.addAttribute("status", team.getFlag());
		model.addAttribute("cKey", team.getTeamId());
		model.addAttribute("team", team);
		return new ModelAndView("provider/safeInfo", model);
	}
	/**
	 * 跳转至 审核状态页
	 */
/*	@RequestMapping("/company-status")
	public ModelAndView statusView(final HttpServletRequest request, final ModelMap model) {

		final Team team = getCurrentTeam(request);
		model.addAttribute("status", team.getFlag());
		model.addAttribute("cKey", team.getTeamId());
		model.addAttribute("recomment", team.getRecommendation());
		return new ModelAndView("provider/status", model);
	}*/

	/**
	 * 登录
	 * 
	 * @param original
	 *            登陆信息
	 * @return 登陆:true,失败:false
	 */
	@RequestMapping("/doLogin")
	public BaseMsg login(@RequestBody final Team original, final HttpServletRequest request,
			final HttpServletResponse response) {
		if (original == null) {
			return new BaseMsg(BaseMsg.ERROR, "登陆错误", false);
		}
		if (original.getLoginType().equals(loginType.phone.getKey())) {// 手机号登录
			final String code = (String) request.getSession().getAttribute("code");
			final String codeOfphone = (String) request.getSession().getAttribute("codeOfphone");
			if ((original.getVerification_code() != null && code != null)) {
				if (code.equals(original.getVerification_code())) {
					if ((null != codeOfphone && codeOfphone.equals(original.getPhoneNumber()))) {
						final String url = URL_PREFIX + "portal/team/static/data/doLogin";
						String json = HttpUtil.httpPost(url, original, request);
						if (json != null && !"".equals(json)) {
							boolean ret = JsonUtil.toBean(json, Boolean.class);
							if (ret) {
								addCookies(request, response);
								return new BaseMsg(BaseMsg.NORMAL, "", true);
							} else {
								return new BaseMsg(BaseMsg.WARNING, "手机号或密码错误!", false);
							}
						}
					} else {
						SessionInfo sessionInfo = getCurrentInfo(request);
						Log.error("手机号错误", sessionInfo);
						return new BaseMsg(BaseMsg.ERROR, "和验证手机不符", false);
					}
				} else {
					SessionInfo sessionInfo = getCurrentInfo(request);
					Log.error("Provider Verification_code error ...", sessionInfo);
					return new BaseMsg(BaseMsg.ERROR, "验证码错误", false);
				}
			} else {
				SessionInfo sessionInfo = getCurrentInfo(request);
				Log.error("Provider Verification_code timeout ...", sessionInfo);
				return new BaseMsg(BaseMsg.ERROR, "请重新获取验证码", false);
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
							addCookies(request, response);
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
			return new ModelAndView("/register");
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
	/*
	 * @RequestMapping("/loginout") public ModelAndView loginOut(final
	 * HttpServletRequest request) {
	 * 
	 * sessionService.removeSession(request); return new
	 * ModelAndView("redirect:/provider/login"); }
	 */

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
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("Encoder LoginName Error On isExisting Method ...", sessionInfo);
			e.printStackTrace();
		}
		final String url = URL_PREFIX + "portal/team/static/checkIsExist";
		final String json = HttpUtil.httpPost(url, team, request);
		final boolean flag = JsonUtil.toBean(json, Boolean.class);
		return flag;
	}

	/**
	 * 检测登录名是否可用
	 * 
	 * @param phoneNumber
	 *            注册的手机号码
	 * @return 标识可以注册，返回true;标识已注册，返回false
	 */
	@RequestMapping("/checkPhoneExisting")
	public BaseMsg phoneIsExisting(@RequestBody final Team team, final HttpServletRequest request) {

		try {
			// 转码
			if (team.getLoginName() != null && !"".equals(team.getLoginName())) {
				team.setLoginName(URLEncoder.encode(team.getLoginName(), "UTF-8"));
			}
		} catch (UnsupportedEncodingException e) {

			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("Encoder LoginName Error On isExisting Method ...", sessionInfo);
			e.printStackTrace();
		}
		final String url = URL_PREFIX + "portal/team/static/checkIsExist";
		final String json = HttpUtil.httpPost(url, team, request);
		if (ValidateUtil.isValid(json)) {
			final boolean flag = JsonUtil.toBean(json, Boolean.class);
			if (flag) {
				return new BaseMsg(BaseMsg.NORMAL, "", null); // 请求失败
			} else {
				return new BaseMsg(BaseMsg.WARNING, "手机号已经重复注册啦！", null); // 请求失败
			}
		} else {
			return new BaseMsg(BaseMsg.ERROR, "服务器繁忙请稍后重试！", null); // 请求失败
		}
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

		// 判断手机号是否能注册
		final String url = URL_PREFIX + "portal/team/static/checkIsExist";
		final String result = HttpUtil.httpPost(url, original, request);
		if (ValidateUtil.isValid(result)) {
			final boolean flag = JsonUtil.toBean(result, Boolean.class);
			if (!flag) {
				return new Info(false, "手机号已经注册");
			}
		}
		final String code = (String) request.getSession().getAttribute("code");
		final String codeOfphone = (String) request.getSession().getAttribute("codeOfphone");
		Info info = new Info(); // 信息载体
		// 判断验证码
		if ((!"".equals(code) && code != null)) {
			if (code.equals(original.getVerification_code())) {
				if (null != codeOfphone && codeOfphone.equals(original.getPhoneNumber())) {
					if (original != null && original.getPassword() != null && !"".equals(original.getPassword())) {
						HttpSession httpSession = request.getSession();
						Gson gson = new Gson();
						String json = gson.toJson(original);
						httpSession.setAttribute(ORIGINAL, json); // session
						httpSession.setAttribute(TYPE, REGISTER_KET);
						info.setKey(true);
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
						SessionInfo sessionInfo = getCurrentInfo(request);
						Log.error(
								"ProviderController method:recoverPassword() Provider Password Decrypt Error On Provider Register ...",
								sessionInfo);
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
				SessionInfo sessionInfo = getCurrentInfo(request);
				Log.error(
						"ProviderController method:updateTeamInformation() Privder infomartion encode error On updateTeamInformation Method ...",
						sessionInfo);
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
				SessionInfo sessionInfo = getCurrentInfo(request);
				Log.error(
						"ProviderController method:updateTeamInformation() Privder infomartion encode error On updateTeamInformation Method ...",
						sessionInfo);
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
				SessionInfo sessionInfo = getCurrentInfo(request);
				Log.error(
						"ProviderController method:validateLogin() Provider Password Decrypt Error On Provider CheckLoginStatus ...",
						sessionInfo);
				e.printStackTrace();
			}

		} else {
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("Provider Is Null On Provider CheckLoginStatus ...", sessionInfo);
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
		SessionInfo sessionInfo = getCurrentInfo(request);
		if(null != sessionInfo){
			if (!"".equals(code) && code != null) {
				if (code.equals(team.getVerification_code())) {
					if (team.getPassword() != null && !"".equals(team.getPassword())) {
						try {
							// AES 解密
							final String password = AESUtil.Decrypt(team.getPassword(), UNIQUE_KEY);
							// MD5 加密
							team.setPassword(DataUtil.md5(password));
							// 转码
							team.setPassword(URLEncoder.encode(team.getPassword(), "UTF-8"));
							team.setLoginName(URLEncoder.encode(sessionInfo.getLoginName(), "UTF-8"));
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
							Log.error(
									"ProviderController method:updatePasswordByLoginName() Provider Password Decrypt Error On Provider Register ...",
									sessionInfo);
							e.printStackTrace();
						}
					}
				} else {
					msg.setResult("验证码错误");
				}
			}else{
				msg.setResult("验证码无效");
			}
		}else{
			msg.setResult("供应商未登录");
		}
		return msg;
	}

	@RequestMapping("/upload/teamPhoto")
	public String uploadLogo(final HttpServletRequest request, final HttpServletResponse response,
			@PathParam("file") final MultipartFile file) {
		response.setContentType("text/html;charset=UTF-8");
		// 如果文件为空，则不更新图片路径;反之亦然
		if (!file.isEmpty()) {
			final long fileSize = file.getSize(); // 上传文件大小
			final long maxSize = Long.parseLong(IMAGE_MAX_SIZE);
			final String extName = FileUtils.getExtName(file.getOriginalFilename(), "."); // 后缀名

			if (fileSize > maxSize * 1024) {
				// 文件大小超出规定范围
				SessionInfo sessionInfo = getCurrentInfo(request);
				Log.error("upload provider photo error,becase the photo (size:" + fileSize + ") more than " + maxSize
						+ "...", sessionInfo);
				return "false@error=1";
			} else {
				if (ALLOW_IMAGE_TYPE.indexOf(extName.toLowerCase()) > -1) { // 文件格式正确
					final String fileId = DFSservice.upload(file);
					return fileId;
				} else {
					// 文件格式不正确
					SessionInfo sessionInfo = getCurrentInfo(request);
					Log.error("upload provider photo error,becase the photo type error...", sessionInfo);
					return "false@error=2";
				}
			}

		}

		return null;
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
				SessionInfo sessionInfo = getCurrentInfo(request);
				Log.error("upload provider photo error,becase the photo (size:" + fileSize + ") more than " + maxSize
						+ "...", sessionInfo);
				return "false@error=1";
			} else {
				if (ALLOW_IMAGE_TYPE.indexOf(extName.toLowerCase()) > -1) { // 文件格式正确
					// 修改为DFs上传 begin
					// 2016-10-20 14:25:02
					final String fileId = DFSservice.upload(file);
					// 修改为DFs上传 end

					// 删除 原文件
					final String originalTeamUrl = URL_PREFIX + "portal/team/static/data/" + team.getTeamId();
					final String originalJson = HttpUtil.httpGet(originalTeamUrl, request);
					if (originalJson != null && !"".equals(originalJson)) {
						final Team originalTeam = JsonUtil.toBean(originalJson, Team.class);
						final String originalPath = originalTeam.getTeamPhotoUrl();
						if (null != originalPath && !originalPath.equals("")) {
							DFSservice.delete(originalPath);// ==0 success
						}
					}
					team.setTeamPhotoUrl(fileId);
					// save photo path
					final String updateTeamUrl = URL_PREFIX + "portal/team/static/data/updateTeamPhotoPath";
					final String json = HttpUtil.httpPost(updateTeamUrl, team, request);
					final boolean flag = JsonUtil.toBean(json, Boolean.class);
					if (flag) {
						SessionInfo sessionInfo = getCurrentInfo(request);
						Log.error("upload provider photo success,photoUrl:" + fileId, sessionInfo);
						return fileId;
					}
				} else {
					// 文件格式不正确
					SessionInfo sessionInfo = getCurrentInfo(request);
					Log.error("upload provider photo error,becase the photo type error...", sessionInfo);
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
		//验证登录名是否在数据库中已经存在
		String url = URL_PREFIX + "portal/team/static/checkIsExist";
		String json = HttpUtil.httpPost(url, team, request);
		boolean flag = JsonUtil.toBean(json, Boolean.class);
		if(flag){
			final String code = (String) request.getSession().getAttribute("code");
			SessionInfo sessionInfo = getCurrentInfo(request);
			if(null != sessionInfo){
				if (!"".equals(code) && code != null) {
					if (code.equals(team.getVerification_code())) {
						try {
							String password = AESUtil.Decrypt(team.getPassword(), GlobalConstant.UNIQUE_KEY);
							team.setPassword(DataUtil.md5(password));
							team.setTeamId(sessionInfo.getReqiureId());
						} catch (Exception e) {
							e.printStackTrace();
						}
						url = URL_PREFIX + "portal/team/static/data/add/account";
						json = HttpUtil.httpPost(url, team, request);
						flag = JsonUtil.toBean(json, Boolean.class);
						if (flag) {
							msg.setCode(1);
							msg.setResult("修改成功");
						}
					} else
						msg.setResult("验证码错误");
				}else{
					msg.setResult("验证码无效");
				}
			}else{
				msg.setResult("供应商未登录");
			}
		}else{
			msg.setResult("用户名已经存在");
		}
		return msg;
	}

	/**
	 * 不带有短信验证的供应商用户名密码注册
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
		final String url = URL_PREFIX + "portal/product/static/data/deleteProduct/" + productId;
		final String json = HttpUtil.httpGet(url, request);
		boolean flag = true;
		if (!"".equals(json)) {
			flag = JsonUtil.toBean(json, Boolean.class);
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("Delete product By Product success,productId:" + productId, sessionInfo);
		}
		return flag;
	}

	
	// 跳转至 上传页面 新
	@RequestMapping("/product/upload")
	public ModelAndView toProductUpload(final ModelMap model, final HttpServletRequest request) {

		SessionInfo sessionInfo = getCurrentInfo(request);
		if(null!=sessionInfo){
			model.addAttribute("cKey", sessionInfo.getReqiureId());
			return new ModelAndView("provider/upload", model);
		}else{
			return new ModelAndView("redirect:/error");
		}
	}
	
	
	// 跳转至 上传页面 旧
	//@RequestMapping("/product/{action}/{providerId}/{productId}")
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
			}
		}
		model.addAttribute("cKey", providerId);
		model.addAttribute("productKey", productId);
		model.addAttribute("action", action);
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

	@RequestMapping(value = "/save/product/info", method = RequestMethod.POST)
	public BaseMsg saveProduct(final HttpServletRequest request, final HttpServletResponse response,
			@RequestBody final Product product) {
		try {
			// 转码
			product.setProductName(URLEncoder.encode(product.getProductName(), "UTF-8"));
			Team team = getCurrentTeam(request);
			if(team.getFlag()==4){//ghost账户
				final String tag = product.getTags();
				if (tag != null && !"".equals(tag)) {
					product.setTags(URLEncoder.encode(tag, "UTF-8"));
				}
				product.setFlag(1);//设置审核通过
			}else{
				product.setTags("");
				product.setFlag(0);//设置审核中状态
			}
			long productId = 0;
			product.setRecommend(0); // 推荐值 为0
			product.setSupportCount(0); // 赞值 为0
			product.setVideoLength("0");
			product.setpDescription("");
			product.setVideoDescription("");
			product.setVisible(0); // 默认可见
			final String url = URL_PREFIX + "portal/product/static/data/save/info";
			final String json = HttpUtil.httpPost(url, product, request);
			if (json != null && !"".equals(json)) {
				productId = JsonUtil.toBean(json, Long.class);
			}
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("Provider Save Product success,productId:" + productId + " ,productName:"
					+ product.getProductName() + " ,flag:" + product.getFlag(), sessionInfo);

		} catch (IOException e) {
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("ProviderController method:saveProduct() file upload error ...", sessionInfo);
			e.printStackTrace();
			throw new RuntimeException("file upload error ...", e);
		}
		return new BaseMsg(1, "success");
	}

	/**
	 * 更新 视频 信息
	 */
	@RequestMapping(value = "/update/product/info", method = RequestMethod.POST)
	public BaseMsg updateProduct(final HttpServletRequest request, final HttpServletResponse response,
			@RequestBody final Product product) {
		try {
			final long productId = product.getProductId();
			Team team = getCurrentTeam(request);
			if(team.getFlag()==4){//ghost账户
				final String tag = product.getTags();
				if (tag != null && !"".equals(tag)) {
					product.setTags(URLEncoder.encode(tag, "UTF-8"));
				}
				product.setFlag(1);//设置审核通过
			}else{
				product.setTags("");
				product.setFlag(0);//设置审核中状态
			}
			final String updatePath = URL_PREFIX + "portal/product/static/data/update/info";
			product.setProductName(URLEncoder.encode(product.getProductName(), "UTF-8"));
			final String result = HttpUtil.httpPost(updatePath, product, request);
			if (result != null && !"".equals(result)) {
				Boolean b  = JsonUtil.toBean(result, Boolean.class);
				if(b){
					return new BaseMsg(1,"success");
				}return new BaseMsg(0,"保存失败");
			}
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("Provider Update Product success,productId:" + productId + " ,productName:"
					+ product.getProductName() + " ,flag:" + product.getFlag(), sessionInfo);
			return new BaseMsg(0,"保存失败");
		} catch (IOException e) {
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("ProviderController method:updateProduct() file upload error ...", sessionInfo);
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
		response.setContentType("text/html;charset=UTF-8");
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
				product.setFlag(0); // 默认是 审核中 状态
				final String name = file.getOriginalFilename();
				final String extName = FileUtils.getExtName(file.getOriginalFilename(), ".");
				String productName = name.split("." + extName)[0];
				// 转码
				try {
					productName = URLEncoder.encode(productName, "UTF-8");
				} catch (UnsupportedEncodingException e1) {
					SessionInfo sessionInfo = getCurrentInfo(request);
					Log.error("ProviderController method:uploadFiles() productName Encoder error, teamId=" + providerId
							+ "...", sessionInfo);
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
				String fileId = "";
				if (json != null && !"".equals(json)) {
					productId = JsonUtil.toBean(json, Long.class);
					fileId = DFSservice.upload(file);
					SessionInfo sessionInfo = getCurrentInfo(request);
					Log.error("ProviderController method:uploadFiles() file upload success,productId = " + productId
							+ " ...", sessionInfo);
					product.setProductId(productId);
					product.setVideoUrl(fileId);
					// 更新文件路径
					final String updateUrl = URL_PREFIX + "portal/product/static/data/updateFilePath";
					HttpUtil.httpPost(updateUrl, product, request);
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
				SessionInfo sessionInfo = getCurrentInfo(request);
				Log.error("Provider bind error,teamName is " + team.getLoginName(), sessionInfo);
				e.printStackTrace();
			}
		}
		SessionInfo sessionInfo = getCurrentInfo(request);
		Log.error("信息不完整", sessionInfo);
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

	/**
	 * 获取最新的供应商信息,最新代表,若存在待审核,则待审核是最新消息
	 * 
	 * @param request
	 * @return
	 */
	public Team getLatestTeam(final HttpServletRequest request) {
		final SessionInfo info = getCurrentInfo(request);
		final String url = GlobalConstant.URL_PREFIX + "portal/team/static/latest/" + info.getReqiureId();
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
		// modelMap.addAttribute("userType", GlobalConstant.ROLE_PROVIDER);
		return new ModelAndView("/rePwdPro", modelMap);
	}

	/*
	 * @RequestMapping("/updatePwd") public ModelAndView updatePwd(ModelMap
	 * modelMap, HttpServletRequest request) { modelMap.addAttribute("userType",
	 * GlobalConstant.ROLE_PROVIDER); SessionInfo sessionInfo =
	 * getCurrentInfo(request); modelMap.addAttribute("userLoginName",
	 * sessionInfo.getLoginName()); modelMap.addAttribute("userId",
	 * sessionInfo.getReqiureId()); return new ModelAndView("/updatePwd",
	 * modelMap); }
	 */

	@RequestMapping(value = "/set/masterWork", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public BaseMsg setMasterWork(@RequestBody final Product product, HttpServletRequest request) {
		BaseMsg baseMsg = new BaseMsg();
		final String updateUrl = URL_PREFIX + "portal/set/masterWork";
		String result = HttpUtil.httpPost(updateUrl, product, request);
		boolean b = JsonUtil.toBean(result, Boolean.class);
		if(b){
			baseMsg.setCode(1);
			baseMsg.setResult("设置成功");
		}else{
			baseMsg.setCode(0);
			baseMsg.setResult("设置失败");
		}
		return baseMsg;
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
	public BaseMsg modifyUserPhone(@RequestBody final Team team, final HttpServletRequest request) {
		SessionInfo info = getCurrentInfo(request);
		if(null != info){
			final String code = (String) request.getSession().getAttribute("code");
			final String codeOfphone = (String) request.getSession().getAttribute("codeOfphone");
			if (code != null && !"".equals(code) && codeOfphone != null && !"".equals(codeOfphone)) {
				if (code.equals(team.getVerification_code())) {
					if(codeOfphone.equals(team.getPhoneNumber())){
						team.setTeamId(info.getReqiureId());
						final String url = URL_PREFIX + "portal/team/update/newphone";
						final String json = HttpUtil.httpPost(url, team, request);
						final BaseMsg baseMsg = JsonUtil.toBean(json, BaseMsg.class);
						return baseMsg;
					}return new BaseMsg(0, "手机号不匹配");
				}return new BaseMsg(0, "验证码错误");
			}return new BaseMsg(0, "参数无效");
		}
		return new BaseMsg(0, "error");
	}

	@RequestMapping("/info_{teamId}.html")
	public ModelAndView toProviderInfoView(HttpServletRequest request, ModelMap modelMap,
			@PathVariable("teamId") Long teamId) {
		// 传递导演信息
		String url = URL_PREFIX + "portal/team/info/" + teamId;
		String json = HttpUtil.httpGet(url, request);
		final Team result = JsonUtil.toBean(json, Team.class);
		if (result != null) {
			modelMap.addAttribute("provider", result);
			// 加载导演标签
			url = URL_PREFIX + "portal/team/tags";
			String strtags = result.getBusiness();
			if (ValidateUtil.isValid(strtags)) {
				try {
					String[] tagsarray = strtags.split("\\,");
					List<Long> ids = new ArrayList<>();
					for (int i = 0; i < tagsarray.length; i++) {
						ids.add(Long.parseLong(tagsarray[i]));
					}
					json = HttpUtil.httpPost(url, ids, request);
					if (ValidateUtil.isValid(json)) {
						List<String> tags = JsonUtil.fromJsonArray(json, String.class);
						modelMap.addAttribute("providerTags", JsonUtil.toJson(tags));
					}
				} catch (NumberFormatException e) {
					e.printStackTrace();
				} catch (Exception e) {
					e.printStackTrace();
				}
			} else {
				SessionInfo sessionInfo = getCurrentInfo(request);
				Log.error("provider business is null ...", sessionInfo);
			}
		} else {
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("Team is null ...", sessionInfo);
		}
		// 加载代表作
		url = URL_PREFIX + "portal/get/masterWork/" + teamId;
		json = HttpUtil.httpGet(url, request);
		final Product product = JsonUtil.toBean(json, Product.class);
		if (product != null) {
			modelMap.addAttribute("product", product);
			String[] tags = product.getTags().split("\\ ");
			modelMap.addAttribute("tags", tags);
		} else {
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("product is null ...", sessionInfo);
		}
		return new ModelAndView("/provider/providerInfo", modelMap);
	}

	/**
	 * 验证供应商信息是否存在修改
	 */
	@RequestMapping("/validate/change")
	public boolean validateChange(@RequestBody final Team team, final HttpServletRequest request) {
		final String url = URL_PREFIX + "portal/team/static/data/" + team.getTeamId();
		String str = HttpUtil.httpPost(url, team, request);
		Team oldTeam = JsonUtil.toBean(str, Team.class);
		if (team.equals(oldTeam)) {
			return false;
		} else {
			return true;
		}
	}

	/**
	 * 处理team临时表，更新team注释
	 */
	@RequestMapping("/deal/TeamTmpAndTeamDesc")
	public boolean dealTeamTmpAndUpdateTeamDesc(@RequestBody final Team team, final HttpServletRequest request) {
		final String url = URL_PREFIX + "portal/team/deal/teamTmpAndTeamDesc";
		String str = HttpUtil.httpPost(url, team, request);
		Boolean bo = JsonUtil.toBean(str, Boolean.class);
		return bo;
	}

	/**
	 * 获取user信息
	 */
	@RequestMapping("/getcurrentTeam")
	public BaseMsg updatePwd(HttpServletRequest request) {
		BaseMsg baseMsg = new BaseMsg();
		SessionInfo sessionInfo = getCurrentInfo(request);
		if (null != sessionInfo) {
			Team t = new Team();
			t.setTeamId(sessionInfo.getReqiureId());
			t.setLoginName(sessionInfo.getLoginName());
			baseMsg.setCode(1);
			baseMsg.setResult(t);
		}
		return baseMsg;
	}
	/**
	 * 设置作品可见性
	 */
	@RequestMapping("/product/visibility")
	public BaseMsg setProductVisibility(HttpServletRequest request,@RequestBody final Product product) {
		BaseMsg baseMsg = new BaseMsg();
		SessionInfo sessionInfo = getCurrentInfo(request);
		if (null != sessionInfo) {
			if(sessionInfo.getReqiureId().equals(product.getTeamId())){
				final String url = URL_PREFIX + "portal/product/visibility";
				String str = HttpUtil.httpPost(url, product, request);
				Boolean bo = JsonUtil.toBean(str, Boolean.class);
				if(bo){
					baseMsg.setCode(1);
					baseMsg.setResult("修改成功");
				}else{
					baseMsg.setCode(0);
					baseMsg.setResult("修改失败");
				}
			}else{
				baseMsg.setCode(0);
				baseMsg.setResult("无权限修改此功能");
			}
		}else{
			baseMsg.setCode(0);
			baseMsg.setResult("供应商未登录");
		}
		return baseMsg;
	}
}