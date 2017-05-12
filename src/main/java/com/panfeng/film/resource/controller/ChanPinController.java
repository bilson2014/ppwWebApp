package com.panfeng.film.resource.controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.ibm.icu.math.BigDecimal;
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

	/**
	 * 产品化主页（产品介绍）
	 * 
	 * @param englishName
	 * @param model
	 * @param requireId
	 * @param request
	 * @return
	 */
	@RequestMapping("/product/{englishName}/main")
	public ModelAndView productIndex(@PathVariable("englishName") String englishName, ModelMap model) {
		PmsChanPin chanPinInfo = pmsChanPinFacade.getInfoByEnglishName(englishName);
		// 当前页显示的产品信息
		model.addAttribute("product", chanPinInfo);

		// 顶部所有产品分类
		DataGrid<PmsChanPin> allChanPin = pmsChanPinFacade.getAllChanPin();
		if (allChanPin != null) {
			List<PmsChanPin> rows = allChanPin.getRows();
			model.addAttribute("productList", rows);
		}
		return new ModelAndView("/projectLine/motion", model);
	}

	@RequestMapping("/product/{englishName}/order")
	public ModelAndView indentConfirmView(@PathVariable("englishName") String englishName,ModelMap model, Long configId, Long timeId, String subJoin,Double price) {
		// 顶部所有产品分类
		DataGrid<PmsChanPin> allChanPin = pmsChanPinFacade.getAllChanPin();
		if (allChanPin != null) {
			List<PmsChanPin> rows = allChanPin.getRows();
			model.addAttribute("productList", rows);
		}
		PmsChanPin chanPinInfo = pmsChanPinFacade.getInfoByEnglishName(englishName);
		model.addAttribute("product", chanPinInfo);
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
		if (ValidateUtil.isValid(pmsProductModule) && ValidateUtil.isValid(subJoin)) {
			List<PmsProductModule> list = new ArrayList<PmsProductModule>();
			String[] split = subJoin.split(",");
			if (split != null && split.length > 0) {
				for (PmsProductModule pmsProductModule2 : pmsProductModule) {
					Integer cpmModuleType = pmsProductModule2.getPinConfiguration_ProductModule().getCpmModuleType();
					if (cpmModuleType.equals(1)) {
						for (int i = 0; i < split.length; i++) {
							Long sId = Long.valueOf(split[i]);
							if (pmsProductModule2.getProductModuleId().equals(sId)) {
								list.add(pmsProductModule2);
							}
						}
					}
				}
				model.addAttribute("subjoin", list);
				model.addAttribute("price", price);
				model.addAttribute("subjoinId", subJoin);
			}
		}
		return new ModelAndView("/projectLine/projectOrder");
	}

	@RequestMapping("/product/confirm/indent")
	public ModelAndView indentConfirm2(Long configId, Long timeId, String subJoin, HttpServletRequest request) {
		PmsChanPinConfiguration config = pmsChanPinConfigurationFacade.getChanPinConfigurationInfo(configId);

		List<PmsDimension> pmsDimensions = config.getPmsDimensions();
		if (ValidateUtil.isValid(pmsDimensions)) {
			Iterator<PmsDimension> iterator = pmsDimensions.iterator();
			while (iterator.hasNext()) {
				PmsDimension pmsDimension = (PmsDimension) iterator.next();
				if (!pmsDimension.getDimensionId().equals(timeId)) {
					iterator.remove();
				}
			}
		}
		List<PmsProductModule> pmsProductModule = config.getPmsProductModule();
		List<PmsProductModule> sub = new ArrayList<>();
		String[] split = subJoin.split(",");
		if (ValidateUtil.isValid(pmsProductModule) && split != null && split.length > 0) {
			Iterator<PmsProductModule> in = pmsProductModule.iterator();
			while (in.hasNext()) {
				PmsProductModule productModule = (PmsProductModule) in.next();
				Integer cpmModuleType = productModule.getPinConfiguration_ProductModule().getCpmModuleType();
				if (cpmModuleType.equals(1)) {
					sub.add(productModule);
					in.remove();
				}
			}
			Iterator<PmsProductModule> iterator = sub.iterator();
			while (iterator.hasNext()) {
				PmsProductModule productModule = (PmsProductModule) iterator.next();
				for (int i = 0; i < split.length; i++) {
					Long sId = Long.valueOf(split[i]);
					if (productModule.getProductModuleId().equals(sId)) {
						pmsProductModule.add(productModule);
					}
				}
			}
		}

		PmsIndentConfirm pmsIndentConfirm = new PmsIndentConfirm();
		pmsIndentConfirm.setChanpinId(config.getChanpinId());
		pmsIndentConfirm.setConfigurationId(config.getChanpinconfigurationId());
		PmsChanPin chanPinInfo = pmsChanPinFacade.getChanPinInfo(config.getChanpinId());
		pmsIndentConfirm.setName(chanPinInfo.getChanpinName());
		String json = JsonUtil.toJson(config);
		pmsIndentConfirm.setConfigurationJson(json);
		HttpSession session = request.getSession();
		Object attribute = session.getAttribute("requireId");
		if (attribute != null) {
			Long id = Long.valueOf(attribute.toString());
			pmsIndentConfirm.setRequire_id(id);
		}
		Map<String, Object> save = pmsIndentConfirmFacade.save(pmsIndentConfirm);
		if (save != null) {
			// Object object = save.get(BaseEntity.SAVE_MAP_ROWS);
			Object object = save.get("save_map_rows");
			if (object != null) {
				Long valueOf = Long.valueOf(object.toString());
				if (valueOf > 0) {
					return new ModelAndView("/index");
				}
			}
		}
		return new ModelAndView("/error");
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

	@RequestMapping("/product/{englishName}/set")
	public ModelAndView productConfig(@PathVariable("englishName") String englishName, ModelMap model) {
		PmsChanPin chanPinInfo = pmsChanPinFacade.getInfoByEnglishName(englishName);
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

	@RequestMapping("/product/compute")
	public BaseMsg compute(String json) throws Exception {
		BaseMsg baseMsg = new BaseMsg();
		if (ValidateUtil.isValid(json)) {
			List<String> vv = JsonUtil.fromJsonArray(json, String.class);
			LinkedList<String> value = new LinkedList<>(vv);
			if (ValidateUtil.isValid(value) && value.size() % 2 != 0) {
				BigDecimal A = null;
				BigDecimal B = null;
				while (!value.isEmpty()) {
					String key = value.poll();
					switch (key) {
					case "+":
						B = new BigDecimal(value.poll());
						A = A.add(B);
						break;
					case "-":
						B = new BigDecimal(value.poll());
						A = A.subtract(B);
						break;
					case "*":
						B = new BigDecimal(value.poll());
						A = A.multiply(B);
						break;
					default:
						A = new BigDecimal(key);
						break;
					}
				}
				baseMsg.setCode(BaseMsg.NORMAL);
				baseMsg.setResult(A.doubleValue());
			}
		}
		return baseMsg;
	}
}