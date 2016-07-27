package com.panfeng.film.service.impl;

import org.springframework.stereotype.Service;

import com.panfeng.film.service.SmsService;
import com.panfeng.sms.utils.SendSMS;

@Service
public class SmsServiceImpl implements SmsService {

	@Override
	public boolean smsSend(final String telephone, final String code) {
		//final boolean ret = SendSMS.sendSms(telephone, code);
		return true;
		//return ret;
	}

}
