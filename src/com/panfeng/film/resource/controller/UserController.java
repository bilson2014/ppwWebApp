package com.panfeng.film.resource.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URLEncoder;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.panfeng.film.domain.BaseMsg;
import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.domain.SessionInfo;
import com.panfeng.film.resource.model.PhotoCutParam;
import com.panfeng.film.resource.model.User;
import com.panfeng.film.security.AESUtil;
import com.panfeng.film.service.SmsService;
import com.panfeng.film.util.DataUtil;
import com.panfeng.film.util.FileUtils;
import com.panfeng.film.util.HttpUtil;
import com.panfeng.film.util.JsonUtil;
import com.panfeng.film.util.PhotoUtil;

@RestController
@RequestMapping("/user")
public class UserController extends BaseController{

	@Autowired
	private SmsService smsService = null;
	
	final Logger logger = LoggerFactory.getLogger("error");
	
	final Logger serLogger = LoggerFactory.getLogger("service");
	
	private static String URL_PREFIX = null;
	
	private static String FILE_PROFIX = null; // 文件路径前缀
	
	private static String UPLOAD_PATH = null; // 用户头像上传路径
	
	private static String IMAGE_MAX_SIZE = null;
	
	private static String ALLOW_IMAGE_TYPE = null;
	
	private static String UNIQUE_KEY = "0102030405060708"; // AES 加密key
	
	public UserController() {
		if(URL_PREFIX == null || "".equals(URL_PREFIX)){
			final InputStream is = this.getClass().getClassLoader().getResourceAsStream("jdbc.properties"); 
			try {
				Properties propertis = new Properties();
				propertis.load(is);
				URL_PREFIX = propertis.getProperty("urlPrefix");
				FILE_PROFIX = propertis.getProperty("file.prefix");
				UPLOAD_PATH = propertis.getProperty("upload.server.user.image");
				IMAGE_MAX_SIZE = propertis.getProperty("imageMaxSize");
				ALLOW_IMAGE_TYPE = propertis.getProperty("imageType");
			} catch (IOException e) {
				logger.error("UserController method:constructor load Properties fail ...");
				e.printStackTrace();
			}
		}
	}

	/**
	 * 修改用户信息
	 * @param user
	 * @param request
	 * @return
	 */
	@RequestMapping("/modify/info")
	public boolean modifiedUserInfo(@RequestBody final User user,
					final HttpServletRequest request){
		try {
			// 转码
			user.setEmail(URLEncoder.encode(user.getEmail(), "UTF-8"));
			user.setQq(URLEncoder.encode(user.getQq(), "UTF-8"));
			user.setRealName(URLEncoder.encode(user.getRealName(), "UTF-8"));
			user.setUserName(URLEncoder.encode(user.getUserName(), "UTF-8"));
			
			serLogger.info("User id is " + user.getId() + " update info(username:"+ user.getUserName() +",qq:"+ user.getQq() +",realname:"+ user.getRealName() +",email:"+ user.getEmail() +")");
			
			// 修改 用户基本信息
			final String url = URL_PREFIX + "portal/user/modify/info";
			String json = HttpUtil.httpPost(url, user,request);
			Boolean result = JsonUtil.toBean(json, Boolean.class);
			
			serLogger.info("User id is " + user.getId() + " update info(username,qq,realname,email) -success=" + result);
			
			//updateUserInSession(request);
			return result;
		} catch (UnsupportedEncodingException e) {
			logger.error("UserController method:modifiedUserInfo() user info encode error ...");
			e.printStackTrace();
		}
		return false;
	}
	
