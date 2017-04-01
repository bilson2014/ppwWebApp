package com.panfeng.film.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.JsonObject;
import com.panfeng.film.service.KindeditorService;
import com.panfeng.film.util.Constants;
import com.panfeng.film.util.VerifyFileUtils;

@Service
public class KindeditorServiceImpl implements KindeditorService {

	@Override
	public String getImageUrl(String filename) {
		//return SAVE_URL + filename;
		return filename;
	}

	@Override
	public String verifyImage(MultipartFile multipartFile, String type) {
		return VerifyFileUtils.verifyFile(multipartFile, type);
	}

	@Override
	public String createMsg(String message, int state) {
		JsonObject jo = new JsonObject();
		jo.addProperty("error", state);
		if (state == Constants.MSG_FAIL)
			jo.addProperty("message", message);
		else
			jo.addProperty("url", message);

		return jo.toString();
	}

}
