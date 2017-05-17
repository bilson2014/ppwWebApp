package com.panfeng.film.resource.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.ibm.icu.math.BigDecimal;
import com.paipianwang.pat.common.constant.PmsConstant;
import com.paipianwang.pat.common.entity.DataGrid;
import com.paipianwang.pat.common.entity.SessionInfo;
import com.paipianwang.pat.common.util.JsonUtil;
import com.paipianwang.pat.common.util.ValidateUtil;
import com.paipianwang.pat.facade.product.entity.PmsChanPin;
import com.paipianwang.pat.facade.product.entity.PmsChanPinConfiguration;
import com.paipianwang.pat.facade.product.entity.PmsChanPinConfiguration_ProductModule;
import com.paipianwang.pat.facade.product.entity.PmsDimension;
import com.paipianwang.pat.facade.product.entity.PmsIndentConfirm;
import com.paipianwang.pat.facade.product.entity.PmsProductModule;
import com.paipianwang.pat.facade.product.entity.PmsScene;
import com.paipianwang.pat.facade.product.service.PmsChanPinConfigurationFacade;
import com.paipianwang.pat.facade.product.service.PmsChanPinFacade;
import com.paipianwang.pat.facade.product.service.PmsIndentConfirmFacade;
import com.paipianwang.pat.facade.product.service.PmsSceneFacade;
import com.paipianwang.pat.facade.right.entity.PmsEmployee;
import com.paipianwang.pat.facade.right.service.PmsEmployeeFacade;
import com.panfeng.film.domain.BaseMsg;
import com.panfeng.film.mq.service.MailMQService;
import com.panfeng.film.util.Log;

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

	@Autowired
	private MailMQService mailMQService;

	@Autowired
	private PmsEmployeeFacade employeeFacade;

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
	public ModelAndView indentConfirmView(@PathVariable("englishName") String englishName, ModelMap model,
			Long configId, Long timeId, String subJoin, Double price, HttpServletRequest request) {
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
				model.addAttribute("subjoinId", subJoin);
			}
		}
		model.addAttribute("price", price);

		// cache session
		HttpSession session = request.getSession();
		session.setAttribute("configId", configId.toString());
		session.setAttribute("timeId", timeId.toString());
		session.setAttribute("subJoin", subJoin);
		session.setAttribute("price", price.toString());

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

		Iterator<PmsProductModule> in = pmsProductModule.iterator();
		while (in.hasNext()) {
			PmsProductModule productModule = (PmsProductModule) in.next();
			Integer cpmModuleType = productModule.getPinConfiguration_ProductModule().getCpmModuleType();
			if (cpmModuleType.equals(1)) {
				sub.add(productModule);
				in.remove();
			}
		}

		if (ValidateUtil.isValid(subJoin)) {
			String[] split = subJoin.split(",");
			if (ValidateUtil.isValid(pmsProductModule) && split != null && split.length != 0) {
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
		}

		PmsIndentConfirm pmsIndentConfirm = new PmsIndentConfirm();
		pmsIndentConfirm.setChanpinId(config.getChanpinId());
		pmsIndentConfirm.setConfigurationId(config.getChanpinconfigurationId());
		PmsChanPin chanPinInfo = pmsChanPinFacade.getChanPinInfo(config.getChanpinId());
		pmsIndentConfirm.setName(chanPinInfo.getChanpinName());
		String json = JsonUtil.toJson(config);
		pmsIndentConfirm.setConfigurationJson(json);
		HttpSession session = request.getSession();
		SessionInfo currentInfo = getCurrentInfo(request);
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
					// 发送邮件
					StringBuilder stringBuilder = new StringBuilder();
					stringBuilder.append("产品线：");
					stringBuilder.append(chanPinInfo.getChanpinName());
					stringBuilder.append("<br/>配置：");
					stringBuilder.append(config.getChanpinconfigurationName());
					stringBuilder.append("<br>");
					stringBuilder.append(configJoin(config));

					String string = stringBuilder.toString();
					sendMail(string, config.computePrice() + "", currentInfo);
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
	public ModelAndView productConfig(@PathVariable("englishName") String englishName, ModelMap model,
			HttpServletRequest request) {
		PmsChanPin chanPinInfo = pmsChanPinFacade.getInfoByEnglishName(englishName);
		// 当前页显示的产品信息
		model.addAttribute("product", chanPinInfo);
		// 顶部所有产品分类
		DataGrid<PmsChanPin> allChanPin = pmsChanPinFacade.getAllChanPin();
		if (allChanPin != null) {
			List<PmsChanPin> rows = allChanPin.getRows();
			model.addAttribute("productList", rows);
		}
		// cache session
		HttpSession session = request.getSession();
		String configId = (String) session.getAttribute("configId");
		String timeId = (String) session.getAttribute("timeId");
		String subJoin = (String) session.getAttribute("subJoin");
		String price = (String) session.getAttribute("price");
		if (ValidateUtil.isValid(configId)) {
			model.addAttribute("configId", configId);
		}
		if (ValidateUtil.isValid(timeId)) {
			model.addAttribute("timeId", timeId);
		}
		if (ValidateUtil.isValid(subJoin)) {
			model.addAttribute("subJoin", subJoin);
		}
		if (ValidateUtil.isValid(price)) {
			model.addAttribute("price", price);
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

	private String configJoin(PmsChanPinConfiguration configuration) {
		StringBuilder sb = new StringBuilder();
		List<PmsProductModule> list = configuration.getPmsProductModule();
		List<PmsDimension> dimensionsList = configuration.getPmsDimensions();

		List<PmsProductModule> baseModel = new ArrayList<>();
		List<PmsProductModule> subjoinModel = new ArrayList<>();
		for (PmsProductModule productModule : list) {
			if (productModule.getPinConfiguration_ProductModule() != null) {
				PmsChanPinConfiguration_ProductModule config = productModule.getPinConfiguration_ProductModule();
				Integer cpmModuleType = config.getCpmModuleType();
				if (cpmModuleType.equals(1)) {
					subjoinModel.add(productModule);
				} else {
					baseModel.add(productModule);
				}
			}
		}
		sb.append("基础服务：<br>");
		// 基础价格计算
		if (ValidateUtil.isValid(baseModel)) {
			for (PmsProductModule module : baseModel) {
				sb.append("&emsp;&emsp;&emsp;");
				String head = "";
				head += module.getModuleName();
				head = formatRow(head);
				head += "价格：" + module.getPinConfiguration_ProductModule().getCpmModulePrice();
				sb.append(head);
				sb.append("<br>");
			}
		}
		sb.append("时长：<br>");
		// 时长增益
		if (ValidateUtil.isValid(dimensionsList)) {
			for (PmsDimension dimension : dimensionsList) {
				sb.append("&emsp;&emsp;&emsp;");
				String head = "";
				head += dimension.getRowName();
				head = formatRow(head);
				head += "价格：" + PmsChanPinConfiguration.computePrice(configuration) + "";
				sb.append(head);
				sb.append("<br>");
			}
		}
		sb.append("附加服务：<br>");
		// 附件包价格计算
		if (ValidateUtil.isValid(subjoinModel)) {
			for (PmsProductModule module : subjoinModel) {
				sb.append("&emsp;&emsp;&emsp;");
				String head = "";
				head += module.getModuleName();
				head = formatRow(head);
				head += "价格：" + module.getPinConfiguration_ProductModule().getCpmModulePrice();
				sb.append(head);
				sb.append("<br>");
			}
		}

		return sb.toString();
	}

	static String space = "&emsp;";
	static int rowLength = 15;

	private String formatRow(String head) {
		String result = "";
		if (ValidateUtil.isValid(head)) {
			int srtLength = head.length();
			char[] charArray = head.toCharArray();
			String[] resArray = new String[rowLength];
			for (int i = 0; i < resArray.length; i++) {
				if (i < srtLength) {
					char c = charArray[i];
					resArray[i] = String.valueOf(c);
				} else {
					resArray[i] = space;
				}
			}
			result = StringUtils.join(resArray, "");
		}

		return result;
	}

	/**
	 * 临时解决方案
	 */
	private void sendMail(String config, String price, SessionInfo sessionInfo) {
		String templateId = "productMail";
		if (sessionInfo != null) {
			String sessionType = sessionInfo.getSessionType();
			if (ValidateUtil.isValid(sessionType)) {
				if (PmsConstant.ROLE_EMPLOYEE.equals(sessionType)) {
					try {
						PmsEmployee employee = employeeFacade.findEmployeeById(sessionInfo.getReqiureId());
						/**
						 * key -->邮箱 <br>
						 * value --> String[] 参数列表
						 */
						Map<String, String[]> parser = new HashMap<String, String[]>();
						String key = employee.getEmail();
						String[] value = new String[2];
						value[0] = config;
						value[1] = price;
						parser.put(key, value);
						mailMQService.sendMailsByType(templateId, parser);
					} catch (Exception e) {
						e.printStackTrace();
						Log.error("send mail fail ...", null, e);
					}
				}
			}
		}
	}
}