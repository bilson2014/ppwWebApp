package com.panfeng.film.resource.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import com.paipianwang.pat.common.constant.PmsConstant;
import com.paipianwang.pat.common.web.file.FastDFSClient;
import com.panfeng.film.service.KindeditorService;

@RestController
public class KindeditorController extends BaseController {

	@Autowired
	private KindeditorService kindeditorService;

	@RequestMapping(value = "/kindeditor/uploadImage", produces = "text/html; charset=UTF-8")
	public String uploadImage(final MultipartRequest multipartRequest,
			final String dir, final String sessionId) {
		
		// 从源码得知 上传input标签名为“imgFile”
		MultipartFile multipartFile = multipartRequest.getFile("imgFile");
		// step 1.验证文件
		String result = kindeditorService.verifyImage(multipartFile, dir);
		if (!"".equals(result))
			return kindeditorService.createMsg(result, PmsConstant.MSG_FAIL);
		// step 2.保存文件
		result = FastDFSClient.uploadFile(multipartFile);
		if (PmsConstant.FAIL.equals(result))
			return kindeditorService.createMsg("保存文件失败。", PmsConstant.MSG_FAIL);
		// step 3.生成图片URL
		result = kindeditorService.getImageUrl(result);
		return kindeditorService.createMsg(result, PmsConstant.MSG_SUCCESS);
	}
}
