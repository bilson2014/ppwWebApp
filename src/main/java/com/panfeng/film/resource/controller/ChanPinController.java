package com.panfeng.film.resource.controller;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.paipianwang.pat.common.entity.BaseEntity;
import com.paipianwang.pat.common.entity.DataGrid;
import com.paipianwang.pat.common.util.JsonUtil;
import com.paipianwang.pat.common.util.ValidateUtil;
import com.paipianwang.pat.facade.product.entity.PmsChanPin;
import com.paipianwang.pat.facade.product.entity.PmsChanPinConfiguration;
import com.paipianwang.pat.facade.product.entity.PmsDimension;
import com.paipianwang.pat.facade.product.entity.PmsIndentConfirm;
import com.paipianwang.pat.facade.product.entity.PmsProductModule;
import com.paipianwang.pat.facade.product.entity.PmsScene;
import com.paipianwang.pat.facade.product.service.PmsChanPinConfigurationFacade;
import com.paipianwang.pat.facade.product.service.PmsChanPinFacade;
import com.paipianwang.pat.facade.product.service.PmsIndentConfirmFacade;
import com.paipianwang.pat.facade.product.service.PmsSceneFacade;
import com.panfeng.film.domain.BaseMsg;

@RestController
@RequestMapping("/std")
public class ChanPinController extends BaseController {

	@Autowired
	private PmsChanPinFacade pmsChanPinFacade;

	@Autowired
	private PmsSceneFacade pmsSceneFacade;

	@Autowired
	private PmsChanPinConfigurationFacade pmsChanPinConfigurationFacade;
	
	@Autowired
	private PmsIndentConfirmFacade pmsIndentConfirmFacade;

	@RequestMapping("/product/list")
	public DataGrid<PmsChanPin> sceneList() {
		DataGrid<PmsChanPin> allScene = pmsChanPinFacade.getAllChanPin();
		return allScene;
	}

	@RequestMapping("/product/index")
	public ModelAndView productIndex(Long chanpinId, ModelMap model,Long requireId,HttpServletRequest request) {
		PmsChanPin chanPinInfo = pmsChanPinFacade.getChanPinInfo(chanpinId);
		// 当前页显示的产品信息
		model.addAttribute("product", chanPinInfo);

		// 顶部所有产品分类
		DataGrid<PmsChanPin> allChanPin = pmsChanPinFacade.getAllChanPin();
		if (allChanPin != null) {
			List<PmsChanPin> rows = allChanPin.getRows();
			model.addAttribute("productList", rows);
		}
		HttpSession session = request.getSession();
		session.setAttribute("requireId", requireId);
		return new ModelAndView("/projectLine/motion", model);
	}

	@RequestMapping("/product/scene/{chanpinId}")
	public BaseMsg getScene(@PathVariable("chanpinId") Long chanpinId) {
		BaseMsg baseMsg = new BaseMsg();
		DataGrid<PmsScene> allScene = pmsSceneFacade.getAllScene();
		List<PmsScene> pList = pmsSceneFacade.getSceneByChanPinId(chanpinId);
		if (ValidateUtil.isValid(pList) && allScene != null && ValidateUtil.isValid(allScene.getRows())) {
			for (PmsScene pmsScene : pList) {
				for (PmsScene p : allScene.getRows()) {
					Long pListSceneId = pmsScene.getSceneId();
					Long sceneId = p.getSceneId();
					if (pListSceneId.equals(sceneId)) {
						p.setChecked(true);
						break;
					}
				}
			}
		}
		baseMsg.setErrorCode(BaseMsg.NORMAL);
		baseMsg.setResult(allScene);
		return baseMsg;
	}

	@RequestMapping("/product/config")
	public ModelAndView productConfig(Long chanpinId, ModelMap model) {
		PmsChanPin chanPinInfo = pmsChanPinFacade.getChanPinInfo(chanpinId);
		// 当前页显示的产品信息
		model.addAttribute("product", chanPinInfo);

		// 顶部所有产品分类
		DataGrid<PmsChanPin> allChanPin = pmsChanPinFacade.getAllChanPin();
		if (allChanPin != null) {
			List<PmsChanPin> rows = allChanPin.getRows();
			model.addAttribute("productList", rows);
		}
		return new ModelAndView("/projectLine/projectSetting", model);
	}

