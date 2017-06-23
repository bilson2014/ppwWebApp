package com.panfeng.film.util;

import java.util.UUID;

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

	public static String[] chars = new String[] { "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
			"o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8",
			"9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
			"U", "V", "W", "X", "Y", "Z" };

	public static String generateShortUuid() {
		StringBuffer shortBuffer = new StringBuffer();
		String uuid = UUID.randomUUID().toString().replace("-", "");
		for (int i = 0; i < 8; i++) {
			String str = uuid.substring(i * 4, i * 4 + 4);
			int x = Integer.parseInt(str, 16);
			shortBuffer.append(chars[x % 0x3E]);
		}
		return shortBuffer.toString();
	}
}
