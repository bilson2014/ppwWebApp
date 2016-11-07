package com.panfeng.film.mq.service;

import com.panfeng.film.resource.model.MailParam;

public interface MailMQService {

	// 向默认队列发送消息
	public void sendMessage(final MailParam mail);
}
