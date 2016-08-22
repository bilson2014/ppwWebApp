package com.panfeng.film.resource.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntityBuilder;
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
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.panfeng.film.domain.BaseMsg;
import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.domain.Result;
import com.panfeng.film.domain.SessionInfo;
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
import com.panfeng.film.security.AESUtil;
import com.panfeng.film.service.EmployeeThirdLogin;
import com.panfeng.film.service.ResourceService;
import com.panfeng.film.service.SessionInfoService;
import com.panfeng.film.util.DataUtil;
import com.panfeng.film.util.HttpUtil;
import com.panfeng.film.util.JsonUtil;
import com.panfeng.film.util.ValidateUtil;
import com.panfeng.film.util.WechatUtils;

@RestController
@RequestMapping("/mgr")
public class VersionManagerController extends BaseController {

	private static Logger logger = LoggerFactory.getLogger("error");
	@Autowired
	private ResourceService resourceService;
	@Autowired
	private EmployeeThirdLogin employeeThirdLogin;

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
	public Result doLogin(final HttpServletRequest request, @RequestBody final Employee employee) {

		final Result result = new Result();
		if (employee != null) {
			final String pwd = employee.getEmployeePassword();
			final String loginName = employee.getEmployeeLoginName();
			if (ValidateUtil.isValid(loginName) && ValidateUtil.isValid(pwd)) {
				// 解密
				try {
					final String password = AESUtil.Decrypt(pwd, GlobalConstant.UNIQUE_KEY);
					employee.setEmployeePassword(DataUtil.md5(password));
					final String url = GlobalConstant.URL_PREFIX + "/portal/manager/static/encipherment";
					final String json = HttpUtil.httpPost(url, employee, request);
					if (ValidateUtil.isValid(json)) {
						final boolean ret = JsonUtil.toBean(json, Boolean.class);
						if (!ret) {
							result.setMessage("用户名或密码错误!");
						}
						result.setRet(ret);
						return result;
					}

				} catch (Exception e) {
					logger.error("VersionManager login error,Becase of decrypt password error ...");
					e.printStackTrace();
				}
			}
		}

		result.setRet(false);
		result.setMessage("用户名或密码错误!");
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
		// TODO:
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
				boolean isTest = com.panfeng.film.util.Constants.AUTO_TEST.equals("yes") ? true : false;
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
						final String url = GlobalConstant.URL_PREFIX + "portal/manager/thirdLogin/bind";
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
				logger.error("Provider bind error,teamName is " + employee.getEmployeeRealName());
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
			final String url = GlobalConstant.URL_PREFIX + "portal/manager/static/checkNumber/" + phoneNumber;
			final String json = HttpUtil.httpGet(url, request);
			if (ValidateUtil.isValid(json)) {
				Long count = JsonUtil.toBean(json, Long.class);
				if (count > 0) {
					return true;
				}

			}
		}

