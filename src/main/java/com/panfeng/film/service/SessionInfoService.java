package com.panfeng.film.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.panfeng.domain.SessionInfo;

public interface SessionInfoService {

	public Map<String,Object> getSessionWithAllFields(final HttpServletRequest request);
	
	public Object getSessionWithField(final HttpServletRequest request,final String field);

	public void removeSession(final HttpServletRequest request);

	public SessionInfo getSessionInfoWithToken(HttpServletRequest request,String token);

	public boolean addSessionSeveralTime(HttpServletRequest request, Map<String, Object> map, int i);

	public void removeSessionByToken(HttpServletRequest request, String token);

	public String getOriginalSession(final String token);
}