	@RequestMapping("/product/config/list")
	public List<PmsChanPinConfiguration> getConfig(Long chanpinId) {
		List<PmsChanPinConfiguration> chanPinConfigurationByChanPinId = pmsChanPinConfigurationFacade
				.getChanPinConfigurationByChanPinId(chanpinId);
		return chanPinConfigurationByChanPinId;
	}

	@RequestMapping("/product/confirm")
	public ModelAndView indentConfirmView(ModelMap model, Long configId, Long timeId, Long subJoin) {
		PmsChanPinConfiguration config = pmsChanPinConfigurationFacade.getChanPinConfigurationInfo(configId);
		model.addAttribute("config", config);

		List<PmsDimension> pmsDimensions = config.getPmsDimensions();
		if (ValidateUtil.isValid(pmsDimensions)) {
			for (PmsDimension pmsDimension : pmsDimensions) {
				if (pmsDimension.getDimensionId().equals(timeId)) {
					model.addAttribute("time", pmsDimension);
					System.err.println(pmsDimension.toString());
				}
			}
		}
		List<PmsProductModule> pmsProductModule = config.getPmsProductModule();
		if (ValidateUtil.isValid(pmsProductModule)) {
			for (PmsProductModule pmsProductModule2 : pmsProductModule) {
				Integer cpmModuleType = pmsProductModule2.getPinConfiguration_ProductModule().getCpmModuleType();
				if(cpmModuleType.equals(1)){
					if(pmsProductModule2.getProductModuleId().equals(subJoin)){
						model.addAttribute("subjoin", pmsProductModule2);
						System.err.println(pmsProductModule2.toString());
					}
				}
			}
		}
		return new ModelAndView("/projectLine/projectOrder");
	}
	@RequestMapping("/product/confirm/indent")
	public ModelAndView indentConfirm2(Long configId, Long timeId, Long subJoin,HttpServletRequest request){
		PmsChanPinConfiguration config = pmsChanPinConfigurationFacade.getChanPinConfigurationInfo(configId);
		
		List<PmsDimension> pmsDimensions = config.getPmsDimensions();
		if (ValidateUtil.isValid(pmsDimensions)) {
			Iterator<PmsDimension> iterator = pmsDimensions.iterator();
			while (iterator.hasNext()) {
				PmsDimension pmsDimension = (PmsDimension) iterator.next();
				if (! pmsDimension.getDimensionId().equals(timeId)) {
					iterator.remove();
				}
			}
		}
		
		List<PmsProductModule> pmsProductModule = config.getPmsProductModule();
		if (ValidateUtil.isValid(pmsProductModule)) {
			Iterator<PmsProductModule> in =  pmsProductModule.iterator();
			while (in.hasNext()) {
				PmsProductModule productModule = (PmsProductModule) in.next();
				Integer cpmModuleType = productModule.getPinConfiguration_ProductModule().getCpmModuleType();
				if(cpmModuleType.equals(1)){
					if(!productModule.getProductModuleId().equals(subJoin)){
						in.remove();
					}
				}
			}
		}
		
		PmsIndentConfirm pmsIndentConfirm= new PmsIndentConfirm();
		pmsIndentConfirm.setChanpinId(config.getChanpinId());
		pmsIndentConfirm.setConfigurationId(config.getChanpinconfigurationId());
		PmsChanPin chanPinInfo = pmsChanPinFacade.getChanPinInfo(config.getChanpinId());
		pmsIndentConfirm.setName(chanPinInfo.getChanpinName());
		String json = JsonUtil.toJson(config);
		pmsIndentConfirm.setConfigurationJson(json);
		HttpSession session = request.getSession();
		Object attribute = session.getAttribute("requireId");
		if(attribute!=null){
			Long id = Long.valueOf(attribute.toString());
			pmsIndentConfirm.setRequire_id(id);
		}
		Map<String, Object> save = pmsIndentConfirmFacade.save(pmsIndentConfirm);
		if(save!=null){
			Object object = save.get(BaseEntity.SAVE_MAP_ROWS);
			if(object != null){
				Long valueOf = Long.valueOf(object.toString());
				if(valueOf >0){
					return new ModelAndView("/");
				}
			}
		}
		return new ModelAndView("/error");
	}
}
