package com.panfeng.film.resource.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.paipianwang.pat.common.entity.ComboTreeModel;
import com.paipianwang.pat.common.entity.KeyValue;
import com.paipianwang.pat.common.util.ValidateUtil;
import com.paipianwang.pat.workflow.entity.PmsQuotationType;
import com.paipianwang.pat.workflow.enums.ProductionResource;
import com.paipianwang.pat.workflow.facade.PmsQuotationTypeFacade;

/**
 * 报价单
 */
@RestController
public class QuotationController extends BaseController {

	@Autowired
	private PmsQuotationTypeFacade pmsQuotationTypeFacade;
		
	/**
	 * 获取制片工具资源对应报价单类型
	 * 			配置类型及其所有下级节点
	 * @param typeId
	 * @return
	 */
	@RequestMapping("/quotationtype/production/select")
	public List<ComboTreeModel> listByProduction(String productionType,String subType){
		List<ComboTreeModel> result=new ArrayList<ComboTreeModel>();
		
		Long[] typeIds;
		
		if(ProductionResource.device.getKey().equals(productionType) && ValidateUtil.isValid(subType)) {
			typeIds=new Long[] {Long.parseLong(subType)};//同getChildren
		}else {
			ProductionResource relation=ProductionResource.getEnum(productionType);
			typeIds=relation.getQuotationType();
		}
		
		for(Long typeId:typeIds) {
			PmsQuotationType self=pmsQuotationTypeFacade.getById(typeId);
			if(self!=null) {
				result.add(new ComboTreeModel(self.getTypeId()+"", self.getParentId()+"", self.getTypeName()));
				List<PmsQuotationType> types= pmsQuotationTypeFacade.findByParent(typeId);
				for(PmsQuotationType type:types){
					result.add(new ComboTreeModel(type.getTypeId()+"", type.getParentId()+"", type.getTypeName()));
					if(ValidateUtil.isValid(type.getChildren())){
						for(PmsQuotationType child:type.getChildren()){
							result.add(new ComboTreeModel(child.getTypeId()+"", child.getParentId()+"", child.getTypeName()));
						}
					}
				}
			}
			
		}
	
		return result;
	}
	
	/**
	 * 获取下一级子节点
	 * @param typeId
	 * @return
	 */
	@RequestMapping("/quotationtype/production/children")
	public List<KeyValue> getChildren(String productionType,Long typeId){
		Long[] typeIds;
		
		if(ValidateUtil.isValid(productionType)) {
			ProductionResource relation=ProductionResource.getEnum(productionType);
			typeIds=relation.getQuotationType();
		}else {
			typeIds=new Long[] {typeId};
		}
		
		List<KeyValue> result=new ArrayList<KeyValue>();
		for(Long id:typeIds) {
			List<PmsQuotationType> types= pmsQuotationTypeFacade.findByParent(id);
			for(PmsQuotationType type:types){
				KeyValue keyValue=new KeyValue();
				keyValue.setKey(type.getTypeId()+"");
				keyValue.setValue(type.getTypeName());
				result.add(keyValue);		
			}
		}	
		return result;
	}
	
}
