package com.panfeng.film.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paipianwang.pat.facade.team.entity.PmsTeam;
import com.paipianwang.pat.facade.team.service.PmsTeamFacade;
import com.panfeng.film.model.Team;
import com.panfeng.film.service.TeamService;
import com.panfeng.film.util.JsonUtil;

@Service("teamService")
public class TeamServiceImpl implements TeamService {

	@Autowired
	private PmsTeamFacade facade = null;
	
	@Override
	public Team findTeamById(long teamId) {
		PmsTeam team = facade.findTeamById(teamId);
		String json = JsonUtil.toJson(team);
		Team result = JsonUtil.toBean(json, Team.class);
		return result;
	}

	@Override
	public boolean updateInfoStep1(Team team) {
		// 保存步骤一的信息
		return true;
	}

	@Override
	public boolean updateInfoStep2(Team team) {
		// 保存步骤二的信息
		return true;
	}

}
