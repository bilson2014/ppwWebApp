package com.panfeng.film.filter;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.paipianwang.pat.common.config.PublicConfig;
import com.paipianwang.pat.common.constant.PmsConstant;
import com.paipianwang.pat.common.entity.SessionInfo;
import com.paipianwang.pat.common.util.ValidateUtil;
import com.paipianwang.pat.common.web.file.FastDFSClient;
import com.panfeng.film.dao.DataCacheDao;
import com.panfeng.film.dao.StorageLocateDao;
import com.panfeng.film.util.DataUtil;

/**
 * URL拦截器 添加token访问机制
 * 
 * @author Jack
 *
 */
public class TokenInterceptor implements HandlerInterceptor {

	@Autowired
	private final StorageLocateDao storageDao = null;
	@Autowired
	private DataCacheDao dataCacheDao;
	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		// 获取session
		final HttpSession session = request.getSession();
		// 获取session的token
		String stoken = (String) session.getAttribute("csrftoken");
		
		if (!ValidateUtil.isValid(stoken)) {
			// 如果没有，则创建
			stoken = DataUtil.getUuid();
			session.setAttribute("csrftoken", stoken);
		}
		
		// 配置全局官方电话
		session.setAttribute(PmsConstant.OFFICAL_PHONE_MARK, PmsConstant.OFFICAL_PHONE);
		return true;
	}

	@Override
	public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object obj, ModelAndView mv)
			throws Exception {
		if(mv != null) {
			// 如果不为空，则说明进入视图解析器
			final Map<String, String> nodeMap = storageDao.getStorageFromRedis(PmsConstant.STORAGE_NODE_RELATIONSHIP);
			// 获取最优Storage节点
			final String serviceIP = FastDFSClient.locateSource();
			String ip = "";
			final StringBuffer sbf = new StringBuffer();
//			sbf.append(request.getScheme()+"://");
			sbf.append("https://");
			
			if(ValidateUtil.isValid(serviceIP)) {
				ip = nodeMap.get(serviceIP);
				if(ValidateUtil.isValid(ip)) {
					sbf.append(ip);
//					if(request.getScheme().equals("http")){
//						sbf.append(":8888/");
//					}else{
						sbf.append("/");
//					}
					
				} else {
					sbf.append(PublicConfig.FDFS_BACKUP_SERVER_PATH);
				}
			} else {
				sbf.append(PublicConfig.FDFS_BACKUP_SERVER_PATH);
			}
			
			mv.addObject(PmsConstant.FILE_LOCATE_STORAGE_PATH, sbf.toString());
		}
		
		HttpSession session=request.getSession();
		final SessionInfo info = (SessionInfo) session.getAttribute(PmsConstant.SESSION_INFO);
		
		if(info!=null && info.getCacheTab()!=null && info.getCacheTab()>0) {
			try {
				dataCacheDao.setExpire(session.getId()+PmsConstant.CACHE_KEYNAME, session.getMaxInactiveInterval());
			} catch (Exception e) {
			}
		}
		
	}

}
