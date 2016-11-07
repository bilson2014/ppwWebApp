package com.panfeng.film.mq.service;

import com.panfeng.film.model.LoggerParam;

public interface LoggerMQService {

	// 向队列发送消息
	public void sendMessage(final LoggerParam log);
}
