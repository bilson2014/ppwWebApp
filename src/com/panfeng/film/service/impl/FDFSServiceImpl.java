package com.panfeng.film.service.impl;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.panfeng.film.service.FDFSService;
import com.panfeng.film.util.FastDFSClient;
@Service
public class FDFSServiceImpl implements FDFSService {

	@Override
	public String upload(final File file, final String fileName) {
		
		final String fileId = FastDFSClient.uploadFile(file, fileName);
		return fileId;
	}
	@Override
	public String upload(MultipartFile file) {
		final String fileId = FastDFSClient.uploadFile(file);
		return fileId;
	}
	@Override
	public void download(final String fileId, final String destFilePath) throws IOException {
		
		final InputStream stream = FastDFSClient.downloadFile(fileId);
		final File destFile = new File(destFilePath);
		FileUtils.copyInputStreamToFile(stream, destFile);
	}

	@Override
	public int delete(final String fileId) {
		
		final int result = FastDFSClient.deleteFile(fileId);
		return result;
	}

	

}
