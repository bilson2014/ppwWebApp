package com.panfeng.film.resource.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.paipianwang.pat.common.config.PublicConfig;
import com.paipianwang.pat.common.constant.PmsConstant;
import com.paipianwang.pat.common.entity.DataGrid;
import com.paipianwang.pat.common.entity.PageParam;
import com.paipianwang.pat.common.entity.PmsResult;
import com.paipianwang.pat.common.entity.SessionInfo;
import com.paipianwang.pat.common.util.ValidateUtil;
import com.paipianwang.pat.common.web.file.FastDFSClient;
import com.paipianwang.pat.common.web.security.AESUtil;
import com.paipianwang.pat.facade.indent.entity.PmsIndent;
import com.paipianwang.pat.facade.indent.service.PmsIndentFacade;
import com.paipianwang.pat.facade.product.entity.PmsEmployeeProductLink;
import com.paipianwang.pat.facade.product.entity.PmsProduct;
import com.paipianwang.pat.facade.product.service.PmsEmployeeProductLinkFacade;
import com.paipianwang.pat.facade.right.entity.PmsEmployee;
import com.paipianwang.pat.facade.right.entity.PmsRole;
import com.paipianwang.pat.facade.right.service.PmsEmployeeFacade;
import com.paipianwang.pat.facade.right.service.PmsRightFacade;
import com.paipianwang.pat.facade.right.service.PmsRoleFacade;
import com.panfeng.film.domain.BaseMsg;
import com.panfeng.film.domain.Result;
import com.panfeng.film.resource.model.ActivitiTask;
import com.panfeng.film.resource.model.BizBean;
import com.panfeng.film.resource.model.Employee;
import com.panfeng.film.resource.model.IndentComment;
import com.panfeng.film.resource.model.IndentFlow;
import com.panfeng.film.resource.model.IndentProject;
import com.panfeng.film.resource.model.IndentResource;
import com.panfeng.film.resource.model.Info;
import com.panfeng.film.resource.model.Staff;
import com.panfeng.film.resource.model.Team;
import com.panfeng.film.resource.model.User;
import com.panfeng.film.resource.model.Wechat;
import com.panfeng.film.service.EmployeeThirdLogin;
import com.panfeng.film.service.ResourceService;
import com.panfeng.film.util.DataUtil;
import com.panfeng.film.util.HttpUtil;
import com.panfeng.film.util.JsonUtil;
import com.panfeng.film.util.Log;
import com.panfeng.film.util.WechatUtils;

@RestController
@RequestMapping("/mgr")
public class VersionManagerController extends BaseController {

	@Autowired
	private ResourceService resourceService;

	@Autowired
	private EmployeeThirdLogin employeeThirdLogin;

	@Autowired
	private PmsEmployeeFacade pmsEmployeeFacade;

	@Autowired
	private PmsRoleFacade pmsRoleFacade;

	@Autowired
	private PmsRightFacade pmsRightFacade;

	@Autowired
	private PmsEmployeeProductLinkFacade pmsEmployeeProductLinkFacade;

	@Autowired
	private PmsIndentFacade pmsIndentFacade;

	static String UNIQUE = "unique_e";
	static String LINKMAN = "username_e";

	@RequestMapping("/login")
	public ModelAndView loginView() {
		return new ModelAndView("/manager/login");
	}

	/**
	 * 登录
	 */
	@RequestMapping("/doLogin")
	public Result doLogin(final HttpServletRequest request, @RequestBody final PmsEmployee employee,
			final HttpServletResponse response) {
		final Result result = new Result();
		result.setRet(false);
		result.setMessage("用户名或密码错误!");
		if (employee != null) {
			final String pwd = employee.getEmployeePassword();
			final String loginName = employee.getEmployeeLoginName();
			if (ValidateUtil.isValid(loginName) && ValidateUtil.isValid(pwd)) {
				// 解密
				try {
					final String password = AESUtil.Decrypt(pwd, PmsConstant.UNIQUE_KEY);
					final PmsEmployee e = pmsEmployeeFacade.doLogin(employee.getEmployeeLoginName(),
							DataUtil.md5(password));
					if (e != null) {
						// 填充角色
						List<PmsRole> roles = pmsRoleFacade.findRolesByEmployId(e.getEmployeeId());
						e.setRoles(roles);
						request.getSession().removeAttribute(PmsConstant.SESSION_INFO);
						final boolean ret = initSessionInfo(e, request);
						if (ret) {
							addCookies(request, response);
						}
						result.setRet(ret);
					}
				} catch (Exception e) {
					SessionInfo sessionInfo = getCurrentInfo(request);
					Log.error("VersionManager login error,Because of decrypt password error ...", sessionInfo);
					e.printStackTrace();
				}
			}
		}
		return result;
	}

