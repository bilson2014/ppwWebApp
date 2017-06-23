package com.panfeng.film.resource.controller;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.paipianwang.pat.common.config.PublicConfig;
import com.paipianwang.pat.common.constant.PmsConstant;
import com.paipianwang.pat.common.entity.SessionInfo;
import com.paipianwang.pat.common.util.ValidateUtil;
import com.paipianwang.pat.common.web.file.FastDFSClient;
import com.paipianwang.pat.common.web.security.AESUtil;
import com.paipianwang.pat.facade.right.entity.PmsRole;
import com.paipianwang.pat.facade.right.service.PmsRightFacade;
import com.paipianwang.pat.facade.right.service.PmsRoleFacade;
import com.paipianwang.pat.facade.user.entity.PmsUser;
import com.paipianwang.pat.facade.user.entity.Grade.Option;
import com.paipianwang.pat.facade.user.service.PmsUserFacade;
import com.panfeng.film.domain.BaseMsg;
import com.panfeng.film.resource.model.PhotoCutParam;
import com.panfeng.film.service.UserService;
import com.panfeng.film.util.DataUtil;
import com.panfeng.film.util.FileUtils;
import com.panfeng.film.util.Log;
import com.panfeng.film.util.PhotoUtil;

@RestController
@RequestMapping("/user")
public class UserController extends BaseController {

	@Autowired
	private UserService userService;
	@Autowired
	private PmsUserFacade pmsUserFacade;
	@Autowired
	private PmsRoleFacade pmsRoleFacade;
	@Autowired
	private PmsRightFacade pmsRightFacade;

	/**
	 * 修改用户信息
	 * 
	 * @param user
	 * @param request
	 * @return
	 */
	@RequestMapping("/modify/info")
	public boolean modifiedUserInfo(@RequestBody final PmsUser user, final HttpServletRequest request) {
		// 转码
		SessionInfo sessionInfo = getCurrentInfo(request);
		// 修改 用户基本信息
		if (user != null) {
			if (user.getId() != 0) {
				pmsUserFacade.modifyUserInfo(user);
				PmsUser u = pmsUserFacade.findUserById(user.getId());
				initSessionInfo(u, request);
				Log.error("User id is " + user.getId() + " update info(username,qq,realname,email) -success",
						sessionInfo);
				return true;
			}
		}
		return false;
	}

	@RequestMapping("/update")
	public BaseMsg updateUserInfo(@RequestBody final PmsUser user, final HttpServletRequest request) {
		BaseMsg baseMsg = new BaseMsg();
		// 修改 用户基本信息
		if (user != null) {
			if (user.getId() != 0) {
				int computeScore = pmsUserFacade.computeScore(user);
				user.setClientLevel(computeScore);
				pmsUserFacade.update(user);
				baseMsg.setCode(BaseMsg.NORMAL);
				baseMsg.setErrorMsg("更新成功！");
			} else {
				baseMsg.setCode(BaseMsg.ERROR);
				baseMsg.setErrorMsg("更新失败！");
			}
		} else {
			baseMsg.setCode(BaseMsg.ERROR);
			baseMsg.setErrorMsg("更新失败！");
		}
		return baseMsg;
	}

	@RequestMapping("/modify/password")
	public boolean modifiedUserPassword(@RequestBody final PmsUser user, final HttpServletRequest request)
			throws Exception {
		if (user != null) {
			SessionInfo sessionInfo = getCurrentInfo(request);
			long userId = sessionInfo.getReqiureId();
			user.setId(userId);
			if (user.getPassword() != null && !"".equals(user.getPassword())) {
				// AES密码解密
				final String password = AESUtil.Decrypt(user.getPassword(), PmsConstant.UNIQUE_KEY);
				// MD5加密
				user.setPassword(DataUtil.md5(password));
				// 修改 用户密码
				if (user != null) {
					pmsUserFacade.modifyUserPassword(user);
					Log.error("User id is " + userId + " update password success", sessionInfo);
					return true;
				}
			}
			Log.error("User id is " + userId + " update password error", sessionInfo);
		}
		return false;
	}

