package com.panfeng.film.resource.controller;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Map;
import java.util.Properties;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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
import org.springframework.web.servlet.ModelAndView;

import com.google.code.kaptcha.Constants;
import com.google.code.kaptcha.Producer;
import com.panfeng.domain.SessionInfo;
import com.panfeng.film.domain.BaseMsg;
import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.resource.model.Info;
import com.panfeng.film.resource.model.ThirdBind;
import com.panfeng.film.resource.model.User;
import com.panfeng.film.resource.model.Wechat;
import com.panfeng.film.resource.model.WechatToken;
import com.panfeng.film.security.AESUtil;
import com.panfeng.film.service.SmsService;
import com.panfeng.film.util.Constants.loginType;
import com.panfeng.film.util.DataUtil;
import com.panfeng.film.util.HttpUtil;
import com.panfeng.film.util.JsonUtil;
import com.panfeng.film.util.Log;
import com.panfeng.film.util.ValidateUtil;

/**
 * 登陆事件 控制器
 * 
 * @author Jack
 */
@RestController
@RequestMapping("/login")
public class LoginController extends BaseController {

	final Logger serLogger = LoggerFactory.getLogger("service"); // service log

	final Logger logger = LoggerFactory.getLogger("error");

	private static String URL_PREFIX = null;

	private static String UNIQUE_KEY = "0102030405060708"; // AES 加密key

	@Autowired
	private SmsService smsService = null;

	@Autowired
	private Producer captchaProducer = null;

	public LoginController() {
		if (URL_PREFIX == null || "".equals(URL_PREFIX)) {
			final InputStream is = this.getClass().getClassLoader().getResourceAsStream("jdbc.properties");
			try {
				Properties propertis = new Properties();
				propertis.load(is);
				URL_PREFIX = propertis.getProperty("urlPrefix");
			} catch (IOException e) {
				Log.error("LoginController method:constructor load Properties fail ...",null);
				e.printStackTrace();
			}
		}
	}

