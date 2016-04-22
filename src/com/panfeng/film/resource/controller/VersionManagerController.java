package com.panfeng.film.resource.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.domain.Result;
import com.panfeng.film.domain.SessionInfo;
import com.panfeng.film.resource.model.ActivitiTask;
import com.panfeng.film.resource.model.IndentComment;
import com.panfeng.film.resource.model.IndentFlow;
import com.panfeng.film.resource.model.IndentProject;
import com.panfeng.film.resource.model.IndentResource;
import com.panfeng.film.resource.model.Info;
import com.panfeng.film.resource.model.Team;
import com.panfeng.film.resource.model.User;
import com.panfeng.film.resource.model.VersionManager;
import com.panfeng.film.security.AESUtil;
import com.panfeng.film.util.DataUtil;
import com.panfeng.film.util.HttpUtil;
import com.panfeng.film.util.JsonUtil;
import com.panfeng.film.util.ValidateUtil;

@RestController
@RequestMapping("/mgr")
public class VersionManagerController extends BaseController {

	private static Logger logger = LoggerFactory.getLogger("error");

	@RequestMapping("/login")
	public ModelAndView loginView() {

		return new ModelAndView("/manager/login");
	}

	@RequestMapping("/doLogin")
	public Result doLogin(final HttpServletRequest request,
			@RequestBody final VersionManager manager) {

		final Result result = new Result();
		if (manager != null) {
			final String pwd = manager.getManagerPassword();
			final String loginName = manager.getManagerLoginName();
			if (ValidateUtil.isValid(loginName) && ValidateUtil.isValid(pwd)) {
				// 解密
				try {
					final String password = AESUtil.Decrypt(pwd,
							GlobalConstant.UNIQUE_KEY);
					manager.setManagerPassword(DataUtil.md5(password));
					final String url = GlobalConstant.URL_PREFIX
							+ "/portal/manager/static/encipherment";
					final String json = HttpUtil
							.httpPost(url, manager, request);
					if (ValidateUtil.isValid(json)) {
						final boolean ret = JsonUtil
								.toBean(json, Boolean.class);
						result.setRet(ret);
						return result;
					}

				} catch (Exception e) {
					logger.error("Manager login error,Becase of decrypt password error ...");
					e.printStackTrace();
				}
			}
		}

		result.setRet(false);
		result.setMessage("用户名或密码错误!");
		return result;
	}
	
	@RequestMapping("/recover/check/{phoneNumber}")
	public boolean checkPhoneNumber(@PathVariable("phoneNumber") final String phoneNumber,final HttpServletRequest request){
		
		if(ValidateUtil.isValid(phoneNumber)){
			final String url = GlobalConstant.URL_PREFIX + "portal/manager/static/checkNumber/" + phoneNumber;
			final String json = HttpUtil.httpGet(url, request);
			if(ValidateUtil.isValid(json)){
				Long count = JsonUtil.toBean(json, Long.class);
				if(count > 0){
					return true;
				}
				
			}
		}
		
		return false;
	}
	
