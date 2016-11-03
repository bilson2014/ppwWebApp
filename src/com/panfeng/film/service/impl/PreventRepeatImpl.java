package com.panfeng.film.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import org.springframework.stereotype.Service;

import com.panfeng.film.resource.model.PreventRepeatModel;
import com.panfeng.film.resource.model.PreventRepeatModel.CurrentTokenVal;
import com.panfeng.film.service.PreventRepeat;
import com.panfeng.film.util.ValidateUtil;

@Service
public class PreventRepeatImpl implements PreventRepeat {
	static final long timeout = 1000 * 60 * 60 * 24; // ms

	/**
	 * 新的session 第一次访问
	 */
	@Override
	public PreventRepeatModel addPreventRepeat(String token) {
		PreventRepeatModel preventRepeatModel = new PreventRepeatModel();
		Map<String, CurrentTokenVal> runningList = new ConcurrentHashMap<>();
		runningList.put(token, preventRepeatModel.new CurrentTokenVal().init(token));
		preventRepeatModel.setRunningList(runningList);
		return preventRepeatModel;
	}

	/**
	 * 旧的session 新的页面访问 添加新的token
	 * 
	 * @param preventRepeatModel
	 * @return
	 */
	public PreventRepeatModel addCurrentTokenVal(PreventRepeatModel preventRepeatModel, String oldTokenKey) {
		if (preventRepeatModel != null) {
			Map<String, CurrentTokenVal> runningList = preventRepeatModel.getRunningList();
			/*
			 * 清空策略，在再次进入页面时检测Tokens中是否有过期token有则删除。
			 * 判断过期策略，运行中url为空并且已经超过了timeout的时间。
			 * 
			 * 意义：防止token冗余，session有7天过期，如果7天内再次进入网站
			 * 时间会被刷新，导致session生命期无限延长。所以增加清空机制防止 token无限增长
			 */
			if (runningList.size() > 0) {
				Set<String> keySet = runningList.keySet();
				List<String> timeoutKey = new ArrayList<>();
				for (String key : keySet) {
					CurrentTokenVal currentTokenVal = runningList.get(key);
					long d = System.currentTimeMillis() - currentTokenVal.getSt();
					ConcurrentLinkedQueue<String> urlList = currentTokenVal.getUrlList();
					if (urlList != null && urlList.size() == 0 && !currentTokenVal.getToken().equals(oldTokenKey)) {
						if (d > timeout) {
							timeoutKey.add(key);
						}
					}
				}
				if (ValidateUtil.isValid(timeoutKey)) {
					for (String string : timeoutKey) {
						runningList.remove(string);
					}
				}
			}
			// 恢复意外丢失的token && 新增token
			if (ValidateUtil.isValid(oldTokenKey)) {
				if (!runningList.containsKey(oldTokenKey)) {
					runningList.put(oldTokenKey, preventRepeatModel.new CurrentTokenVal().init(oldTokenKey));// 恢复意外
				}
			} else {
				runningList.put(oldTokenKey, preventRepeatModel.new CurrentTokenVal().init(oldTokenKey)); // 新增
			}
			return preventRepeatModel;
		} else {
			return addPreventRepeat(oldTokenKey);
		}
	}

	public boolean checkRul(PreventRepeatModel preventRepeatModel, String tokenKey) {

		return false;
	}

}
