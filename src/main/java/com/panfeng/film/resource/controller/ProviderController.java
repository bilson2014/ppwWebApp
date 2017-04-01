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

import org.apache.commons.lang.StringUtils;
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
import org.springframework.web.multipart.MultipartRequest;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.paipianwang.pat.common.entity.SessionInfo;
import com.paipianwang.pat.facade.product.entity.PmsProduct;
import com.paipianwang.pat.facade.product.entity.PmsService;
import com.paipianwang.pat.facade.product.service.PmsProductFacade;
import com.paipianwang.pat.facade.right.entity.PmsRole;
import com.paipianwang.pat.facade.right.service.PmsRightFacade;
import com.paipianwang.pat.facade.right.service.PmsRoleFacade;
import com.paipianwang.pat.facade.team.entity.PmsCity;
import com.paipianwang.pat.facade.team.entity.PmsProvince;
import com.paipianwang.pat.facade.team.entity.PmsTeam;
import com.paipianwang.pat.facade.team.service.PmsCityFacade;
import com.paipianwang.pat.facade.team.service.PmsProvinceFacade;
import com.paipianwang.pat.facade.team.service.PmsTeamFacade;
import com.panfeng.film.domain.BaseMsg;
import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.mq.service.FileConvertMQService;
import com.panfeng.film.mq.service.SmsMQService;
import com.panfeng.film.resource.model.Info;
import com.panfeng.film.resource.model.Product;
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

	private static String UNIQUE_KEY = "0102030405060708"; // AES 加密key

	@Autowired
	private ProviderThirdLogin providerThirdLogin;
	@Autowired
	private final FDFSService DFSservice = null;
	@Autowired
	private PmsTeamFacade pmsTeamFacade = null;
	@Autowired
	private final PmsRightFacade pmsRightFacade = null;
	@Autowired
	private final PmsRoleFacade pmsRoleFacade = null;
	@Autowired
	private final PmsCityFacade pmsCityFacade = null;
	@Autowired
	private final PmsProvinceFacade pmsProvinceFacade = null;
	@Autowired
	private final PmsProductFacade pmsProductFacade = null;
	@Autowired
	private final SmsMQService smsMQService = null;
	@Autowired
	private final FileConvertMQService fileConvertMQService = null;
	
	
	
	

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

		final PmsTeam team = getLatestTeam(request);
		model.addAttribute("provider", team);
		// 第一次填充省
		List<PmsProvince> provinces = pmsProvinceFacade.getAll();
		if (provinces != null && provinces.size()>0) {
			model.addAttribute("provinces", provinces);
			if (ValidateUtil.isValid(team.getTeamCity())) {
				// 填充第一次市区
				String teamProvince = team.getTeamProvince();
				if (ValidateUtil.isValid(teamProvince)) {
					final List<PmsCity> citys = pmsCityFacade.findCitysByProvinceId(teamProvince);
					model.addAttribute("citys", citys);
				}
			} else {
				// 填充默认市！
				if (ValidateUtil.isValid(provinces)) {
					String provinceID = provinces.get(0).getProvinceID();
					if (ValidateUtil.isValid(provinceID)) {
						final List<PmsCity> citys = pmsCityFacade.findCitysByProvinceId(provinceID);
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

		final PmsTeam team = getCurrentTeam(request);
		final List<PmsProduct> list = pmsProductFacade.loadProductByProviderId(team.getTeamId());
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
		final PmsTeam team = getCurrentTeam(request);
		model.addAttribute("status", team.getFlag());
		model.addAttribute("cKey", team.getTeamId());
		model.addAttribute("team", team);
		return new ModelAndView("provider/safeInfo", model);
	}
	/**
	 * 跳转至 审核状态页
	 */
	/*
	 * @RequestMapping("/company-status") public ModelAndView statusView(final
	 * HttpServletRequest request, final ModelMap model) {
	 * 
	 * final Team team = getCurrentTeam(request); model.addAttribute("status",
	 * team.getFlag()); model.addAttribute("cKey", team.getTeamId());
	 * model.addAttribute("recomment", team.getRecommendation()); return new
	 * ModelAndView("provider/status", model); }
	 */

	/**
	 * 登录
	 * 
	 * @param original
	 *            登陆信息
	 * @return 登陆:true,失败:false
	 */
	@RequestMapping("/doLogin")
	public BaseMsg login(@RequestBody final PmsTeam original, final HttpServletRequest request,
			final HttpServletResponse response) {
		if (original == null) {
			return new BaseMsg(BaseMsg.ERROR, "登陆错误", false);
		}
		if (original.getLoginType().equals(loginType.phone.getKey())) {// 手机号登录
			return loginByPhone(original,request,response);
		} else {// 用户名登录
			return loginByName(original,request,response);
		}
	}

	private BaseMsg loginByName(PmsTeam original, HttpServletRequest request, HttpServletResponse response) {
		final String pwd = original.getPassword();
		final String loginName = original.getLoginName();
		if (ValidateUtil.isValid(loginName) && ValidateUtil.isValid(pwd)) {
			try {// 解密
				final String password = AESUtil.Decrypt(pwd, GlobalConstant.UNIQUE_KEY);
				original.setPassword(DataUtil.md5(password));
				PmsTeam team = pmsTeamFacade.findTeamByLoginNameAndPwd(original);
				if (team != null) {
					// 存入session
					boolean ret = initSessionInfo(team, request);
					if (ret) {
						addCookies(request, response);
						return new BaseMsg(BaseMsg.NORMAL, "", true);
					} else {
						return new BaseMsg(BaseMsg.ERROR, "用户名或密码错误!", false);
					}
				}else{
					return new BaseMsg(BaseMsg.WARNING, "用户名或密码错误!", false);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return new BaseMsg(BaseMsg.ERROR, "登陆错误", false);
	}

	private BaseMsg loginByPhone(final PmsTeam original, final HttpServletRequest request,final HttpServletResponse response) {
		final String code = (String) request.getSession().getAttribute("code");
		final String codeOfphone = (String) request.getSession().getAttribute("codeOfphone");
		if ((original.getVerification_code() != null && code != null)) {
			if (code.equals(original.getVerification_code())) {
				if ((null != codeOfphone && codeOfphone.equals(original.getPhoneNumber()))) {
					PmsTeam team = pmsTeamFacade.doLogin(original.getPhoneNumber());
					if (team != null) {
						// 存入session
						boolean ret = initSessionInfo(team, request);
						if (ret) {
							addCookies(request, response);
							return new BaseMsg(BaseMsg.NORMAL, "", true);
						} else {
							return new BaseMsg(BaseMsg.WARNING, "手机号或密码错误!", false);
						}
					}else{
						return new BaseMsg(BaseMsg.WARNING, "手机号或密码错误!", false);
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
	}

	@RequestMapping("/thirdLogin")
	public ModelAndView thirdLogin(String json, final HttpServletRequest request, ModelMap modelMap) {
		if (!ValidateUtil.isValid(json))
			return new ModelAndView("/register");
		Team original = JsonUtil.toBean(json, Team.class);
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
	public boolean isExisting(@RequestBody final PmsTeam team, final HttpServletRequest request) {
		final long count = pmsTeamFacade.checkExist(team);
		if (count == 0){
			return true;
		}
		return false;
	}

	/**
	 * 检测登录名是否可用
	 * 
	 * @param phoneNumber
	 *            注册的手机号码
	 * @return 标识可以注册，返回true;标识已注册，返回false
	 */
	@RequestMapping("/checkPhoneExisting")
	public BaseMsg phoneIsExisting(@RequestBody final PmsTeam team, final HttpServletRequest request) {
		
		final long count = pmsTeamFacade.checkExist(team);
		if (count == 0){
			return new BaseMsg(BaseMsg.NORMAL, "", null); // 请求失败
		}else{
			return new BaseMsg(BaseMsg.WARNING, "手机号已经重复注册啦！", null); // 请求失败
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
	public Info register(@RequestBody final PmsTeam original, final HttpServletRequest request) {

		// 判断手机号是否能注册
		final long count = pmsTeamFacade.checkExist(original);
		if (ValidateUtil.isValid(count)) {
			if (count>0) {
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
	public boolean updateTeamInformation(final HttpServletRequest request, @RequestBody final PmsTeam team) {

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
	public boolean leadUserupdateInformation(final HttpServletRequest request, @RequestBody final PmsTeam team) {
		if (team != null) {
			final boolean ret = updateInfo_register(team, request);
			return ret;
		}
		return false;
	}

	/**
	 * 检验密码是否正确
	 * 
	 * @param original
	 *            包含(登录名和密码)
	 */
	/*@RequestMapping("/validateLoginStatus")
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
	}*/

	/**
	 * 供应商信息界面-修改密码
	 * 
	 * @param original
	 *            包含(登录名和密码)
	 */
	@RequestMapping("/recover/password")
	public BaseMsg updatePasswordByLoginName(@RequestBody final PmsTeam team, final HttpServletRequest request) {
		BaseMsg msg = new BaseMsg(0, "信息修改失败，请刷新后再试!");
		final String code = (String) request.getSession().getAttribute("code");
		SessionInfo sessionInfo = getCurrentInfo(request);
		if (null != sessionInfo) {
			if (!"".equals(code) && code != null) {
				if (code.equals(team.getVerification_code())) {
					if (team.getPassword() != null && !"".equals(team.getPassword())) {
						try {
							// AES 解密
							final String password = AESUtil.Decrypt(team.getPassword(), UNIQUE_KEY);
							// MD5 加密
							team.setPassword(DataUtil.md5(password));
							
							final long ret = pmsTeamFacade.updatePasswordByLoginName(team);
							Log.error("update team ...", sessionInfo);
							if (ret > 0){
								msg.setCode(1);
								msg.setResult("修改成功");
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
			} else {
				msg.setResult("验证码无效");
			}
		} else {
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
	public BaseMsg addAccount(final HttpServletRequest request, @RequestBody final PmsTeam team) {
		BaseMsg msg = new BaseMsg(0, "信息修改失败，请刷新后再试!");
		// 验证登录名是否在数据库中已经存在
		long count = pmsTeamFacade.checkExist(team);
		if (count == 0){
			final String code = (String) request.getSession().getAttribute("code");
			SessionInfo sessionInfo = getCurrentInfo(request);
			if (null != sessionInfo) {
				if (!"".equals(code) && code != null) {
					if (code.equals(team.getVerification_code())) {
						try {
							String password = AESUtil.Decrypt(team.getPassword(), GlobalConstant.UNIQUE_KEY);
							team.setPassword(DataUtil.md5(password));
							team.setTeamId(sessionInfo.getReqiureId());
						} catch (Exception e) {
							e.printStackTrace();
						}
						count = pmsTeamFacade.updateTeamAccount(team);
						if (count >= 0) {
							PmsTeam t = pmsTeamFacade.findTeamById(team.getTeamId());
							request.getSession().removeAttribute(GlobalConstant.SESSION_INFO);
							initSessionInfo(t, request);
						}
						msg.setCode(1);
						msg.setResult("修改成功");
					} else {
						msg.setCode(3);
						msg.setResult("验证码错误");
					}
				} else {
					msg.setCode(3);
					msg.setResult("验证码无效");
				}
			} else {
				msg.setCode(3);
				msg.setResult("供应商未登录");
			}
		} else {
			msg.setCode(2);
			msg.setResult("用户名已经存在");
		}
		return msg;
	}

	/**
	 * 不带有短信验证的供应商用户名密码注册
	 */
	@RequestMapping("/add/account2")
	public BaseMsg addAccountNoMsgAuth(final HttpServletRequest request, @RequestBody final PmsTeam team) {
		BaseMsg msg = new BaseMsg(0, "信息修改失败，请刷新后再试!");
		if (team != null) {
			try {
				String password = AESUtil.Decrypt(team.getPassword(), GlobalConstant.UNIQUE_KEY);
				team.setPassword(DataUtil.md5(password));
			} catch (Exception e) {
				e.printStackTrace();
			}
			SessionInfo sessionInfo = getCurrentInfo(request);
			if (null != sessionInfo) {
				team.setTeamId(sessionInfo.getReqiureId());
			}
			long count = pmsTeamFacade.updateTeamAccount(team);
			if (count >= 0) {
				PmsTeam t = pmsTeamFacade.findTeamById(team.getTeamId());
				request.getSession().removeAttribute(GlobalConstant.SESSION_INFO);
				initSessionInfo(t, request);
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
	public ModelAndView toProductUpload(final ModelMap model, final HttpServletRequest request, String productId) {
		PmsTeam team = getCurrentTeam(request);
		PmsProduct product = new PmsProduct();
		if (null != team) {
			if (StringUtils.isNotBlank(productId)) {
				product = pmsProductFacade.findProductById(Long.parseLong(productId));
			}
			model.addAttribute("flag", team.getFlag());
			model.addAttribute("cKey", team.getTeamId());
			model.addAttribute("product", product);
			return new ModelAndView("provider/upload", model);
		} else {
			return new ModelAndView("redirect:/error");
		}
	}

	// 跳转至 上传页面 旧
	// @RequestMapping("/product/{action}/{providerId}/{productId}")
	/*public ModelAndView productView(@PathVariable("action") final String action,
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
	}*/

	/**
	 * 加载 视频类型
	 */
	/*@RequestMapping("/load/videoType")
	public List<Item> loadVideoType(final HttpServletRequest request) {

		List<Item> list = new ArrayList<Item>();
		final String url = URL_PREFIX + "portal/item/static/data";
		final String json = HttpUtil.httpGet(url, request);
		if (!"".equals(json) && json != null) {
			list = JsonUtil.toList(json);
		}
		return list;
	}*/

	/**
	 * 添加一个作品，该作品只有video信息
	 */
	@RequestMapping(value = "/save/product/info", method = RequestMethod.POST)
	public BaseMsg saveProduct(HttpServletRequest request, MultipartFile file, final HttpServletResponse response) {
		BaseMsg baseMsg = new BaseMsg(0, "error");
		SessionInfo sessionInfo = getCurrentInfo(request);
		if (null != sessionInfo) {
			final long video_MaxSize = Long.parseLong(VIDEO_MAX_SIZE);
			if (file.getSize() > video_MaxSize * 1024 * 1024) {
				baseMsg.setResult("视频超过200M");
				return baseMsg;
			}
			// 上传video
			String fileId = DFSservice.upload(file);
			PmsProduct product = new PmsProduct();
			product.setVideoUrl(fileId);
			product.setTeamId(sessionInfo.getReqiureId());
			final String name = file.getOriginalFilename();
			final String extName = FileUtils.getExtName(file.getOriginalFilename(), ".");
			String productName = name.split("." + extName)[0];
			product.setProductName(productName);
			product.setTags("");
			product.setFlag(3);// 设置保存中状态
			product.setRecommend(0); // 推荐值 为0
			product.setSupportCount(0); // 赞值 为0
			product.setVideoLength("0");
			product.setpDescription("");
			product.setVideoDescription("");
			product.setVisible(0); // 默认可见
			
			long proId = pmsProductFacade.save(product); // 保存视频信息
			product.setProductId(proId);
			final PmsTeam team = pmsTeamFacade.findTeamById(sessionInfo.getReqiureId());
			if(team.getFlag() != 4){//ghost不需要添加service
				//添加service信息
				PmsService service = new PmsService();
				service.setProductId(product.getProductId());
				service.setProductName(product.getProductName());
				service.setServiceDiscount(1);
				service.setServiceName("service" + product.getProductId() + "-" + product.getProductName());
				service.setServiceOd(0);
				service.setServicePrice(0d);
				service.setServiceRealPrice(0d);
				service.setMcoms(Long.parseLong(product.getVideoLength()));
				pmsProductFacade.save(service);
			}
			// 加入文件转换队列
			fileConvertMQService.sendMessage(product.getProductId(), product.getVideoUrl());
			if (proId > 0) {
				Log.error("Provider Save Product success,productId:" + proId + " ,productName:"
						+ product.getProductName() + " ,flag:" + product.getFlag(), sessionInfo);
				baseMsg.setCode(1);
				baseMsg.setResult(proId);
			}
		} else {
			Log.error("Provider Save Product error,noLogin", sessionInfo);
			baseMsg.setCode(0);
			baseMsg.setResult("供应商未登录");
		}
		return baseMsg;
	}

	/**
	 * 更新 视频 信息
	 */
	@RequestMapping(value = "/update/product/info", method = RequestMethod.POST)
	public BaseMsg updateProduct(final HttpServletRequest request, final HttpServletResponse response,
			final Product product) {
		SessionInfo sessionInfo = getCurrentInfo(request);

		if (request instanceof MultipartRequest) {// 指出对象是否是特定类的一个实例
			MultipartHttpServletRequest multipartRquest = (MultipartHttpServletRequest) request;
			MultipartFile file = multipartRquest.getFiles("file").get(0);
			final long img_MaxSize = Long.parseLong(PRODUCT_IMAGE_MAX_SIZE);
			if (file.getSize() > img_MaxSize * 1024) {
				return new BaseMsg(0, "图片文件超过250K上限");
			}
			String fileId = DFSservice.upload(file);
			product.setPicLDUrl(fileId);
		}
		final long productId = product.getProductId();
		PmsTeam team = getCurrentTeam(request);
		if (team.getFlag() != 4) {// 非ghost账户
			product.setTags("");
		}
		PmsProduct oldProduct = pmsProductFacade.findProductById(product.getProductId());
		oldProduct.setProductName(product.getProductName());
		oldProduct.setCreationTime(product.getCreationTime());
		if (StringUtils.isNotEmpty(product.getTags())) {
			oldProduct.setTags(product.getTags());
		}
		oldProduct.setFlag(0);// 设置审核中状态
		if (StringUtils.isNotBlank(product.getPicLDUrl())) {
			oldProduct.setPicLDUrl(product.getPicLDUrl());
			if (StringUtils.isNotBlank(oldProduct.getPicLDUrl())
					&& !product.getPicLDUrl().equals(oldProduct.getPicLDUrl())) {
				DFSservice.delete(oldProduct.getPicLDUrl());
			}
		}
		pmsProductFacade.updateProductInfo(oldProduct); // 更新视频信息
		Log.error("update product ... ", sessionInfo);
		Log.error("Provider Update Product success,productId:" + productId + " ,productName:"
				+ product.getProductName() + " ,flag:" + product.getFlag(), sessionInfo);
		return new BaseMsg(1, "success");
	}

	/**
	 * 根据ID获取产品
	 * 
	 * @param productId
	 *            视频唯一标识
	 * @return 视频信息
	 */
	/*@RequestMapping("/product/data/{productId}")
	public Product loadProductById(final HttpServletRequest request, @PathVariable("productId") long productId) {
		final String url = URL_PREFIX + "portal/product/static/data/" + productId;
		final String json = HttpUtil.httpGet(url, request);
		Product product = new Product();
		if (json != null && !"".equals(json)) {
			product = JsonUtil.toBean(json, Product.class);
		}
		return product;
	}*/

	/**
	 * 获取唯一视频
	 * 
	 * @param providerId
	 *            供应商唯一编号
	 * @return 视频编号
	 */
	//@RequestMapping("/loadVideo/{providerId}")
	/*public long loadProductByProviderId(@PathVariable("providerId") final long providerId,
			final HttpServletRequest request) {

		final String url = URL_PREFIX + "portal/product/static/data/loadSingleProduct/" + providerId;
		final String json = HttpUtil.httpGet(url, request);
		long productId = 0l;
		if (json != null && !"".equals(json)) {
			productId = JsonUtil.toBean(json, Long.class);
		}
		return productId;
	}*/

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
				PmsProduct product = new PmsProduct();
				product.setFlag(3); // 默认是 保存状态
				final String name = file.getOriginalFilename();
				final String extName = FileUtils.getExtName(file.getOriginalFilename(), ".");
				String productName = name.split("." + extName)[0];
				product.setProductName(productName);
				product.setRecommend(0); // 推荐值 为0
				product.setSupportCount(0); // 赞值 为0
				product.setTeamId(providerId);
				product.setVideoLength("0");
				product.setpDescription("");
				product.setVisible(0); // 默认可见
				String fileId = DFSservice.upload(file);
				product.setVideoUrl(fileId);
				long proId = pmsProductFacade.save(product); // 保存视频信息
				product.setProductId(proId);
				final PmsTeam team = pmsTeamFacade.findTeamById(info.getReqiureId());
				if(team.getFlag() != 4){//ghost不需要添加service
					//添加service信息
					PmsService service = new PmsService();
					service.setProductId(product.getProductId());
					service.setProductName(product.getProductName());
					service.setServiceDiscount(1);
					service.setServiceName("service" + product.getProductId() + "-" + product.getProductName());
					service.setServiceOd(0);
					service.setServicePrice(0d);
					service.setServiceRealPrice(0d);
					service.setMcoms(Long.parseLong(product.getVideoLength()));
					pmsProductFacade.save(service);
				}
				// 加入文件转换队列
				fileConvertMQService.sendMessage(product.getProductId(), product.getVideoUrl());
				Log.error("save product ... ", info);
				Log.info("ProviderController method:uploadFiles() file upload success,productId = " + proId
						+ " ...",info);
				return "success";
			}
		}
		return "error";
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

		List<PmsProvince> provinces = pmsProvinceFacade.getAll();
		model.addAttribute("provinces", provinces);
		if (ValidateUtil.isValid(provinces)) {
			String provinceId = provinces.get(0).getProvinceID();
			List<PmsCity> citys = new ArrayList<>();
			if (ValidateUtil.isValid(provinceId)) {
				citys = pmsCityFacade.findCitysByProvinceId(provinceId);
				model.addAttribute("citys", citys);
			} else {
				SessionInfo sessionInfo = getCurrentInfo(request);
				Log.error("provinceId is null ...",sessionInfo);
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

	public PmsTeam getCurrentTeam(final HttpServletRequest request) {
		final SessionInfo info = getCurrentInfo(request);
		final PmsTeam team = pmsTeamFacade.findTeamById(info.getReqiureId());
		team.setPassword(null);
		if(team.getId()!=0l){
			team.setTeamId(team.getId());
		}
		return team;
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

	public boolean updateInfo(final PmsTeam team, final HttpServletRequest request) throws UnsupportedEncodingException {
		// 将状态置为审核中
		if(team.getFlag() == 2)
			team.setFlag(0);
		
		final long ret = pmsTeamFacade.updateTeamInfomation(team);
		SessionInfo sessionInfo = getCurrentInfo(request);
		Log.error("update team ...", sessionInfo);
		if (ret == 1) {
			return true;
		}
		return false;
	}

	public boolean updateInfo_register(@RequestBody final PmsTeam team, final HttpServletRequest request)
			{
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
				
				PmsTeam dbteam = pmsTeamFacade.register(team);
				SessionInfo sessionInfo = getCurrentInfo(request);
				Log.error("save team ...", sessionInfo);
				if (dbteam != null && dbteam.getTeamId() > 0) {
					smsMQService.sendMessage("132269", team.getPhoneNumber(), null);
					return initSessionInfo(dbteam, request);
				}
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
		return new ModelAndView("/rePwdPro", modelMap);
	}


	@RequestMapping(value = "/set/masterWork", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public BaseMsg setMasterWork(@RequestBody final PmsProduct product, HttpServletRequest request) {
		BaseMsg baseMsg = new BaseMsg();
		boolean b = pmsProductFacade.setMasterWork(product);
		if (b) {
			baseMsg.setCode(1);
			baseMsg.setResult("设置成功");
		} else {
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
	public BaseMsg modifyUserPhone(@RequestBody final PmsTeam team, final HttpServletRequest request) {
		SessionInfo info = getCurrentInfo(request);
		if (null != info) {
			final String code = (String) request.getSession().getAttribute("code");
			final String codeOfphone = (String) request.getSession().getAttribute("codeOfphone");
			if (code != null && !"".equals(code) && codeOfphone != null && !"".equals(codeOfphone)) {
				if (code.equals(team.getVerification_code())) {
					if (codeOfphone.equals(team.getPhoneNumber())) {
						team.setTeamId(info.getReqiureId());
						final long count = pmsTeamFacade.checkExist(team);
						if (count > 0) {
							return new BaseMsg(0, "手机号码已被占用");
						}
						final long ret = pmsTeamFacade.modifyTeamPhone(team);
						if (ret > 0) {
							return new BaseMsg(1, "success");
						}
						return new BaseMsg(0, "error");
					}
					return new BaseMsg(0, "手机号不匹配");
				}
				return new BaseMsg(0, "验证码错误");
			}
			return new BaseMsg(0, "参数无效");
		}
		return new BaseMsg(0, "error");
	}

	@RequestMapping("/info_{teamId}.html")
	public ModelAndView toProviderInfoView(HttpServletRequest request, ModelMap modelMap,
			@PathVariable("teamId") Long teamId) {
		// 传递导演信息
		PmsTeam result = pmsTeamFacade.getTeamInfo(teamId);
		if (result != null) {
			result.setTeamId(result.getId());
			modelMap.addAttribute("provider", result);
			// 加载导演标签
			String strtags = result.getBusiness();
			if (ValidateUtil.isValid(strtags)) {
				String[] tagsarray = strtags.split("\\,");
				List<Integer> ids = new ArrayList<>();
				for (int i = 0; i < tagsarray.length; i++) {
					ids.add(Integer.parseInt(tagsarray[i]));
				}
				List<String> tags = pmsTeamFacade.getTags(ids);
				modelMap.addAttribute("providerTags", JsonUtil.toJson(tags));
			} else {
				SessionInfo sessionInfo = getCurrentInfo(request);
				Log.error("provider business is null ...", sessionInfo);
			}
		} else {
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("Team is null ...", sessionInfo);
		}
		// 加载代表作
		PmsProduct product = pmsProductFacade.getMasterWork(teamId);
		if (product == null) {
			List<PmsProduct> products = pmsProductFacade.loadProductByTeam(teamId);
			if (ValidateUtil.isValid(products)) {
				product = products.get(0);
			} else {
				SessionInfo sessionInfo = getCurrentInfo(request);
				Log.error("product is null ...", sessionInfo);
			}
		}
		SessionInfo sessionInfo = getCurrentInfo(request);
		Log.error("set masterWork ... ", sessionInfo);
		if (product != null) {
			modelMap.addAttribute("product", product);
			String[] tags = product.getTags().split("\\ ");
			modelMap.addAttribute("tags", tags);
		} else {
			Log.error("product is null ...", sessionInfo);
		}
		return new ModelAndView("/provider/providerInfo", modelMap);
	}

	/**
	 * 验证供应商信息是否存在修改
	 */
	@RequestMapping("/validate/change")
	public boolean validateChange(@RequestBody final PmsTeam team, final HttpServletRequest request) {
		
		final PmsTeam oldTeam = pmsTeamFacade.findTeamById(team.getTeamId());
		team.setPassword(null);
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
	public boolean dealTeamTmpAndUpdateTeamDesc(@RequestBody final PmsTeam team, final HttpServletRequest request) {
		if (null != team) {
			String description = null == team.getDescription() ? "" : team.getDescription();
			team.setDescription(description);
			pmsTeamFacade.updateTeamDescription(team);
			pmsTeamFacade.dealTeamTmp(team);
			return true;
		}
		return false;
	}

	/**
	 * 获取user信息
	 */
	@RequestMapping("/getcurrentTeam")
	public BaseMsg updatePwd(HttpServletRequest request) {
		BaseMsg baseMsg = new BaseMsg();
		SessionInfo sessionInfo = getCurrentInfo(request);
		if (null != sessionInfo) {
			PmsTeam t = new PmsTeam();
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
	@RequestMapping(value="/product/visibility", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public BaseMsg setProductVisibility(HttpServletRequest request, @RequestBody final PmsProduct product) {

		BaseMsg baseMsg = new BaseMsg();
		SessionInfo sessionInfo = getCurrentInfo(request);
		if (null != sessionInfo) {
			if (sessionInfo.getReqiureId().equals(product.getTeamId())) {
				boolean bo = pmsProductFacade.updateProductVisibility(product);
				if (bo) {
					baseMsg.setCode(1);
					baseMsg.setResult("修改成功");
				} else {
					baseMsg.setCode(0);
					baseMsg.setResult("修改失败");
				}
			} else {
				baseMsg.setCode(0);
				baseMsg.setResult("无权限修改此功能");
			}
		} else {
			baseMsg.setCode(0);
			baseMsg.setResult("供应商未登录");
		}
		return baseMsg;
	}
	/**
	 * 初始化 sessionInfo 信息
	 * 
	 * @param user
	 * @param request
	 * @return
	 */
	public boolean initSessionInfo(final PmsTeam team, HttpServletRequest request) {

		// 清空session
		// sessionService.removeSession(request);
		final HttpSession session = request.getSession();
		session.removeAttribute(GlobalConstant.SESSION_INFO);
		// 存入session中
		final String sessionId = request.getSession().getId();
		final SessionInfo info = new SessionInfo();
		info.setLoginName(team.getLoginName());
		info.setRealName(team.getTeamName());
		info.setSessionType(GlobalConstant.ROLE_PROVIDER);
		// info.setSuperAdmin(false);
		info.setToken(DataUtil.md5(sessionId));
		info.setReqiureId(team.getTeamId());
		info.setPhoto(team.getTeamPhotoUrl());
		if (team.getFlag() == 1)
			info.setIsIdentification(true);
		
		final PmsRole role = pmsRoleFacade.findRoleById(2l); // 获取用户角色
		final List<PmsRole> roles = new ArrayList<PmsRole>();
		roles.add(role);
		team.setRoles(roles);
		// 计算权限码总和
		final long maxPos = pmsRightFacade.getMaxPos();
		final long[] rightSum = new long[(int) (maxPos + 1)];
		team.setRightSum(rightSum);
		team.calculateRightSum();
		info.setSum(team.getRightSum());
		info.setEmail(team.getEmail());
		info.setSuperAdmin(team.isSuperAdmin()); // 判断是否是超级管理员
		/*Map<String, Object> map = new HashMap<String, Object>();
		map.put(GlobalConstant.SESSION_INFO, info);*/
		session.setAttribute(GlobalConstant.SESSION_INFO, info);
		// return sessionService.addSessionSeveralTime(request, map, 60 * 60 * 24 * 7);
		return true;
	}
}