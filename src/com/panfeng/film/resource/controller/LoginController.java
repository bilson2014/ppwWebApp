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
import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.resource.model.Info;
import com.panfeng.film.resource.model.ThirdBind;
import com.panfeng.film.resource.model.User;
import com.panfeng.film.resource.model.Wechat;
import com.panfeng.film.resource.model.WechatToken;
import com.panfeng.film.security.AESUtil;
import com.panfeng.film.service.SessionInfoService;
import com.panfeng.film.service.SmsService;
import com.panfeng.film.util.DataUtil;
import com.panfeng.film.util.HttpUtil;
import com.panfeng.film.util.JsonUtil;
import com.panfeng.film.util.ValidateUtil;
import com.panfeng.film.util.Constants.loginType;

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

	@Autowired
	private SessionInfoService service = null;

	public LoginController() {
		if (URL_PREFIX == null || "".equals(URL_PREFIX)) {
			final InputStream is = this.getClass().getClassLoader().getResourceAsStream("jdbc.properties");
			try {
				Properties propertis = new Properties();
				propertis.load(is);
				URL_PREFIX = propertis.getProperty("urlPrefix");
			} catch (IOException e) {
				logger.error("LoginController method:constructor load Properties fail ...");
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
	public Info login(@RequestBody final User user, final HttpServletRequest request) {
		// add by wanglc 2016-7-5 16:36:44 登录需要验证码 begin
		final String code = (String) request.getSession().getAttribute("code");
		final String codeOfphone = (String) request.getSession().getAttribute("codeOfphone");
		//是否是测试程序
		boolean isTest = com.panfeng.film.util.Constants.AUTO_TEST.equals("yes")?true:false;
		Info info = new Info();
		
		if(user.getLoginType().equals(loginType.phone.getKey())){//手机号登录
			try {
				if (isTest || (!"".equals(code) && code != null)) {
					if (isTest || code.equals(user.getVerification_code())) {
						if(isTest || (null!=codeOfphone&&codeOfphone.equals(user.getTelephone()))){
							//add by wanglc 2016-7-5 16:36:44 登录需要验证码 end
							if (user != null && user.getPassword() != null
									&& !"".equals(user.getPassword())) {
								// AES密码解密
								final String password = AESUtil.Decrypt(user.getPassword(),
										UNIQUE_KEY);
								// MD5
								user.setPassword(DataUtil.md5(password));
								// 登录远程服务器进行比对
								final String url = URL_PREFIX + "portal/user/encipherment";
								String str = HttpUtil.httpPost(url, user,request);
								//User information = null;
								if (str != null && !"".equals(str)) {
									boolean result = JsonUtil.toBean(str, Boolean.class);
									info.setKey(result);
									info.setValue("登录成功");
									return info;
								} 
								info.setKey(false);
								info.setValue("登录失败");
								return info;
							}
						}else{
							// 手机号错误
							info.setKey(false);
							info.setValue("和验证手机不符!");
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
			} catch (Exception e) {
				logger.error("LoginController method:login() User Password Decrypt Error ...");
				e.printStackTrace();
			}
		}else{//用户名登录
			final String pwd = user.getPassword();
			final String loginName = user.getLoginName();
			if (ValidateUtil.isValid(loginName) && ValidateUtil.isValid(pwd)) {
				try {// 解密
					final String password = AESUtil.Decrypt(pwd, GlobalConstant.UNIQUE_KEY);
					user.setPassword(DataUtil.md5(password));
					final String url = URL_PREFIX + "portal/user/encipherment";
					String str = HttpUtil.httpPost(url, user,request);
					if (ValidateUtil.isValid(str)) {
						final boolean ret = JsonUtil.toBean(str, Boolean.class);
						if (ret) {
							info.setKey(true);
							info.setValue("登录成功");
						}else{
							info.setKey(false);
							info.setValue("登录失败");
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}

		return info;
	}

	/**
	 * 验证手机号码是否注册
	 */
	@RequestMapping("/validation/phone")
	public boolean validation(@RequestBody final User user, final ModelMap model, final HttpServletRequest request) {
		final String url = URL_PREFIX + "portal/user/valication/phone/" + user.getTelephone();
		String json = HttpUtil.httpGet(url, request);
		if ("true".equals(json)) { // 被注册
			serLogger.info("validation telephone " + user.getTelephone() + " can't register,Becase it is exist ...");
			return true;
		} else if ("false".equals(json)) { // 未被注册
			serLogger.info("validation telephone " + user.getTelephone() + " can register,Becase it is not exist ...");
			return false;
		}
		return false;
	}
	
	/**
	 * 验证手机号码是否注册
	 */
	@RequestMapping("/validation/userName")
	public boolean validationUserName(@RequestBody Map<String,String> userName, final ModelMap model, final HttpServletRequest request) {
		String userName_key = "username";
		final String url = URL_PREFIX + "portal/user/valication/loginname";
		String json = HttpUtil.httpPost(url, userName, request);
		if ("true".equals(json)) { // 被注册
			serLogger.info("validation telephone " + userName.get(userName_key) + " can't register,Becase it is exist ...");
			return true;
		} else if ("false".equals(json)) { // 未被注册
			serLogger.info("validation telephone " + userName.get(userName_key) + " can register,Becase it is not exist ...");
			return false;
		}
		return false;
	}

	/**
	 * 注册
	 */
	@RequestMapping("/register")
	public Info register(final HttpServletRequest request, @RequestBody final User user, final ModelMap model)
			throws Exception {

		final HttpSession session = request.getSession();
		final String code = (String) request.getSession().getAttribute("code");
		final String codeOfphone = (String) request.getSession().getAttribute("codeOfphone");
		Info info = new Info(); // 信息载体
		//是否是测试程序
		boolean isTest = com.panfeng.film.util.Constants.AUTO_TEST.equals("yes")?true:false;
		// 判断验证码
		if (isTest || (!"".equals(code) && code != null)) {
			if (isTest || code.equals(user.getVerification_code())) {
				if(isTest || (null!=codeOfphone&&codeOfphone.equals(user.getTelephone()))){
					if (user.getPassword() != null
							&& !"".equals(user.getPassword())) {
						// AES 密码解密
						final String password = AESUtil.Decrypt(user.getPassword(),
								UNIQUE_KEY);
						// MD5加密
						user.setPassword(DataUtil.md5(password));
						final String url = URL_PREFIX + "portal/user/register";
						String str = HttpUtil.httpPost(url, user,request);
						//User information = null;
						if (str != null && !"".equals(str)) {
							boolean ret = JsonUtil.toBean(str, Boolean.class);
							session.removeAttribute("code"); // 移除验证码
							info.setKey(ret);
							
							serLogger.info("Register User "
									+ user.getUserName());
							return info;
						} else {
							// 注册失败
							info.setKey(false);
							info.setValue("服务器繁忙，请稍候再试...");
							session.removeAttribute("code"); // 移除验证码

							serLogger
									.info("Register User "
											+ user.getUserName()
											+ " failure ,Becase HttpClient Connect error... ");
							return info;
						}
					} else {
						// 验证码不匹配
						info.setKey(false);
						info.setValue("密码为空!");

						serLogger.info("Register User " + user.getUserName()
								+ " failure ,Becase password is empty ...");
						return info;
					}
				}else{
					// 手机号错误
					info.setKey(false);
					info.setValue("手机号不正确!");
					return info;
				}
			} else {
				// 验证码不匹配
				info.setKey(false);
				info.setValue("短信验证码不正确!");

				serLogger.info("Register User " + user.getUserName() + " failure ,Becase sms code not equal ...");
				return info;
			}
		} else {
			// 验证码为空
			info.setKey(false);
			info.setValue("点击获取验证码!");

			serLogger.info("Register User " + user.getUserName() + " failure ,Becase sms code is null ...");
			return info;
		}
	}

	/**
	 * 发送验证码
	 */
	@RequestMapping("/verification/{telephone}")
	public boolean verification(final HttpServletRequest request, @PathVariable("telephone") final String telephone) {
		final String code = DataUtil.random(true, 6);
		final boolean ret = smsService.smsSend(telephone, code);
		request.getSession().setAttribute("code", code); // 存放验证码
		request.getSession().setAttribute("codeOfphone", telephone); // 存放手机号
		serLogger.info("Send sms code " + code + " to telephone " + telephone);
		return ret;
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
			serLogger.info("create kaptcha code is " + kaptchaCode);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("LoginController method:getKaptchaImage() Create Kaptcha error ...");
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
		//是否是测试程序
		boolean isTest = com.panfeng.film.util.Constants.AUTO_TEST.equals("yes")?true:false;
		if (kaptcha_code != null && !"".equals(kaptcha_code)) {
			final String kaptchaCode = (String) request.getSession().getAttribute(Constants.KAPTCHA_SESSION_KEY);
			if (kaptchaCode != null && !"".equals(kaptcha_code)) {
				if (isTest || kaptchaCode.equalsIgnoreCase(kaptcha_code)) {
					info.setKey(true);
					serLogger.info("kaptcha code equal input code ...");
				} else {
					// 验证码 不一致
					info.setKey(false);
					info.setValue("图片验证码输入错误!");
					serLogger.info("kaptcha code not equal input code ...");
				}
			} else {
				// session 过时
				info.setKey(false);
				info.setValue("点击图片获取验证码!");
				serLogger.info("kaptcha code in session is past due ...");
			}
		} else {
			// 图片验证码 为空
			info.setKey(false);
			info.setValue("请输入图片验证码!");
			serLogger.info("input code is empty ...");
		}
		return info;
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
						serLogger.info("Recover user password success");
						return info;
					} else {
						// 注册失败
						info.setKey(false);
						info.setValue("服务器繁忙，请稍候再试...");
						serLogger.info("Recover user (userId:" + user.getId()
								+ ") password error,becase HttpClient Connection error ...");
						return info;
					}

				} else {
					// 验证码不匹配
					info.setKey(false);
					info.setValue("密码为空!");
					serLogger.info(
							"Recover user (userId:" + user.getId() + ") password error,becase password is empty ...");
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
			serLogger.info("Recover user (userId:" + user.getId() + ") password error,becase code is empty ...");
			return info;
		}
	}

	/**
	 * 退出登录
	 */
	@RequestMapping("/loginout")
	public ModelAndView loginout(final HttpServletRequest request) {

		service.removeSession(request);
		return new ModelAndView("redirect:/");
	}

	/**
	 * 三方登录后
	 * 查询:有uniqueId 没有电话  跳转绑定页 1
	 * 	  有uniqueId 有电话  直接登录2
	 *   无uniqueId 无电话 跳转绑定页3
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
			if(user.getlType().equals("weibo")){
				model.put("type", "wb");
			}else if(user.getlType().equals("qq")){
				model.put("type", "qq");
			}
			// 查询该用户是否存在
			final String url = URL_PREFIX + "portal/user/thirdLogin/isExist";
			String str = HttpUtil.httpPost(url, user,request);
			Map<String, Object> map = JsonUtil.toBean(str, Map.class);
			if(null!=map){
				int code = Integer.parseInt(String.valueOf(map.get("code")));
				if(code==2){//可直接登录
					return new ModelAndView("redirect:/mgr/index");
				}else if(code==0){//不存在账户
					model.put("code", "0");
					return new ModelAndView("threeLogin",model);
				}else if(code==1){//存在账号,需要更新手机号
					model.put("code", "1");
					model.put("userId", Long.parseLong(String.valueOf(map.get("userId"))));
					return new ModelAndView("threeLogin",model);
				}
			}
		} catch (Exception e) {
			logger.error("OAthur encoding error ...");
			e.printStackTrace();
		}
		return new ModelAndView("redirect:/login");
	}

	/**
	 * 第三方登录-微信登陆
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/wechat/callback.do")
	public ModelAndView loginWithWeChat(@RequestParam("code") String code,
			final HttpServletRequest request, final ModelMap model) {

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
			final String str = HttpUtil.httpGet(tokenUrl.toString(),request);
			if (str != null && !"".equals(str)) {
				token = JsonUtil.toBean(str, WechatToken.class);
				token.setAppid(GlobalConstant.CUSTOMER_WEBCHAT_APPID);
				token.setSecret(GlobalConstant.CUSTOMER_WEBCHAT_APPSECRET);
			}

			if (token.getErrcode() == null) {
				// 正确
				if (token.getAccess_token() != null
						&& !"".equals(token.getAccess_token())) { // token 超时
																	// 2小时
					final StringBuffer refreshUrl = new StringBuffer();
					refreshUrl
							.append("https://api.weixin.qq.com/sns/oauth2/refresh_token?");
					refreshUrl.append("appid=" + token.getAppid());
					refreshUrl.append("&grant_type=refresh_token");
					refreshUrl.append("&refresh_token="
							+ token.getRefresh_token());
					final String refreshObj = HttpUtil.httpGet(refreshUrl
							.toString(),request);
					if (refreshObj != null && !"".equals(refreshObj)) {
						token = JsonUtil.toBean(refreshObj, WechatToken.class);
					}
				}

				final StringBuffer userUrl = new StringBuffer();
				userUrl.append("https://api.weixin.qq.com/sns/userinfo?");
				userUrl.append("access_token=" + token.getAccess_token());
				userUrl.append("&openid=" + token.getOpenid());

				Wechat wechat = new Wechat();
				final String userStr = HttpUtil.httpGet(userUrl.toString(),request);
				if (userStr != null && !"".equals(userStr)) {
					wechat = JsonUtil.toBean(userStr, Wechat.class);
				}
				// 获取到 用户信息后，写入session
				if (wechat != null) {
					User user = new User();
					try {
						user.setUserName(URLEncoder.encode(
								wechat.getNickname(), "UTF-8"));
						user.setImgUrl(wechat.getHeadimgurl());
						user.setlType("wechat");
						user.setUniqueId(token.getOpenid());
						user.setWechatUnique(token.getOpenid());
						model.put("userName", wechat.getNickname());
						model.put("imgUrl", wechat.getHeadimgurl());
						model.put("unique", token.getOpenid());
						model.put("type", "wechat");
						// 查询该用户是否存在
						final String url = URL_PREFIX
								+ "portal/user/thirdLogin/isExist";
						final String json = HttpUtil.httpPost(url, user,request);
						Map<String, Object> map = JsonUtil.toBean(json, Map.class);
						if(null!=map){
							int num = Integer.parseInt(String.valueOf(map.get("code")));
							if(num==2){//可直接登录
								return new ModelAndView("redirect:/mgr/index");
							}else if(num==0){//不存在账户
								model.put("code", "0");
								return new ModelAndView("threeLogin",model);
							}else if(num==1){//存在账号,需要更新手机号
								model.put("code", "1");
								model.put("userId", Long.parseLong(String.valueOf(map.get("userId"))));
								return new ModelAndView("threeLogin",model);
							}
						}
						return new ModelAndView("redirect:/");
					} catch (UnsupportedEncodingException e) {
						logger.error("UserName Encode error on Wechat Login Process ...");
						e.printStackTrace();
					}
				}
			} else {
				// 错误
				logger.error("wechat login error ... ");
			}

		}
		return new ModelAndView("redirect:/login");
	}
	
	//add by wanglc 2016-7-6 15:13:47 第三方登录绑定页面验证手机号码 begin
	/**
	 * 第三方登录验证手机号码
	 * register:0未注册||1注册
	 * qq:0未绑定||1绑定
	 * wechat:
	 * wb:
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/threeLogin/phone",method=RequestMethod.POST)
	public Map<String, Object> threeLoginPhone(@RequestBody final User user, final ModelMap model,final HttpServletRequest request) {
		final String url = URL_PREFIX + "portal/user/threeLogin/phone/"
				+ user.getTelephone();
		String json = HttpUtil.httpGet(url,request);
		Map<String, Object> map = JsonUtil.toBean(json, Map.class);
		return map;
	}
	
	//add by wanglc 2016-7-6 15:13:47 第三方登录绑定页面验证手机号码 end
	
	//add by wanglc 2016-7-6 15:13:47 第三方登录绑定页面绑定手机 begin
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/third/bind",method=RequestMethod.POST)
	public Info thirdBind(@RequestBody final ThirdBind bind,final HttpServletRequest request) {
		final String code = (String) request.getSession().getAttribute("code");
		final String codeOfphone = (String) request.getSession().getAttribute("codeOfphone");
		Info info = new Info(); // 信息载体
		if (!"".equals(code) && code != null) {
			if (code.equals(bind.getVerification_code())) {
				if(null!=codeOfphone&&codeOfphone.equals(bind.getTelephone())){
					
					final String url = URL_PREFIX + "portal/user/bindthird";
					String str = HttpUtil.httpPost(url,bind,request);
					if (str != null && !"".equals(str)) {
						Map<String, Object> map = JsonUtil.toBean(str, Map.class);
						String num = String.valueOf(map.get("code"));
						if("1".equals(num)){
							info.setKey(true);
						}else{
							String msg = String.valueOf(map.get("msg"));
							info.setKey(false);
							info.setValue(msg);
						}
					}
				}else{
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
		}else {
			// 验证码为空
			info.setKey(false);
			info.setValue("点击获取验证码!");
		}
		return info;
	}
	
	//add by wanglc 2016-7-6 15:13:47 第三方登录绑定页面绑定手机 end
}