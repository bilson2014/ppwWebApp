package com.panfeng.film.resource.controller;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.paipianwang.pat.common.entity.BaseProductionEntity;
import com.paipianwang.pat.common.entity.SessionInfo;
import com.paipianwang.pat.common.util.ValidateUtil;
import com.paipianwang.pat.common.web.file.FastDFSClient;
import com.paipianwang.pat.workflow.entity.PmsProductionActor;
import com.paipianwang.pat.workflow.entity.PmsProductionDevice;
import com.paipianwang.pat.workflow.entity.PmsProductionDirector;
import com.paipianwang.pat.workflow.entity.PmsProductionStudio;
import com.paipianwang.pat.workflow.entity.PmsQuotationType;
import com.paipianwang.pat.workflow.entity.ProductionConstants;
import com.paipianwang.pat.workflow.enums.ProductionDeviceType;
import com.paipianwang.pat.workflow.enums.ProductionResource;
import com.paipianwang.pat.workflow.facade.PmsProductionActorFacade;
import com.paipianwang.pat.workflow.facade.PmsProductionDeviceFacade;
import com.paipianwang.pat.workflow.facade.PmsProductionDirectorFacade;
import com.paipianwang.pat.workflow.facade.PmsProductionStudioFacade;
import com.paipianwang.pat.workflow.facade.PmsQuotationTypeFacade;
import com.panfeng.film.domain.BaseMsg;

@RestController
@RequestMapping("/production")
public class ProductionResourceController extends BaseController {
	@Autowired
	private PmsProductionActorFacade pmsProductionActorFacade;
	@Autowired
	private PmsProductionDeviceFacade pmsProductionDeviceFacade;
	@Autowired
	private PmsProductionDirectorFacade pmsProductionDirectorFacade;
	@Autowired
	private PmsProductionStudioFacade pmsProductionStudioFacade;
	@Autowired
	private PmsQuotationTypeFacade pmsQuotationTypeFacade;

	@RequestMapping("/view")
	public ModelAndView infoView(final HttpServletRequest request, final ModelMap model) throws Exception {
		
		
		return new ModelAndView("/supplier/basics",model);
	}
	
	@RequestMapping("/{type}/list")
	public List<BaseProductionEntity> list(@PathVariable("type") final String type,final HttpServletRequest request) {
		List<BaseProductionEntity> result=new ArrayList<BaseProductionEntity>();

		Map<String, Object> paramMap=new HashMap<>();
		paramMap.put("creator", getCreator(request));
		
		switch (type) {
		case "people":
			getPeople(result,paramMap);
			break;
		case "device":
			//设备
			getDevice(result,paramMap);
			break;
		case "studio":
			//场地
			getStudio(result,paramMap);
			break;
		default:
			break;
		}
		
		result.sort(new Comparator<BaseProductionEntity>() {
			@Override
			public int compare(BaseProductionEntity o1, BaseProductionEntity o2) {				
				return o1.getCreateTime().compareTo(o2.getCreateTime());
			}
		});
	
		//id  name photo price
		return result;
	}
	
	private void getPeople(List<BaseProductionEntity> result,Map<String, Object> paramMap) {
		//人员
		List<PmsProductionActor> actors=pmsProductionActorFacade.listBy(paramMap);
		List<PmsProductionDirector> dirctors=pmsProductionDirectorFacade.listBy(paramMap);
		actors.forEach(each->{
			each.setName(each.getName()+"/演员");
			each.setPhoto(each.getPhoto().split(";")[0]);
			each.setIdentity(ProductionResource.actor.getKey());
		});
		dirctors.forEach(each->{
			each.setName(each.getName()+"/导演");
			each.setPhoto(each.getPhoto().split(";")[0]);
			each.setIdentity(ProductionResource.director.getKey());
		});
		result.addAll(actors);
		result.addAll(dirctors);	
	}
	private void getDevice(List<BaseProductionEntity> result,Map<String, Object> paramMap) {
		List<PmsProductionDevice> devices=pmsProductionDeviceFacade.listBy(paramMap);	
		if(ValidateUtil.isValid(devices)) {
			List<PmsQuotationType> types=pmsQuotationTypeFacade.findAll();
			for(PmsQuotationType type:types) {
				for(PmsProductionDevice device:devices) {
					if(type.getTypeId().equals(device.getTypeId())) {
						device.setName(type.getTypeName());
						continue;
					}
				}
			}
			result.addAll(devices);
		}	
	}
	private void getStudio(List<BaseProductionEntity> result,Map<String, Object> paramMap) {
		List<PmsProductionStudio> studios=pmsProductionStudioFacade.listBy(paramMap);
		studios.forEach(each->{
			each.setName(each.getName()+(each.getType().equals("1")?"/内景":"/外景"));
			each.setPhoto(each.getPhoto().split(";")[0]);
		});
		result.addAll(studios);
	}
	
