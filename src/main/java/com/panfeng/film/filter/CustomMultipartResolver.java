package com.panfeng.film.filter;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUpload;
import org.apache.commons.fileupload.FileUploadBase;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.panfeng.film.listener.FileUploadProgressListener;

public class CustomMultipartResolver extends CommonsMultipartResolver {

	@Autowired
	private FileUploadProgressListener progressListener = null;
	
	public void setFileUploadProgressListener(final FileUploadProgressListener progressListener){
		this.progressListener=progressListener;
	}
	
	public MultipartParsingResult parseRequest(final HttpServletRequest request)
			throws MultipartException {
		String encoding = determineEncoding(request);
		FileUpload fileUpload = prepareFileUpload(encoding);
		progressListener.setRequest(request);
		fileUpload.setProgressListener(progressListener);
		try {
			@SuppressWarnings("unchecked")
			List<FileItem> fileItems = ((ServletFileUpload) fileUpload).parseRequest(request);
			return parseFileItems(fileItems, encoding);
		}
		catch (FileUploadBase.SizeLimitExceededException ex) {
			throw new MaxUploadSizeExceededException(fileUpload.getSizeMax(), ex);
		}
		catch (FileUploadException ex) {
			throw new MultipartException("Could not parse multipart servlet request", ex);
		}
	}
}
