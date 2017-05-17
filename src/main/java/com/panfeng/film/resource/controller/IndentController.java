package com.panfeng.film.resource.controller;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
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
								new String[] { telephone, DateUtils.nowTime(), "【未指定具体影片】" });
					} else {
						smsMQService.sendMessage("131844", telephone,
								new String[] { telephone, DateUtils.nowTime(), "【" + productName + "】" });
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
	@RequestMapping(value = "/index", produces = "application/json; charset=UTF-8")
	public ModelAndView indentView(ModelMap modelMap, HttpServletRequest request) {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		PageParam pageParam = new PageParam();
		pageParam.setBegin(1);
		pageParam.setLimit(20);
		SessionInfo currentInfo = getCurrentInfo(request);
		if (currentInfo != null) {
			String sessionType = currentInfo.getSessionType();
			if (ValidateUtil.isValid(sessionType)) {
				if (PmsConstant.ROLE_EMPLOYEE.equals(sessionType)) {
					Long reqiureId = currentInfo.getReqiureId();
					paramMap.put("employeeId", reqiureId);
					DataGrid<PmsIndent> listWithPagination = pmsIndentFacade.listWithPagination(pageParam, paramMap);
					modelMap.addAttribute("indentList", listWithPagination);
				}
			}
		}

		return new ModelAndView("/employee/indentList", modelMap);
	}

	@RequestMapping(value = "/list/page", produces = "application/json; charset=UTF-8")
	public DataGrid<PmsIndent> listWithPagination(PageParam pageParam, Map<String, Object> paramMap,
			HttpServletRequest request) {
		SessionInfo currentInfo = getCurrentInfo(request);
		if (currentInfo != null) {
			String sessionType = currentInfo.getSessionType();
			if (ValidateUtil.isValid(sessionType)) {
				if (PmsConstant.ROLE_EMPLOYEE.equals(sessionType)) {
					Long reqiureId = currentInfo.getReqiureId();
					paramMap.put("employeeId", reqiureId);
					return pmsIndentFacade.listWithPagination(pageParam, paramMap);
				}
			}
		}
		return new DataGrid<PmsIndent>();
	}

	@RequestMapping(value = "/update", produces = "application/json; charset=UTF-8")
	public BaseMsg updateIndent(PmsIndent indent) {
		BaseMsg baseMsg = new BaseMsg();
		baseMsg.setCode(BaseMsg.ERROR);
		baseMsg.setErrorMsg("更新失败！");
		long update = pmsIndentFacade.update(indent);
		if(update > 0){
			baseMsg.setCode(BaseMsg.NORMAL);
			baseMsg.setErrorMsg("更新成功");
		}
		return baseMsg;
	}

	public BaseMsg submitIndent() {
		return null;
	}

}
