package com.panfeng.film.resource.controller;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.paipianwang.pat.common.config.PublicConfig;
import com.paipianwang.pat.common.constant.PmsConstant;
import com.paipianwang.pat.common.entity.BaseEntity;
import com.paipianwang.pat.common.entity.DataGrid;
import com.paipianwang.pat.common.entity.PageParam;
import com.paipianwang.pat.common.entity.SessionInfo;
import com.paipianwang.pat.common.util.DateUtils;
import com.paipianwang.pat.common.util.ValidateUtil;
import com.paipianwang.pat.facade.indent.entity.PmsIndent;
import com.paipianwang.pat.facade.indent.service.PmsIndentFacade;
import com.paipianwang.pat.facade.product.entity.PmsProduct;
import com.paipianwang.pat.facade.product.entity.PmsService;
import com.paipianwang.pat.facade.product.service.PmsProductFacade;
import com.paipianwang.pat.facade.product.service.PmsServiceFacade;
import com.paipianwang.pat.facade.user.entity.PmsUser;
import com.paipianwang.pat.facade.user.service.PmsUserFacade;
import com.panfeng.film.domain.BaseMsg;
import com.panfeng.film.domain.Result;
import com.panfeng.film.mq.service.SmsMQService;
import com.panfeng.film.util.IndentUtil;

@RestController
@RequestMapping("/order")
public class IndentController extends BaseController {

	final Logger logger = LoggerFactory.getLogger("error");

	@Autowired
	private PmsProductFacade pmsProductFacade = null;

	@Autowired
	private PmsServiceFacade pmsServiceFacade = null;

	@Autowired
	private PmsIndentFacade pmsIndentFacade = null;

	@Autowired
	private SmsMQService smsMQService = null;

	@Autowired
	private PmsUserFacade pmsUserFacade;

