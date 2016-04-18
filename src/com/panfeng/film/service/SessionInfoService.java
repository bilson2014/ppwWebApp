package com.panfeng.film.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

public interface SessionInfoService {

	public Map<String,Object> getSessionWithAllFields(final HttpServletRequest request);
	
	public Object getSessionWithField(final HttpServletRequest request,final String field);

	public void removeSession(final HttpServletRequest request);
}
