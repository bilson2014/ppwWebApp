package com.panfeng.film.service;

/**
 * 短信发送接口
 */
public interface SmsService {

	/**
	 * 
	 * @param telephone 手机号码
	 * @param code 验证码
	 * @return true : 成功; false : 失败
	 */
	public boolean smsSend(final String telephone,final String code);
}
