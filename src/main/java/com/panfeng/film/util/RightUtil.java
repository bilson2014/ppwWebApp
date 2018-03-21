package com.panfeng.film.util;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.paipianwang.pat.facade.right.entity.PmsRight;
import com.panfeng.film.dao.RightDao;

@Component
public class RightUtil {

	@Autowired
	private final RightDao rightDao=null;
	
	private static Map<String,PmsRight> rights;
	
	public PmsRight getRight(String url){
		if(!ValidateUtil.isValid(url)){
			return null;
		}
		if(!ValidateUtil.isValid(rights)){
			rights=rightDao.getRightsFromRedis();
//			rights=pmsRightFacade.findAllRights();//查询出Web服务权限?redis模糊查询，如此很多公共权限也会走
		}
		
		PmsRight result=rights.get(url);
		if(result!=null){
			return result;
		}
		
		for(String right:rights.keySet()){
			if(right.contains("{paramName}")){
				if(url.matches(right.replaceAll("\\{paramName\\}", "[A-Za-z0-9]+"))){
					return rights.get(right);
				}
			/*}else{
				if(url.equals(right)){
					return rights.get(right);
				}*/
			}
		}
		
		return null;
	}

	public static Map<String, PmsRight> getRights() {
		return rights;
	}

	public static void setRights(Map<String, PmsRight> rights) {
		RightUtil.rights = rights;
	}
}
