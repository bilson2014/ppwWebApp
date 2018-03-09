package com.panfeng.film.resource.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.paipianwang.pat.facade.right.entity.PmsEmployee;
import com.paipianwang.pat.facade.right.service.PmsEmployeeFacade;

/**
 * 权限用户管理 -- 超级管理员
 * 
 * @author Jack
 *
 */

@RestController
@RequestMapping("/employee")
public class EmployeeController extends BaseController {

	@Autowired
	private final PmsEmployeeFacade pmsEmployeeFacade = null;

	/**
	 * 获取内部员工（除admin、测试账号外）
	 * 
	 * @return
	 */
	@RequestMapping("/getEmployeeList")
	public List<PmsEmployee> getEmployeeList() {

		final List<PmsEmployee> list = pmsEmployeeFacade.findEmployeeList();
		return list;
	}

	/**
	 * 获取项目协同人 目前业务规则:协同人身份为视频管家和视频管家指导
	 * 
	 * @return employeeList
	 */
	@RequestMapping("/employee/findSynergy")
	public List<PmsEmployee> findEmployeeToSynergy() {
		final List<PmsEmployee> list = pmsEmployeeFacade.findEmployeeToSynergy();
		return list;
	}
	
	/**
	 * 微信小程序-获取内部员工
	 * @return
	 */
	/*@RequestMapping("/findMP")
	public List<PmsEmployee> getEmployeeListForMP(String name){
		Map<String,Object> paramMap=new HashMap<>();
		paramMap.put("employeeRealName",name);
		final List<PmsEmployee> list = pmsEmployeeFacade.findEmployeeForMP(paramMap);
		return list;
	}*/

}
