package com.panfeng.film.domain;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import com.panfeng.film.util.ValidateUtil;

/**
 * 系统常量表
 * @author Jack
 *
 */
public final class GlobalConstant extends BaseObject {

	private static final long serialVersionUID = 7877496488411512879L;

	public static final String SESSION_INFO = "sessionInfo"; // 当前用户
	
	public static final String CONTEXT_RIGHT_MAP = "context_right_map"; // 权限集合
	
	public static final String UNIQUE_KEY = "0102030405060708"; // AES key
	
	public static final String ROLE_EMPLOYEE = "role_employee"; // 用户身份 -- 内部员工
	
	public static final String ROLE_CUSTOMER = "role_customer"; // 用户身份 -- 客户
	
	public static final String ROLE_PROVIDER = "role_provider"; // 用户身份 -- 供应商
	
	// public static final String ROLE_MANAGER = "role_manager"; // 用户身份 -- 视频管家
	
	public static final String PROCESS_STATUS = "process_status"; // 上传进度
	
	public static final String ROLE_SYSTEM = "role_system"; // 用户身份 -- 系统输出
	
	public static final String CUSTOMER_WEBCHAT_APPID = "wx3d453a7abb5fc026"; // 客户微信登录AppID
	
	public static final String CUSTOMER_WEBCHAT_APPSECRET = "6184e93dee1f145ad49977d3c1456391"; // 客户微信登录AppID
	
	public static final String PROVIDER_WEBCHAT_APPID = "wx513aa29222bef371"; // 供应商微信登录AppID
	
	public static final String PROVIDER_WEBCHAT_APPSECRET = "e7e6e8c7cf5216a933f53bf360dee939"; // 供应商微信登录AppSecret
	
	public static final String MANAGER_WEBCHAT_APPID = "wxbfbda700bd7a3c1c"; // 供应商微信登录AppID
	
	public static final String MANAGER_WEBCHAT_APPSECRET = "6a1c40422295b85dc8d55e7c38aef968"; // 供应商微信登录AppSecret
	
	public static final String ORDER_TOKEN_UNIQUE_KEY = "Jackyang1100_abc"; // 订单提交token加密 AES key
	
	public static String FILE_PROFIX; // 文件前缀
	
	public static String VIDEO_IMAGE_PERFIX; // 视频前缀
	
	public static String STAFF_IMAGE_PERIX; // 人员图片前缀
	
	public static String URL_PREFIX; // URL前缀
	
	public static String URL_HTTPS_PREFIX; // URL前缀
	
	public static String COOKIES_SCOPE; // 域名
	
	public static String PHONENUMBER_ORDER; // 下单手机号码
	
	public static String HTTP_REFERER; // 访问来源
	
	// ssl
	public static String KEY_STORE_TRUST_PATH; // truststore的路径

	public static String KEY_STORE_TYPE; // truststore的类型

	public static String KEY_STORE_TRUST_PASSWORD; // truststore的密码

	public static String KEY_STORE_CLIENT_PATH;

	public static String KEY_STORE_TYPE_P12;

	public static String KEY_STORE_PASSWORD;
	
	
	private static GlobalConstant GLOBALCONSTANT = new GlobalConstant();

	
	static {
		if(!ValidateUtil.isValid(FILE_PROFIX)){
			final InputStream is = GLOBALCONSTANT.getClass().getClassLoader().getResourceAsStream("jdbc.properties");
			try {
				Properties propertis = new Properties();
				propertis.load(is);
				URL_PREFIX = propertis.getProperty("urlPrefix");
				VIDEO_IMAGE_PERFIX = propertis.getProperty("upload.server.product.image");
				STAFF_IMAGE_PERIX = propertis.getProperty("upload.server.staff.image");
				COOKIES_SCOPE = propertis.getProperty("cookies_scope");
				PHONENUMBER_ORDER = propertis.getProperty("service_tel");
				HTTP_REFERER = propertis.getProperty("http_referer");
				
				// ssl
				KEY_STORE_TRUST_PATH = propertis.getProperty("key.store.trust.path");
				KEY_STORE_TYPE = propertis.getProperty("key.store.type");
				KEY_STORE_TRUST_PASSWORD = propertis.getProperty("key.store.trust.password");
				KEY_STORE_CLIENT_PATH = propertis.getProperty("key.store.client.path");
				KEY_STORE_TYPE_P12 = propertis.getProperty("key.store.type.p12");
				KEY_STORE_PASSWORD = propertis.getProperty("key.store.password");
				
				URL_HTTPS_PREFIX = propertis.getProperty("url.https.prefix");
			} catch (Exception e) {
				
			} finally{
				if(is != null){
					try {
						is.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		}
	}
}
