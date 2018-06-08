package com.panfeng.film.resource.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.paipianwang.pat.common.entity.PmsResult;
import com.paipianwang.pat.common.entity.SessionInfo;
import com.paipianwang.pat.workflow.entity.PmsContinuity;
import com.paipianwang.pat.workflow.entity.PmsProjectFlow;
import com.paipianwang.pat.workflow.facade.PmsContinuityFacade;
import com.paipianwang.pat.workflow.facade.PmsProjectFlowFacade;

/**
 * 分镜头脚本
 * @author rui
 *
 */
@RestController
@RequestMapping("/continuity")
public class ContinuityController extends BaseController{

	@Autowired
	private PmsContinuityFacade pmsContinuityFacade;
	@Autowired
	private PmsProjectFlowFacade pmsProjectFlowFacade;
	
	/**
	 * 分镜头脚本制作主页
	 * @param projectId
	 * @param model
	 * @return
	 */
	@RequestMapping("/info")
	public ModelAndView quotationView(final String projectId,ModelMap model){
		model.put("projectId", projectId);
		return new ModelAndView("", model);
	}
	
	/**
	 * 获取用户参与过的进行中的项目分镜头脚本
	 * @param request
	 * @return
	 */
	@RequestMapping("/list/synergetic")
	public List<PmsContinuity> getSynergeticContinuity(final HttpServletRequest request){
		SessionInfo info = getCurrentInfo(request);
		return pmsContinuityFacade.getSynergeticContinuityProject(info.getReqiureId());
	}
	
	/**
	 * 获取项目分镜头脚本 TODO 修改此种类型为PmsResult封装
	 * @param projectId
	 * @return
	 */
	@RequestMapping("/get/{projectId}")
	public PmsContinuity getByProjectId(@PathVariable("projectId")String projectId){
		return pmsContinuityFacade.getByProjectId(projectId);
	}
	
	/**
	 * 保存/更新分镜头脚本
	 * @param pmsContinuity
	 */
	@RequestMapping("/save")
	public PmsResult saveOrUpdateQuotation(@RequestBody final PmsContinuity pmsContinuity,final HttpServletRequest request, final HttpServletResponse response){
		PmsResult result=new PmsResult();
		//数据保存
		if(pmsContinuity.getId()!=null) {
			result=pmsContinuityFacade.update(pmsContinuity);
		}else {
			result=pmsContinuityFacade.insert(pmsContinuity);
		}
			
		return result;
	}
	/**
	 * 导出
	 * @param request
	 * @param response
	 */
	@RequestMapping("/export")
	public void export(final PmsContinuity pmsContinuity,HttpServletRequest request, final HttpServletResponse response){
		
	}
	
	@RequestMapping("/synergetic/listByName")
	public List<PmsProjectFlow> getByName(@RequestBody final PmsProjectFlow pmsProjectFlow,final HttpServletRequest request){
		SessionInfo session=getCurrentInfo(request);
		return  pmsProjectFlowFacade.getSynerteticProjectByName(session.getReqiureId(),pmsProjectFlow.getProjectName());
	}
	
}
