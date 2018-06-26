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

import com.paipianwang.pat.common.constant.PmsConstant;
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
	/*@Autowired
	private PmsProductionCameramanFacade pmsProductionCameramanFacade;
	@Autowired
	private PmsProductionPersonnelFacade pmsProductionPersonnelFacade;*/

	@RequestMapping("/view") // 她不走这个
	public ModelAndView infoView(final HttpServletRequest request, final ModelMap model) throws Exception {

		return new ModelAndView("/supplier/filmmaking", model);
	}

	/**
	 * 获取当前用户持有的资源数据
	 * @param type 资源类型
	 * @param request
	 * @return
	 */
	@RequestMapping("/{type}/list")
	public List<BaseProductionEntity> list(@PathVariable("type") final String type, final HttpServletRequest request) {
		List<BaseProductionEntity> result = new ArrayList<BaseProductionEntity>();

		SessionInfo session = this.getCurrentInfo(request);
		
		Map<String, Object> paramMap = new HashMap<>();
		if (PmsConstant.ROLE_PROVIDER.equals(session.getSessionType())) {
			paramMap.put("teamId", session.getReqiureId());
		}	

		switch (type) {
		case "people":
			getPeople(result, paramMap);
			break;
		case "device":
			// 设备
			getDevice(result, paramMap);
			break;
		case "studio":
			// 场地
			getStudio(result, paramMap);
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

		// id name photo price
		return result;
	}

	private void getPeople(List<BaseProductionEntity> result, Map<String, Object> paramMap) {
		// 人员
		List<PmsProductionActor> actors = pmsProductionActorFacade.listBy(paramMap);
		List<PmsProductionDirector> dirctors = pmsProductionDirectorFacade.listBy(paramMap);
//		List<PmsProductionCameraman> cameraman=pmsProductionCameramanFacade.listBy(paramMap);
//		List<PmsProductionPersonnel> personnel=pmsProductionPersonnelFacade.listBy(paramMap);
		actors.forEach(each -> {
			each.setName(each.getName() + "/"+ProductionResource.actor.getName());
			each.setPhoto(each.getPhoto().split(";")[0]);
			each.setIdentity(ProductionResource.actor.getKey());
		});
		dirctors.forEach(each -> {
			each.setName(each.getName()+ "/"+ProductionResource.director.getName());
			each.setPhoto(each.getPhoto().split(";")[0]);
			each.setIdentity(ProductionResource.director.getKey());
		});
		/*cameraman.forEach(each -> {
			each.setName(each.getName() + "/"+ProductionResource.cameraman.getName());
			each.setPhoto(each.getPhoto().split(";")[0]);
			each.setIdentity(ProductionResource.cameraman.getKey());
		});
		personnel.forEach(each -> {
			each.setName(each.getName() + "/"+ProductionResource.getEnum(each.getProfession()).getName());
			each.setPhoto(each.getPhoto().split(";")[0]);
			each.setIdentity(each.getProfession());
		});*/
		result.addAll(actors);
		result.addAll(dirctors);
	}
	

	private void getDevice(List<BaseProductionEntity> result, Map<String, Object> paramMap) {
		List<PmsProductionDevice> devices = pmsProductionDeviceFacade.listBy(paramMap);
		if (ValidateUtil.isValid(devices)) {
			List<PmsQuotationType> types = new ArrayList<>();// msQuotationTypeFacade.findAll();
			Long[] typeIds = ProductionResource.device.getQuotationType();
			for (Long typeId : typeIds) {
				List<PmsQuotationType> parent = pmsQuotationTypeFacade.findByParent(typeId);
				types.addAll(parent);
				for (PmsQuotationType type : parent) {
					if (ValidateUtil.isValid(type.getChildren())) {
						types.addAll(type.getChildren());
					}
				}
			}

			for (PmsQuotationType type : types) {
				for (PmsProductionDevice device : devices) {
					if (type.getTypeId().equals(device.getTypeId())) {
						device.setName(type.getTypeName());
						device.setPhoto(type.getPhoto());
						continue;
					}
				}
			}
			result.addAll(devices);
		}
	}

	private void getStudio(List<BaseProductionEntity> result, Map<String, Object> paramMap) {
		List<PmsProductionStudio> studios = pmsProductionStudioFacade.listBy(paramMap);
		studios.forEach(each -> {
			each.setName(each.getName() + (each.getType().equals("1") ? "/内景" : "/外景"));
			each.setPhoto(each.getPhoto().split(";")[0]);
		});
		result.addAll(studios);
	}

	@RequestMapping("/{type}/parameter")
	public Map<String, Object> getParameter(@PathVariable("type") final String type) {
		Map<String, Object> result = new HashMap<String, Object>();

		switch (type) {
		case "actor":
			// 演员
			ProductionConstants[] zoneList = ProductionConstants.zoneList;
			result.put("zoneList", zoneList);// JsonUtil.toJson(zoneList));
			break;
		case "director":
			// 导演
			ProductionConstants[] specialtyList = ProductionConstants.specialtyList;
			result.put("specialtyList", specialtyList);
			break;
		case "device":
			// 设备
			
			break;
		case "studio":
			// 场地

			break;
		default:
			break;
		}

		return result;
	}

	// ---------演員---------------
	@RequestMapping("/actor/save")
	public BaseMsg addActor(@RequestBody final PmsProductionActor actor, final HttpServletRequest request) {
		BaseMsg result = new BaseMsg();
		delImg(actor.getDelImg());
		editCreator(actor, request);
		// 主图处理
		if(ValidateUtil.isValid(actor.getPhoto())) {
			actor.setPhoto(actor.getMainPhoto() + ";" + actor.getPhoto());
		}else {
			actor.setPhoto(actor.getMainPhoto());
		}
		
		pmsProductionActorFacade.insert(actor);

		return result;
	}

	@RequestMapping("/actor/get")
	public PmsProductionActor getActor(@RequestBody final PmsProductionActor actor) {
		PmsProductionActor result = pmsProductionActorFacade.getById(actor.getId());
		String[] photos = result.getPhoto().split(";");
		if (ValidateUtil.isValid(photos)) {
			result.setMainPhoto(photos[0]);
			result.setPhoto(result.getPhoto().substring(result.getPhoto().indexOf(";") + 1));
		}
		return result;
	}

	@RequestMapping("/actor/update")
	public BaseMsg updateActor(@RequestBody final PmsProductionActor actor) {
		BaseMsg result = new BaseMsg();
		delImg(actor.getDelImg());
		// 主图处理
		actor.setPhoto(actor.getMainPhoto() + ";" + actor.getPhoto());
		pmsProductionActorFacade.update(actor);
		return result;
	}

	@RequestMapping("/actor/delete")
	public BaseMsg deleteActor(@RequestBody final PmsProductionActor actor) {
		BaseMsg result = new BaseMsg();
		PmsProductionActor old = pmsProductionActorFacade.getById(actor.getId());
		delImg(old.getPhoto());
		pmsProductionActorFacade.deleteByIds(new long[] { actor.getId() });
		return result;
	}

	// ---------导演---------------
	@RequestMapping("/director/save")
	public BaseMsg addDirector(@RequestBody final PmsProductionDirector director, final HttpServletRequest request) {
		BaseMsg result = new BaseMsg();
		delImg(director.getDelImg());
		editCreator(director, request);
		pmsProductionDirectorFacade.insert(director);

		return result;
	}

	@RequestMapping("/director/get")
	public PmsProductionDirector getDirector(@RequestBody final PmsProductionDirector director) {
		PmsProductionDirector result = pmsProductionDirectorFacade.getById(director.getId());
		return result;
	}

	@RequestMapping("/director/update")
	public BaseMsg updateDirector(@RequestBody final PmsProductionDirector director) {
		BaseMsg result = new BaseMsg();
		delImg(director.getDelImg());
		pmsProductionDirectorFacade.update(director);
		return result;
	}

	@RequestMapping("/director/delete")
	public BaseMsg deleteDirector(@RequestBody final PmsProductionDirector director) {
		BaseMsg result = new BaseMsg();
		PmsProductionDirector old = pmsProductionDirectorFacade.getById(director.getId());
		delImg(old.getPhoto());
		pmsProductionDirectorFacade.deleteByIds(new long[] { director.getId() });
		return result;
	}

	// ---------设备---------------
	@RequestMapping("/device/save")
	public BaseMsg addDevice(@RequestBody final PmsProductionDevice device, final HttpServletRequest request) {
		BaseMsg result = new BaseMsg();
		editCreator(device, request);
		pmsProductionDeviceFacade.insert(device);

		return result;
	}

	@RequestMapping("/device/get")
	public PmsProductionDevice getDevice(@RequestBody final PmsProductionDevice device) {
		PmsProductionDevice result = pmsProductionDeviceFacade.getById(device.getId());

		return result;
	}

	@RequestMapping("/device/update")
	public BaseMsg updateDevice(@RequestBody final PmsProductionDevice device) {
		BaseMsg result = new BaseMsg();
		pmsProductionDeviceFacade.update(device);
		return result;
	}

	@RequestMapping("/device/delete")
	public BaseMsg deleteDevice(@RequestBody final PmsProductionDevice device) {
		BaseMsg result = new BaseMsg();
		pmsProductionDeviceFacade.deleteByIds(new long[] { device.getId() });
		return result;
	}

	// ---------场地---------------
	@RequestMapping("/studio/save")
	public BaseMsg addStudio(@RequestBody final PmsProductionStudio studio, final HttpServletRequest request) {
		BaseMsg result = new BaseMsg();
		delImg(studio.getDelImg());
		editCreator(studio, request);
		// 主图处理
		if(ValidateUtil.isValid(studio.getPhoto())) {
			studio.setPhoto(studio.getMainPhoto() + ";" + studio.getPhoto());
		}else {
			studio.setPhoto(studio.getMainPhoto());
		}
		pmsProductionStudioFacade.insert(studio);

		return result;
	}

	@RequestMapping("/studio/get")
	public PmsProductionStudio getStudio(@RequestBody final PmsProductionStudio studio) {
		PmsProductionStudio result = pmsProductionStudioFacade.getById(studio.getId());
		String[] photos = result.getPhoto().split(";");
		if (ValidateUtil.isValid(photos)) {
			result.setMainPhoto(photos[0]);
			result.setPhoto(result.getPhoto().substring(result.getPhoto().indexOf(";") + 1));
		}
		return result;
	}

	@RequestMapping("/studio/update")
	public BaseMsg updateStudio(@RequestBody final PmsProductionStudio studio) {
		BaseMsg result = new BaseMsg();
		delImg(studio.getDelImg());
		// 主图处理
		studio.setPhoto(studio.getMainPhoto() + ";" + studio.getPhoto());
		pmsProductionStudioFacade.update(studio);
		return result;
	}

	@RequestMapping("/studio/delete")
	public BaseMsg deleteStudio(@RequestBody final PmsProductionStudio studio) {
		BaseMsg result = new BaseMsg();
		PmsProductionStudio old = pmsProductionStudioFacade.getById(studio.getId());
		delImg(old.getPhoto());
		pmsProductionStudioFacade.deleteByIds(new long[] { studio.getId() });
		return result;
	}

	// ---------摄影师---------------
	/*
	@RequestMapping("/cameraman/save")
	public BaseMsg cameramanAdd(@RequestBody final PmsProductionCameraman cameraman, final HttpServletRequest request) {
		BaseMsg result = new BaseMsg();
		delImg(cameraman.getDelImg());
		editCreator(cameraman, request);
		// 主图处理
		cameraman.setPhoto(cameraman.getMainPhoto() + ";" + cameraman.getPhoto());
		pmsProductionCameramanFacade.insert(cameraman);

		return result;
	}

	@RequestMapping("/cameraman/get")
	public PmsProductionCameraman cameramanGet(@RequestBody final PmsProductionCameraman cameraman) {
		PmsProductionCameraman result = pmsProductionCameramanFacade.getById(cameraman.getId());
		String[] photos = result.getPhoto().split(";");
		if (ValidateUtil.isValid(photos)) {
			result.setMainPhoto(photos[0]);
			result.setPhoto(result.getPhoto().substring(result.getPhoto().indexOf(";") + 1));
		}
		return result;
	}

	@RequestMapping("/cameraman/update")
	public BaseMsg cameramanUpdate(@RequestBody final PmsProductionCameraman cameraman) {
		BaseMsg result = new BaseMsg();
		delImg(cameraman.getDelImg());
		// 主图处理
		cameraman.setPhoto(cameraman.getMainPhoto() + ";" + cameraman.getPhoto());
		pmsProductionCameramanFacade.update(cameraman);
		return result;
	}

	@RequestMapping("/cameraman/delete")
	public BaseMsg cameramanDelete(@RequestBody final PmsProductionCameraman cameraman) {
		BaseMsg result = new BaseMsg();
		PmsProductionCameraman old = pmsProductionCameramanFacade.getById(cameraman.getId());
		delImg(old.getPhoto());
		pmsProductionStudioFacade.deleteByIds(new long[] { cameraman.getId() });
		return result;
	}
	*/
	// ---------其他职业人员---------------
	//前台personnel设置职业
	/*
	@RequestMapping("/personnel/save")
	public BaseMsg personnelAdd(@RequestBody final PmsProductionPersonnel personnel,final HttpServletRequest request) {
		BaseMsg result = new BaseMsg();
		if(!checkResourceType(personnel.getProfession())) {
			result.setCode(BaseMsg.ERROR);
			result.setResult("职业不存在");
			return result;
		}
		
		delImg(personnel.getDelImg());
		editCreator(personnel, request);
		// 主图处理
		personnel.setPhoto(personnel.getMainPhoto() + ";" + personnel.getPhoto());		
		pmsProductionPersonnelFacade.insert(personnel);

		return result;
	}

	@RequestMapping("/personnel/get")
	public PmsProductionPersonnel personnelGet(@RequestBody final PmsProductionPersonnel personnel) {
		PmsProductionPersonnel result = pmsProductionPersonnelFacade.getById(personnel.getId());
		String[] photos = result.getPhoto().split(";");
		if (ValidateUtil.isValid(photos)) {
			result.setMainPhoto(photos[0]);
			result.setPhoto(result.getPhoto().substring(result.getPhoto().indexOf(";") + 1));
		}
		return result;
	}

	@RequestMapping("/personnel/update")
	public BaseMsg personnelUpdate(@RequestBody final PmsProductionPersonnel personnel) {
		BaseMsg result = new BaseMsg();
		if(!checkResourceType(personnel.getProfession())) {
			result.setCode(BaseMsg.ERROR);
			result.setResult("职业不存在");
			return result;
		}
		
		delImg(personnel.getDelImg());
		// 主图处理
		personnel.setPhoto(personnel.getMainPhoto() + ";" + personnel.getPhoto());
		pmsProductionPersonnelFacade.update(personnel);
		return result;
	}

	@RequestMapping("/personnel/delete")
	public BaseMsg personnelDelete(@RequestBody final PmsProductionPersonnel personnel) {
		BaseMsg result = new BaseMsg();
		PmsProductionPersonnel old = pmsProductionPersonnelFacade.getById(personnel.getId());
		delImg(old.getPhoto());
		pmsProductionPersonnelFacade.deleteByIds(new long[] { personnel.getId() });
		return result;
	}
*/
	private void delImg(String delImgs) {
		if (ValidateUtil.isValid(delImgs)) {
			String[] delImg = delImgs.split(";");
			for (String address : delImg) {
				FastDFSClient.deleteFile(address);
			}
		}
	}

	private void editCreator(BaseProductionEntity resource, final HttpServletRequest request) {
		SessionInfo session = this.getCurrentInfo(request);

		resource.setCreator(getCreator(request));

		String sessionType = session.getSessionType();
		if (PmsConstant.ROLE_PROVIDER.equals(sessionType)) {
			resource.setTeamId(session.getReqiureId());
		}

		// 审核中
		resource.setStatus(Integer.parseInt(ProductionConstants.statusList[0].getValue()));
	}

	private String getCreator(final HttpServletRequest request) {// TODO 根据身份组装
		SessionInfo session = this.getCurrentInfo(request);
		String sessionType = session.getSessionType();
		if (PmsConstant.ROLE_PROVIDER.equals(sessionType)) {
			return "t_" + session.getReqiureId();
		} else if (PmsConstant.ROLE_EMPLOYEE.equals(sessionType)) {
			return "e_" + session.getReqiureId();
		} else if (PmsConstant.ROLE_CUSTOMER.equals(sessionType)) {
			return "c_" + session.getReqiureId();
		}
		return "t_" + session.getReqiureId();
	}

	/*private boolean checkResourceType(String type) {
		ProductionResource resource=ProductionResource.getEnum(type);
		if(resource!=null) {
			return true;
		}
		return false;
	}*/
}