	@RequestMapping("/modify/password")
	public boolean modifiedUserPassword(@RequestBody final User user,
					final HttpServletRequest request) throws Exception{
		
		if(user != null){
			final long userId = user.getId();
			if(user.getPassword() != null && !"".equals(user.getPassword())){
				// AES密码解密
				final String password = AESUtil.Decrypt(user.getPassword(), UNIQUE_KEY);
				// MD5加密
				user.setPassword(DataUtil.md5(password));
				
				// 修改 用户密码
				final String url = URL_PREFIX + "portal/user/modify/password";
				final String json = HttpUtil.httpPost(url, user,request);
				final Boolean result = JsonUtil.toBean(json, Boolean.class);
				
				serLogger.info("User id is " + userId + " update password -success=" + result);
				//updateUserInSession(request);
				return result;
			}
			logger.info("UserController method:modifiedUserPassword() User id is " + userId + " update password -success=false,info=password is null ...");
		}
		return false;
	}
	/**
	 * 根据手机验证码修改用户密码
	 * @throws Exception
	 */
	@RequestMapping("/modify/code/password")
	public Map<String, Object> modifiedUserPasswordByVerificationCode(@RequestBody final User user,
					final HttpServletRequest request) throws Exception{
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("code", 0);
		map.put("msg", "信息修改失败，请刷新后再试!");
		if(user != null){
			final String code = (String) request.getSession().getAttribute("code");
			// 是否是测试程序
			boolean isTest = com.panfeng.film.util.Constants.AUTO_TEST.equals("yes") ? true : false;
			if (isTest || (!"".equals(code) && code != null)) {
				if (isTest || (code.equals(user.getVerification_code()))) {
					final long userId = user.getId();
					if(user.getPassword() != null && !"".equals(user.getPassword())){
						// AES密码解密
						final String password = AESUtil.Decrypt(user.getPassword(), UNIQUE_KEY);
						// MD5加密
						user.setPassword(DataUtil.md5(password));
						
						// 修改 用户密码
						final String url = URL_PREFIX + "portal/user/modify/password";
						final String json = HttpUtil.httpPost(url, user,request);
						final Boolean result = JsonUtil.toBean(json, Boolean.class);
						
						serLogger.info("User id is " + userId + " update password -success=" + result);
						if(result){
							map.put("code", 1);
							map.put("msg", "修改成功");
						}
					}
					logger.info("UserController method:modifiedUserPassword() User id is " + userId + " update password -success=false,info=password is null ...");
				}else{
					map.put("msg", "验证码错误");
				}
			}
		}
		return map;
	}
	
	/**
	 * 发送验证码
	 */
	@RequestMapping("/verification/{telephone}")
	public boolean verification(final HttpServletRequest request,
			@PathVariable("telephone") final String telephone){
		
		final String code = DataUtil.random(true, 6);
		request.getSession().setAttribute("code", code); // 存放验证码
		request.getSession().setAttribute("codeOfphone", telephone); // 存放手机号
		final boolean ret = smsService.smsSend(telephone, code);
		
		serLogger.info("phone number is " + telephone + " send sms code to update user telephone number -success=" + ret);
		
		//updateUserInSession(request);
		return ret;
	}
	
	/**
	 * 修改用户手机号码
	 */
	@RequestMapping("/modify/phone")
	public boolean modifyUserPhone(@RequestBody final User user,
			final HttpServletRequest request){
		
		if(user != null){
			final String code = (String) request.getSession().getAttribute("code");
			// 是否是测试程序
			boolean isTest = com.panfeng.film.util.Constants.AUTO_TEST.equals("yes") ? true : false;
			if(isTest || (code != null && !"".equals(code))){
				if(isTest || (code.equals(user.getVerification_code()))){
					
					serLogger.info("User id is " + user.getId() + " update phone number:" + user.getTelephone());
					
					// 修改 用户密码
					final String url = URL_PREFIX + "portal/user/modify/phone";
					final String json = HttpUtil.httpPost(url, user,request);
					final Boolean result = JsonUtil.toBean(json, Boolean.class);
					
					serLogger.info("User id is " + user.getId() + " update phone number -success=" + result);
					
					//updateUserInSession(request);
					return result;
				}
			}
		}
		return false;
	}
	
