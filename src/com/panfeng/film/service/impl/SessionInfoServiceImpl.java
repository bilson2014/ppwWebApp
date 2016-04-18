package com.panfeng.film.service.impl;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.panfeng.film.dao.SessionInfoDao;
import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.domain.SessionInfo;
import com.panfeng.film.resource.model.Progress;
import com.panfeng.film.service.SessionInfoService;
import com.panfeng.film.util.RedisUtils;
import com.panfeng.film.util.ValidateUtil;

@Service(value = "sessionInfoService")
public class SessionInfoServiceImpl implements SessionInfoService {

	@Autowired
	private final SessionInfoDao dao = null;

	public Map<String, Object> getSessionWithAllFields(
			final HttpServletRequest request) {
		
		final Map<String,String> result = dao.getSessionWithAllFields(request);
		final Map<String,Object> map = new HashMap<String, Object>();
		if(ValidateUtil.isValid(result)){
			final String infoStr = result.get(GlobalConstant.SESSION_INFO);
			final String processStr = result.get(GlobalConstant.PROCESS_STATUS);
			
			if(ValidateUtil.isValid(infoStr)){
				final SessionInfo info = RedisUtils.fromJson(infoStr, SessionInfo.class);
				map.put(GlobalConstant.SESSION_INFO, info);
			}
			
			if(ValidateUtil.isValid(processStr)){
				final Progress progress = RedisUtils.fromJson(processStr, Progress.class);
				map.put(GlobalConstant.PROCESS_STATUS, progress);
			}
			
		}
		return map;
	}

	public Object getSessionWithField(final HttpServletRequest request,final String field) {
		
		final String str = dao.getSessionWithField(request, field);
		if(ValidateUtil.isValid(str)){
			if(GlobalConstant.SESSION_INFO.equals(field)){
				final SessionInfo info = RedisUtils.fromJson(str, SessionInfo.class);
				return info;
			}
			
			if(GlobalConstant.PROCESS_STATUS.equals(field)){
				final Progress progress = RedisUtils.fromJson(str, Progress.class);
				return progress;
			}
		}
		
		return null;
	}

	public void removeSession(final HttpServletRequest request) {
		
		dao.removeSession(request);
	}

}