	/**
	 * 三方登录
	 * 
	 * @param json
	 * @param request
	 * @param modelMap
	 * @return
	 */
	@RequestMapping("/thirdLogin")
	public ModelAndView thirdLogin(String json, final HttpServletRequest request, ModelMap modelMap) {
		if (!ValidateUtil.isValid(json))
			return new ModelAndView("/manager/login");
		Employee original = JsonUtil.toBean(json, Employee.class);
		boolean isBind = employeeThirdLogin.login(original, request);
		if (isBind) {
			return new ModelAndView("/manager/index");
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
			httpSession.setAttribute(LINKMAN, original.getEmployeeRealName());
			modelMap.put("linkMan", original.getEmployeeRealName());
			modelMap.put("LType", original.getThirdLoginType());
			return new ModelAndView("/manager/threeLogin", modelMap);
		}
	}

	@RequestMapping("/wechat/callback.do")
	public ModelAndView loginWithWeChat(@RequestParam("code") String code, final HttpServletRequest request,
			ModelMap modelMap) {
		Wechat wechat = WechatUtils.decodeWechatToken(code, request);
		if (wechat == null)
			return new ModelAndView("/provider/threeLogin");
		Employee original = new Employee();
		original.setThirdLoginType(Team.LTYPE_WECHAT);
		original.setEmployeeRealName(wechat.getNickname());
		original.setWechatUnique(wechat.getUnionid());
		original.setEmployeeImg(wechat.getHeadimgurl());
		boolean isBind = employeeThirdLogin.login(original, request);
		if (isBind) {
			return new ModelAndView("/provider/portal");
		} else {
			HttpSession httpSession = request.getSession();
			String unique = original.getWechatUnique();
			httpSession.setAttribute(UNIQUE, unique);
			modelMap.put("linkMan", original.getEmployeeRealName());
			modelMap.put("LType", original.getThirdLoginType());
			return new ModelAndView("/provider/threeLogin", modelMap);
		}
	}

	@RequestMapping("/bind")
	public BaseMsg bind(@RequestBody final Employee employee, final HttpServletRequest request) {
		HttpSession httpSession = request.getSession();
		final String phone = employee.getPhoneNumber();
		final String Ltype = employee.getThirdLoginType();
		final Object objUnique = httpSession.getAttribute(UNIQUE);
		final Object objLinkman = httpSession.getAttribute(LINKMAN);
		final Object objCode = request.getSession().getAttribute("code");
		if (ValidateUtil.isValid(phone) && ValidateUtil.isValid(Ltype) && objUnique != null && objCode != null) {
			// 不需要输入验证码
			try {
				final String Unique = (String) objUnique;
				final String realName = (String) objLinkman;
				final String code = (String) objCode;
				boolean isTest = PublicConfig.IS_AUTO_TEST.equals("yes") ? true : false;
				// 不需要输入验证码 code == null dev code != null
				if (isTest || code.equals(employee.getVerification_code())) {
					employee.setEmployeeRealName(realName);
					if (ValidateUtil.isValid(Unique)) {
						switch (Ltype) {
						case Team.LTYPE_QQ:
							employee.setQqUnique(Unique);
							break;
						case Team.LTYPE_WECHAT:
							employee.setWechatUnique(Unique);
							break;
						case Team.LTYPE_WEIBO:
							employee.setWbUnique(Unique);
							break;
						}
						// 后台绑定
						final String url = PublicConfig.URL_PREFIX + "portal/manager/thirdLogin/bind";
						final String json = HttpUtil.httpPost(url, employee, request);
						if (ValidateUtil.isValid(json)) {
							final BaseMsg msg = JsonUtil.toBean(json, BaseMsg.class);
							if (msg.getErrorCode() == BaseMsg.NORMAL) {
								// 成功删除 session
								httpSession.removeAttribute(UNIQUE);
								httpSession.removeAttribute(LINKMAN);
							}
							return msg;
						}
					}
				}
			} catch (Exception e) {
				SessionInfo sessionInfo = getCurrentInfo(request);
				Log.error("Provider bind error,teamName is " + employee.getEmployeeRealName(), sessionInfo);
				e.printStackTrace();
			}
		}
		return new BaseMsg(BaseMsg.ERROR, "绑定失败", null);
	}