	/**
	 * 验证登录操作
	 * 
	 * @return 是否成功
	 */
	@RequestMapping(value = "/doLogin", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public Info login(@RequestBody final User user, final HttpServletRequest request,
			final HttpServletResponse response) {
		final String code = (String) request.getSession().getAttribute("code");
		final String codeOfphone = (String) request.getSession().getAttribute("codeOfphone");
		if (user.getLoginType().equals(loginType.phone.getKey())) {// 手机号登录
			if ((!"".equals(code) && code != null)) {
				if (code.equals(user.getVerification_code())) {
					if (null != codeOfphone && codeOfphone.equals(user.getTelephone())) {
						final String url = URL_PREFIX + "portal/user/encipherment";
						String str = HttpUtil.httpPost(url, user, request);
						if (str != null && !"".equals(str)) {
							boolean result = JsonUtil.toBean(str, Boolean.class);
							if(result){
								addCookies(request,response);
								return new Info(true, "登录成功");
							}return new Info(false,"手机号或密码错误");
						}else{
							return new Info(false, "登录失败");
						}
					} else {
						return new Info(false, "和验证手机不符!");
					}
				} else {
					return new Info(false, "验证码输入错误!");
				}
			} else {
				return new Info(false, "请重新获取验证码!");
			}
		} else {// 用户名登录
			final String pwd = user.getPassword();
			final String loginName = user.getLoginName();
			if (ValidateUtil.isValid(loginName) && ValidateUtil.isValid(pwd)) {
				try {// 解密
					final String password = AESUtil.Decrypt(pwd, GlobalConstant.UNIQUE_KEY);
					user.setPassword(DataUtil.md5(password));
					final String url = URL_PREFIX + "portal/user/encipherment";
					String str = HttpUtil.httpPost(url, user, request);
					if (ValidateUtil.isValid(str)) {
						final boolean ret = JsonUtil.toBean(str, Boolean.class);
						if (ret) {
							addCookies(request,response);
							return new Info(true, "登录成功");
						} else {
							return new Info(false, "帐户名或密码错误");
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return new Info(false,"数据错误");
	}
	/**
	 * 验证用户手机号码是否注册
	 */
	@RequestMapping("/validation/phone")
	public BaseMsg validation(@RequestBody final User user, final ModelMap model, final HttpServletRequest request) {
		final String url = URL_PREFIX + "portal/user/valication/phone/" + user.getTelephone();
		String json = HttpUtil.httpGet(url, request);
		if ("true".equals(json)) { // 被注册
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("validation telephone " + user.getTelephone() + " can't register,Becase it is exist ...",sessionInfo);
			return new BaseMsg(BaseMsg.ERROR,"",false);
		} else if ("false".equals(json)) { // 未被注册
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("validation telephone " + user.getTelephone() + " can register,Becase it is not exist ...",sessionInfo);
			return new BaseMsg(BaseMsg.NORMAL,"",true);
		}
		return new BaseMsg(BaseMsg.ERROR,"服务器通信失败请稍后重试！",null);
	}

	/**
	 * 验证手机号码是否注册
	 */
	@RequestMapping("/validation/userName")
	public boolean validationUserName(@RequestBody Map<String, String> loginName, final ModelMap model,
			final HttpServletRequest request) {
		String userName_key = "loginName";
		final String url = URL_PREFIX + "portal/user/valication/loginname";
		String json = HttpUtil.httpPost(url, loginName, request);
		if ("true".equals(json)) { // 被注册
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("validation telephone " + loginName.get(userName_key) + " can't register,Becase it is exist ...",sessionInfo);
			return true;
		} else if ("false".equals(json)) { // 未被注册
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("validation telephone " + loginName.get(userName_key) + " can register,Becase it is not exist ...",sessionInfo);
			return false;
		}
		return false;
	}

	/**
	 * 验证手机号码是否注册
	 */
	@RequestMapping("/checkPwd")
	public BaseMsg checkPwd(@RequestBody User user, final HttpServletRequest request) {
		try {
			// AES 密码解密
			final String password = AESUtil.Decrypt(user.getPassword(), UNIQUE_KEY);
			// MD5加密
			user.setPassword(DataUtil.md5(password));

			final String url = URL_PREFIX + "portal/user/checkPwd";
			String json = HttpUtil.httpPost(url, user, request);
			if (json != null) {
				return new BaseMsg(BaseMsg.NORMAL, "请求成功", JsonUtil.toBean(json, Boolean.class));
			} else {
				return new BaseMsg(BaseMsg.ERROR, "请求失败，服务器繁忙！", false);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return new BaseMsg(BaseMsg.ERROR, "请求失败，密码解码失败！", false);
		}
	}

	/**
	 * 注册
	 */
	@RequestMapping("/register")
	public Info register(final HttpServletRequest request, @RequestBody final User user, final ModelMap model)
			throws Exception {
		//先验证手机号是否可以注册
		String url = URL_PREFIX + "portal/user/valication/phone/" + user.getTelephone();
		String json = HttpUtil.httpGet(url, request);
		if ("true".equals(json)) { // 被注册
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("validation telephone " + user.getTelephone() + " can't register,Becase it is exist ...",sessionInfo);
			return new Info(false, "该手机号已经注册");
		}
		final HttpSession session = request.getSession();
		final String code = (String) request.getSession().getAttribute("code");
		final String codeOfphone = (String) request.getSession().getAttribute("codeOfphone");
		Info info = new Info(); // 信息载体
		// 判断验证码
		if ((!"".equals(code) && code != null)) {
			if (code.equals(user.getVerification_code())) {
				if (null != codeOfphone && codeOfphone.equals(user.getTelephone())) {
					if (user.getPassword() != null && !"".equals(user.getPassword())) {
						// AES 密码解密
						final String password = AESUtil.Decrypt(user.getPassword(), UNIQUE_KEY);
						// MD5加密
						user.setPassword(DataUtil.md5(password));
						url = URL_PREFIX + "portal/user/register";
						String str = HttpUtil.httpPost(url, user, request);
						if (str != null && !"".equals(str)) {
							boolean ret = JsonUtil.toBean(str, Boolean.class);
							session.removeAttribute("code"); // 移除验证码
							info.setKey(ret);
							SessionInfo sessionInfo = getCurrentInfo(request);
							Log.error("Register User " + user.getUserName(),sessionInfo);
						} else {
							// 注册失败
							info.setKey(false);
							info.setValue("服务器繁忙，请稍候再试...");
							session.removeAttribute("code"); // 移除验证码
							SessionInfo sessionInfo = getCurrentInfo(request);
							Log.error("Register User " + user.getUserName()
							+ " failure ,Becase HttpClient Connect error... ",sessionInfo);
						}
					}
				} else {
					// 手机号错误
					info.setKey(false);
					info.setValue("手机号不正确!");
				}
			} else {
				// 验证码不匹配
				info.setKey(false);
				info.setValue("短信验证码不正确!");
				SessionInfo sessionInfo = getCurrentInfo(request);
				Log.error("Register User " + user.getUserName() + " failure ,Becase sms code not equal ...",sessionInfo);
			}
		} else {
			// 验证码为空
			info.setKey(false);
			info.setValue("点击获取验证码!");
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("Register User " + user.getUserName() + " failure ,Becase sms code is null ...",sessionInfo);
		}
		return info;
	}

	/**
	 * 发送验证码
	 */
	@RequestMapping("/verification/{telephone}")
	public boolean verification(final HttpServletRequest request, @PathVariable("telephone") final String telephone) {
		SessionInfo sessionInfo = getCurrentInfo(request);
		boolean isTest = com.panfeng.film.util.Constants.AUTO_TEST.equals("yes") ? true : false;
		final String code = DataUtil.random(true, 6);
		request.getSession().setAttribute("code", code); // 存放验证码
		request.getSession().setAttribute("codeOfphone", telephone); // 存放手机号
		if (!isTest) {
			final boolean ret = smsService.smsSend(GlobalConstant.SMS_VERIFICATION_CODE,telephone, new String[]{code,GlobalConstant.SMS_CODE_DURATION + "分钟"});
			Log.error("Send sms code " + code + " to telephone " + telephone,sessionInfo);
			return ret;
		}else{
			System.out.println("Send sms code " + code + " to telephone " + telephone);
		}
		return true;
	}

	/**
	 * 清除session中的验证码
	 */
	@RequestMapping("/clear/code")
	public int clearCode(final HttpServletRequest request) {

		request.getSession().removeAttribute("code");
		return 0;
	}

	/**
	 * kaptcha 生成 图片验证码
	 */
	@RequestMapping("/kaptcha.png")
	public ModelAndView getKaptchaImage(final HttpServletRequest request, final HttpServletResponse response) {
		final HttpSession session = request.getSession();

		response.setDateHeader("Expires", 0);
		response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate,max-age=0");
		response.addHeader("Cache-Control", "post-check=0, pre-check=0");
		response.setHeader("Pragma", "no-cache");
		response.setContentType("image/jpeg");

		final String kaptchaCode = captchaProducer.createText();
		session.setAttribute(Constants.KAPTCHA_SESSION_KEY, kaptchaCode);
		ServletOutputStream out = null;
		try {
			BufferedImage bi = captchaProducer.createImage(kaptchaCode);
			out = response.getOutputStream();
			ImageIO.write(bi, "jpg", out);
			out.flush();
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("create kaptcha code is " + kaptchaCode,sessionInfo);
		} catch (Exception e) {
			e.printStackTrace();
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("LoginController method:getKaptchaImage() Create Kaptcha error ...",sessionInfo);
		} finally {
			try {
				out.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	/**
	 * 图片验证码对比事件
	 */
	@RequestMapping("/kaptcha/compare/{kaptcha_code}")
	public Info compare(final HttpServletRequest request, @PathVariable("kaptcha_code") final String kaptcha_code) {

		final Info info = new Info();
		// 是否是测试程序
		boolean isTest = com.panfeng.film.util.Constants.AUTO_TEST.equals("yes") ? true : false;
		if (kaptcha_code != null && !"".equals(kaptcha_code)) {
			final String kaptchaCode = (String) request.getSession().getAttribute(Constants.KAPTCHA_SESSION_KEY);
			if (kaptchaCode != null && !"".equals(kaptcha_code)) {
				if (isTest || kaptchaCode.equalsIgnoreCase(kaptcha_code)) {
					info.setKey(true);
					SessionInfo sessionInfo = getCurrentInfo(request);
					Log.error("kaptcha code equal input code ...",sessionInfo);
				} else {
					// 验证码 不一致
					info.setKey(false);
					info.setValue("图片验证码输入错误!");
					SessionInfo sessionInfo = getCurrentInfo(request);
					Log.error("kaptcha code not equal input code ...",sessionInfo);
				}
			} else {
				// session 过时
				info.setKey(false);
				info.setValue("点击图片获取验证码!");
				SessionInfo sessionInfo = getCurrentInfo(request);
				Log.error("kaptcha code in session is past due ...",sessionInfo);
			}
		} else {
			// 图片验证码 为空
			info.setKey(false);
			info.setValue("请输入图片验证码!");
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("input code is empty ...",sessionInfo);
		}
		return info;
	}

	@RequestMapping("/modify/logName")
	public BaseMsg modifyLogName(final HttpServletRequest request, @RequestBody final User user) {
		try {
			final HttpSession session = request.getSession();
			final String code = (String) session.getAttribute("code");
			boolean isTest = com.panfeng.film.util.Constants.AUTO_TEST.equals("yes") ? true : false;
			if (isTest || (!"".equals(code) && code != null)) {
				if (isTest || (code.equals(user.getVerification_code()))) {
					if (user != null && ValidateUtil.isValid(user.getPassword())
							&& ValidateUtil.isValid(user.getLoginName())) {
						// AES 密码解密
						final String password = AESUtil.Decrypt(user.getPassword(), UNIQUE_KEY);
						// MD5 加密
						user.setPassword(DataUtil.md5(password));
						final String url = URL_PREFIX + "portal/user/modify/loginName";
						String str = HttpUtil.httpPost(url, user, request);
						if (str != null && !"".equals(str)) {
							boolean result = JsonUtil.toBean(str, Boolean.class);
							// 添加 session
							return new BaseMsg(BaseMsg.NORMAL, "请求正常", result);
						} else {
							return new BaseMsg(BaseMsg.ERROR, "服务器繁忙，请稍候再试...", false);
						}
					} else {
						return new BaseMsg(BaseMsg.ERROR, "密码或用户名不完整！", false);
					}
				} else {
					return new BaseMsg(BaseMsg.ERROR, "验证码错误！", false);
				}
			} else {
				return new BaseMsg(BaseMsg.ERROR, "请输入验证码！", false);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return new BaseMsg(BaseMsg.ERROR, "密码解码失败！", false);
		}

	}
	@RequestMapping("/modify/logName2")
	public BaseMsg modifyLogNameNoMsgAuth(final HttpServletRequest request, @RequestBody final User user) {
		if (user != null && ValidateUtil.isValid(user.getPassword())
				&& ValidateUtil.isValid(user.getLoginName())) {
			try {
				SessionInfo sessionInfo = getCurrentInfo(request);
				user.setId(sessionInfo.getReqiureId());
				// AES 密码解密
				final String password = AESUtil.Decrypt(user.getPassword(), UNIQUE_KEY);
				// MD5 加密
				user.setPassword(DataUtil.md5(password));
				final String url = URL_PREFIX + "portal/user/modify/loginName";
				String str = HttpUtil.httpPost(url, user, request);
				if (str != null && !"".equals(str)) {
					boolean result = JsonUtil.toBean(str, Boolean.class);
					// 添加 session
					return new BaseMsg(BaseMsg.NORMAL, "请求正常", result);
				} else {
					return new BaseMsg(BaseMsg.ERROR, "服务器繁忙，请稍候再试...", false);
				}
			} catch (Exception e) {
				e.printStackTrace();
				return new BaseMsg(BaseMsg.ERROR, "登陆错误，请重试！", false);
			}
		} else {
			return new BaseMsg(BaseMsg.ERROR, "密码或用户名不完整！", false);
		}
	}

	/**
	 * 密码重置
	 * 
	 * @throws Exception
	 */
	@RequestMapping("/doRecover")
	public Info recover(final HttpServletRequest request, @RequestBody final User user) throws Exception {

		final HttpSession session = request.getSession();
		// 密码重置
		final String code = (String) session.getAttribute("code");
		Info info = new Info(); // 信息载体
		// 判断验证码
		if (!"".equals(code) && code != null) {
			if (code.equals(user.getVerification_code())) {
				if (user.getPassword() != null && !"".equals(user.getPassword())) {
					// AES 密码解密
					final String password = AESUtil.Decrypt(user.getPassword(), UNIQUE_KEY);
					// MD5 加密
					user.setPassword(DataUtil.md5(password));
					final String url = URL_PREFIX + "portal/user/recover";
					String str = HttpUtil.httpPost(url, user, request);
					Boolean result = null;
					if (str != null && !"".equals(str)) {
						result = JsonUtil.toBean(str, Boolean.class);
						// 添加 session
						session.removeAttribute("code"); // 移除验证码
						info.setKey(result);
						SessionInfo sessionInfo = getCurrentInfo(request);
						Log.error("Recover user password success",sessionInfo);
						return info;
					} else {
						// 注册失败
						info.setKey(false);
						info.setValue("服务器繁忙，请稍候再试...");
						SessionInfo sessionInfo = getCurrentInfo(request);
						Log.error("Recover user (userId:" + user.getId()
						+ ") password error,becase HttpClient Connection error ...",sessionInfo);
						return info;
					}

				} else {
					// 验证码不匹配
					info.setKey(false);
					info.setValue("密码为空!");
					SessionInfo sessionInfo = getCurrentInfo(request);
					Log.error("Recover user (userId:" + user.getId() + ") password error,becase password is empty ...",sessionInfo);
					return info;
				}
			} else {
				// 验证码不匹配
				info.setKey(false);
				info.setValue("短信验证码不正确!");
				serLogger
						.info("Recover user (userId:" + user.getId() + ") password error,becase code is not equal ...");
				return info;
			}
		} else {
			// 验证码为空
			info.setKey(false);
			info.setValue("点击获取验证码!");
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("Recover user (userId:" + user.getId() + ") password error,becase code is empty ...",sessionInfo);
			return info;
		}
	}

	/**
	 * 退出登录
	 */
	@RequestMapping("/loginout")
	public ModelAndView loginout(final HttpServletRequest request,final HttpServletResponse response) {
		logOutCookie(request,response);
		request.getSession().removeAttribute(GlobalConstant.SESSION_INFO);
		return new ModelAndView("redirect:/");
	}

	/**
	 * 三方登录后 查询:有uniqueId 没有电话 跳转绑定页 1 有uniqueId 有电话 直接登录2 无uniqueId 无电话 跳转绑定页3
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/OAuthor")
	public ModelAndView oAuthor(final HttpServletRequest request, final HttpServletResponse response,
			final ModelMap model) {
		try {
			request.setCharacterEncoding("UTF-8");
			response.setContentType("text/html;charset=UTF-8");
			final String json = request.getParameter("json");
			final User user = new User().fromString(json, User.class);
			model.put("userName", user.getUserName());
			model.put("imgUrl", user.getImgUrl());
			model.put("unique", user.getUniqueId());
			if (user.getlType().equals("weibo")) {
				model.put("type", "wb");
			} else if (user.getlType().equals("qq")) {
				model.put("type", "qq");
			}
			// 查询该用户是否存在
			final String url = URL_PREFIX + "portal/user/thirdLogin/isExist";
			String str = HttpUtil.httpPost(url, user, request);
			Map<String, Object> map = JsonUtil.toBean(str, Map.class);
			if (null != map) {
				int code = Integer.parseInt(String.valueOf(map.get("code")));
				if (code == 2) {// 可直接登录
					return new ModelAndView("redirect:/mgr/index");
				} else if (code == 0) {// 不存在账户
					model.put("code", "0");
					return new ModelAndView("threeLogin", model);
				} else if (code == 1) {// 存在账号,需要更新手机号
					model.put("code", "1");
					model.put("userId", Long.parseLong(String.valueOf(map.get("userId"))));
					return new ModelAndView("threeLogin", model);
				}
			}
		} catch (Exception e) {
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("OAthur encoding error ...",sessionInfo);
			e.printStackTrace();
		}
		return new ModelAndView("redirect:/login");
	}

	/**
	 * 第三方登录-微信登陆
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/wechat/callback.do")
	public ModelAndView loginWithWeChat(@RequestParam("code") String code, final HttpServletRequest request,
			final ModelMap model) {
		SessionInfo sessionInfo = getCurrentInfo(request);
		if (code != null && !"".equals(code)) {
			WechatToken token = new WechatToken();
			token.setAppid(GlobalConstant.CUSTOMER_WEBCHAT_APPID);
			token.setSecret(GlobalConstant.CUSTOMER_WEBCHAT_APPSECRET);
			// 通过code获取access_token
			final StringBuffer tokenUrl = new StringBuffer();
			tokenUrl.append("https://api.weixin.qq.com/sns/oauth2/access_token?");
			tokenUrl.append("appid=" + token.getAppid());
			tokenUrl.append("&secret=" + token.getSecret());
			tokenUrl.append("&code=" + code);
			tokenUrl.append("&grant_type=authorization_code");
			final String str = HttpUtil.httpGet(tokenUrl.toString(), request);
			if (str != null && !"".equals(str)) {
				token = JsonUtil.toBean(str, WechatToken.class);
				token.setAppid(GlobalConstant.CUSTOMER_WEBCHAT_APPID);
				token.setSecret(GlobalConstant.CUSTOMER_WEBCHAT_APPSECRET);
			}

			if (token.getErrcode() == null) {
				// 正确
				if (token.getAccess_token() != null && !"".equals(token.getAccess_token())) { // token
																								// 超时
																								// 2小时
					final StringBuffer refreshUrl = new StringBuffer();
					refreshUrl.append("https://api.weixin.qq.com/sns/oauth2/refresh_token?");
					refreshUrl.append("appid=" + token.getAppid());
					refreshUrl.append("&grant_type=refresh_token");
					refreshUrl.append("&refresh_token=" + token.getRefresh_token());
					final String refreshObj = HttpUtil.httpGet(refreshUrl.toString(), request);
					if (refreshObj != null && !"".equals(refreshObj)) {
						token = JsonUtil.toBean(refreshObj, WechatToken.class);
					}
				}

				final StringBuffer userUrl = new StringBuffer();
				userUrl.append("https://api.weixin.qq.com/sns/userinfo?");
				userUrl.append("access_token=" + token.getAccess_token());
				userUrl.append("&openid=" + token.getOpenid());

				Wechat wechat = new Wechat();
				final String userStr = HttpUtil.httpGet(userUrl.toString(), request);
				if (userStr != null && !"".equals(userStr)) {
					wechat = JsonUtil.toBean(userStr, Wechat.class);
				}
				// 获取到 用户信息后，写入session
				if (wechat != null) {
					User user = new User();
					if (null != sessionInfo && ValidateUtil.isValid(sessionInfo.getReqiureId())) {// 用户已经登录,个人资料页绑定
						user.setUniqueId(token.getOpenid());
						user.setlType("wechat");
						user.setId(sessionInfo.getReqiureId());
						final String url = URL_PREFIX + "portal/user/info/bind";
						String s = HttpUtil.httpPost(url, user, request);
						Boolean b = JsonUtil.toBean(s, Boolean.class);
						if (b) {
							model.addAttribute("msg", "绑定成功");// 返回页面用作提示绑定成功
						} else
							model.addAttribute("msg", "该账号已经存在绑定");
						return new ModelAndView("redirect:/user/info");
					} else {
						try {
							user.setUserName(URLEncoder.encode(wechat.getNickname(), "UTF-8"));
							user.setImgUrl(wechat.getHeadimgurl());
							user.setlType("wechat");
							user.setUniqueId(token.getOpenid());
							user.setWechatUnique(token.getOpenid());
							model.put("userName", wechat.getNickname());
							model.put("imgUrl", wechat.getHeadimgurl());
							model.put("unique", token.getOpenid());
							model.put("type", "wechat");
							// 查询该用户是否存在
							final String url = URL_PREFIX + "portal/user/thirdLogin/isExist";
							final String json = HttpUtil.httpPost(url, user, request);
							Map<String, Object> map = JsonUtil.toBean(json, Map.class);
							if (null != map) {
								int num = Integer.parseInt(String.valueOf(map.get("code")));
								if (num == 2) {// 可直接登录
									return new ModelAndView("redirect:/mgr/index");
								} else if (num == 0) {// 不存在账户
									model.put("code", "0");
									return new ModelAndView("threeLogin", model);
								} else if (num == 1) {// 存在账号,需要更新手机号
									model.put("code", "1");
									model.put("userId", Long.parseLong(String.valueOf(map.get("userId"))));
									return new ModelAndView("threeLogin", model);
								}
							}
							return new ModelAndView("redirect:/");
						} catch (UnsupportedEncodingException e) {
							Log.error("UserName Encode error on Wechat Login Process ...",sessionInfo);
							e.printStackTrace();
						}
					}
				}
			} else {
				// 错误
				Log.error("wechat login error ... ",sessionInfo);
			}

		}
		return new ModelAndView("redirect:/login");
	}

	/**
	 * 第三方登录验证手机号码 register:0未注册||1注册 qq:0未绑定||1绑定 wechat: wb:
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/threeLogin/phone", method = RequestMethod.POST)
	public Map<String, Object> threeLoginPhone(@RequestBody final User user, final ModelMap model,
			final HttpServletRequest request) {
		final String url = URL_PREFIX + "portal/user/threeLogin/phone/" + user.getTelephone();
		String json = HttpUtil.httpGet(url, request);
		Map<String, Object> map = JsonUtil.toBean(json, Map.class);
		return map;
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/third/bind", method = RequestMethod.POST)
	public Info thirdBind(@RequestBody final ThirdBind bind, final HttpServletRequest request) {
		final String code = (String) request.getSession().getAttribute("code");
		final String codeOfphone = (String) request.getSession().getAttribute("codeOfphone");
		Info info = new Info(); // 信息载体
		if (!"".equals(code) && code != null) {
			if (code.equals(bind.getVerification_code())) {
				if (null != codeOfphone && codeOfphone.equals(bind.getTelephone())) {
					final String url = URL_PREFIX + "portal/user/bindthird";
					String str = HttpUtil.httpPost(url, bind, request);
					if (str != null && !"".equals(str)) {
						Map<String, Object> map = JsonUtil.toBean(str, Map.class);
						String num = String.valueOf(map.get("code"));
						if ("1".equals(num)) {
							info.setKey(true);
						} else {
							String msg = String.valueOf(map.get("msg"));
							info.setKey(false);
							info.setValue(msg);
						}
					}
				} else {
					// 手机号错误
					info.setKey(false);
					info.setValue("手机号不正确!");
					return info;
				}
			} else {
				// 验证码不匹配
				info.setKey(false);
				info.setValue("短信验证码不正确!");
				return info;
			}
		} else {
			// 验证码为空
			info.setKey(false);
			info.setValue("点击获取验证码!");
		}
		return info;
	}
}