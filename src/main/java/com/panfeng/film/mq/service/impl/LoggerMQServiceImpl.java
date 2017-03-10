 package com.panfeng.film.mq.service.impl;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.panfeng.film.model.LoggerParam;
import com.panfeng.film.mq.service.LoggerMQService;

/**
 * 日志队列服务
 * @author Jack
 *
 */
@Service
public class LoggerMQServiceImpl implements LoggerMQService {

	@Autowired
	private final JmsTemplate logJmsTemplate = null;
	
	@Override
	public void sendMessage(final LoggerParam log) {
		logJmsTemplate.send(new MessageCreator() {
			@Override
			public Message createMessage(Session session) throws JMSException {
				return session.createTextMessage(JSONObject.toJSONString(log));
			}
		});
	}
}