		return false;
	}

	@RequestMapping("/recover/pwd")
	public Info recover(final HttpServletRequest request, @RequestBody final Employee e) throws Exception {

		final HttpSession session = request.getSession();
		// 密码重置
		final String code = (String) session.getAttribute("code");
		// 是否是测试程序
		boolean isTest = com.panfeng.film.util.Constants.AUTO_TEST.equals("yes") ? true : false;
		Info info = new Info(); // 信息载体
		// 判断验证码
		if (!"".equals(code) && code != null) {
			if (isTest || code.equals(e.getVerification_code())) {
				if (e.getEmployeePassword() != null && !"".equals(e.getEmployeePassword())) {
					// AES 密码解密
					final String password = AESUtil.Decrypt(e.getEmployeePassword(), GlobalConstant.UNIQUE_KEY);
					// MD5 加密
					e.setEmployeePassword(DataUtil.md5(password));
					final String url = GlobalConstant.URL_PREFIX + "portal/manager/static/editPwd";
					String str = HttpUtil.httpPost(url, e, request);
					Boolean result = null;
					if (str != null && !"".equals(str)) {
						result = JsonUtil.toBean(str, Boolean.class);
						// 添加 session
						session.removeAttribute("code"); // 移除验证码
						info.setKey(result);
						return info;
					} else {
						// 注册失败
						info.setKey(false);
						info.setValue("服务器繁忙，请稍候再试...");
						return info;
					}

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
	public ModelAndView indexView(ModelMap model,HttpServletRequest request) {
		final ServletContext sc = request.getServletContext();
		WebApplicationContext  wc = WebApplicationContextUtils.findWebApplicationContext(sc);
		final SessionInfoService sessionService = (SessionInfoService) wc.getBean("sessionInfoService");
		
		final SessionInfo info = (SessionInfo) sessionService.getSessionWithField(request, GlobalConstant.SESSION_INFO);
		if(info != null){
			model.put("userId",info.getReqiureId() );
		}
		return new ModelAndView("/manager/index");
	}

	// ////////////////////////////////////project/////////////////////////////////////////////////////////////

	@RequestMapping(value = "/projects/save", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public boolean projectsSave(@RequestBody final IndentProject indentProject, final HttpServletRequest request) {
		// fill userinfo
		fillUserInfo(request, indentProject);

		final String url = GlobalConstant.URL_PREFIX + "project/save";
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
		final String url = GlobalConstant.URL_PREFIX + "project/remove/synergy";
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

		final String url = GlobalConstant.URL_PREFIX + "project/get/synergys";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		}

		return new ArrayList<>();
	}

	@RequestMapping(value = "/projects/get/reffers", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public List<IndentProject> getReffers(@RequestBody BizBean bizBean, final HttpServletRequest request) {
		// fill userinfo
		// fillUserInfo(request, indentProject);

		final String url = GlobalConstant.URL_PREFIX + "portal/getEmployeeListByReffer";
		String str = HttpUtil.httpPost(url, bizBean, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		}

		return new ArrayList<>();
	}

	@RequestMapping(value = "/projects/search/employee/list", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public List<Employee> searchEmployee(@RequestBody BizBean bizBean, final HttpServletRequest request) {
		// fill userinfo
		final String url = GlobalConstant.URL_PREFIX + "portal/search/employee/list";
		String str = HttpUtil.httpPost(url, bizBean, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		}

		return new ArrayList<>();
	}

	@RequestMapping("/projects/flow-index")
	public ModelAndView projectsView(final ModelMap model, String key,HttpServletRequest request) {
		model.put("key", key);
		final ServletContext sc = request.getServletContext();
		WebApplicationContext  wc = WebApplicationContextUtils.findWebApplicationContext(sc);
		final SessionInfoService sessionService = (SessionInfoService) wc.getBean("sessionInfoService");
		
		final SessionInfo info = (SessionInfo) sessionService.getSessionWithField(request, GlobalConstant.SESSION_INFO);
		if(info != null){
			model.put("userId",info.getReqiureId() );
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

		final String url = GlobalConstant.URL_PREFIX + "project/all-project";
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

		final String url = GlobalConstant.URL_PREFIX + "project/get-projectInfo";
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
		final String url = GlobalConstant.URL_PREFIX + "project/get-redundantProject";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, IndentProject.class);
		}

		return new IndentProject();
	}

	@RequestMapping("/projects/update-indentProject")
	public boolean updateIndentProject(@RequestBody final IndentProject indentProject,
			final HttpServletRequest request) {
		// fill userinfo
		fillUserInfo(request, indentProject);
		final String url = GlobalConstant.URL_PREFIX + "project/update-indentProject";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, Boolean.class);
		}

		return false;
	}

	@RequestMapping("/projects/getProjectTags")
	public List<String> getProjectTags(final HttpServletRequest request) {
		final String url = GlobalConstant.URL_PREFIX + "project/getProjectTags";
		String str = HttpUtil.httpGet(url, request);
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		}
		return new ArrayList<>();
	}

	@RequestMapping("/projects/cancelProject")
	public boolean cancelProject(@RequestBody final IndentProject indentProject, final HttpServletRequest request) {
		// fill userinfo
		fillUserInfo(request, indentProject);
		final String url = GlobalConstant.URL_PREFIX + "project/cancelProject";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, Boolean.class);
		}
		return false;
	}

	@RequestMapping("/projects/get/SerialID")
	public String getProjectSerialID(final HttpServletRequest request) {
		final String url = GlobalConstant.URL_PREFIX + "project/get/SerialID";
		String str = HttpUtil.httpGet(url, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return str;
		}
		return "";
	}

	@RequestMapping("/projects/verifyProjectInfo")
	public BaseMsg verifyProjectInfo(final HttpServletRequest request, @RequestBody IndentProject indentProject) {
		final String url = GlobalConstant.URL_PREFIX + "project/verifyProjectInfo";
		String str = HttpUtil.httpPost(url, indentProject, request);
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, BaseMsg.class);
		}
		return new BaseMsg(BaseMsg.ERROR, "服务器繁忙", "");
	}

	@RequestMapping("/projects/team/search/info")
	public List<Team> getTeamByName(@RequestBody final Team team, final HttpServletRequest request) {
		// fill userinfo
		final String url = GlobalConstant.URL_PREFIX + "portal/team/search/info";
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
		final String url = GlobalConstant.URL_PREFIX + "portal/user/search/info";
		String str = HttpUtil.httpPost(url, user, request);
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		}
		return new ArrayList<>();
	}

	@RequestMapping("/projects/staff/static/list")
	public List<Staff> getStaffList(final HttpServletRequest request) {
		final String url = GlobalConstant.URL_PREFIX + "/portal/staff/static/list";
		String str = HttpUtil.httpGet(url, request);
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		}
		return new ArrayList<>();
	}

	/**
	 * 添加简单客户
	 */
	@RequestMapping("/projects/user/save/simple")
	public long addSimpleUser(@RequestBody final User user, final HttpServletRequest request) {
		final String url = GlobalConstant.URL_PREFIX + "portal/user/save/simple";
		String str = HttpUtil.httpPost(url, user, request);
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, Long.class);
		} else
			return -1;
	}

	@RequestMapping("/projects/get/report")
	public void getReport(final HttpServletResponse response, final HttpServletRequest request) {
		final String url = GlobalConstant.URL_PREFIX + "project/get/report";
		try {
			IndentProject indentProject = new IndentProject();
			fillUserInfo(request, indentProject);
			Object[] objArrayObjects = HttpUtil.httpPostFile(url, indentProject, request);

			response.reset();
			response.setCharacterEncoding("utf-8");
			if (objArrayObjects[1] != null) {
				File inputFile = (File) objArrayObjects[1];
				response.setContentType("application/octet-stream");
				response.setContentLength((int) inputFile.length());
				response.setHeader("Content-Disposition", objArrayObjects[0] + "");
				ServletOutputStream ouputStream = response.getOutputStream();
				InputStream is = new FileInputStream(inputFile);
				// send file
				HttpUtil.saveTo(is, ouputStream);
				inputFile.delete();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// /////////////////////////flowcontroller///////////////////////////////
	@RequestMapping("/flow/add-view")
	public ModelAndView flowView(final ModelMap model) {
		return new ModelAndView("/manager/add-flow", model);
	}

	@RequestMapping(value = "/flow/getnodes", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public List<ActivitiTask> getFlowNodes(@RequestBody final IndentProject indentProject,
			final HttpServletRequest request) {
		final String url = GlobalConstant.URL_PREFIX + "getnodes";
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
		final String url = GlobalConstant.URL_PREFIX + "startProcess";
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
		final String url = GlobalConstant.URL_PREFIX + "getCurrectTask";
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
		final String url = GlobalConstant.URL_PREFIX + "completeTask";
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
		final String url = GlobalConstant.URL_PREFIX + "getIndentFlows";
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
		final String url = GlobalConstant.URL_PREFIX + "suspendProcess";
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
		final String url = GlobalConstant.URL_PREFIX + "resumeProcess";
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
		final String url = GlobalConstant.URL_PREFIX + "removeProcess";
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
		final String url = GlobalConstant.URL_PREFIX + "jumpPrevTask";
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
		final String url = GlobalConstant.URL_PREFIX + "getDocView";
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
		final String url = GlobalConstant.URL_PREFIX + "addComment";
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
		final String url = GlobalConstant.URL_PREFIX + "getAllComment";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		}
		return new ArrayList<>();
	}

	// /////////////////////////////Resource////////////////////////////////////////

	@RequestMapping(value = "/resource/addResource", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public String addResource(@RequestParam final MultipartFile addfile, final IndentProject indentProject,
			final HttpServletRequest request) {
		fillUserInfo(request, indentProject);

		final String url = GlobalConstant.URL_PREFIX + "addResource";
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

			multipartEntityBuilder.addBinaryBody("addfile", addfile.getBytes(),
					ContentType.create(addfile.getContentType()), addfile.getOriginalFilename());
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
		final String url = GlobalConstant.URL_PREFIX + "getResourceList";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		}
		return new ArrayList<>();
	}

	@RequestMapping("/getFile/{id}")
	public void getFile(@PathVariable final long id, final HttpServletResponse response,
			final HttpServletRequest request) {
		final String url = GlobalConstant.URL_PREFIX + "getFile/" + id;
		try {
			Object[] objArrayObjects = HttpUtil.httpGetFile(url, request);
			response.reset();
			response.setCharacterEncoding("utf-8");
			if (objArrayObjects[1] != null) {
				File inputFile = (File) objArrayObjects[1];
				response.setContentType("application/octet-stream");
				response.setContentLength((int) inputFile.length());
				response.setHeader("Content-Disposition", objArrayObjects[0] + "");
				ServletOutputStream ouputStream = response.getOutputStream();
				InputStream is = new FileInputStream(inputFile);
				// send file
				HttpUtil.saveTo(is, ouputStream);
				inputFile.delete();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/comment/getTags", produces = "application/json; charset=UTF-8")
	public List<IndentResource> getTags(final HttpServletRequest request) {
		final String url = GlobalConstant.URL_PREFIX + "getTags";
		String str = HttpUtil.httpGet(url, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		}
		return new ArrayList<>();
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
}
