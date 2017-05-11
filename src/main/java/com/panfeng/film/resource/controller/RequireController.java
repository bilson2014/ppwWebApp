package com.panfeng.film.resource.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.paipianwang.pat.common.entity.BaseEntity;
import com.paipianwang.pat.common.entity.DataGrid;
import com.paipianwang.pat.common.entity.PageParam;
import com.paipianwang.pat.facade.product.entity.PmsRequire;
import com.paipianwang.pat.facade.product.service.PmsRequireFacade;
import com.panfeng.film.domain.BaseMsg;

@RestController
@RequestMapping("/std")
public class RequireController extends BaseController {

	@Autowired
	private PmsRequireFacade pmsRequireFacade;

	@RequestMapping("/require/list")
	public DataGrid<PmsRequire> getAll(final PmsRequire view, final PageParam param) {
		final long page = param.getPage();
		final long rows = param.getRows();
		param.setBegin((page - 1) * rows);
		param.setLimit(rows);
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("id", view.getIndentId());
		final DataGrid<PmsRequire> dataGrid = pmsRequireFacade.listWithPagination(param, paramMap);
		return dataGrid;
	}

	@RequestMapping("/require/save")
	public BaseMsg save(final PmsRequire require) {
		BaseMsg baseMsg = new BaseMsg();
		baseMsg.setErrorCode(BaseMsg.ERROR);
		if (require != null) {
			Map<String, Object> save = pmsRequireFacade.save(require);
			if (save != null) {
				//Object object = save.get(BaseEntity.SAVE_MAP_ROWS);
				Object object = save.get("save_map_rows");
				if (object != null && Integer.valueOf(object.toString()) > 0) {
					baseMsg.setErrorCode(BaseMsg.NORMAL);
					baseMsg.setErrorMsg("保存成功！");
					return baseMsg;
				}
			}
			baseMsg.setErrorMsg("保存失败！");
		} else {
			baseMsg.setErrorMsg("表单信息错误！");
		}
		return baseMsg;
	}
	@RequestMapping("/require")
	public ModelAndView requireView(Long indentId,ModelMap model){
		model.addAttribute("indentId", indentId);
		return new ModelAndView("/standardized/requireForm",model);
	}
	
}