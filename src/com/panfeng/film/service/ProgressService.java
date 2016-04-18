package com.panfeng.film.service;

import javax.servlet.http.HttpServletRequest;

import com.panfeng.film.resource.model.Progress;

public interface ProgressService {

	public Progress getProgress(final HttpServletRequest request);

	public void updateProgress(final Progress progress,final HttpServletRequest request);
}
