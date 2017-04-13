package com.panfeng.film.resource.controller;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.paipianwang.pat.common.config.PublicConfig;
import com.paipianwang.pat.common.constant.PmsConstant;
import com.paipianwang.pat.common.entity.SessionInfo;
import com.paipianwang.pat.common.enums.LoginType;
import com.paipianwang.pat.common.util.ValidateUtil;
import com.paipianwang.pat.common.web.security.AESUtil;
import com.paipianwang.pat.facade.right.entity.PmsRole;
import com.paipianwang.pat.facade.right.service.PmsRightFacade;
import com.paipianwang.pat.facade.right.service.PmsRoleFacade;
import com.paipianwang.pat.facade.user.entity.PmsUser;
import com.paipianwang.pat.facade.user.entity.ThirdBind;
import com.paipianwang.pat.facade.user.service.PmsUserFacade;
import com.panfeng.film.domain.BaseMsg;
import com.panfeng.film.mq.service.SmsMQService;
import com.panfeng.film.resource.model.Info;
import com.panfeng.film.resource.model.User;
import com.panfeng.film.resource.model.Wechat;
import com.panfeng.film.resource.model.WechatToken;
import com.panfeng.film.service.SmsService;
import com.panfeng.film.util.DataUtil;
import com.panfeng.film.util.HttpUtil;
import com.panfeng.film.util.JsonUtil;
import com.panfeng.film.util.Log;

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

	@Autowired
	private SmsService smsService = null;
	
	@Autowired
	private PmsUserFacade pmsUserFacade = null;
	@Autowired
	private PmsRoleFacade pmsRoleFacade = null;
	@Autowired
	private PmsRightFacade pmsRightFacade = null;
	@Autowired
	private SmsMQService smsMQService = null;

	@Autowired
	private Producer captchaProducer = null;

	/**
	 * 验证登录操作
	 * 
	 * @return 是否成功
	 */
	@RequestMapping(value = "/doLogin", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public Info login(@RequestBody final PmsUser user, final HttpServletRequest request,
			final HttpServletResponse response) {
		if (user.getLoginType().equals(LoginType.PHONE.getDesc())) {// 手机号登录
			return loginByPhone(user,request,response);
		} else {// 用户名登录
			return loginByName(user,request,response);
		}
	}
	
	private Info loginByName(PmsUser user, HttpServletRequest request, HttpServletResponse response) {
		final String pwd = user.getPassword();
		final String loginName = user.getLoginName();
		if (ValidateUtil.isValid(loginName) && ValidateUtil.isValid(pwd)) {
			try {
				String password = AESUtil.Decrypt(pwd, PmsConstant.UNIQUE_KEY);
				user.setPassword(DataUtil.md5(password));
				PmsUser orignUser = pmsUserFacade.findUserByLoginNameAndPwd(user);
				if(null != orignUser){
					initSessionInfo(orignUser, request);
					addCookies(request,response);
					return new Info(true, "登录成功");
				}else{
					return new Info(false, "帐户名或密码错误");
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return new Info(false,"数据错误");
	}

	private Info loginByPhone(PmsUser user, HttpServletRequest request, HttpServletResponse response) {
		final String code = (String) request.getSession().getAttribute("code");
		final String codeOfphone = (String) request.getSession().getAttribute("codeOfphone");
		if ((!"".equals(code) && code != null)) {
			if (code.equals(user.getVerification_code())) {
				if (null != codeOfphone && codeOfphone.equals(user.getTelephone())) {
					PmsUser orignUser = pmsUserFacade.findUserByAttr(user);
					if (orignUser != null) {
						// 清空当前session
						// sessionService.removeSession(request);
						initSessionInfo(orignUser, request);
						addCookies(request,response);
						return new Info(true, "登录成功");
					}else{
						return new Info(false, "手机号或密码错误");
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
	}

	/**
	 * 验证用户手机号码是否注册
	 */
	@RequestMapping("/validation/phone")
	public BaseMsg validation(@RequestBody final User user, final ModelMap model, final HttpServletRequest request) {
		final int count = pmsUserFacade.validationPhone(user.getTelephone(), null);
		if (count > 0) {
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("validation telephone " + user.getTelephone() + " can't register,Becase it is exist ...",sessionInfo);
			return new BaseMsg(BaseMsg.ERROR,"",false);
		}else if(count == 0){
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("validation telephone " + user.getTelephone() + " can register,Becase it is not exist ...",sessionInfo);
			return new BaseMsg(BaseMsg.NORMAL,"",true);
		}
		return new BaseMsg(BaseMsg.ERROR,"服务器通信失败请稍后重试！",null);
	}

	@RequestMapping("/validation/userName")
	public boolean validationUserName(@RequestBody Map<String, String> loginName, final ModelMap model,
			final HttpServletRequest request) {
		String userName_key = "loginName";
		if (!ValidateUtil.isValid(loginName)) {
			return false;
		}
		final int count = pmsUserFacade.validationPhone(null, loginName.get("loginName"));
		if (count > 0) {
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("validation telephone " + loginName.get(userName_key) + " can't register,Becase it is exist ...",sessionInfo);
			return true;
		}else if(count == 0){
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("validation telephone " + loginName.get(userName_key) + " can register,Becase it is not exist ...",sessionInfo);
			return false;
		}
		return false;
	}

	/**
	 * 注册
	 */
	@RequestMapping("/register")
	public Info register(final HttpServletRequest request, @RequestBody final PmsUser user, final ModelMap model)
			throws Exception {
		//先验证手机号是否可以注册
		final int count = pmsUserFacade.validationPhone(user.getTelephone(), null);
		if(count>0){
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("validation telephone " + user.getTelephone() + " can't register,Becase it is exist ...",sessionInfo);
			return new Info(false, "该手机号已经注册");
		}
		final HttpSession session = request.getSession();
		final String code = (String) session.getAttribute("code");
		final String codeOfphone = (String) session.getAttribute("codeOfphone");
		Info info = new Info(); // 信息载体
		// 判断验证码
		if ((!"".equals(code) && code != null)) {
			if (code.equals(user.getVerification_code())) {
				if (null != codeOfphone && codeOfphone.equals(user.getTelephone())) {
					if (user.getPassword() != null && !"".equals(user.getPassword())) {
						// AES 密码解密
						final String password = AESUtil.Decrypt(user.getPassword(), PmsConstant.UNIQUE_KEY);
						// MD5加密
						user.setPassword(DataUtil.md5(password));
						//session.removeAttribute("code"); // 移除验证码
						PmsUser result = pmsUserFacade.register(user);
						if(null != result){
							info.setKey(true);
							SessionInfo sessionInfo = getCurrentInfo(request);
							Log.error("Register User " + user.getUserName(),sessionInfo);
							smsMQService.sendMessage("132269", user.getTelephone(), null);
							Log.error("save user...",null);
							//return initSessionInfo(result, request);
							initSessionInfo(result, request);
						}else{
							// 注册失败
							info.setKey(false);
							info.setValue("服务器繁忙，请稍候再试...");
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
		boolean isTest = PublicConfig.IS_AUTO_TEST.equals("yes") ? true : false;
		final String code = DataUtil.random(true, 6);
		request.getSession().setAttribute("code", code); // 存放验证码
		request.getSession().setAttribute("codeOfphone", telephone); // 存放手机号
		if (!isTest) {
			final boolean ret = smsService.smsSend(PublicConfig.SMS_VERIFICATION_CODE,telephone, new String[]{code,PublicConfig.SMS_CODE_DURATION + "分钟"});
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
		boolean isTest = PublicConfig.IS_AUTO_TEST.equals("yes") ? true : false;
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
	public BaseMsg modifyLogName(final HttpServletRequest request, @RequestBody final PmsUser user) {
		try {
			final HttpSession session = request.getSession();
			final String code = (String) session.getAttribute("code");
			if (!"".equals(code) && code != null) {
				if (code.equals(user.getVerification_code())) {
					if (user != null && ValidateUtil.isValid(user.getPassword())
							&& ValidateUtil.isValid(user.getLoginName())) {
						// AES 密码解密
						final String password = AESUtil.Decrypt(user.getPassword(), PmsConstant.UNIQUE_KEY);
						// MD5 加密
						user.setPassword(DataUtil.md5(password));
						
						boolean result = pmsUserFacade.modifyUserLoginName(user) > 0 ? true : false;
						if (result) {
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
	public BaseMsg modifyLogNameNoMsgAuth(final HttpServletRequest request, @RequestBody final PmsUser user) {
		if (user != null && ValidateUtil.isValid(user.getPassword())
				&& ValidateUtil.isValid(user.getLoginName())) {
			try {
				SessionInfo sessionInfo = getCurrentInfo(request);
				user.setId(sessionInfo.getReqiureId());
				// AES 密码解密
				final String password = AESUtil.Decrypt(user.getPassword(), PmsConstant.UNIQUE_KEY);
				// MD5 加密
				user.setPassword(DataUtil.md5(password));
				
				boolean result = pmsUserFacade.modifyUserLoginName(user) > 0 ? true : false;
				if (result) {
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
	 * 退出登录
	 */
	@RequestMapping("/loginout")
	public ModelAndView loginout(final HttpServletRequest request,final HttpServletResponse response) {
		logOutCookie(request,response);
		request.getSession().removeAttribute(PmsConstant.SESSION_INFO);
		return new ModelAndView("redirect:/");
	}

	/**
	 * 三方登录后 查询:有uniqueId 没有电话 跳转绑定页 1 有uniqueId 有电话 直接登录2 无uniqueId 无电话 跳转绑定页3
	 */
	@RequestMapping("/OAuthor")
	public ModelAndView oAuthor(final HttpServletRequest request, final HttpServletResponse response,
			final ModelMap model) {
		try {
			request.setCharacterEncoding("UTF-8");
			response.setContentType("text/html;charset=UTF-8");
			final String json = request.getParameter("json");
			final PmsUser user = new PmsUser().fromString(json, PmsUser.class);
			model.put("userName", user.getUserName());
			model.put("imgUrl", user.getImgUrl());
			model.put("unique", user.getUniqueId());
			if (user.getlType().equals("weibo")) {
				model.put("type", "wb");
			} else if (user.getlType().equals("qq")) {
				model.put("type", "qq");
			}
			// 查询该用户是否存在
			if (user != null) {
				final List<PmsUser> users = pmsUserFacade.verificationUserExistByThirdLogin(user);
				if (users.size() < 1) { // 用户不存在
					model.put("code", "0");
					return new ModelAndView("threeLogin", model);
				} else {
					final PmsUser u = users.get(0);
					if (null != u.getTelephone() && !"".equals(u.getTelephone())) {// 手机号存在,直接登录
						// 清除当前session
						// sessionService.removeSession(request);
						// 存入session中
						initSessionInfo(u, request);
						return new ModelAndView("redirect:/mgr/index");
					} else {// 手机号不存在,绑定页
						model.put("code", "1");
						model.put("userId", Long.toString(u.getId()));
						return new ModelAndView("threeLogin", model);
					}
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
	@RequestMapping("/wechat/callback.do")
	public ModelAndView loginWithWeChat(@RequestParam("code") String code, final HttpServletRequest request,
			final ModelMap model) {
		SessionInfo sessionInfo = getCurrentInfo(request);
		if (code != null && !"".equals(code)) {
			WechatToken token = new WechatToken();
			token.setAppid(PmsConstant.CUSTOMER_WEBCHAT_APPID);
			token.setSecret(PmsConstant.CUSTOMER_WEBCHAT_APPSECRET);
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
				token.setAppid(PmsConstant.CUSTOMER_WEBCHAT_APPID);
				token.setSecret(PmsConstant.CUSTOMER_WEBCHAT_APPSECRET);
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
					PmsUser user = new PmsUser();
					if (null != sessionInfo && ValidateUtil.isValid(sessionInfo.getReqiureId())) {// 用户已经登录,个人资料页绑定
						user.setUniqueId(token.getOpenid());
						user.setlType("wechat");
						user.setId(sessionInfo.getReqiureId());
						boolean b = pmsUserFacade.userInfoBind(user);
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
							if (user != null) {
								final List<PmsUser> users = pmsUserFacade.verificationUserExistByThirdLogin(user);
								if (users.size() < 1) { // 用户不存在
									model.put("code", "0");
									return new ModelAndView("threeLogin", model);
								} else {
									final PmsUser u = users.get(0);
									if (null != u.getTelephone() && !"".equals(u.getTelephone())) {// 手机号存在,直接登录
										// 清除当前session
										// sessionService.removeSession(request);
										// 存入session中
										initSessionInfo(u, request);
										return new ModelAndView("redirect:/mgr/index");
									} else {// 手机号不存在,绑定页
										model.put("code", "1");
										model.put("userId", Long.toString(u.getId()));
										return new ModelAndView("threeLogin", model);
									}
								}
							}
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
	@RequestMapping(value = "/threeLogin/phone", method = RequestMethod.POST)
	public Map<String, Object> threeLoginPhone(@RequestBody final PmsUser user, final ModelMap model,
			final HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		final PmsUser u = pmsUserFacade.threeLoginPhone(user.getTelephone());
		map.put("qq", "0");
		map.put("wechat", "0");
		map.put("wb", "0");
		if (null != u) {
			map.put("register", "1");// 注册过
			if (null != user.getQqUnique() && !"".equals(user.getQqUnique())) {
				map.put("qq", "1");
			}
			if (null != user.getWechatUnique() && !"".equals(user.getWechatUnique())) {
				map.put("wechat", "1");
			}
			if (null != user.getWbUnique() && !"".equals(user.getWbUnique())) {
				map.put("wb", "1");
			}
		} else {
			map.put("register", "0");// 未注册过
		}
		return map;
	}

	@RequestMapping(value = "/third/bind", method = RequestMethod.POST)
	public Info thirdBind(@RequestBody final ThirdBind bind, final HttpServletRequest request) {
		final String code = (String) request.getSession().getAttribute("code");
		final String codeOfphone = (String) request.getSession().getAttribute("codeOfphone");
		Info info = new Info(); // 信息载体
		if (!"".equals(code) && code != null) {
			if (code.equals(bind.getVerification_code())) {
				if (null != codeOfphone && codeOfphone.equals(bind.getTelephone())) {
					Map<String, Object> map = pmsUserFacade.bindThird(bind);
					String num = String.valueOf(map.get("code"));
					if ("1".equals(num)) {
						if (map.containsKey("user")) {
							PmsUser user = (PmsUser) map.get("user");
							if (user.getId() != 0) {
								initSessionInfo(user, request);
							}
						}
						info.setKey(true);
					} else {
						String msg = String.valueOf(map.get("msg"));
						info.setKey(false);
						info.setValue(msg);
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
	/**
	 * 初始化 sessionInfo 信息
	 * 
	 * @param user
	 * @param request
	 * @return
	 */
	public boolean initSessionInfo(final PmsUser user, HttpServletRequest request) {
		final HttpSession session = request.getSession();
		
		// 清空session
		session.removeAttribute(PmsConstant.SESSION_INFO);
		
		// 存入session中
		final SessionInfo info = new SessionInfo();
		info.setLoginName(user.getLoginName());
		info.setRealName(user.getRealName());
		info.setSessionType(PmsConstant.ROLE_CUSTOMER);
		//info.setSuperAdmin(false);
		info.setToken(DataUtil.md5(session.getId()));
		info.setReqiureId(user.getId());
		info.setClientLevel(user.getClientLevel()); // 客户级别
		info.setTelephone(user.getTelephone());

		final PmsRole role = pmsRoleFacade.findRoleById(3l); // 获取用户角色
		final List<PmsRole> roles = new ArrayList<PmsRole>();
		roles.add(role);
		user.setRoles(roles);
		// 计算权限码总和
		final long maxPos = pmsRightFacade.getMaxPos();
		final long[] rightSum = new long[(int) (maxPos + 1)];
		user.setRightSum(rightSum);
		user.calculateRightSum();
		info.setSum(user.getRightSum());
		info.setEmail(user.getEmail());
		info.setPhoto(user.getImgUrl());
		info.setSuperAdmin(user.isSuperAdmin()); // 判断是否是超级管理员

		session.setAttribute(PmsConstant.SESSION_INFO, info);
		return true;
	}
}