	/**
	 * 用户信息-修改手机号码
	 * 清除session中的验证码
	 */
	@RequestMapping("/clear/code")
	public int clearCode(final HttpServletRequest request){
		
		request.getSession().removeAttribute("code");
		return 0;
	}
	
	/**
	 * 自定义上传头像
	 */
	@RequestMapping(value = "/preview/photo",method = RequestMethod.POST)
	public String modifyUserPhoto( @RequestParam("file") final MultipartFile file,
					final HttpServletRequest request,
					final HttpServletResponse response,
					final User user){
		try {
			if(!file.isEmpty()){
				final long fileSize = file.getSize(); // 上传文件大小
				final long maxSize = Long.parseLong(IMAGE_MAX_SIZE);
				final String extName = FileUtils.getExtName(file.getOriginalFilename(), "."); // 后缀名
				
				if(fileSize > maxSize * 1024){
					// 文件大小超出规定范围
					return "false@error=1";
				}else{
					
					if(ALLOW_IMAGE_TYPE.indexOf(extName.toLowerCase()) > -1){ // 文件格式正确
						// save file
						File imageDir = new File(FILE_PROFIX + UPLOAD_PATH);
						if(!imageDir.exists())
							imageDir.mkdir();
						
						StringBuffer fileName = new StringBuffer();
						fileName.append("user" + (user.getId() < 10 ? "0" + user.getId() : user.getId()));
						fileName.append("_temp");
						final Calendar calendar = new GregorianCalendar();
						fileName.append(calendar.get(Calendar.YEAR));
						fileName.append((calendar.get(Calendar.MONTH)+1) < 10 ? "0" + (calendar.get(Calendar.MONTH)+1) : (calendar.get(Calendar.MONTH)+1));
						fileName.append(calendar.get(Calendar.DAY_OF_MONTH) < 10 ? "0" + calendar.get(Calendar.DAY_OF_MONTH) : calendar.get(Calendar.DAY_OF_MONTH));
						fileName.append(calendar.get(Calendar.HOUR_OF_DAY));
						fileName.append(calendar.get(Calendar.MINUTE));
						fileName.append(calendar.get(Calendar.SECOND));
						fileName.append(calendar.get(Calendar.MILLISECOND));
						fileName.append(".");
						fileName.append(extName);
						
						// get file path
						final String path = UPLOAD_PATH + "/" + fileName;
						File imageFile = new File(FILE_PROFIX + path);
						file.transferTo(imageFile);
						
						serLogger.info("User id is " + user.getId() + " upload photo by self path is" + path);
						
						return path;
					}else{
						// 文件格式不正确
						return "false@error=2";
					}
				}
			}
			
		} catch (Exception e) {
			logger.error("UserController method:modifyUserPhoto() Upload user image error ...");
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 使用系统提供的头像，修改用户头像
	 * @throws MalformedURLException 
	 */
	@RequestMapping(value = "/directModify/photo",method = RequestMethod.POST)
	public boolean changePhotoWithClick(@RequestBody final User user,
										final HttpServletRequest request) throws MalformedURLException{
		
		if(user != null){
			String imgPath = request.getServletContext().getRealPath(user.getImgUrl());
			
			File original = new File(imgPath);
			
			// save file
			File imageDir = new File(FILE_PROFIX + UPLOAD_PATH);
			if(!imageDir.exists())
				imageDir.mkdir();
			
			StringBuffer fileName = new StringBuffer();
			final String extName = FileUtils.getExtName(original.getName(), ".");
			fileName.append("user" + (user.getId() < 10 ? "0" + user.getId() : user.getId()));
			fileName.append("_");
			final Calendar calendar = new GregorianCalendar();
			fileName.append(calendar.get(Calendar.YEAR));
			fileName.append((calendar.get(Calendar.MONTH)+1) < 10 ? "0" + (calendar.get(Calendar.MONTH)+1) : (calendar.get(Calendar.MONTH)+1));
			fileName.append(calendar.get(Calendar.DAY_OF_MONTH) < 10 ? "0" + calendar.get(Calendar.DAY_OF_MONTH) : calendar.get(Calendar.DAY_OF_MONTH));
			fileName.append(calendar.get(Calendar.HOUR_OF_DAY));
			fileName.append(calendar.get(Calendar.MINUTE));
			fileName.append(calendar.get(Calendar.SECOND));
			fileName.append("_");
			fileName.append(calendar.get(Calendar.MILLISECOND));
			fileName.append(".");
			fileName.append(extName);
			
			// get file path
			final String path = UPLOAD_PATH + "/" + fileName;
			File newFile = new File(FILE_PROFIX + path);
			FileUtils.copyFile(original, newFile);
			
			serLogger.info("User id is " + user.getId() + " upload photo by system path is" + newFile);
			
			// 更新数据库
			if(user != null){
				user.setImgUrl(path);
				final String url = URL_PREFIX + "portal/user/modify/photo";
				final String json = HttpUtil.httpPost(url, user,request);
				final Boolean result = JsonUtil.toBean(json, Boolean.class);
				
				serLogger.info("User id is " + user.getId() + " update photo by system -success=" + result);
				
				//updateUserInSession(request);
				return result;
			}
		}
		
		return false;
	}
	
	/**
	 * 删除 取消的自定义上传文件
	 */
	@RequestMapping("/delete/photo")
	public boolean deleteTempPhoto(@RequestBody final User user){
		
		if(user != null && !"".equals(user.getImgUrl())){
			final String path = user.getImgUrl();
			// 删除文件
			File file = new File(FILE_PROFIX + path);
			if(file.exists()){
				if(!file.isDirectory()){
					file.delete();
					
					serLogger.info("User id is " + user.getId() + " cancel diy photo path is " + user.getImgUrl());
					
					return true;
				}
			}
		}
		return false;
	}
	
	/**
	 * 裁剪图片 并更新服务器
	 */
	@RequestMapping("/cutPhoto")
	public User uploadDIYUserImg(@RequestBody final PhotoCutParam param,
						final HttpServletRequest request) {
		
		if(param != null && !"".equals(param.getImgUrl())){
			
			try {
				// get original user image
				final String imgPath = FILE_PROFIX + param.getImgUrl();
				File original = new File(imgPath);
				final String extName = FileUtils.getExtName(original.getName(), ".");
				
				serLogger.info("User id is " + param.getUserId() + " cut photo begin");
				
				// cut photo
				final InputStream original_is = new FileInputStream(original);
				final boolean ret = PhotoUtil.cutPhoto(original_is,param,original,extName);
				
				serLogger.info("User id is " + param.getUserId() + " cut photo - success = " + ret);
				
				// save file
				File imageDir = new File(FILE_PROFIX + UPLOAD_PATH);
				if(!imageDir.exists())
					imageDir.mkdir();
				
				StringBuffer fileName = new StringBuffer();
				fileName.append("user" + (param.getUserId() < 10 ? "0" + param.getUserId() : param.getUserId()));
				fileName.append("_");
				final Calendar calendar = new GregorianCalendar();
				fileName.append(calendar.get(Calendar.YEAR));
				fileName.append((calendar.get(Calendar.MONTH)+1) < 10 ? "0" + (calendar.get(Calendar.MONTH)+1) : (calendar.get(Calendar.MONTH)+1));
				fileName.append(calendar.get(Calendar.DAY_OF_MONTH) < 10 ? "0" + calendar.get(Calendar.DAY_OF_MONTH) : calendar.get(Calendar.DAY_OF_MONTH));
				fileName.append(calendar.get(Calendar.HOUR_OF_DAY));
				fileName.append(calendar.get(Calendar.MINUTE));
				fileName.append(calendar.get(Calendar.SECOND));
				fileName.append("_");
				fileName.append(calendar.get(Calendar.MILLISECOND));
				fileName.append(".");
				fileName.append(extName);
				
				// get file path
				final String path = UPLOAD_PATH + "/" + fileName;
				File newFile = new File(FILE_PROFIX + path);
				FileUtils.copyFile(original, newFile);
				
				// delete original file
				original.delete();
				
				// 更新数据库
				final User user = new User();
				user.setId(param.getUserId());
				user.setImgFileName(fileName.toString());
				user.setImgUrl(path);
				
				final String url = URL_PREFIX + "portal/user/modify/photo";
				final String json = HttpUtil.httpPost(url, user,request);
				final Boolean result = JsonUtil.toBean(json, Boolean.class);
				
				serLogger.info("User id is " + param.getUserId() + " update DIY photo - success = " + result);
				
				if(result){
					//updateUserInSession(request);
					return user;
				}else{
					return null;
				}
			} catch (FileNotFoundException e) {
				logger.error("UserController method:uploadDIYUserImg() cut user photo error ...");
				e.printStackTrace();
			}
			
		}
		return null;
	}
	
	@RequestMapping("/repwd")
	public ModelAndView repwd(ModelMap modelMap) {
		modelMap.addAttribute("userType", GlobalConstant.ROLE_CUSTOMER);
		return new ModelAndView("/repwd", modelMap);
	}

	@RequestMapping("/updatePwd")
	public ModelAndView updatePwd(ModelMap modelMap, HttpServletRequest request) {
		modelMap.addAttribute("userType", GlobalConstant.ROLE_CUSTOMER);
		SessionInfo sessionInfo = getCurrentInfo(request);
		modelMap.addAttribute("userLoginName", sessionInfo.getLoginName());
		modelMap.addAttribute("userId", sessionInfo.getReqiureId());
		return new ModelAndView("/updatePwd", modelMap);
	}
	
	/**
	 * 第三方绑定状态
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/third/status")
	public Map<String, Object> thirdBindStatus(HttpServletRequest request){
		Map<String, Object> result = new HashMap<String,Object>();
		SessionInfo sessionInfo = getCurrentInfo(request);
		User user = new User();
		user.setId(sessionInfo.getReqiureId());
		final String url = URL_PREFIX + "portal/user/third/status";
		final String json = HttpUtil.httpPost(url, user,request);
		result = JsonUtil.toBean(json, Map.class);
		return result;
	}
	
	/**
	 * 个人中心绑定第三方
	 * 如果第三方账号已经存在,不允许绑定
	 */
	@RequestMapping("/bind/third")
	public BaseMsg bindThird(final HttpServletRequest request, final HttpServletResponse response,
			@RequestBody final User user) {
		BaseMsg baseMsg = new BaseMsg(0, "绑定失败");
		SessionInfo sessionInfo = getCurrentInfo(request);
		user.setId(sessionInfo.getReqiureId());//填充用户id
		final String url = URL_PREFIX + "portal/user/info/bind";
		String str = HttpUtil.httpPost(url, user, request);
		Boolean b = JsonUtil.toBean(str, Boolean.class);
		if(b) {
			baseMsg.setCode(1);
			baseMsg.setResult("绑定成功");
		}else baseMsg.setResult("账号存在绑定");
		return baseMsg;
	}
	
	/**
	 * 个人中心解除第三方绑定
	 */
	@RequestMapping("/unbind/third")
	public boolean unBindThird(@RequestBody final User user,final HttpServletRequest request) {
		SessionInfo sessionInfo = getCurrentInfo(request);
		user.setId(sessionInfo.getReqiureId());//填充用户id
		// 查询该用户是否存在
		final String url = URL_PREFIX + "portal/user/info/unbind";
		String str = HttpUtil.httpPost(url, user, request);
		Boolean b = JsonUtil.toBean(str, Boolean.class);
		return b;
	}
}