	@RequestMapping("/{type}/parameter")
	public Map<String,Object> getParameter(@PathVariable("type") final String type) {
		Map<String,Object> result=new HashMap<String, Object>();
		
		switch (type) {
		case "actor":
			//演员
			ProductionConstants[] zoneList=ProductionConstants.zoneList;
			result.put("zoneList", zoneList);//JsonUtil.toJson(zoneList));
			break;
		case "director":
			//导演
			ProductionConstants[] specialtyList=ProductionConstants.specialtyList;
			result.put("specialtyList", specialtyList);
			break;
		case "device":
			//设备
			List<Map<String,Object>> deviceTypes=new ArrayList<>();
			for(ProductionDeviceType deviceType:ProductionDeviceType.values()) {
				Map<String,Object> typeMap=new HashMap<>();
				typeMap.put("text", deviceType.getName());
				typeMap.put("value", deviceType.getKey());
				deviceTypes.add(typeMap);
			}
			result.put("deviceTypes", deviceTypes);
			break;
		case "studio":
			//场地
			
			break;
		default:
			break;
		}
		
		return result;
	}
	
	//---------演員---------------
	@RequestMapping("/actor/save")
	public BaseMsg addActor(@RequestBody final PmsProductionActor actor,final HttpServletRequest request) {
		BaseMsg result=new BaseMsg();
		delImg(actor.getDelImg());
		editCreator(actor, request);
		//主图处理
		actor.setPhoto(actor.getMainPhoto()+";"+actor.getPhoto());
		pmsProductionActorFacade.insert(actor);
		
		return result;
	}
	@RequestMapping("/actor/get")
	public PmsProductionActor getActor(@RequestBody final PmsProductionActor actor) {
		PmsProductionActor result=pmsProductionActorFacade.getById(actor.getId());
		String[] photos=result.getPhoto().split(";");
		if(ValidateUtil.isValid(photos)) {
			result.setMainPhoto(photos[0]);
			result.setPhoto(result.getPhoto().substring(result.getPhoto().indexOf(";")+1));
		}	
		return result;
	}

	@RequestMapping("/actor/update")
	public BaseMsg updateActor(@RequestBody final PmsProductionActor actor) {
		BaseMsg result=new BaseMsg();
		delImg(actor.getDelImg());
		//主图处理
		actor.setPhoto(actor.getMainPhoto()+";"+actor.getPhoto());
		pmsProductionActorFacade.update(actor);		
		return result;
	}
	@RequestMapping("/actor/delete")
	public BaseMsg deleteActor(@RequestBody final PmsProductionActor actor) {
		BaseMsg result=new BaseMsg();
		PmsProductionActor old=pmsProductionActorFacade.getById(actor.getId());
		delImg(old.getPhoto());
		pmsProductionActorFacade.deleteByIds(new long[] {actor.getId()});
		return result;
	}
	
