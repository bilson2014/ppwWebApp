package com.panfeng.film.util;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.resource.model.Wechat;
import com.panfeng.film.resource.model.WechatToken;

public class WechatUtils {
	final static Logger logger = LoggerFactory.getLogger("error");
	/**
	 * 根基微信token，获取用户信息
	 * @param code
	 * @param request
	 * @return
	 */
	public static Wechat decodeWechatToken(String code, HttpServletRequest request) {

		if (code != null && !"".equals(code)) {
			WechatToken token = new WechatToken();
			token.setAppid(GlobalConstant.CUSTOMER_WEBCHAT_APPID);
			token.setSecret(GlobalConstant.CUSTOMER_WEBCHAT_APPSECRET);
			// 通过code获取access_token
			final StringBuffer tokenUrl = new StringBuffer();
			tokenUrl.append("https://api.weixin.qq.com/sns/oauth2/access_token?");
			tokenUrl.append("appid=" + token.getAppid());
			tokenUrl.append("&secret=" + token.getSecret());
			tokenUrl.append("&code=" + code);
			tokenUrl.append("&grant_type=authorization_code");
			final String str = HttpUtil.httpGet(tokenUrl.toString(), request);
			if (str != null && !"".equals(str)) {
				token = JsonUtil.toBean(str, WechatToken.class);
				token.setAppid(GlobalConstant.CUSTOMER_WEBCHAT_APPID);
				token.setSecret(GlobalConstant.CUSTOMER_WEBCHAT_APPSECRET);
			}
			if (token.getErrcode() == null) {
				// 正确
				if (token.getAccess_token() != null && !"".equals(token.getAccess_token())) { // token
																								// 超时
																								// 2小时
					final StringBuffer refreshUrl = new StringBuffer();
					refreshUrl.append("https://api.weixin.qq.com/sns/oauth2/refresh_token?");
					refreshUrl.append("appid=" + token.getAppid());
					refreshUrl.append("&grant_type=refresh_token");
					refreshUrl.append("&refresh_token=" + token.getRefresh_token());
					final String refreshObj = HttpUtil.httpGet(refreshUrl.toString(), request);
					if (refreshObj != null && !"".equals(refreshObj)) {
						token = JsonUtil.toBean(refreshObj, WechatToken.class);
					}
				}

				final StringBuffer userUrl = new StringBuffer();
				userUrl.append("https://api.weixin.qq.com/sns/userinfo?");
				userUrl.append("access_token=" + token.getAccess_token());
				userUrl.append("&openid=" + token.getOpenid());

				Wechat wechat = new Wechat();
				final String userStr = HttpUtil.httpGet(userUrl.toString(), request);
				if (userStr != null && !"".equals(userStr)) {
					wechat = JsonUtil.toBean(userStr, Wechat.class);
				}
				// 获取到 用户信息后，写入session
				return wechat;
			} else {
				// 错误
				Log.error("wechat login error ... ",null);
			}
		}
		return null;
	}
}
