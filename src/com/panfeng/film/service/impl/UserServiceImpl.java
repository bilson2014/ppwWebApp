package com.panfeng.film.service.impl;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.panfeng.film.service.UserService;
import com.panfeng.film.util.CustomerSourceEnum;

@Service
public class UserServiceImpl implements UserService {
	public Map<Integer, String> getCustomerSource() {
		Map<Integer, String> sources = new LinkedHashMap<Integer, String>();
		CustomerSourceEnum[] customerSourceEnums = CustomerSourceEnum.values();
		for (CustomerSourceEnum customerSourceEnum : customerSourceEnums) {
			sources.put(customerSourceEnum.getIndex(), customerSourceEnum.getName());
		}
		return sources;
	}
}
