package com.panfeng.film.dao;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

public interface SessionInfoDao {

	/**
	 * 获取该session的所有字段值
	 */
	public Map<String,String> getSessionWithAllFields(final HttpServletRequest request);
	
	/**
	 * 获取指定字段的值
	 */
	public String getSessionWithField(final HttpServletRequest request,final String field);
	
	public String getSessionWithSessionId(final String sessionId,final String field);
	
	public boolean exitSession(final HttpServletRequest request);

	public void removeSession(final HttpServletRequest request);

	public String getSessionWithToken(HttpServletRequest request,String token);

	public boolean addSessionSeveralTime(HttpServletRequest request, Map<String, String> destMap, int time);

	public void removeSessionByToken(HttpServletRequest request, String token);

	public String getOriginalSession(final String token);

	
}
