package com.panfeng.film.service.impl;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.panfeng.film.dao.ProgressDao;
import com.panfeng.film.resource.model.Progress;
import com.panfeng.film.service.ProgressService;
import com.panfeng.film.util.JsonUtil;
import com.panfeng.film.util.ValidateUtil;

@Service
public class ProgressServiceImpl implements ProgressService {

	@Autowired
	private final ProgressDao dao = null;
	
	public Progress getProgress(final HttpServletRequest request) {
		
		final String json = dao.getProgress(request);
		if(ValidateUtil.isValid(json)){
			final Progress progress = JsonUtil.toBean(json, Progress.class);
			return progress;
		}
		return null;
	}

	public void updateProgress(final Progress progress,final HttpServletRequest request) {
		
		final String json = JsonUtil.toJson(progress);
		dao.updateProgress(json, request);
	}

}
