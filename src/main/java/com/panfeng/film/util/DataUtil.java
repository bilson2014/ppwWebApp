package com.panfeng.film.util;

import java.security.MessageDigest;
import java.util.UUID;

/**
 * 数据工具类
 */
public class DataUtil {

	/**
	 * 随机数生成
	 * @return
	 */
	public static String getUUID(){
		
		final String uuid = UUID.randomUUID().toString();
		return uuid;
	}
	
	/**
	 * MD5 加密
	 */
	public static String md5(String src) {
		try {
			StringBuffer buffer = new StringBuffer();
			char[] chars = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
					'A', 'B', 'C', 'D', 'E', 'F' };
			MessageDigest md = MessageDigest.getInstance("MD5");
			byte[] data = md.digest(src.getBytes());
			for (byte b : data) {
				buffer.append(chars[(b >> 4) & 0x0F]);
				buffer.append(chars[b & 0x0F]);
			}
			return buffer.toString();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 随机数生成
	 * 
	 * @param numberFlag 是否只是数字
	 * @param length 随机数长度
	 * @return 随机数
	 */
	public static String random(final boolean numberFlag, final int length) {
		String retStr = "";
		String strTable = numberFlag ? "1234567890"
				: "1234567890abcdefghijkmnpqrstuvwxyz";
		int len = strTable.length();
		boolean bDone = true;
		do {
			retStr = "";
			int count = 0;
			for (int i = 0; i < length; i++) {
				double dblR = Math.random() * len;
				int intR = (int) Math.floor(dblR);
				char c = strTable.charAt(intR);
				if (('0' <= c) && (c <= '9')) {
					count++;
				}
				retStr += strTable.charAt(intR);
			}
			if (count >= 2) {
				bDone = false;
			}
		} while (bDone);

		return retStr;
	}
	
	public static String getUuid(){
		return UUID.randomUUID().toString().replaceAll("-", "");
	}
}
