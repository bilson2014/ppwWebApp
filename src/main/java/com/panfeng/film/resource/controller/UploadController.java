package com.panfeng.film.resource.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.paipianwang.pat.common.config.PublicConfig;
import com.paipianwang.pat.common.web.file.FastDFSClient;
import com.panfeng.film.domain.BaseMsg;
import com.panfeng.film.util.FileUtils;


/**
 *文件上传
 */
@RestController
public class UploadController {
	
	@RequestMapping("/web/upload")
	public BaseMsg getAllProvince(HttpServletRequest request,MultipartFile file,String oldUrl) {
		// 检测视频是否大于限制
		final BaseMsg msg = checkFile(file,1024l);
		if (0 == msg.getCode()) {
			String fileId = FastDFSClient.uploadFile(file);
			//删除旧地址
			if(StringUtils.isNotBlank(oldUrl)){
				FastDFSClient.deleteFile(oldUrl);
			}
			msg.setResult(fileId);
		} 
		return msg;
	}
	
	public BaseMsg checkFile(final MultipartFile file,Long img_MaxSize) {
		if (file != null && !file.isEmpty()) {
			if(img_MaxSize==null) {
				img_MaxSize = Long.parseLong(PublicConfig.PRODUCT_IMAGE_MAX_SIZE);
			}
			
			final long video_MaxSize = Long.parseLong(PublicConfig.VIDEO_MAX_SIZE);

			// 检测文件类型
			final String extName = FileUtils.getExtName(file.getOriginalFilename(), ".");
			final short fileType = FileUtils.divideIntoGroup(extName, PublicConfig.ALLOW_IMAGE_TYPE, PublicConfig.ALLOW_VIDEO_TYPE);
			final long fileSize = file.getSize();
			switch (fileType) {
			case 0: // video
				// 检查视频大小
				if (fileSize > video_MaxSize * 1024 * 1024) {
					// 视频文件超过500M上限
					return new BaseMsg(1, "视频文件超过500M上限");
				}
				break;
			case 1: // image
				// 检查图片大小
				if (fileSize > img_MaxSize * 1024) {
					// 图片文件超过250K上限
					return new BaseMsg(2, "图片文件超过上限");
				}
				break;
			case 2: // other
				throw new RuntimeException("file type error ...");
			}
			return new BaseMsg(0, "齐活");
		}
		return new BaseMsg(3, "文件不存在");
	}
	
	@RequestMapping(value = "/web/multipUpload", method = RequestMethod.POST, produces = "text/html;charset=UTF-8")
	public BaseMsg uploadFiles(final HttpServletRequest request, final HttpServletResponse response) {
		response.setContentType("text/html;charset=UTF-8");
		BaseMsg result=new BaseMsg();
		
		MultipartHttpServletRequest multipartRquest = (MultipartHttpServletRequest) request;
		Map<String, MultipartFile> fileMap = multipartRquest.getFileMap();
		
		result.setCode(0);
		for (final Map.Entry<String, MultipartFile> entity : fileMap.entrySet()) {
			final MultipartFile file = entity.getValue();
			if(!file.isEmpty()) {
				//result.setMessage(FastDFSClient.uploadFile(file));
				result.setResult(result.getResult()+file.getOriginalFilename()+";");
			}
		}
		return result;
	}
}