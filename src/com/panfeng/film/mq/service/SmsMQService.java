package com.panfeng.film.mq.service;

import com.panfeng.film.resource.model.SMSParam;

public interface SmsMQService {

	// 相对列插入数据
	public void sendMessage(final SMSParam sms);
}