	@RequestMapping("/recover/pwd")
	public Info recover(final HttpServletRequest request,@RequestBody final VersionManager manager) throws Exception{
		
		final HttpSession session = request.getSession();
		// 密码重置
		final String code = (String) session.getAttribute("code");
		Info info = new Info(); // 信息载体
		// 判断验证码
		if (!"".equals(code) && code != null) {
			if (code.equals(manager.getVerification_code())) {
				if (manager.getManagerPassword() != null
						&& !"".equals(manager.getManagerPassword())) {
					// AES 密码解密
					final String password = AESUtil.Decrypt(manager.getManagerPassword(),
							GlobalConstant.UNIQUE_KEY);
					// MD5 加密
					manager.setManagerPassword(DataUtil.md5(password));
					final String url = GlobalConstant.URL_PREFIX + "portal/manager/static/editPwd";
					String str = HttpUtil.httpPost(url, manager,request);
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
	public ModelAndView indexView() {
		return new ModelAndView("/manager/index");
	}

	// ////////////////////////////////////project/////////////////////////////////////////////////////////////

	@RequestMapping(value = "/projects/save", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public boolean projectsSave(@RequestBody final IndentProject indentProject,
			final HttpServletRequest request) {
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

	@RequestMapping("/projects/flow-index")
	public ModelAndView projectsView(final ModelMap model) {
		return new ModelAndView("/manager/index");
	}

	@RequestMapping("/projects/upadte-view")
	public ModelAndView updateview(final ModelMap model) {
		model.put("state", "update");
		return new ModelAndView("/manager/add-flow", model);
	}

	@RequestMapping(value = "/projects/all-project", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public List<IndentProject> getUserAllProject(
			@RequestBody final IndentProject indentProject,
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
	public IndentProject getProjectInfo(
			@RequestBody final IndentProject indentProject,
			final HttpServletRequest request) {
		// fill userinfo
		fillUserInfo(request, indentProject);

		final String url = GlobalConstant.URL_PREFIX
				+ "project/get-projectInfo";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, IndentProject.class);
		}

		return new IndentProject();
	}

	@RequestMapping(value = "/projects/get-redundantProject", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public IndentProject getRedundantProject(
			@RequestBody final IndentProject indentProject,
			final HttpServletRequest request) {
		// fill userinfo
		fillUserInfo(request, indentProject);
		final String url = GlobalConstant.URL_PREFIX
				+ "project/get-redundantProject";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, IndentProject.class);
		}

		return new IndentProject();
	}

	@RequestMapping("/projects/update-indentProject")
	public boolean updateIndentProject(
			@RequestBody final IndentProject indentProject,
			final HttpServletRequest request) {
		// fill userinfo
		fillUserInfo(request, indentProject);
		final String url = GlobalConstant.URL_PREFIX
				+ "project/update-indentProject";
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
	public boolean cancelProject(
			@RequestBody final IndentProject indentProject,
			final HttpServletRequest request) {
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

	@RequestMapping("/projects/team/search/info")
	public List<Team> getTeamByName(@RequestBody final Team team,
			final HttpServletRequest request) {
		// fill userinfo
		final String url = GlobalConstant.URL_PREFIX
				+ "portal/team/search/info";
		String str = HttpUtil.httpPost(url, team, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		}
		return new ArrayList<>();
	}

	@RequestMapping("/projects/user/search/info")
	public List<User> getUserByName(@RequestBody final User user,
			final HttpServletRequest request) {
		// fill userinfo
		final String url = GlobalConstant.URL_PREFIX
				+ "portal/user/search/info";
		String str = HttpUtil.httpPost(url, user, request);
		if (str != null && !"".equals(str)) {
			return JsonUtil.toList(str);
		}
		return new ArrayList<>();
	}

	/**
	 * 添加简单客户
	 */
	@RequestMapping("/projects/user/save/simple")
	public long addSimpleUser(@RequestBody final User user,final HttpServletRequest request) {
		final String url = GlobalConstant.URL_PREFIX + "portal/user/save/simple";
		String str = HttpUtil.httpPost(url, user, request);
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, Long.class);
		}
		else
			return -1;
	}

	// /////////////////////////flowcontroller///////////////////////////////
	@RequestMapping("/flow/add-view")
	public ModelAndView flowView(final ModelMap model) {
		return new ModelAndView("/manager/add-flow", model);
	}

	@RequestMapping(value = "/flow/getnodes", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public List<ActivitiTask> getFlowNodes(
			@RequestBody final IndentProject indentProject,
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
	public boolean startProcess(@RequestBody final IndentProject indentProject,
			final HttpServletRequest request) {
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
	public ActivitiTask getCurrectTask(
			@RequestBody final IndentProject indentProject,
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
	public boolean completeTask(@RequestBody final IndentProject indentProject,
			final HttpServletRequest request) {
		fillUserInfo(request, indentProject);
		final String url = GlobalConstant.URL_PREFIX + "completeTask";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, Boolean.class);
		}
		return false;
	}

	@RequestMapping(value = "/flow/getIndentFlows", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public List<IndentFlow> getIndentFlows(
			@RequestBody final IndentProject indentProject,
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
	public boolean suspendProcess(
			@RequestBody final IndentProject indentProject,
			final HttpServletRequest request) {
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
	public boolean resumeProcess(
			@RequestBody final IndentProject indentProject,
			final HttpServletRequest request) {
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
	public boolean removeProcess(
			@RequestBody final IndentProject indentProject,
			final HttpServletRequest request) {
		fillUserInfo(request, indentProject);
		final String url = GlobalConstant.URL_PREFIX + "removeProcess";
		String str = HttpUtil.httpPost(url, indentProject, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, Boolean.class);
		}
		return false;
	}

	// /////////////////////////////doc/////////////////////////////////////

	@RequestMapping("/doc/getDocView")
	public String getViewUrl(@RequestBody final IndentResource indentResource,
			final HttpServletRequest request) {
		final String url = GlobalConstant.URL_PREFIX + "getDocView";
		String str = HttpUtil.httpPost(url, indentResource, request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return str;
		}
		return "";
	}

	// ////////////////////////////comment/////////////////////////////////////////

	@RequestMapping(value = "/comment/addComment", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public long addComment(@RequestBody final IndentComment indentComment,
			final HttpServletRequest request) {
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
	public List<IndentComment> getAllComment(
			@RequestBody final IndentProject indentProject,
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
	public String addResource(@RequestParam final MultipartFile addfile,
			final IndentProject indentProject, final HttpServletRequest request) {
		fillUserInfo(request, indentProject);

		final String url = GlobalConstant.URL_PREFIX + "addResource";
		MultipartEntityBuilder multipartEntityBuilder = MultipartEntityBuilder
				.create();
		multipartEntityBuilder.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);
		multipartEntityBuilder.setCharset(Charset.forName("utf-8"));
		try {
			multipartEntityBuilder.addTextBody("id",
					indentProject.getId() + "",
					ContentType.create("text/plain", Charset.forName("utf-8")));
			multipartEntityBuilder.addTextBody("tag", indentProject.getTag()
					+ "",
					ContentType.create("text/plain", Charset.forName("utf-8")));
			multipartEntityBuilder.addTextBody("userType",
					indentProject.getUserType() + "",
					ContentType.create("text/plain", Charset.forName("utf-8")));
			multipartEntityBuilder.addTextBody("userId",
					indentProject.getUserId() + "",
					ContentType.create("text/plain", Charset.forName("utf-8")));

			multipartEntityBuilder.addBinaryBody("addfile", addfile.getBytes(),
					ContentType.create(addfile.getContentType()),
					addfile.getOriginalFilename());
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		String str = HttpUtil.httpPostFileForm(url, multipartEntityBuilder,
				request);
		// User information = null;
		if (str != null && !"".equals(str)) {
			return JsonUtil.toBean(str, String.class);
		}
		return "";
	}

	@RequestMapping(value = "/comment/getResourceList", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public List<IndentResource> getResourceList(
			@RequestBody final IndentProject indentProject,
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
	public void getFile(@PathVariable final long id,
			final HttpServletResponse response, final HttpServletRequest request) {
		final String url = GlobalConstant.URL_PREFIX + "getFile/" + id;
		try {
			Object[] objArrayObjects = HttpUtil.httpGetFile(url, request);
			response.reset();
			response.setCharacterEncoding("utf-8");
			if (objArrayObjects[1] != null) {
				File inputFile = (File) objArrayObjects[1];
				response.setContentType("application/octet-stream");
				response.setContentLength((int) inputFile.length());
				response.setHeader("Content-Disposition", objArrayObjects[0]
						+ "");
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

	private void fillUserInfo(HttpServletRequest request,
			IndentProject indentProject) {
		final SessionInfo info = getCurrentInfo(request);
		if (indentProject == null || info == null)
			return;
		// fill user info
		indentProject.setUserId(info.getReqiureId());
		indentProject.setUserType(info.getSessionType());
	}

	private void fillUserInfo(HttpServletRequest request,
			IndentComment indentComment) {
		final SessionInfo info = getCurrentInfo(request);
		if (indentComment == null || info == null)
			return;
		// fill user info
		indentComment.setIcUserId(info.getReqiureId());
		indentComment.setIcUserType(info.getSessionType());
	}
}
