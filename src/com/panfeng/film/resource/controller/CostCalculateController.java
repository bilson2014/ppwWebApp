package com.panfeng.film.resource.controller;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.panfeng.film.resource.model.CostCalculate;
import com.panfeng.film.resource.model.Indent;
import com.panfeng.film.service.CostCalculateService;
import com.panfeng.film.util.HttpUtil;
import com.panfeng.film.util.JsonUtil;
import com.panfeng.film.util.PropertiesUtils;
/**
 *成本计算控制器
 */
@RestController
@RequestMapping("/calculate")
public class CostCalculateController extends BaseController{
	
	@Autowired
	private CostCalculateService calculateService;
	private static String URL_PREFIX = null;
	/**
	视频类别	专业级导演团队（3-5）默认	广告级导演团队（5-8）	电影级导演团队（8-10）
	活动视频1	￥ 30,000.00			￥ 60,000.00		￥ 100,000.00
	产品广告	￥ 60,000.00			￥ 100,000.00	￥ 200,000.00
	企业宣传	￥ 30,000.00			￥ 60,000.00		￥ 100,000.00
	微电影	￥ 60,000.00			￥ 100,000.00	￥ 200,000.00
	融资路演	￥ 30,000.00			￥ 60,000.00		￥ 100,000.00
	众筹视频	￥ 30,000.00			￥ 60,000.00		￥ 100,000.00
	 */
	public static int[][] typeAddTeam = new int[6][3];//初始化6行3列的 视频+导演价格表
	static{
		typeAddTeam[0][0] = 30000;
		typeAddTeam[0][1] = 60000;
		typeAddTeam[0][2] = 100000;
		typeAddTeam[1][0] = 60000;
		typeAddTeam[1][1] = 100000;
		typeAddTeam[1][2] = 200000;
		typeAddTeam[2][0] = 30000;
		typeAddTeam[2][1] = 60000;
		typeAddTeam[2][2] = 100000;
		typeAddTeam[3][0] = 60000;
		typeAddTeam[3][1] = 100000;
		typeAddTeam[3][2] = 200000;
		typeAddTeam[4][0] = 30000;
		typeAddTeam[4][1] = 60000;
		typeAddTeam[4][2] = 100000;
		typeAddTeam[5][0] = 30000;
		typeAddTeam[5][1] = 60000;
		typeAddTeam[5][2] = 100000;
		URL_PREFIX = PropertiesUtils.getProp("urlPrefix");
	}
	
	
	@RequestMapping(value="cost")
	public Map<String, Object> costCalculate(@RequestBody CostCalculate calculate,
			HttpServletRequest request){
		Map<String, Object> map = new HashMap<>();
		int cost = calculateService.dealCost(typeAddTeam,calculate);
		map.put("cost", cost);
		//提交订单
		Indent indent = new Indent();
		indent.setIndent_tele(calculate.getPhone());
		indent.setIndentId(calculate.getIndentId());
		indent.setIndentName("成本计算器下单");
		indent.setIndentType(0);
		indent.setServiceId(-1l);
		indent.setIndentPrice(0d);
		indent.setProductId(-1);
		indent.setTeamId(-1);
		indent.setSecond(0l);
		indent.setProductId(-1l);
		indent.setIndentNum(" ");
		indent.setIndent_recomment(calculate.getDescription()+",预期金额:"+cost);
		
		final String url = URL_PREFIX + "portal/indent/cost/save";
		String str = HttpUtil.httpPost(url, indent,request);
		indent = JsonUtil.toBean(str, Indent.class);
		map.put("indentId", indent.getIndentId());
 		return map;
	}
}
