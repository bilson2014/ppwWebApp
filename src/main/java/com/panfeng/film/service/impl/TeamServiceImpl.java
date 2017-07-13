package com.panfeng.film.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paipianwang.pat.facade.product.service.PmsProductFacade;
import com.paipianwang.pat.facade.team.entity.PmsTeam;
import com.paipianwang.pat.facade.team.service.PmsTeamFacade;
import com.panfeng.film.model.Team;
import com.panfeng.film.service.TeamService;
import com.panfeng.film.util.JsonUtil;

@Service("teamService")
public class TeamServiceImpl implements TeamService {

	@Autowired
	private PmsTeamFacade facade = null;
	@Autowired
	private PmsProductFacade PmsProductFacade=null;
	
	@Override
	public Team findTeamById(long teamId) {//TODO 会有为空的情况吗
		PmsTeam team = facade.findTeamById(teamId);
		return  pmsTeamToTeam(team);
	}

	@Override
	public boolean updateInfoStep1(Team team) {
		// 保存步骤一的信息
		PmsTeam pmsTeam=facade.addOrUpdateStep1(teamToPmsTeam(team));
		if(pmsTeam!=null && pmsTeam.getTeamId()>0l){
			return true;
		}
		return false;
	}

	@Override
	public boolean updateInfoStep2(Team team) {
		// 保存步骤二的信息
		PmsTeam pmsTeam=facade.updateStep2(teamToPmsTeam(team));
		if(pmsTeam!=null && pmsTeam.getTeamId()>0l){
			return true;
		}
		return false;
	}
	
	/**
	 * 供应商存储对象转页面对象
	 */
	private Team pmsTeamToTeam(PmsTeam pmsTeam){
		String json = JsonUtil.toJson(pmsTeam);
		Team result = JsonUtil.toBean(json, Team.class);
		return result;
	}
	/**
	 * 供应商页面对象转存储对象
	 */
	private PmsTeam teamToPmsTeam(Team team){
		String json = JsonUtil.toJson(team);
		PmsTeam result = JsonUtil.toBean(json, PmsTeam.class);
		return result;
	}

	/**
	 * 校验上传作品--名下存在 flag 0/1的作品就可以了
	 */
	@Override
	public boolean checkUploadFile(long teamId) {
		long size=PmsProductFacade.countValidByTeam(teamId);
		if(size>0){
			return true;
		}
		return false;
	}

	/**
	 * 注册-提交
	 */
	@Override
	public boolean submitted(long teamId) {
		long res = facade.updateFlag(teamId,1);
		return res > 0 ? true : false;
	}

}
