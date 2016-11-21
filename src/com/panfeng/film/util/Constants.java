package com.panfeng.film.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
/**
 * 
 * @author dawn 常量类
 */
public final class Constants {

	public static String FILE_PROFIX;
	public static String PRODUCT_DESCRIPTION_IMAGE_PATH;
	public static String PRODUCT_DESCRIPTION_IMAGE_URL;
	public static String TEMP_DIR;
	public static String AUTO_TEST;
	public static String COOKIES_SCOPE;
	public static String UPLOAD_PATH;
	public static Constants CONSTANTS = new Constants();
	
	

	// state Constants
	public static String FAIL = "FAIL";
	public static String SUCCESS = "SUCCESS";

	public static int MSG_FAIL = 1;
	public static int MSG_SUCCESS = 0;

	private Constants() {
		load();
	}

	public void reLoadConstants() {
		load();
	}

	private static void load() {
		InputStream is = Constants.class.getClassLoader().getResourceAsStream(
				"jdbc.properties");
		try {
			Properties propertis = new Properties();
			propertis.load(is);
			full(propertis);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (is != null)
				try {
					is.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
		}
	}

	private static void full(Properties properties) {
		FILE_PROFIX = properties.getProperty("file.prefix");
		PRODUCT_DESCRIPTION_IMAGE_PATH = properties
				.getProperty("upload.server.product.description.image");
		PRODUCT_DESCRIPTION_IMAGE_URL = properties
				.getProperty("upload.server.product.description.image.url");
		TEMP_DIR=properties.getProperty("upload.server.temp");
		AUTO_TEST=properties.getProperty("auto.test");
		COOKIES_SCOPE=properties.getProperty("cookies_scope");
		UPLOAD_PATH = PropertiesUtils.getProp("upload.path");
	}
	
	/**
	 * 登录方式
	 */
	public enum loginType {
		phone("phone", 1), // 手机登录
		account("loginName", 2);// 账号登录
		// 成员变量
		private String key;
		private int value;

		// 构造方法
		private loginType(String key, int value) {
			this.key = key;
			this.value = value;
		}

		// get set 方法
		public String getKey() {
			return key;
		}

		public void setKey(String key) {
			this.key = key;
		}

		public int getValue() {
			return value;
		}
		public void setValue(int value) {
			this.value = value;
		}
	}

}