	//---------导演---------------
	@RequestMapping("/director/save")
	public BaseMsg addDirector(@RequestBody final PmsProductionDirector director,final HttpServletRequest request) {
		BaseMsg result=new BaseMsg();
		delImg(director.getDelImg());
		editCreator(director, request);
		pmsProductionDirectorFacade.insert(director);
		
		return result;
	}
	@RequestMapping("/director/get")
	public PmsProductionDirector getDirector(@RequestBody final PmsProductionDirector director) {
		PmsProductionDirector result=pmsProductionDirectorFacade.getById(director.getId());
		return result;
	}
	@RequestMapping("/director/update")
	public BaseMsg updateDirector(@RequestBody final PmsProductionDirector director) {
		BaseMsg result=new BaseMsg();
		delImg(director.getDelImg());
		pmsProductionDirectorFacade.update(director);		
		return result;
	}
	@RequestMapping("/director/delete")
	public BaseMsg deleteDirector(@RequestBody final PmsProductionDirector director) {
		BaseMsg result=new BaseMsg();
		PmsProductionDirector old=pmsProductionDirectorFacade.getById(director.getId());
		delImg(old.getPhoto());
		pmsProductionDirectorFacade.deleteByIds(new long[] {director.getId()});
		return result;
	}
	//---------设备---------------	
	@RequestMapping("/device/save")
	public BaseMsg addActor(@RequestBody final PmsProductionDevice device,final HttpServletRequest request) {
		BaseMsg result=new BaseMsg();
		editCreator(device, request);
		pmsProductionDeviceFacade.insert(device);
		
		return result;
	}
	@RequestMapping("/device/get")
	public PmsProductionDevice getDirector(@RequestBody final PmsProductionDevice device) {
		PmsProductionDevice result=pmsProductionDeviceFacade.getById(device.getId());
		
		return result;
	}
	@RequestMapping("/device/update")
	public BaseMsg updateActor(@RequestBody final PmsProductionDevice device) {
		BaseMsg result=new BaseMsg();
		pmsProductionDeviceFacade.update(device);		
		return result;
	}
	@RequestMapping("/device/delete")
	public BaseMsg deleteDevice(@RequestBody final PmsProductionDevice device) {
		BaseMsg result=new BaseMsg();
		pmsProductionDeviceFacade.deleteByIds(new long[] {device.getId()});
		return result;
	}
	//---------场地---------------	
	@RequestMapping("/studio/save")
	public BaseMsg addStudio(@RequestBody final PmsProductionStudio studio,final HttpServletRequest request) {
		BaseMsg result=new BaseMsg();
		delImg(studio.getDelImg());
		editCreator(studio, request);
		//主图处理
		studio.setPhoto(studio.getMainPhoto()+";"+studio.getPhoto());
		pmsProductionStudioFacade.insert(studio);
		
		return result;
	}
	@RequestMapping("/studio/get")
	public PmsProductionStudio getStudio(@RequestBody final PmsProductionStudio studio) {
		PmsProductionStudio result=pmsProductionStudioFacade.getById(studio.getId());
		String[] photos=result.getPhoto().split(";");
		if(ValidateUtil.isValid(photos)) {
			result.setMainPhoto(photos[0]);
			result.setPhoto(result.getPhoto().substring(result.getPhoto().indexOf(";")+1));
		}	
		return result;
	}

	@RequestMapping("/studio/update")
	public BaseMsg updateStudio(@RequestBody final PmsProductionStudio studio) {
		BaseMsg result=new BaseMsg();
		delImg(studio.getDelImg());
		//主图处理
		studio.setPhoto(studio.getMainPhoto()+";"+studio.getPhoto());
		pmsProductionStudioFacade.update(studio);		
		return result;
	}
	@RequestMapping("/studio/delete")
	public BaseMsg deleteStudio(@RequestBody final PmsProductionStudio studio) {
		BaseMsg result=new BaseMsg();
		PmsProductionStudio old=pmsProductionStudioFacade.getById(studio.getId());
		delImg(old.getPhoto());
		pmsProductionStudioFacade.deleteByIds(new long[] {studio.getId()});
		return result;
	}

	
	private void delImg(String delImgs) {
		if(ValidateUtil.isValid(delImgs)) {
			String[] delImg=delImgs.split(";");
			for(String address:delImg) {
				FastDFSClient.deleteFile(address);
			}
		}
	}
	private void editCreator(BaseProductionEntity resource,final HttpServletRequest request) {
		SessionInfo session=this.getCurrentInfo(request);
		resource.setCreator("t_"+session.getReqiureId());
		resource.setTeamId(session.getReqiureId());
		//审核中
		resource.setStatus(Integer.parseInt(ProductionConstants.statusList[0].getValue()));
	}
	
	private String getCreator(final HttpServletRequest request) {
		SessionInfo session=this.getCurrentInfo(request);
		return "t_"+session.getReqiureId();	
	}
	
}
