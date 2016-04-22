package com.panfeng.film.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.panfeng.film.resource.model.IndentResource;
import com.panfeng.film.service.FileStatusService;
import com.panfeng.film.service.ResourceService;
import com.panfeng.film.util.FileUtils;

@Service
public class ResourceServiceImpl implements ResourceService {
	@Autowired
	private FileStatusService fileStatusService;

	@Override
	public String getState(IndentResource indentResource) {
		String res=fileStatusService.find(
				FileUtils.getRedisKey(indentResource),
				Long.toString(indentResource.getIrId()));
		return res;
	}

}
