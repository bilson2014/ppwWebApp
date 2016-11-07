package com.panfeng.film.mq.service.impl;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.panfeng.film.mq.service.SmsMQService;
import com.panfeng.film.resource.model.SMSParam;

@Service
public class SmsMQServiceImpl implements SmsMQService {

	@Autowired
	private final JmsTemplate smsJmsTemplate = null;
	
	@Override
	public void sendMessage(final SMSParam sms) {
		smsJmsTemplate.send(new MessageCreator() {
			public Message createMessage(Session session) throws JMSException {
				return session.createTextMessage(JSONObject.toJSONString(sms));
			}
		});
	}

}