	/**
	 * 根据手机验证码修改用户密码
	 * 
	 * @throws Exception
	 */
	@RequestMapping("/modify/code/password")
	public Map<String, Object> modifiedUserPasswordByVerificationCode(@RequestBody final PmsUser user,
			final HttpServletRequest request) throws Exception {
		SessionInfo sessionInfo = getCurrentInfo(request);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("code", 0);
		map.put("msg", "信息修改失败，请刷新后再试!");
		if (user != null) {
			if (judgeTestAndValidateCode(request, user)) {
				final long userId = user.getId();
				if (user.getPassword() != null && !"".equals(user.getPassword())) {
					// AES密码解密
					final String password = AESUtil.Decrypt(user.getPassword(), PmsConstant.UNIQUE_KEY);
					// MD5加密
					user.setPassword(DataUtil.md5(password));
					// 修改 用户密码
					if (user != null) {
						pmsUserFacade.modifyUserPassword(user);
						Log.error("User id is " + userId + " update password success", sessionInfo);
						map.put("code", 1);
						map.put("msg", "修改成功");
					}
				}
			} else {
				map.put("msg", "验证码错误");
			}
		}
		return map;
	}

	private boolean judgeTestAndValidateCode(HttpServletRequest request, PmsUser user) {
		final String code = (String) request.getSession().getAttribute("code");
		return (!"".equals(code) && code != null && code.equals(user.getVerification_code()));
	}

	/**
	 * 修改用户手机号码
	 */
	@RequestMapping("/modify/phone")
	public BaseMsg modifyUserPhone(@RequestBody final PmsUser user, final HttpServletRequest request) {
		if (user != null) {
			if (judgeTestAndValidatePhoneCode(request, user)) {
				SessionInfo sessionInfo = getCurrentInfo(request);
				Log.error("User id is " + user.getId() + " update phone number:" + user.getTelephone(), sessionInfo);

				// 验证手机号是否是新的,然后 更新手机
				final int count = pmsUserFacade.validationPhone(user.getTelephone(), null);
				if (count > 0) {
					return new BaseMsg(2, "手机号被占用");
				}
				// 修改手机号
				final long ret = pmsUserFacade.modifyUserPhone(user);
				if (ret > 0) {
					Log.error("User id is " + user.getId() + " update phone number -success", sessionInfo);
					// updateUserInSession(request);
					return new BaseMsg(3, "success");
				}
				return new BaseMsg(0, "error");
			}
			return new BaseMsg(1, "验证码错误");
		}
		return new BaseMsg(0, "error");
	}

	private boolean judgeTestAndValidatePhoneCode(HttpServletRequest request, PmsUser user) {
		final String code = (String) request.getSession().getAttribute("code");
		final String codeOfphone = (String) request.getSession().getAttribute("codeOfphone");
		// 是否是测试程序
		boolean isTest = PublicConfig.IS_AUTO_TEST.equals("yes") ? true : false;
		return isTest || (code != null && !"".equals(code) && codeOfphone != null && !"".equals(codeOfphone)
				&& code.equals(user.getVerification_code()) && codeOfphone.equals(user.getTelephone()));
	}

	/**
	 * 用户信息-修改手机号码 清除session中的验证码
	 */
	@RequestMapping("/clear/code")
	public int clearCode(final HttpServletRequest request) {
		request.getSession().removeAttribute("code");
		return 0;
	}

