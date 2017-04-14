package com.panfeng.film.service.impl;

import org.springframework.stereotype.Service;

import com.paipianwang.pat.common.util.sms.SendSMS;
import com.panfeng.film.service.SmsService;

@Service
public class SmsServiceImpl implements SmsService {

	@Override
	public boolean smsSend(final String templateId, final String telephone, final String[] content) {
		final boolean ret = SendSMS.sendSms(templateId, telephone, content);
		return ret;
	}

}
