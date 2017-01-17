package com.panfeng.film.listener;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.ProgressListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.panfeng.film.resource.model.Progress;
import com.panfeng.film.service.ProgressService;

@Component
public class FileUploadProgressListener extends BaseListener implements ProgressListener  {

	private HttpServletRequest request = null;
	
	@Autowired
	private ProgressService service = null;
	
	public void setRequest(final HttpServletRequest request) {
		this.request = request;
		/*Progress status = new Progress();
		service.updateProgress(status, request);*/
	}
	
	 /*
	  * pBytesRead 到目前为止读取文件的比特数 pContentLength 文件总大小 pItems 目前正在读取第几个文件
	 */
	public void update(long pBytesRead, long pContentLength, int pItems) {
		//Progress status = (Progress) session.getAttribute("status");
		Progress status = service.getProgress(request);
		if(status != null){
			
			status.setpBytesRead(pBytesRead);
			status.setpContentLength(pContentLength);
			status.setpItems(pItems);
		}else {
			status = new Progress();
		}
		service.updateProgress(status, request);
	}

}
