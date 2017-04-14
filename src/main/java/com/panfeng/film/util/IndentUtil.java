package com.panfeng.film.util;

import javax.servlet.http.HttpServletRequest;

import com.paipianwang.pat.common.constant.PmsConstant;
import com.paipianwang.pat.common.web.security.AESUtil;
import com.panfeng.film.resource.model.Indent;

public class IndentUtil {

	// 生成订单token
	public static String generateOrderToken(final HttpServletRequest request, final Indent indent) throws Exception {
		// 如果没有，则创建
		final StringBuffer sb = new StringBuffer();
		sb.append("{");
		sb.append("teamId:" + indent.getTeamId());
		sb.append(",productId:" + indent.getProductId());
		sb.append(",serviceId:" + indent.getServiceId());
		sb.append(",salesmanUniqueId:" + indent.getSalesmanUniqueId());
		sb.append("}");

		final String token = AESUtil.Encrypt(sb.toString(), PmsConstant.ORDER_TOKEN_UNIQUE_KEY);
		return token;
	}
}
