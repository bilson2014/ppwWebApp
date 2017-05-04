package com.panfeng.film.resource.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.paipianwang.pat.common.entity.DataGrid;
import com.paipianwang.pat.facade.product.entity.PmsChanPin;
import com.paipianwang.pat.facade.product.service.PmsChanPinFacade;

@RestController
@RequestMapping("/std")
public class ChanPinController extends BaseController {

	@Autowired
	private PmsChanPinFacade pmsChanPinFacade;


	@RequestMapping("/product/list")
	public DataGrid<PmsChanPin> sceneList() {
		DataGrid<PmsChanPin> allScene = pmsChanPinFacade.getAllChanPin();
		return allScene;
	}
	
	@RequestMapping("/product/index")
	public ModelAndView productIndex(Long chanpinId,ModelMap model){
		PmsChanPin chanPinInfo = pmsChanPinFacade.getChanPinInfo(chanpinId);
		model.addAttribute("product", chanPinInfo);
		return new ModelAndView("",model);
	}
}
