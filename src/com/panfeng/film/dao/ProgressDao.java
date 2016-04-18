package com.panfeng.film.dao;

import javax.servlet.http.HttpServletRequest;

public interface ProgressDao {

	/**
	 * 更新进度
	 */
	public void updateProgress(final String progress,final HttpServletRequest request);

	/**
	 * 获取进度
	 */
	public String getProgress(final HttpServletRequest request);
}
