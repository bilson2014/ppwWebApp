package com.panfeng.film.resource.controller;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.MultipartRequest;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.paipianwang.pat.common.config.PublicConfig;
import com.paipianwang.pat.common.constant.PmsConstant;
import com.paipianwang.pat.common.entity.DataGrid;
import com.paipianwang.pat.common.entity.PageParam;
import com.paipianwang.pat.common.entity.SessionInfo;
import com.paipianwang.pat.common.enums.LoginType;
import com.paipianwang.pat.common.util.ValidateUtil;
import com.paipianwang.pat.common.web.file.FastDFSClient;
import com.paipianwang.pat.common.web.security.AESUtil;
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
import com.panfeng.film.mq.service.FileConvertMQService;
import com.panfeng.film.mq.service.SmsMQService;
import com.panfeng.film.resource.model.Info;
import com.panfeng.film.resource.model.Product;
import com.panfeng.film.resource.model.Team;
import com.panfeng.film.resource.view.Pagination;
import com.panfeng.film.util.DataUtil;
import com.panfeng.film.util.FileUtils;
import com.panfeng.film.util.HttpUtil;
import com.panfeng.film.util.JsonUtil;
import com.panfeng.film.util.Log;

/**
 * 供应商模块 控制器
 * 
 * @author Jack
 *
 */
@RestController
@RequestMapping("/provider")
public class ProviderController extends BaseController {

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
		if (provinces != null && provinces.size() > 0) {
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
		model.addAttribute("total", list.size());
		return new ModelAndView("provider/video-list", model);
	}

	/**
	 * 视频列表分页
	 */
	@RequestMapping("/video-pagination")
	public DataGrid<PmsProduct> searchPagination(@RequestBody final Pagination pageView,
			final HttpServletRequest request) throws Exception {
		final PmsTeam team = getCurrentTeam(request);
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("teamId", team.getTeamId());

		PageParam param = new PageParam();
		param.setBegin((pageView.getBegin() - 1) * pageView.getLimit());
		param.setLimit(pageView.getLimit());

		DataGrid<PmsProduct> dataGrid = pmsProductFacade.loadPageByProviderId(param, paramMap);
		return dataGrid;
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
		if (original.getLoginType().equals(LoginType.PHONE.getDesc())) {// 手机号登录
			return loginByPhone(original, request, response);
		} else {// 用户名登录
			return loginByName(original, request, response);
		}
	}