	/**
	 * 自定义上传头像
	 */
	@RequestMapping(value = "/preview/photo", method = RequestMethod.POST, produces = "text/html;charset=UTF-8")
	public String modifyUserPhoto(final HttpServletRequest request, final HttpServletResponse response,
			@RequestParam("file") final MultipartFile file) {
		try {
			if (!file.isEmpty()) {
				final long fileSize = file.getSize(); // 上传文件大小
				final long maxSize = Long.parseLong(PublicConfig.IMAGE_MAX_SIZE);
				final String extName = FileUtils.getExtName(file.getOriginalFilename(), "."); // 后缀名
				if (fileSize > maxSize * 1024) {
					// 文件大小超出规定范围
					return "false@error=1";
				} else {
					if (PublicConfig.ALLOW_IMAGE_TYPE.indexOf(extName.toLowerCase()) > -1) { // 文件格式正确
						String path = FastDFSClient.uploadFile(file);
						SessionInfo sessionInfo = getCurrentInfo(request);
						Log.error("User id is " + sessionInfo.getReqiureId() + " upload photo by self path is" + path,
								sessionInfo);
						return path;
					} else {
						// 文件格式不正确
						return "false@error=2";
					}
				}
			}
		} catch (Exception e) {
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("UserController method:modifyUserPhoto() Upload user image error ...", sessionInfo);
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 使用系统提供的头像，修改用户头像
	 * 
	 * @throws MalformedURLException
	 */
	/*
	 * @RequestMapping(value = "/directModify/photo", method =
	 * RequestMethod.POST) public boolean changePhotoWithClick(@RequestBody
	 * final User user, final HttpServletRequest request) throws
	 * MalformedURLException {
	 * 
	 * if (user != null) { String imgPath =
	 * request.getServletContext().getRealPath(user.getImgUrl());
	 * 
	 * File original = new File(imgPath); String path =
	 * DFSservice.upload(original, user.getImgUrl()); SessionInfo sessionInfo =
	 * getCurrentInfo(request); Log.error("User id is " + user.getId() +
	 * " upload photo by system path is" + path, sessionInfo); // 更新数据库 if (user
	 * != null) { user.setImgUrl(path); final String url = URL_PREFIX +
	 * "portal/user/modify/photo"; final String json = HttpUtil.httpPost(url,
	 * user, request); final Boolean result = JsonUtil.toBean(json,
	 * Boolean.class);
	 * 
	 * Log.error("User id is " + user.getId() +
	 * " update photo by system -success=" + result, sessionInfo); //
	 * updateUserInSession(request); return result; } }
	 * 
	 * return false; }
	 */

	/**
	 * 删除 取消的自定义上传文件
	 */
	@RequestMapping("/delete/photo")
	public boolean deleteTempPhoto(@RequestBody final PmsUser user, HttpServletRequest request) {

		if (user != null && !"".equals(user.getImgUrl())) {
			final String path = user.getImgUrl();
			// 删除文件
			File file = new File(PublicConfig.FILE_PROFIX + path);
			if (file.exists()) {
				if (!file.isDirectory()) {
					file.delete();
					SessionInfo sessionInfo = getCurrentInfo(request);
					Log.error("User id is " + user.getId() + " cancel diy photo path is " + user.getImgUrl(),
							sessionInfo);
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 裁剪图片 并更新服务器
	 * 
	 * @throws IOException
	 */
	@RequestMapping("/cutPhoto")
	public PmsUser uploadDIYUserImg(@RequestBody final PhotoCutParam param, final HttpServletRequest request)
			throws IOException {

		if (param != null && !"".equals(param.getImgUrl())) {

			final String imgPath = param.getImgUrl();
			InputStream inputStream = FastDFSClient.downloadFile(imgPath);
			final String extName = FileUtils.getExtName(imgPath, ".");

			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("User id is " + param.getUserId() + " cut photo begin", sessionInfo);

			// cut photo
			inputStream = PhotoUtil.cutPhoto(inputStream, param, extName);
			Log.error("User id is " + param.getUserId() + " cut photo - success", sessionInfo);

			String path = FastDFSClient.uploadFile(inputStream, imgPath);
			// 更新数据库
			final PmsUser user = new PmsUser();
			user.setId(param.getUserId());
			user.setImgFileName(path);// ?这个是做啥的
			user.setImgUrl(path);

			final long ret = pmsUserFacade.modifyUserPhoto(user);
			Log.error("User id is " + param.getUserId() + " update DIY photo - success", sessionInfo);
			if (ret > 0) {
				// updateUserInSession(request);
				return user;
			} else {
				return null;
			}

		}
		return null;
	}

	@RequestMapping("/repwd")
	public ModelAndView repwd(ModelMap modelMap) {
		return new ModelAndView("/rePwdCus", modelMap);
	}

	/**
	 * 获取user信息
	 */
	@RequestMapping("/getcurrentUser")
	public BaseMsg updatePwd(HttpServletRequest request) {
		BaseMsg baseMsg = new BaseMsg();
		SessionInfo sessionInfo = getCurrentInfo(request);
		if (null != sessionInfo) {
			PmsUser user = new PmsUser();
			user.setId(sessionInfo.getReqiureId());
			user.setLoginName(sessionInfo.getLoginName());
			baseMsg.setCode(1);
			baseMsg.setResult(user);
		}
		return baseMsg;
	}

	/**
	 * 第三方绑定状态
	 */
	@RequestMapping("/third/status")
	public Map<String, Object> thirdBindStatus(HttpServletRequest request) {
		SessionInfo sessionInfo = getCurrentInfo(request);
		PmsUser user = new PmsUser();
		user.setId(sessionInfo.getReqiureId());
		Map<String, Object> map = pmsUserFacade.thirdStatus(user);
		return map;
	}

	/**
	 * 个人中心绑定第三方 如果第三方账号已经存在,不允许绑定
	 */
	@RequestMapping("/bind/third")
	public BaseMsg bindThird(final HttpServletRequest request, final HttpServletResponse response,
			@RequestBody final PmsUser user) {
		BaseMsg baseMsg = new BaseMsg(0, "绑定失败");
		SessionInfo sessionInfo = getCurrentInfo(request);
		user.setId(sessionInfo.getReqiureId());// 填充用户id
		boolean b = pmsUserFacade.userInfoBind(user);
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
	public boolean unBindThird(@RequestBody final PmsUser user, final HttpServletRequest request) {
		SessionInfo sessionInfo = getCurrentInfo(request);
		user.setId(sessionInfo.getReqiureId());// 填充用户id
		// 查询该用户是否存在
		boolean b = pmsUserFacade.userInfoUnBind(user);
		return b;
	}

	/**
	 * 验证用户名唯一性
	 */
	@RequestMapping("/unique/username")
	public boolean uniqueUserName(@RequestBody final PmsUser user, final HttpServletRequest request) {
		boolean b = pmsUserFacade.uniqueUserName(user);
		return b;
	}

	// -----------------------------------------------------------------------------

	@RequestMapping("/infoCommon")
	public ModelAndView infoCommonView(final HttpServletRequest request, final ModelMap model) {
		final SessionInfo info = getCurrentInfo(request);
		if (info != null) {
			Long userId = info.getReqiureId();
			if (userId != null) {
				final PmsUser currentUser = pmsUserFacade.findUserById(userId);
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

	@RequestMapping("/safeInfo")
	public ModelAndView safeInfo(final HttpServletRequest request, final ModelMap model) {
		final SessionInfo info = getCurrentInfo(request);
		if (info != null) {
			Long userId = info.getReqiureId();
			if (userId != null) {
				final PmsUser currentUser = pmsUserFacade.findUserById(userId);
				currentUser.setPassword(null);
				model.addAttribute("user", currentUser);
			}
			SessionInfo sessionInfo = getCurrentInfo(request);
			Log.error("Redirecting userInfo page,userId:" + info.getReqiureId(), sessionInfo);
		}
		return new ModelAndView("userSafeInfo");
	}

	/**
	 * 用户信息设置界面
	 */
	@RequestMapping("/info")
	public ModelAndView userInfo(final HttpServletRequest request, final ModelMap model) {
		final SessionInfo info = getCurrentInfo(request);
		if (info != null) {
			Long userId = info.getReqiureId();
			if (userId != null) {
				final PmsUser currentUser = pmsUserFacade.findUserById(userId);
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

		return new ModelAndView("userPortal", model);
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
		// info.setSuperAdmin(false);
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

	@RequestMapping("/option")
	public BaseMsg getSelectOption() {
		Map<String, Option[]> selectOption = pmsUserFacade.getSelectOption();
		BaseMsg baseMsg = new BaseMsg();
		baseMsg.setCode(BaseMsg.NORMAL);
		baseMsg.setResult(selectOption);
		return baseMsg;
	}
	@RequestMapping("/get/info")
	public BaseMsg getUser(Long userId){
		BaseMsg baseMsg = new BaseMsg();
		PmsUser user = pmsUserFacade.findUserById(userId);
		baseMsg.setCode(BaseMsg.NORMAL);
		baseMsg.setResult(user);
		return baseMsg;
	}

}