	/**
	 * 验证手机号唯一性
	 * 
	 * @param phoneNumber
	 *            手机号码
	 */
	@RequestMapping("/recover/check/{phoneNumber}")
	public boolean checkPhoneNumber(@PathVariable("phoneNumber") final String phoneNumber,
			final HttpServletRequest request) {

		if (ValidateUtil.isValid(phoneNumber)) {
			final long count = pmsEmployeeFacade.checkPhoneNumber(phoneNumber);
			return count == 1 ? true : false;
		}

		return false;
	}

	@RequestMapping("/recover/pwd")
	public Info recover(final HttpServletRequest request, @RequestBody final Employee e) throws Exception {

		final HttpSession session = request.getSession();
		// 密码重置
		final String code = (String) session.getAttribute("code");
		// 是否是测试程序
		boolean isTest = PublicConfig.IS_AUTO_TEST.equals("yes") ? true : false;
		Info info = new Info(); // 信息载体
		// 判断验证码
		if (!"".equals(code) && code != null) {
			if (isTest || code.equals(e.getVerification_code())) {
				if (e.getEmployeePassword() != null && !"".equals(e.getEmployeePassword())) {
					// AES 密码解密
					final String password = AESUtil.Decrypt(e.getEmployeePassword(), PmsConstant.UNIQUE_KEY);
					// MD5 加密
					e.setEmployeePassword(DataUtil.md5(password));
					
					// 在视频管家范围内查找该手机号码的人员
					boolean result = false;
					final List<PmsEmployee> list = pmsEmployeeFacade.findEmployeesByPhoneNumber(e.getPhoneNumber());
					if (ValidateUtil.isValid(list)) {
						if (list.size() == 1) {
							final PmsEmployee originalEmployee = list.get(0);
							originalEmployee.setEmployeePassword(e.getEmployeePassword());
							final long ret = pmsEmployeeFacade.updatePwdById(originalEmployee);
							if (ret > 0)
								result = true;
						} 
					}
					
					if(result) {
						session.removeAttribute("code"); // 移除验证码
					}
					info.setKey(result);
					info.setValue(result == true ? null : "服务器繁忙，请稍候再试...");
					return info;
					
				} else {
					// 验证码不匹配
					info.setKey(false);
					info.setValue("密码为空!");
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
			return info;
		}
	}

	/**
	 * 跳转至流程首页
	 * 
	 * @return
	 */
	@RequestMapping("/index")
	public ModelAndView indexView(ModelMap model, HttpServletRequest request) {
		final SessionInfo info = (SessionInfo) request.getSession().getAttribute(PmsConstant.SESSION_INFO);
		if (info != null) {
			model.put("userId", info.getReqiureId());
		}
		return new ModelAndView("/manager/index");
	}

	// ------------------------------ project ------------------------------

	@RequestMapping(value = "/projects/save", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public boolean projectsSave(@RequestBody final IndentProject indentProject, final HttpServletRequest request) {
		// fill userinfo
		fillUserInfo(request, indentProject);

		final String url = PublicConfig.URL_PREFIX + "project/save";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			boolean result = JsonUtil.toBean(str, Boolean.class);
			return result;
		}
		return false;
	}

	@RequestMapping(value = "/projects/remove/synergy", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public boolean removeSynergy(@RequestBody final BizBean bizBean, final HttpServletRequest request) {
		final String url = PublicConfig.URL_PREFIX + "project/remove/synergy";
		String str = HttpUtil.httpPost(url, bizBean, request);
		if (ValidateUtil.isValid(str)) {
			boolean ret = JsonUtil.toBean(str, Boolean.class);
			return ret;
		}
		return false;
	}

	@RequestMapping(value = "/projects/get/synergys", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public List<IndentProject> getSynergys(@RequestBody final IndentProject indentProject,
			final HttpServletRequest request) {
		// fill userinfo
		fillUserInfo(request, indentProject);

		final String url = PublicConfig.URL_PREFIX + "project/get/synergys";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		}

		return new ArrayList<>();
	}

	/**
	 * 获取推荐人信息列表
	 * 
	 * @param bizBean
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/projects/get/reffers", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public List<PmsEmployee> getReffers(@RequestBody BizBean bizBean, final HttpServletRequest request) {

		List<PmsEmployee> refers = pmsEmployeeFacade.findEmployeeByRealNameWithinVersionManager(bizBean.getName());
		return refers;
	}

	@RequestMapping(value = "/projects/search/employee/list", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public List<Employee> searchEmployee(@RequestBody BizBean bizBean, final HttpServletRequest request) {
		// fill userinfo
		final String url = PublicConfig.URL_PREFIX + "portal/search/employee/list";
		String str = HttpUtil.httpPost(url, bizBean, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		}

		return new ArrayList<>();
	}

	@RequestMapping("/projects/flow-index")
	public ModelAndView projectsView(final ModelMap model, String key, HttpServletRequest request) {
		model.put("key", key);
		final SessionInfo info = (SessionInfo) request.getSession().getAttribute(PmsConstant.SESSION_INFO);

		if (info != null) {
			model.put("userId", info.getReqiureId());
		}
		return new ModelAndView("/manager/index", model);
	}

	@RequestMapping("/projects/upadte-view")
	public ModelAndView updateview(final ModelMap model, @RequestParam String key) {
		model.put("state", "update");
		model.put("key", key == null ? "" : key);
		return new ModelAndView("/manager/add-flow", model);
	}

	@RequestMapping(value = "/projects/all-project", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public List<IndentProject> getUserAllProject(@RequestBody final IndentProject indentProject,
			final HttpServletRequest request) {
		// fill userinfo
		fillUserInfo(request, indentProject);

		final String url = PublicConfig.URL_PREFIX + "project/all-project";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		}

		return new ArrayList<>();
	}

	@RequestMapping(value = "/projects/get-projectInfo", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public IndentProject getProjectInfo(@RequestBody final IndentProject indentProject,
			final HttpServletRequest request) {
		// fill userinfo
		fillUserInfo(request, indentProject);

		final String url = PublicConfig.URL_PREFIX + "project/get-projectInfo";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, IndentProject.class);
		}

		return new IndentProject();
	}

	@RequestMapping(value = "/projects/get-redundantProject", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public IndentProject getRedundantProject(@RequestBody final IndentProject indentProject,
			final HttpServletRequest request) {
		// fill userinfo
		fillUserInfo(request, indentProject);
		final String url = PublicConfig.URL_PREFIX + "project/get-redundantProject";
		String str = HttpUtil.httpPost(url, indentProject, request);
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, IndentProject.class);
		}

		return new IndentProject();
	}

	@RequestMapping("/projects/update-indentProject")
	public boolean updateIndentProject(@RequestBody final IndentProject indentProject,
			final HttpServletRequest request) {
		fillUserInfo(request, indentProject);
		final String url = PublicConfig.URL_PREFIX + "project/update-synergyProject";
		String str = HttpUtil.httpPost(url, indentProject, request);
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, Boolean.class);
		}

		return false;
	}

	@RequestMapping("/projects/getProjectTags")
	public List<BizBean> getProjectTags(final HttpServletRequest request) {
		final String url = PublicConfig.URL_PREFIX + "project/getProjectTags";
		String str = HttpUtil.httpGet(url, request);
		if (str != null && !"".equals(str)) {
			List<BizBean> list = JsonUtil.toList(str);
			return list;
		}
		return new ArrayList<>();
	}

	@RequestMapping("/projects/cancelProject")
	public boolean cancelProject(@RequestBody final IndentProject indentProject, final HttpServletRequest request) {
		// fill userinfo
		fillUserInfo(request, indentProject);
		final String url = PublicConfig.URL_PREFIX + "project/cancelProject";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, Boolean.class);
		}
		return false;
	}

	@RequestMapping("/projects/get/SerialID")
	public String getProjectSerialID(final HttpServletRequest request) {
		final String url = PublicConfig.URL_PREFIX + "project/get/SerialID";
		String str = HttpUtil.httpGet(url, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return str;
		}
		return "";
	}

	@RequestMapping("/projects/verifyProjectInfo")
	public BaseMsg verifyProjectInfo(final HttpServletRequest request, @RequestBody IndentProject indentProject) {
		final String url = PublicConfig.URL_PREFIX + "project/verifyProjectInfo";
		String str = HttpUtil.httpPost(url, indentProject, request);
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, BaseMsg.class);
		}
		return new BaseMsg(BaseMsg.ERROR, "服务器繁忙", "");
	}

	@RequestMapping("/projects/team/search/info")
	public List<Team> getTeamByName(@RequestBody final Team team, final HttpServletRequest request) {
		// fill userinfo
		final String url = PublicConfig.URL_PREFIX + "portal/team/search/info";
		String str = HttpUtil.httpPost(url, team, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		}
		return new ArrayList<>();
	}

	@RequestMapping("/projects/user/search/info")
	public List<User> getUserByName(@RequestBody final User user, final HttpServletRequest request) {
		// fill userinfo
		final String url = PublicConfig.URL_PREFIX + "portal/user/search/info";
		String str = HttpUtil.httpPost(url, user, request);
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		}
		return new ArrayList<>();
	}

	@RequestMapping("/projects/staff/static/list")
	public List<Staff> getStaffList(final HttpServletRequest request) {
		final String url = PublicConfig.URL_PREFIX + "/portal/staff/static/list";
		String str = HttpUtil.httpGet(url, request);
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		}
		return new ArrayList<>();
	}

	@RequestMapping("/projects/get/report")
	public void getReport(final HttpServletResponse response, final HttpServletRequest request) {
		// final String url = PublicConfig.URL_PREFIX + "project/get/report";
		try {
			IndentProject indentProject = new IndentProject();
			fillUserInfo(request, indentProject);

			// TODO HTTP 通讯方式更改为 dubbo 方式
			// Object[] objArrayObjects = HttpUtil.httpPostFile(url,
			// indentProject, request);
			// Object[] objArrayObjects = null;
			//
			// response.reset();
			// response.setCharacterEncoding("utf-8");
			// if (objArrayObjects[1] != null) {
			// File inputFile = (File) objArrayObjects[1];
			// response.setContentType("application/octet-stream");
			// response.setContentLength((int) inputFile.length());
			// response.setHeader("Content-Disposition", objArrayObjects[0] +
			// "");
			// ServletOutputStream ouputStream = response.getOutputStream();
			// InputStream is = new FileInputStream(inputFile);
			// // send file
			// HttpUtil.saveTo(is, ouputStream);
			// inputFile.delete();
			// }
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 跳转项目信息页面
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping("/flow/add-view")
	public ModelAndView flowView(final ModelMap model) {
		return new ModelAndView("/manager/add-flow", model);
	}

	@RequestMapping(value = "/flow/verifyIntegrity", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public BaseMsg verifyIntegrity(@RequestBody final IndentProject indentProject, final HttpServletRequest request) {
		final String url = PublicConfig.URL_PREFIX + "verifyIntegrity";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, BaseMsg.class);
		}
		return new BaseMsg(BaseMsg.ERROR, "请求失败！", null);
	}

	@RequestMapping(value = "/flow/getnodes", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public List<ActivitiTask> getFlowNodes(@RequestBody final IndentProject indentProject,
			final HttpServletRequest request) {
		final String url = PublicConfig.URL_PREFIX + "getnodes";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		}
		return new ArrayList<>();
	}

	@RequestMapping(value = "/flow/startProcess", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public boolean startProcess(@RequestBody final IndentProject indentProject, final HttpServletRequest request) {
		fillUserInfo(request, indentProject);
		final String url = PublicConfig.URL_PREFIX + "startProcess";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, Boolean.class);
		}
		return false;
	}

	@RequestMapping(value = "/flow/getCurrectTask", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public ActivitiTask getCurrectTask(@RequestBody final IndentProject indentProject,
			final HttpServletRequest request) {
		fillUserInfo(request, indentProject);
		final String url = PublicConfig.URL_PREFIX + "getCurrectTask";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, ActivitiTask.class);
		}
		return new ActivitiTask();
	}

	@RequestMapping("/flow/completeTask")
	public BaseMsg completeTask(@RequestBody final IndentProject indentProject, final HttpServletRequest request) {
		fillUserInfo(request, indentProject);
		final String url = PublicConfig.URL_PREFIX + "completeTask";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, BaseMsg.class);
		}
		return new BaseMsg();
	}

	@RequestMapping(value = "/flow/getIndentFlows", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public List<IndentFlow> getIndentFlows(@RequestBody final IndentProject indentProject,
			final HttpServletRequest request) {
		fillUserInfo(request, indentProject);
		final String url = PublicConfig.URL_PREFIX + "getIndentFlows";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		}
		return new ArrayList<>();
	}

	@RequestMapping("/flow/suspendProcess")
	public boolean suspendProcess(@RequestBody final IndentProject indentProject, final HttpServletRequest request) {
		fillUserInfo(request, indentProject);
		final String url = PublicConfig.URL_PREFIX + "suspendProcess";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, Boolean.class);
		}
		return false;
	}

	@RequestMapping("/flow/resumeProcess")
	public boolean resumeProcess(@RequestBody final IndentProject indentProject, final HttpServletRequest request) {
		fillUserInfo(request, indentProject);
		final String url = PublicConfig.URL_PREFIX + "resumeProcess";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, Boolean.class);
		}
		return false;
	}

	@RequestMapping("/flow/removeProcess")
	public boolean removeProcess(@RequestBody final IndentProject indentProject, final HttpServletRequest request) {
		fillUserInfo(request, indentProject);
		final String url = PublicConfig.URL_PREFIX + "removeProcess";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, Boolean.class);
		}
		return false;
	}

	@RequestMapping("/flow/jumpPrevTask")
	public boolean jumpPrevTask(@RequestBody final IndentProject indentProject, final HttpServletRequest request) {
		fillUserInfo(request, indentProject);
		final String url = PublicConfig.URL_PREFIX + "jumpPrevTask";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, Boolean.class);
		}
		return false;
	}

	// /////////////////////////////doc/////////////////////////////////////

	@RequestMapping("/doc/getDocView")
	public String getViewUrl(@RequestBody final IndentResource indentResource, final HttpServletRequest request) {
		final String url = PublicConfig.URL_PREFIX + "getDocView";
		String str = HttpUtil.httpPost(url, indentResource, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return str;
		}
		return "";
	}

	@RequestMapping("/doc/video/{name}.{ext}")
	public ModelAndView getVideoView(final HttpServletRequest request, @PathVariable("name") String name,
			@PathVariable("ext") String ext) {
		request.setAttribute("filename", "/portal/project/doc/" + name + "." + ext);
		return new ModelAndView("/manager/show-video");
	}

	// ////////////////////////////comment/////////////////////////////////////////

	@RequestMapping(value = "/comment/addComment", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public long addComment(@RequestBody final IndentComment indentComment, final HttpServletRequest request) {
		// fill userinfo
		fillUserInfo(request, indentComment);
		final String url = PublicConfig.URL_PREFIX + "addComment";
		String str = HttpUtil.httpPost(url, indentComment, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, Long.class);
		}
		return 0;
	}

	@RequestMapping(value = "/comment/getAllComment", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public List<IndentComment> getAllComment(@RequestBody final IndentProject indentProject,
			final HttpServletRequest request) {
		// fill userinfo
		fillUserInfo(request, indentProject);
		final String url = PublicConfig.URL_PREFIX + "getAllComment";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		}
		return new ArrayList<>();
	}

	// /////////////////////////////Resource////////////////////////////////////////

	@RequestMapping(value = "/resource/addResource", method = RequestMethod.POST)
	public String addResource(final MultipartFile file, String projectId, String tag,
			final HttpServletRequest request) {
		IndentProject indentProject = new IndentProject();
		indentProject.setId(Long.valueOf(projectId));
		indentProject.setTag(tag);
		fillUserInfo(request, indentProject);

		final String url = PublicConfig.URL_PREFIX + "addResource";
		MultipartEntityBuilder multipartEntityBuilder = MultipartEntityBuilder.create();
		multipartEntityBuilder.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);
		multipartEntityBuilder.setCharset(Charset.forName("utf-8"));
		try {
			multipartEntityBuilder.addTextBody("id", indentProject.getId() + "",
					ContentType.create("text/plain", Charset.forName("utf-8")));
			multipartEntityBuilder.addTextBody("tag", indentProject.getTag() + "",
					ContentType.create("text/plain", Charset.forName("utf-8")));
			multipartEntityBuilder.addTextBody("userType", indentProject.getUserType() + "",
					ContentType.create("text/plain", Charset.forName("utf-8")));
			multipartEntityBuilder.addTextBody("userId", indentProject.getUserId() + "",
					ContentType.create("text/plain", Charset.forName("utf-8")));

			multipartEntityBuilder.addBinaryBody("addfile", file.getBytes(), ContentType.create(file.getContentType()),
					file.getOriginalFilename());
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		String str = HttpUtil.httpPostFileForm(url, multipartEntityBuilder, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, String.class);
		}
		return "";
	}

	// 获取文件状态
	@RequestMapping(value = "/resource/get/state", produces = "application/text; charset=UTF-8")
	public String getState(@RequestBody IndentResource indentResource) {
		String statr = resourceService.getState(indentResource);
		return "{\"state\":\"" + statr + "\"}";
	}

	@RequestMapping(value = "/comment/getResourceList", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public List<IndentResource> getResourceList(@RequestBody final IndentProject indentProject,
			final HttpServletRequest request) {
		fillUserInfo(request, indentProject);
		final String url = PublicConfig.URL_PREFIX + "getResourceList";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		}
		return new ArrayList<>();
	}

	@RequestMapping("/getDFSFile/{id}")
	public void getDFSFile(@PathVariable final long id, final HttpServletResponse response,
			final HttpServletRequest request) {
		// fdfsService
		final String url = PublicConfig.URL_PREFIX + "getIndentResource/" + id;
		try {
			String str = HttpUtil.httpGet(url, request);
			if (ValidateUtil.isValid(str)) {
				final IndentResource indentResource = JsonUtil.toBean(str, IndentResource.class);
				InputStream in = FastDFSClient.downloadFile(indentResource.getIrFormatName());
				// 此处设置文件大小
				// System.err.println(indentResource.getIrOriginalName() + "
				// 文件大小为: " + in.available());
				// response.setContentLength(in.available());
				ServletOutputStream ouputStream = response.getOutputStream();
				response.setCharacterEncoding("utf-8");
				response.setContentType("application/octet-stream");
				String filename = URLEncoder.encode(indentResource.getIrOriginalName(), "UTF-8");
				response.setHeader("Content-Disposition", "attachment; filename=\"" + filename + "\"\r\n");
				// send file
				HttpUtil.saveTo(in, ouputStream);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/comment/getTags", produces = "application/json; charset=UTF-8")
	public List<IndentResource> getTags(final HttpServletRequest request) {
		final String url = PublicConfig.URL_PREFIX + "getTags";
		String str = HttpUtil.httpGet(url, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		}
		return new ArrayList<>();
	}

	/**
	 * 跳转 内部员工的 作品收藏页面
	 * 
	 * @return
	 */
	@RequestMapping("/favourites")
	public ModelAndView view(HttpServletRequest request, ModelMap map) {
		final SessionInfo info = (SessionInfo) request.getSession().getAttribute(PmsConstant.SESSION_INFO);
		if (info != null) {
			List<PmsProduct> list = pmsEmployeeProductLinkFacade.findProductIdsByEmployeeId(info.getReqiureId());
			map.put("productList", list);
		}
		return new ModelAndView("/manager/collect", map);
	}

	/**
	 * 删除收藏作品
	 * 
	 * @param productId
	 *            作品ID
	 * @return
	 */
	@RequestMapping(value = "/favourites/remove/{productId}", method = RequestMethod.POST)
	public PmsResult deleteFavourites(@PathVariable("productId") final Long productId,
			final HttpServletRequest request) {
		PmsResult prst = new PmsResult();
		if (productId != null) {
			final SessionInfo info = (SessionInfo) request.getSession().getAttribute(PmsConstant.SESSION_INFO);
			if (info != null) {
				List<PmsEmployeeProductLink> list = new ArrayList<PmsEmployeeProductLink>();
				PmsEmployeeProductLink link = new PmsEmployeeProductLink();
				link.setEmployeeId(info.getReqiureId());
				link.setProductId(productId);
				list.add(link);
				boolean result = pmsEmployeeProductLinkFacade.deleteByEmployeeIdsAndproIds(list);
				prst.setResult(result);
				return prst;
			} else {
				// session 为空
				prst.setErr("请重新登录!");
			}
		} else {
			// 作品ID为空
			prst.setErr("请选择作品删除!");
		}
		prst.setResult(false);
		return prst;
	}

	/**
	 * 添加作品收藏
	 * 
	 * @param productId
	 *            作品ID
	 * @return
	 */
	@RequestMapping(value = "/favourites/add/{productId}", method = RequestMethod.POST)
	public PmsResult addFavourites(@PathVariable("productId") final Long productId, final HttpServletRequest request) {
		PmsResult prst = new PmsResult();
		if (productId != null) {
			final SessionInfo info = (SessionInfo) request.getSession().getAttribute(PmsConstant.SESSION_INFO);
			if (info != null) {
				PmsEmployeeProductLink link = new PmsEmployeeProductLink();
				link.setEmployeeId(info.getReqiureId());
				link.setProductId(productId);
				boolean result = pmsEmployeeProductLinkFacade.save(link);
				prst.setResult(result);
				return prst;
			} else {
				// session 为空
				prst.setErr("请重新登录!");
			}
		} else {
			// 作品ID为空
			prst.setErr("请选择作品删除!");
		}
		prst.setResult(false);
		return prst;
	}

	/**
	 * 判断该影片是否被当前登录者收藏
	 * 
	 * @param productId
	 *            作品ID
	 * @return true | false
	 */
	@RequestMapping(value = "/favourites/judge/{productId}", method = RequestMethod.POST)
	public PmsResult judgeFavourites(@PathVariable("productId") final Long productId,
			final HttpServletRequest request) {
		// 判断该影片是否是收藏的
		PmsResult prst = new PmsResult();
		if (productId != null) {
			final SessionInfo info = (SessionInfo) request.getSession().getAttribute(PmsConstant.SESSION_INFO);
			if (info != null) {
				Map<String, Object> param = new HashMap<String, Object>();
				param.put("employeeId", info.getReqiureId());
				param.put("productId", productId);
				List<PmsEmployeeProductLink> list = pmsEmployeeProductLinkFacade.findLinkByParam(param);
				prst.setResult(ValidateUtil.isValid(list));
				return prst;
			} else {
				// session 为空
				prst.setErr("请重新登录!");
			}
		} else {
			// 作品ID为空
			prst.setErr("请选择作品删除!");
		}
		prst.setResult(false);
		return prst;
	}

	private void fillUserInfo(HttpServletRequest request, IndentProject indentProject) {
		final SessionInfo info = getCurrentInfo(request);
		if (indentProject == null || info == null)
			return;
		// fill user info
		indentProject.setUserId(info.getReqiureId());
		indentProject.setUserType(info.getSessionType());
	}

	private void fillUserInfo(HttpServletRequest request, IndentComment indentComment) {
		final SessionInfo info = getCurrentInfo(request);
		if (indentComment == null || info == null)
			return;
		// fill user info
		indentComment.setIcUserId(info.getReqiureId());
		indentComment.setIcUserType(info.getSessionType());
	}

	static final String CUSTOMERSERVICE = "客服";

	/**
	 * 初始化 sessionInfo 信息
	 */
	public boolean initSessionInfo(final PmsEmployee e, final HttpServletRequest request) {
		/* 验证客服身份 */
		boolean isCustomerService = false;
		List<PmsRole> ro = e.getRoles();
		if (ValidateUtil.isValid(ro)) {
			for (PmsRole pmsRole : ro) {
				String roleName = pmsRole.getRoleName();
				if (CUSTOMERSERVICE.equals(roleName)) {
					isCustomerService = true;
					break;
				}
			}
		}

		// 存入session中
		final String sessionId = request.getSession().getId();
		final SessionInfo info = new SessionInfo();
		info.setLoginName(e.getEmployeeLoginName());
		info.setRealName(e.getEmployeeRealName());
		if (isCustomerService) {
			info.setSessionType(PmsConstant.ROLE_CUSTOMER_SERVICE);
		} else {
			info.setSessionType(PmsConstant.ROLE_EMPLOYEE);
		}
		info.setToken(DataUtil.md5(sessionId));
		info.setReqiureId(e.getEmployeeId());
		info.setPhoto(e.getEmployeeImg());
		info.setTelephone(e.getPhoneNumber());

		// 计算权限码
		// 替换带有权限的角色
		final List<PmsRole> roles = new ArrayList<PmsRole>();
		for (final PmsRole r : ro) {
			final PmsRole role = pmsRoleFacade.findRoleById(r.getRoleId());
			roles.add(role);
		}
		e.setRoles(roles);

		// 计算权限码总和
		final long maxPos = pmsRightFacade.getMaxPos();
		final long[] rightSum = new long[(int) (maxPos + 1)];

		e.setRightSum(rightSum);
		e.calculateRightSum();
		long[] sum = e.getRightSum();
		info.setSum(sum);
		info.setSuperAdmin(e.isSuperAdmin()); // 判断是否是超级管理员
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(PmsConstant.SESSION_INFO, info);
		request.getSession().setAttribute(PmsConstant.SESSION_INFO, info);
		return true;
	}

	// --------------------------------项目经理----------------------------------------------
	
	@RequestMapping("/indent/index")
	public ModelAndView indentIndex() {
		return new ModelAndView("/employee/PMIndentList");
	}

	@RequestMapping("/get/indent/list")
	public DataGrid<PmsIndent> getIndentList(HttpServletRequest request) {
		SessionInfo currentInfo = getCurrentInfo(request);
		if (currentInfo != null) {
			String sessionType = currentInfo.getSessionType();
			if (ValidateUtil.isValid(sessionType) && PmsConstant.ROLE_EMPLOYEE.equals(sessionType)) {
				Long reqiureId = currentInfo.getReqiureId();
				Map<String, Object> paramMap = new HashMap<String, Object>();
				paramMap.put("indentType", PmsIndent.ORDER_DONE);
				paramMap.put("pMId", reqiureId);
				PageParam pageParam = new PageParam();
				pageParam.setBegin(0);
				pageParam.setLimit(20);
				DataGrid<PmsIndent> indentList = pmsIndentFacade.listWithPagination(pageParam, paramMap);
				return indentList;
			}
		}
		return new DataGrid<>();
	}

	/**
	 * 驳回订单
	 * 
	 * @param indent
	 * @return
	 */
	@RequestMapping("/indent/rejected")
	public BaseMsg rejectedIndent(PmsIndent indent) {
		BaseMsg baseMsg = new BaseMsg();
		baseMsg.setErrorCode(BaseMsg.ERROR);
		baseMsg.setErrorMsg("驳回异常，请重试！");
		indent.setIndentType(PmsIndent.ORDER_HANDLING);

		long res = pmsIndentFacade.rejected(indent);
		if (res > 0) {
			baseMsg.setErrorCode(BaseMsg.NORMAL);
			baseMsg.setErrorMsg("驳回成功！");
		}
		return baseMsg;
	}

}