	private BaseMsg loginByName(PmsTeam original, HttpServletRequest request, HttpServletResponse response) {
		final String pwd = original.getPassword();
		final String loginName = original.getLoginName();
		if (ValidateUtil.isValid(loginName) && ValidateUtil.isValid(pwd)) {
			try {// 解密
				final String password = AESUtil.Decrypt(pwd, PmsConstant.UNIQUE_KEY);
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
				} else {
					return new BaseMsg(BaseMsg.WARNING, "用户名或密码错误!", false);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return new BaseMsg(BaseMsg.ERROR, "登陆错误", false);
	}

	private BaseMsg loginByPhone(final PmsTeam original, final HttpServletRequest request,
			final HttpServletResponse response) {
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
					} else {
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
		if (count == 0) {
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
		if (count == 0) {
			return new BaseMsg(BaseMsg.NORMAL, "", null); // 请求失败
		} else {
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
			if (count > 0) {
				return new Info(false, "手机号已经注册");
			}
		}
		final String code = (String) request.getSession().getAttribute("code");
		final String codeOfphone = (String) request.getSession().getAttribute("codeOfphone");
		Info info = new Info(); // 信息载体
		// 判断验证码
		if ((!"".equals(code) && code != null)) {
			if (code.equals(original.getVerification_code())) {
				if (null != codeOfphone && original != null && codeOfphone.equals(original.getPhoneNumber())) {
					final HttpSession httpSession = request.getSession();
					Gson gson = new Gson();
					String json = gson.toJson(original);
					httpSession.setAttribute(ORIGINAL, json); // session
					httpSession.setAttribute(TYPE, REGISTER_KET);

					// 注册完成之后的手机号码存储在session中，保持供应商身份的登陆状态
					httpSession.removeAttribute(PmsConstant.SESSION_INFO);
					SessionInfo sessionInfo = new SessionInfo();
					sessionInfo.setTelephone(original.getPhoneNumber());
					sessionInfo.setSessionType(PmsConstant.ROLE_PROVIDER);
					httpSession.setAttribute(PmsConstant.SESSION_INFO, sessionInfo);
					info.setKey(true);
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
							final String password = AESUtil.Decrypt(team.getPassword(), PmsConstant.UNIQUE_KEY);
							// MD5 加密
							team.setPassword(DataUtil.md5(password));

							final long ret = pmsTeamFacade.updatePasswordByLoginName(team);
							Log.error("update team ...", sessionInfo);
							if (ret > 0) {
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

	/**
	 * 上传供应商Logo
	 * 
	 * @param request
	 * @param response
	 * @param file
	 * @return
	 */
	@RequestMapping("/upload/teamPhoto")
	public String uploadLogo(final HttpServletRequest request, final HttpServletResponse response,
			@PathParam("file") final MultipartFile file) {
		response.setContentType("text/html;charset=UTF-8");
		// 如果文件为空，则不更新图片路径;反之亦然
		if (!file.isEmpty()) {
			final long fileSize = file.getSize(); // 上传文件大小
			final long maxSize = Long.parseLong(PublicConfig.IMAGE_MAX_SIZE);
			final String extName = FileUtils.getExtName(file.getOriginalFilename(), "."); // 后缀名
			if (fileSize > maxSize * 1024) {
				// 文件大小超出规定范围
				SessionInfo sessionInfo = getCurrentInfo(request);
				Log.error("upload provider photo error,becase the photo (size:" + fileSize + ") more than " + maxSize
						+ "...", sessionInfo);
				return "false@error=1";
			} else {
				if (PublicConfig.ALLOW_IMAGE_TYPE.indexOf(extName.toLowerCase()) > -1) { // 文件格式正确
					final String fileId = FastDFSClient.uploadFile(file);
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
		if (count == 0) {
			final String code = (String) request.getSession().getAttribute("code");
			SessionInfo sessionInfo = getCurrentInfo(request);
			if (null != sessionInfo) {
				if (!"".equals(code) && code != null) {
					if (code.equals(team.getVerification_code())) {
						try {
							String password = AESUtil.Decrypt(team.getPassword(), PmsConstant.UNIQUE_KEY);
							team.setPassword(DataUtil.md5(password));
							team.setTeamId(sessionInfo.getReqiureId());
						} catch (Exception e) {
							e.printStackTrace();
						}
						count = pmsTeamFacade.updateTeamAccount(team);
						if (count >= 0) {
							PmsTeam t = pmsTeamFacade.findTeamById(team.getTeamId());
							request.getSession().removeAttribute(PmsConstant.SESSION_INFO);
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
				String password = AESUtil.Decrypt(team.getPassword(), PmsConstant.UNIQUE_KEY);
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
				request.getSession().removeAttribute(PmsConstant.SESSION_INFO);
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

		// TODO 变为dubbo服务
		final String url = PublicConfig.URL_PREFIX + "portal/product/static/data/deleteProduct/" + productId;
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

	/**
	 * 添加一个作品，该作品只有video信息
	 */
	@RequestMapping(value = "/save/product/info", method = RequestMethod.POST)
	public BaseMsg saveProduct(HttpServletRequest request, MultipartFile file, final HttpServletResponse response) {
		BaseMsg baseMsg = new BaseMsg(0, "error");
		SessionInfo sessionInfo = getCurrentInfo(request);
		if (null != sessionInfo) {
			final long video_MaxSize = Long.parseLong(PublicConfig.VIDEO_MAX_SIZE);
			if (file.getSize() > video_MaxSize * 1024 * 1024) {
				baseMsg.setResult("视频超过200M");
				return baseMsg;
			}
			// 上传video
			String fileId = FastDFSClient.uploadFile(file);
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
			if (team.getFlag() != 4) {// ghost不需要添加service
				// 添加service信息
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
			final long img_MaxSize = Long.parseLong(PublicConfig.PRODUCT_IMAGE_MAX_SIZE);
			if (file.getSize() > img_MaxSize * 1024) {
				return new BaseMsg(0, "图片处理失败,请联系客服协助您上传(400-660-9728)");//"图片文件超过250K上限");
			}
			String fileId = FastDFSClient.uploadFile(file);
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
				FastDFSClient.deleteFile(oldProduct.getPicLDUrl());
			}
		}
		pmsProductFacade.updateProductInfo(oldProduct); // 更新视频信息
		Log.error("update product ... ", sessionInfo);
		Log.error("Provider Update Product success,productId:" + productId + " ,productName:" + product.getProductName()
				+ " ,flag:" + product.getFlag(), sessionInfo);
		return new BaseMsg(1, "success");
	}

	/**
	 * 供应商注册流程的视频信息修改
	 */
	@RequestMapping(value = "/update/product/flow/info", method = RequestMethod.POST)
	public BaseMsg updateProductByFlow(final HttpServletRequest request, final HttpServletResponse response,
			final Product product) {
		SessionInfo sessionInfo = getCurrentInfo(request);

		if (request instanceof MultipartRequest) {// 指出对象是否是特定类的一个实例
			MultipartHttpServletRequest multipartRquest = (MultipartHttpServletRequest) request;
			MultipartFile file = multipartRquest.getFiles("file").get(0);
			final long img_MaxSize = Long.parseLong(PublicConfig.PRODUCT_IMAGE_MAX_SIZE);
			if (file.getSize() > img_MaxSize * 1024) {
				return new BaseMsg(0, "图片处理失败,请联系客服协助您上传(400-660-9728)");
			}
			String fileId = FastDFSClient.uploadFile(file);
			product.setPicLDUrl(fileId);
		}
		final long productId = product.getProductId();

		PmsProduct oldProduct = pmsProductFacade.findProductById(product.getProductId());
		oldProduct.setProductName(product.getProductName());
		oldProduct.setCreationTime(product.getCreationTime());
		oldProduct.setFlag(0);// 设置审核中状态
		if (StringUtils.isNotBlank(product.getPicLDUrl())) {
			oldProduct.setPicLDUrl(product.getPicLDUrl());
			if (StringUtils.isNotBlank(oldProduct.getPicLDUrl())
					&& !product.getPicLDUrl().equals(oldProduct.getPicLDUrl())) {
				FastDFSClient.deleteFile(oldProduct.getPicLDUrl());
			}
		}
		pmsProductFacade.updateProductInfoAtFlow(oldProduct); // 更新视频信息
		Log.error("update flow product ... ", sessionInfo);
		Log.error("Provider Update Product success,productId:" + productId + " ,productName:" + product.getProductName()
				+ " ,flag:" + product.getFlag(), sessionInfo);
		return new BaseMsg(1, "success");
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
				String fileId = FastDFSClient.uploadFile(file);
				product.setVideoUrl(fileId);
				long proId = pmsProductFacade.save(product); // 保存视频信息
				product.setProductId(proId);
				final PmsTeam team = pmsTeamFacade.findTeamById(info.getReqiureId());
				if (team.getFlag() != 4) {// ghost不需要添加service
					// 添加service信息
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
				Log.info("ProviderController method:uploadFiles() file upload success,productId = " + proId + " ...",
						info);
				return "success";
			}
		}
		return "error";
	}

	// 检查文件是否符合规范
	public String checkFile(final MultipartFile file) {
		if (file != null && !file.isEmpty()) {
			final long img_MaxSize = Long.parseLong(PublicConfig.PRODUCT_IMAGE_MAX_SIZE);
			final long video_MaxSize = Long.parseLong(PublicConfig.VIDEO_MAX_SIZE);

			// 检测文件类型
			final String extName = FileUtils.getExtName(file.getOriginalFilename(), ".");
			final short fileType = FileUtils.divideIntoGroup(extName, PublicConfig.ALLOW_IMAGE_TYPE,
					PublicConfig.ALLOW_VIDEO_TYPE);
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
						final String url = PublicConfig.URL_PREFIX + "portal/team/thirdLogin/bind";
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
				Log.error("provinceId is null ...", sessionInfo);
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

	// 获取当前登录的供应商
	public PmsTeam getCurrentTeam(final HttpServletRequest request) {
		final SessionInfo info = getCurrentInfo(request);
		final PmsTeam team = pmsTeamFacade.findTeamById(info.getReqiureId());
		team.setPassword(null);
		if (team.getId() != 0l) {
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

	public boolean updateInfo(final PmsTeam team, final HttpServletRequest request)
			throws UnsupportedEncodingException {
		// 将状态置为审核中
		if (team.getFlag() == 2)
			team.setFlag(0);

		final long ret = pmsTeamFacade.updateTeamInfomation(team);
		SessionInfo sessionInfo = getCurrentInfo(request);
		Log.error("update team ...", sessionInfo);
		if (ret == 1) {
			return true;
		}
		return false;
	}

	public boolean updateInfo_register(@RequestBody final PmsTeam team, final HttpServletRequest request) {
		try {
			HttpSession httpSession = request.getSession();
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
			//优先使用昵称
			if(ValidateUtil.isValid(result.getDisplayName())){
				result.setTeamName(result.getDisplayName());
			}
			if(ValidateUtil.isValid(result.getDisplayImg())){
				result.setTeamPhotoUrl(result.getDisplayImg());
			}
			modelMap.addAttribute("provider", result);
			// 加载导演标签
			String strtags = result.getBusiness();
			if (ValidateUtil.isValid(strtags)) {
				modelMap.addAttribute("providerTags", JsonUtil.toJson(strtags.split(",")));
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
//			String description = null == team.getDescription() ? "" : team.getDescription();
//			team.setDescription(description);
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
	@RequestMapping(value = "/product/visibility", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
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
	 * 跳转至注册信息提示页面
	 * 
	 * @return
	 */
	@RequestMapping("/information")
	public ModelAndView informationView(HttpServletRequest request, ModelMap model) {

		// 查询供应商审核状态
		SessionInfo info = (SessionInfo) request.getSession().getAttribute(PmsConstant.SESSION_INFO);
		if (info != null && info.getReqiureId() != null) {
			PmsTeam team = pmsTeamFacade.findTeamById(info.getReqiureId());
			model.addAttribute("flag", team.getFlag());
			model.addAttribute("recommendation", team.getRecommendation());
			model.addAttribute("teamId", info.getReqiureId());
		}
		return new ModelAndView("provider/information");
	}

	/**
	 * 返回至首页，需退出登录
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping("/backToPortal")
	public ModelAndView backToPortal(HttpServletRequest request) {
		// 清空session
		final HttpSession session = request.getSession();
		session.removeAttribute(PmsConstant.SESSION_INFO);
		return new ModelAndView("redirect:/");
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
		final HttpSession session = request.getSession();
		session.removeAttribute(PmsConstant.SESSION_INFO);
		// 存入session中
		final String sessionId = request.getSession().getId();
		final SessionInfo info = new SessionInfo();
		info.setLoginName(team.getLoginName());
		info.setRealName(team.getTeamName());
		info.setTelephone(team.getPhoneNumber());
		info.setSessionType(PmsConstant.ROLE_PROVIDER);
		info.setToken(DataUtil.md5(sessionId));
		info.setReqiureId(team.getTeamId());
		info.setPhoto(team.getTeamPhotoUrl());
		// 供应商审核状态位
		info.setProviderFlag(team.getFlag());

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
		session.setAttribute(PmsConstant.SESSION_INFO, info);
		return true;
	}
}