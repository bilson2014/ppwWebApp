package com.panfeng.film.resource.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.paipianwang.pat.common.entity.DataGrid;
import com.paipianwang.pat.common.entity.PageParam;
import com.paipianwang.pat.facade.product.entity.PmsChanPin;
import com.paipianwang.pat.facade.product.entity.PmsProductCase;
import com.paipianwang.pat.facade.product.service.PmsChanPinFacade;
import com.paipianwang.pat.facade.product.service.PmsProductCaseFacade;

/**
 * 产品案例Controller
 * 
 * @author wang
 *
 */
@RestController
public class ProductCaseController extends BaseController {

	@Autowired
	private PmsProductCaseFacade productCase;

	@Autowired
	private PmsChanPinFacade pmsChanPinFacade;

	/*
	 * @Autowired private PmsSceneFacade pmsSceneFacade;
	 */

	@RequestMapping("/product/{englishName}/case")
	public ModelAndView listPage(ModelMap modelMap, @PathVariable("englishName") String englishName) {
		PageParam param = new PageParam();
		param.setBegin(0);
		param.setLimit(9999999);
		Map<String, Object> paramMap = new HashMap<String, Object>();
		PmsChanPin chanPinInfo = pmsChanPinFacade.getInfoByEnglishName(englishName);
		paramMap.put("chanpinId", chanPinInfo.getChanpinId());
		DataGrid<PmsProductCase> list = productCase.listWithPagination(param, paramMap);
		List<PmsProductCase> caseRows = list.getRows();
		caseRows = productCase.fillProduct(caseRows);
		list.setRows(caseRows);
		modelMap.addAttribute("caseList", list);
		// 顶部所有产品分类
		DataGrid<PmsChanPin> allChanPin = pmsChanPinFacade.getAllChanPin();
		if (allChanPin != null) {
			List<PmsChanPin> rows = allChanPin.getRows();
			modelMap.addAttribute("productList", rows);
		}
		modelMap.addAttribute("product", chanPinInfo);
		return new ModelAndView("/projectLine/projectList", modelMap);
	}

	@RequestMapping("/product/case")
	public List<PmsProductCase> getCase(Long productId) {
		List<PmsProductCase> list = productCase.getCaseByChanPinId(productId);
		list = productCase.fillProduct(list);
		return list;
	}

}