	/**
	 * PC端-ajax 提交订单
	 */
	@RequestMapping(value = "/deliver", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public Result successView(final PmsIndent indent, final HttpServletRequest request,
			@RequestParam(required = false) String phoneCode) throws UnsupportedEncodingException {
		final Result result = new Result();

		final HttpSession session = request.getSession();
		// 判断该用户是否登录
		final SessionInfo info = (SessionInfo) session.getAttribute(PmsConstant.SESSION_INFO);
		boolean flag = false;

		if (info != null) {
			// 登录之后，不需要判断验证码
			indent.setIndent_tele(info.getTelephone());
			flag = true;
		} else {
			// 未登录，需要判断验证码
			String code = (String) session.getAttribute("code");
			String codeOfPhone = (String) request.getSession().getAttribute("codeOfphone");

			if (null != code && null != codeOfPhone && null != phoneCode && code.equals(phoneCode)
					&& codeOfPhone.equals(indent.getIndent_tele())) {
				flag = true;
			} else {
				return new Result(false, "验证码错误！");
			}
		}

		if (flag) {
			request.setCharacterEncoding("UTF-8");
			String productName = null;
			final long teamId = indent.getTeamId();
			final long productId = indent.getProductId();
			final long serviceId = indent.getServiceId();
			// 如果按产品下单，那么下单之后的订单信息需要与数据库进行对比
			if (teamId != -1 && productId != -1 && serviceId != -1) {
				// 产品下单
				final PmsProduct product = pmsProductFacade.findProductById(productId);
				productName = product.getProductName();
				final PmsService ser = pmsServiceFacade.getServiceById(serviceId);
				indent.setSecond(ser.getMcoms());
				indent.setIndentPrice(ser.getServiceRealPrice());
			}
			boolean res = pmsIndentFacade.saveOrder(indent);
			if (res) {
				result.setRet(true);
				String telephone = PublicConfig.PHONENUMBER_ORDER;
				if (indent.getSendToStaff()) {
					if (StringUtils.isBlank(productName)) {
						smsMQService.sendMessage("131844", telephone,
								new String[] { indent.getIndent_tele(), DateUtils.nowTime(), "【未指定具体影片】" });
					} else {
						smsMQService.sendMessage("131844", telephone,
								new String[] { indent.getIndent_tele(), DateUtils.nowTime(), "【" + productName + "】" });
					}
				}
				// 发送短信给用户下单成功
				if (indent.getSendToUser()) {
					smsMQService.sendMessage("131329", indent.getIndent_tele(), null);
				}
			}
			return result;
		}
		return new Result(false, "参数错误");
	}

	// ---------------------------------------------客服接口------------------------------------------------------------------
	@RequestMapping(value = "/myOrder", produces = "application/json; charset=UTF-8")
	public ModelAndView ongoing(ModelMap modelMap, HttpServletRequest request) {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		List<Integer> types = new ArrayList<>();
		types.add(0);
		types.add(1);
		paramMap.put("types", types);
		PageParam pageParam = new PageParam();
		pageParam.setBegin(0);
		pageParam.setLimit(20);
		SessionInfo currentInfo = getCurrentInfo(request);
		if (currentInfo != null) {
			String sessionType = currentInfo.getSessionType();
			if (ValidateUtil.isValid(sessionType)) {
				Long reqiureId = currentInfo.getReqiureId();
				paramMap.put("employeeId", reqiureId);
				DataGrid<PmsIndent> listWithPagination = pmsIndentFacade.listWithPagination(pageParam, paramMap);
				modelMap.addAttribute("indentList", listWithPagination);
			}
		}

		return new ModelAndView("/employee/orderIndex", modelMap);
	}

	@RequestMapping(value = "/list/page", produces = "application/json; charset=UTF-8")
	public DataGrid<PmsIndent> listWithPagination(@RequestBody Map<String, Object> paramMap,
			HttpServletRequest request) {

		if (ValidateUtil.isValid(paramMap)) {

			// 设置分页
			PageParam pageParam = new PageParam();
			Object object = paramMap.get("page");
			Object object2 = paramMap.get("rows");
			if (object != null && object2 != null) {
				Long page = Long.valueOf(object.toString());
				Long rows = Long.valueOf(object2.toString());
				paramMap.remove("page");
				paramMap.remove("rows");
				pageParam.setBegin((page - 1) * rows);
				pageParam.setLimit(rows);
			} else {
				pageParam.setBegin(0);
				pageParam.setLimit(20);
			}

			SessionInfo currentInfo = getCurrentInfo(request);
			if (currentInfo != null) {
				String sessionType = currentInfo.getSessionType();
				if (ValidateUtil.isValid(sessionType)) {
					Long reqiureId = currentInfo.getReqiureId();
					paramMap.put("employeeId", reqiureId);
					return pmsIndentFacade.listWithPagination(pageParam, paramMap);
				}
			}
		}
		return new DataGrid<PmsIndent>();
	}

	@RequestMapping(value = "/updateOrSave", produces = "application/json; charset=UTF-8")
	public BaseMsg updateIndent(PmsIndent indent, HttpServletRequest request) {
		BaseMsg baseMsg = new BaseMsg();
		baseMsg.setCode(BaseMsg.ERROR);
		baseMsg.setErrorMsg("处理失败！");

		if (indent != null && indent.getId() != null && indent.getId() > 0) {
			long update = pmsIndentFacade.update(indent);
			if (update > 0) {
				baseMsg.setCode(BaseMsg.NORMAL);
				baseMsg.setErrorMsg("更新成功！");
			}
		} else {
			SessionInfo currentInfo = getCurrentInfo(request);
			if (currentInfo != null) {
				Long reqiureId = currentInfo.getReqiureId();
				indent.setEmployeeId(reqiureId);
			}
			indent.setIndentType(PmsIndent.ORDER_NEW);
			boolean save = pmsIndentFacade.saveOrder(indent);
			if (save) {
				baseMsg.setCode(BaseMsg.NORMAL);
				baseMsg.setErrorMsg("新增成功！");
			}
		}
		return baseMsg;
	}

	@RequestMapping(value = "/checkuser")
	public BaseMsg checkUser(String indent_tele, Long indentId) {
		BaseMsg baseMsg = new BaseMsg();
		PmsUser user = new PmsUser();
		user.setTelephone(indent_tele);
		user = pmsUserFacade.findUserByAttr(user);

		if (user != null && user.getId() > 0) {
			PmsIndent indent = pmsIndentFacade.findIndentById(indentId);
			// check
			String iUserCompany = indent.getUserCompany();
			String iRealName = indent.getRealName();

			String uUserCompany = user.getUserCompany();
			String uRealName = user.getRealName();

			if (ValidateUtil.isValid(uUserCompany ) && !uUserCompany.trim().equals(iUserCompany.trim())) {
				baseMsg.setCode(BaseMsg.ERROR);
				baseMsg.setResult(user);
				return baseMsg;
			}

			if (ValidateUtil.isValid(uRealName) && !uRealName.trim().equals(iRealName.trim())) {
				baseMsg.setCode(BaseMsg.ERROR);
				baseMsg.setResult(user);
				return baseMsg;
			}

			baseMsg.setCode(BaseMsg.NORMAL);
		} else {
			baseMsg.setCode(BaseMsg.NORMAL);
		}

		return baseMsg;
	}

	@RequestMapping(value = "/submit", produces = "application/json; charset=UTF-8")
	public BaseMsg submit(@RequestBody PmsIndent indent) {
		BaseMsg baseMsg = new BaseMsg();
		indent = pmsIndentFacade.findIndentById(indent.getId());
		indent.setUserId(saveUser(indent));
		indent.setIndentType(PmsIndent.ORDER_SUBMIT);
		long update = pmsIndentFacade.update(indent);
		if (update > 0) {
			baseMsg.setCode(BaseMsg.NORMAL);
			baseMsg.setErrorMsg("提交成功！");
		} else {
			baseMsg.setCode(BaseMsg.ERROR);
			baseMsg.setErrorMsg("提交失败！");
		}
		return baseMsg;
	}

	private long saveUser(PmsIndent indent) {
		String indent_tele = indent.getIndent_tele();
		int count = pmsUserFacade.validationPhone(indent_tele, null);
		PmsUser user = null;
		// 用户操作
		if (count != 0) {
			// 更新用户
			PmsUser temp = new PmsUser();
			temp.setTelephone(indent_tele);
			user = pmsUserFacade.findUserByAttr(temp);

			if (!ValidateUtil.isValid(user.getUserCompany())) {
				user.setUserCompany(indent.getUserCompany());
			}

			if (!ValidateUtil.isValid(user.getRealName())) {
				user.setRealName(indent.getRealName());
			}
			pmsUserFacade.update(user);
		} else {
			// 插入用户
			user = new PmsUser();
			user.setUserName(indent.getUserCompany());
			List<PmsUser> findUserByName = pmsUserFacade.findUserByName(user);
			
			user = new PmsUser();
			user.setSex(2);
			user.setKindlySend(true);
			int x = findUserByName == null ? 0:findUserByName.size();
			user.setUserName(indent.getUserCompany() + x + 1 );
			user.setPassword("E10ADC3949BA59ABBE56E057F20F883E");
			user.setTelephone(indent_tele);
			if (ValidateUtil.isValid(indent.getUserCompany())) {
				user.setUserCompany(indent.getUserCompany());
			}

			if (ValidateUtil.isValid(indent.getRealName())) {
				user.setRealName(indent.getRealName());
			}

			if (ValidateUtil.isValid(indent.getWechat())) {
				user.setWeChat(indent.getWechat());
			}

			if (indent.getPosition() != null) {
				user.setPosition(indent.getPosition());
			}
			Integer computeScore = pmsUserFacade.computeScore(user);
			user.setClientLevel(computeScore);
			Map<String, Object> save = pmsUserFacade.save(user);
			Object objUserId = save.get(BaseEntity.SAVE_MAP_ID);

			if (objUserId != null) {
				Long userId = Long.valueOf(objUserId.toString());
				user.setId(userId);
			}
		}
		return user.getId();
	}

	@RequestMapping(value = "/shamOrder", produces = "application/json; charset=UTF-8")
	public BaseMsg shamOrder(@RequestBody PmsIndent indent) {
		BaseMsg baseMsg = new BaseMsg();
		boolean changeIndentsType = pmsIndentFacade.changeIndentsType(new long[] { indent.getId() },
				PmsIndent.ORDER_SHAM);
		if (!changeIndentsType) {
			baseMsg.setCode(BaseMsg.ERROR);
			baseMsg.setErrorMsg("提交失败！");
		} else {
			baseMsg.setCode(BaseMsg.NORMAL);
			baseMsg.setErrorMsg("提交成功！");
		}
		return baseMsg;
	}

	@RequestMapping(value = "/realOrder", produces = "application/json; charset=UTF-8")
	public BaseMsg realOrder(@RequestBody PmsIndent indent) {
		BaseMsg baseMsg = new BaseMsg();
		indent = pmsIndentFacade.findIndentById(indent.getId());
		indent.setUserId(saveUser(indent));
		indent.setIndentType(PmsIndent.ORDER_REAL);
		long update = pmsIndentFacade.update(indent);
		if (update > 0) {
			baseMsg.setCode(BaseMsg.NORMAL);
			baseMsg.setErrorMsg("提交成功！");
		} else {
			baseMsg.setCode(BaseMsg.ERROR);
			baseMsg.setErrorMsg("提交失败！");
		}
		return baseMsg;
	}

	@RequestMapping(value = "/checkOrder")
	public BaseMsg checkOrder(Long indentId) {
		BaseMsg baseMsg = new BaseMsg();
		List<String> errorItem = new ArrayList<>();
		if (indentId != null) {
			PmsIndent indent = pmsIndentFacade.findIndentById(indentId);
			String userCompany = indent.getUserCompany();
			if (!ValidateUtil.isValid(userCompany)) {
				errorItem.add("userCompany");
			}
			String realName = indent.getRealName();
			if (!ValidateUtil.isValid(realName)) {
				errorItem.add("realName");
			}
			String indent_tele = indent.getIndent_tele();
			if (!ValidateUtil.isValid(indent_tele)) {
				errorItem.add("indent_tele");
			}
			Integer indentSource = indent.getIndentSource();
			if (indentSource == null) {
				errorItem.add("indentSource");
			}
			Long requireId = indent.getRequireId();
			if (!ValidateUtil.isValid(requireId)) {
				errorItem.add("requireId");
			}

			if (errorItem.size() == 0) {
				baseMsg.setCode(BaseMsg.NORMAL);
			} else {
				baseMsg.setCode(BaseMsg.WARNING);
				baseMsg.setResult(errorItem);
			}
		} else {
			baseMsg.setCode(BaseMsg.ERROR);
			baseMsg.setErrorMsg("订单ID不能为空！");
		}
		return baseMsg;
	}

	// ------------------------------------------------------------------------------
	@RequestMapping(value = "/info")
	public BaseMsg indentInfo(Long indentId) {
		BaseMsg baseMsg = new BaseMsg();
		if (indentId != null) {
			PmsIndent indent = pmsIndentFacade.findIndentById(indentId);
			baseMsg.setCode(BaseMsg.NORMAL);
			baseMsg.setResult(indent);
		} else {
			baseMsg.setCode(BaseMsg.ERROR);
			baseMsg.setErrorMsg("订单ID不能为空！");
		}
		return baseMsg;
	}
}
