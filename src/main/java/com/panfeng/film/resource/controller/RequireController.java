package com.panfeng.film.resource.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.paipianwang.pat.common.constant.PmsConstant;
import com.paipianwang.pat.common.entity.BaseEntity;
import com.paipianwang.pat.common.entity.DataGrid;
import com.paipianwang.pat.common.entity.PageParam;
import com.paipianwang.pat.common.entity.SessionInfo;
import com.paipianwang.pat.common.util.ValidateUtil;
import com.paipianwang.pat.facade.indent.entity.PmsIndent;
import com.paipianwang.pat.facade.indent.service.PmsIndentFacade;
import com.paipianwang.pat.facade.product.entity.PmsRequire;
import com.paipianwang.pat.facade.product.service.PmsRequireFacade;
import com.panfeng.film.domain.BaseMsg;

@RestController
public class RequireController extends BaseController {

	@Autowired
	private PmsRequireFacade pmsRequireFacade;

	@Autowired
	private PmsIndentFacade pmsIndentFacade;

	@RequestMapping("/require/list")
	public DataGrid<PmsRequire> getAll(final PageParam param, HttpServletRequest request) {
		SessionInfo currentInfo = getCurrentInfo(request);
		if (currentInfo != null) {
			String sessionType = currentInfo.getSessionType();
			if (ValidateUtil.isValid(sessionType)) {
				if (PmsConstant.ROLE_EMPLOYEE.equals(sessionType)) {
					long page = param.getPage();
					long rows = param.getRows();
					param.setBegin((page - 1) * rows);
					param.setLimit(rows);
					Map<String, Object> paramMap = new HashMap<String, Object>();
					DataGrid<PmsRequire> dataGrid = pmsRequireFacade.listWithPagination(param, paramMap);
					return dataGrid;
				}
			}
		}
		return new DataGrid<>();
	}

//	@RequestMapping("/require/save")
//	public BaseMsg save(final PmsRequire require, Long indentId) {
//		BaseMsg baseMsg = new BaseMsg();
//		baseMsg.setErrorCode(BaseMsg.ERROR);
//		if (ValidateUtil.isValid(indentId)) {
//			PmsIndent indent = pmsIndentFacade.findIndentById(indentId);
//			if (indent != null) {
//				if (require != null) {
//					Map<String, Object> save = pmsRequireFacade.save(require);
//					if (save != null) {
//						Object object = save.get(BaseEntity.SAVE_MAP_ROWS);
//						if (object != null && Integer.valueOf(object.toString()) > 0) {
//							Long requireId = Long.valueOf(save.get(BaseEntity.SAVE_MAP_ID).toString());
//							indent.setRequireId(requireId);
//							pmsIndentFacade.update(indent);
//							baseMsg.setErrorCode(BaseMsg.NORMAL);
//							baseMsg.setErrorMsg("保存成功！");
//							return baseMsg;
//						}
//					}
//					baseMsg.setErrorMsg("保存失败！");
//				} else {
//					baseMsg.setErrorMsg("表单信息错误！");
//				}
//			}
//			baseMsg.setErrorMsg("订单信息不正确！");
//		} else {
//			baseMsg.setErrorMsg("订单信息不能为空！");
//		}
//		return baseMsg;
//	}
	/**
	 * 跳转需求表单页。新增和修改和查看
	 * 这代码只有老天懂
	 * @param indentId
	 * @param requireId
	 * @param model
	 * @return
	 */
//	@RequestMapping("/require")
//	public ModelAndView requireView(Long indentId,Long requireId, ModelMap model) {
//		model.addAttribute("indentId", indentId);
//		if(!ValidateUtil.isValid(requireId)){
//			PmsIndent indent = pmsIndentFacade.findIndentById(indentId);
//			requireId = indent.getRequireId();
//		}
//		if (ValidateUtil.isValid(requireId)) {
//			PmsRequire require = pmsRequireFacade.getRequireInfo(requireId);
//			model.addAttribute("require", require);
//		}
//		return new ModelAndView("/standardized/requireForm", model);
//	}

}