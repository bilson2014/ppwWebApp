package com.panfeng.film.service;

import com.panfeng.film.model.Team;

public interface TeamService {

	/**
	 * 根据ID查找供应商信息
	 * 	用于信息回显
	 * @param teamId 供应商唯一ID
	 * @return
	 */
	public Team findTeamById(long teamId);
	
	/**
	 * 信息更新步骤一
	 * @param team
	 * @return
	 */
	public boolean updateInfoStep1(Team team);
	
	/**
	 * 信息更新步骤二
	 * @param team
	 * @return
	 */
	public boolean updateInfoStep2(Team team);
	
	/**
	 * 检测
	 * @param teamId
	 * @return
	 */
	public boolean checkUploadFile(long teamId);
	
	/**
	 * 注册提交
	 * @param teamId
	 * @return
	 */
	public boolean submitted(long teamId);
}
