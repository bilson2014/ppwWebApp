package com.panfeng.film.service;

import org.springframework.web.multipart.MultipartFile;

public interface KindeditorService {

	public String getImageUrl(final String filename);

	public String verifyImage(final MultipartFile multipartFile, final String type);

	public String createMsg(final String message,final int state);
	
}
