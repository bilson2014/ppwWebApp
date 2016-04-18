package com.panfeng.film.resource.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.panfeng.film.resource.model.Progress;
import com.panfeng.film.service.ProgressService;

@RestController
public class ProgressController extends BaseController {
	
	@Autowired
	private final ProgressService service = null;
	
	@RequestMapping(value = "/upfile/progress", method = RequestMethod.POST )
	public String progress(final HttpServletRequest request,final HttpServletResponse response){
		//Progress pro = (Progress) request.getSession().getAttribute("status");
		//final Progress pro = getCurrentInfo(request, GlobalConstant.PROCESS_STATUS, Progress.class);
		//response.addHeader("Access-Control-Allow-Origin", "*");
		final Progress pro = service.getProgress(request);
		if(pro == null){
			Progress status = new Progress();
			return status.toString();
		}
		return pro.toString();
	}
}
