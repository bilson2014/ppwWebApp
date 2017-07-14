package com.panfeng.film.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paipianwang.pat.common.config.PublicConfig;
import com.paipianwang.pat.common.constant.PmsConstant;
import com.paipianwang.pat.common.entity.SessionInfo;
import com.paipianwang.pat.facade.product.service.PmsProductFacade;
import com.paipianwang.pat.facade.right.entity.PmsRole;
import com.paipianwang.pat.facade.right.service.PmsRightFacade;
import com.paipianwang.pat.facade.right.service.PmsRoleFacade;
import com.paipianwang.pat.facade.team.entity.PmsTeam;
import com.paipianwang.pat.facade.team.service.PmsTeamFacade;
import com.panfeng.film.model.Team;
import com.panfeng.film.service.TeamService;
import com.panfeng.film.util.DataUtil;
import com.panfeng.film.util.JsonUtil;

@Service("teamService")
public class TeamServiceImpl implements TeamService {

	@Autowired
	private PmsTeamFacade facade = null;
	
	@Autowired
	private PmsProductFacade PmsProductFacade=null;
	
	@Autowired
	private PmsRoleFacade pmsRoleFacade = null;
	
	@Autowired
	private PmsRightFacade pmsRightFacade = null;
	
	@Autowired
	private HttpServletRequest request = null;
	
	private static String ORIGINAL = "original";// 源对象
	private static String TYPE = "type_s";// 当前处理任务类型，（注册）
	
	@Override
	public Team findTeamById(long teamId) {
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
		long res = facade.updateFlag(teamId, 0);
		if(res > 0) {
			final HttpSession session = request.getSession();
			// 存入session中
			final SessionInfo info = (SessionInfo) session.getAttribute(PmsConstant.SESSION_INFO);
			info.setProviderFlag(0);
			session.setAttribute(PmsConstant.SESSION_INFO, info);
			return true;
		}
		return false;
	}

	/**
	 * 取消操作
	 * 	删除session，退出登录
	 */
	@Override
	public void cancel() {
		HttpSession session = request.getSession();
		session.removeAttribute(PmsConstant.SESSION_INFO);
		session.removeAttribute(ORIGINAL);
		session.removeAttribute(TYPE);
	}

	@Override
	public long saveOrPass(long teamId) {
		if(teamId == 0) {
			// 保存至数据库
			final SessionInfo sessionInfo = (SessionInfo) request.getSession().getAttribute(PmsConstant.SESSION_INFO);
			final PmsTeam team = new PmsTeam();
			team.setPhoneNumber(sessionInfo.getTelephone());
			team.setPassword(DataUtil.md5(PublicConfig.INIT_PASSWORD));
			long tId = facade.registerAtTeamRegisterFlow(team);
			if(tId > 0) {
				team.setTeamId(tId);
				initSessionInfo(team);
			}
				
			return tId;
		}
		return teamId;
	}
	
	public boolean initSessionInfo(final PmsTeam team) {

		// 清空session
		final HttpSession session = request.getSession();
		session.removeAttribute(PmsConstant.SESSION_INFO);
		// 存入session中
		final String sessionId = request.getSession().getId();
		final SessionInfo info = new SessionInfo();
		info.setTelephone(team.getPhoneNumber());
		info.setSessionType(PmsConstant.ROLE_PROVIDER);
		info.setToken(DataUtil.md5(sessionId));
		info.setReqiureId(team.getTeamId());
		info.setProviderFlag(3);

		final PmsRole role = pmsRoleFacade.findRoleById(2l); // 获取用户角色
		final List<PmsRole> roles = new ArrayList<PmsRole>();
		roles.add(role);
		team.setRoles(roles);
		// 计算权限码总和
		final long maxPos = pmsRightFacade.getMaxPos();
		final long[] rightSum = new long[(int) (maxPos + 1)];
		team.setRightSum(rightSum);
		team.calculateRightSum();
		info.setSum(team.getRightSum());
		session.setAttribute(PmsConstant.SESSION_INFO, info);
		return true;
	}

	@Override
	public void cancel() {
		// TODO Auto-generated method stub
		
	}

}
