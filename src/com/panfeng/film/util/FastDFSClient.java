package com.panfeng.film.util;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.csource.common.NameValuePair;
import org.csource.fastdfs.StorageClient1;
import org.csource.fastdfs.StorageServer;
import org.csource.fastdfs.TrackerServer;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

/**
 * FastDFS分布式文件系统操作客户端
 * @author Jack
 *
 */
public class FastDFSClient {
	private ConnectionPool pool = null;
	private static Logger logger = Logger.getLogger(FastDFSClient.class);

	private static String logId = null;
	
    /** 连接池默认最小连接数 */  
    private long minPoolSize = 10;  
    /** 连接池默认最大连接数 */  
    private long maxPoolSize = 30;  
    /** 默认等待时间（单位：秒） */  
    private long waitTimes = 200;
	
	public void init() {  
        pool = new ConnectionPool(minPoolSize, maxPoolSize, waitTimes);
    }
	
	/**
	 * 
	 * @param file
	 *            文件
	 * @param fileName
	 *            文件名
	 * @return 返回Null则为失败
	 */
	public String uploadFile(File file, String fileName) {
		FileInputStream fis = null;
		try {
			NameValuePair[] meta_list = null; // new NameValuePair[0];
			fis = new FileInputStream(file);
			byte[] file_buff = null;
			if (fis != null) {
				int len = fis.available();
				file_buff = new byte[len];
				fis.read(file_buff);
			}
			
			TrackerServer trackerServer = pool.checkout(logId);  
            StorageServer storageServer = null;
            StorageClient1 client1 = new StorageClient1(trackerServer,  
                    storageServer);
			String fileid = client1.upload_file1(file_buff, getFileExt(fileName), meta_list);
			
			return fileid;
		} catch (Exception ex) {
			logger.error(ex);
			return null;
		}finally{
			if (fis != null){
				try {
					fis.close();
				} catch (IOException e) {
					logger.error(e);
				}
			}
		}
	}
	/**
	 * 
	 * @param file
	 *            文件
	 * @param fileName
	 *            文件名
	 * @return 返回Null则为失败
	 */
	public String uploadFile(InputStream fis, String fileName) {
		try {
			if(fis != null ) {
				NameValuePair[] meta_list = null; // new NameValuePair[0];
				byte[] file_buff = null;
				if (fis != null) {
					int len = fis.available();
					file_buff = new byte[len];
					fis.read(file_buff);
				}
				
				TrackerServer trackerServer = pool.checkout(logId);  
	            StorageServer storageServer = null;
	            StorageClient1 client1 = new StorageClient1(trackerServer,  
	                    storageServer);
				String fileid = client1.upload_file1(file_buff, getFileExt(fileName), meta_list);
				return fileid;
			}
			return null;
		} catch (Exception ex) {
			logger.error(ex);
			return null;
		}finally{
			if (fis != null){
				try {
					fis.close();
				} catch (IOException e) {
					logger.error(e);
				}
			}
		}
	}
	public String uploadFile(MultipartFile file) {
		InputStream fis = null;
		try {
			fis = file.getInputStream();
			if(fis != null ) {
				NameValuePair[] meta_list = null; // new NameValuePair[0];
				byte[] file_buff = null;
				if (fis != null) {
					int len = fis.available();
					file_buff = new byte[len];
					fis.read(file_buff);
				}
				
				TrackerServer trackerServer = pool.checkout(logId);  
	            StorageServer storageServer = null;
	            StorageClient1 client1 = new StorageClient1(trackerServer,  
	                    storageServer);
				String fileid = client1.upload_file1(file_buff, getFileExt(file.getOriginalFilename()), meta_list);
				return fileid;
			}
			return null;
		} catch (Exception ex) {
			logger.error(ex);
			return null;
		}finally{
			if (fis != null){
				try {
					fis.close();
				} catch (IOException e) {
					logger.error(e);
				}
			}
		}
	}
	/**
	 * 根据组名和远程文件名来删除一个文件
	 * 
	 * @param groupName
	 *            例如 "group1" 如果不指定该值，默认为group1
	 * @param fileName
	 *            例如"M00/00/00/wKgxgk5HbLvfP86RAAAAChd9X1Y736.jpg"
	 * @return 0为成功，非0为失败，具体为错误代码
	 */
	public int deleteFile(String groupName, String fileName) {
		try {
			TrackerServer trackerServer = pool.checkout(logId);  
            StorageServer storageServer = null;
            StorageClient1 client1 = new StorageClient1(trackerServer,  
                    storageServer);
			int result = client1.delete_file(groupName == null ? "group1" : groupName, fileName);
			return result;
		} catch (Exception ex) {
			logger.error(ex);
			return 0;
		}
	}

	/**
	 * 根据fileId来删除一个文件（我们现在用的就是这样的方式，上传文件时直接将fileId保存在了数据库中）
	 * 
	 * @param fileId
	 *            file_id源码中的解释file_id the file id(including group name and filename);例如 group1/M00/00/00/ooYBAFM6MpmAHM91AAAEgdpiRC0012.xml
	 * @return 0为成功，非0为失败，具体为错误代码
	 */
	public int deleteFile(String fileId) {
		try {
			TrackerServer trackerServer = pool.checkout(logId);  
            StorageServer storageServer = null;
            StorageClient1 client1 = new StorageClient1(trackerServer,  
                    storageServer);
			int result = client1.delete_file1(fileId);
			return result;
		} catch (Exception ex) {
			logger.error(ex);
			return 0;
		}
	}

	/**
	 * 修改一个已经存在的文件
	 * 
	 * @param oldFileId
	 *            原来旧文件的fileId, file_id源码中的解释file_id the file id(including group name and filename);例如 group1/M00/00/00/ooYBAFM6MpmAHM91AAAEgdpiRC0012.xml
	 * @param file
	 *            新文件
	 * @param filePath
	 *            新文件路径
	 * @return 返回空则为失败
	 */
	public String modifyFile(String oldFileId, File file, String filePath) {
		String fileid = null;
		try {
			// 先上传
			fileid = uploadFile(file, filePath);
			if (fileid == null) {
				return null;
			}
			// 再删除
			int delResult = deleteFile(oldFileId);
			if (delResult != 0) {
				return null;
			}
		} catch (Exception ex) {
			logger.error(ex);
			return null;
		}
		return fileid;
	}

	/**
	 * 文件下载
	 * 
	 * @param fileId
	 * @return 返回一个流
	 */
	public InputStream downloadFile(String fileId) {
		try {
			TrackerServer trackerServer = pool.checkout(logId);  
            StorageServer storageServer = null;
            StorageClient1 client1 = new StorageClient1(trackerServer,  
                    storageServer);
			byte[] bytes = client1.download_file1(fileId);
			InputStream inputStream = new ByteArrayInputStream(bytes);
			return inputStream;
		} catch (Exception ex) {
			logger.error(ex);
			return null;
		}
	}
	
	/**
	 * 轮询方式获取最优的文件存储节点服务器
	 * @param fileId
	 * @return
	 */
	public String locateSource(){
		try {
			TrackerServer trackerServer = pool.checkout(logId);  
            StorageServer storageServer = null;
            StorageClient1 client1 = new StorageClient1(trackerServer,  
                    storageServer);
			String sourceIP= client1.locateServerPath1();
			return sourceIP;
		} catch (Exception ex) {
			logger.error(ex);
			return null;
		}
	}

	/**
	 * 获取文件后缀名（不带点）.
	 * 
	 * @return 如："jpg" or "".
	 */
	private String getFileExt(String fileName) {
		if (StringUtils.isBlank(fileName) || !fileName.contains(".")) {
			return "";
		} else {
			return fileName.substring(fileName.lastIndexOf(".") + 1); // 不带最后的点
		}
	}

	public long getMinPoolSize() {
		return minPoolSize;
	}

	public void setMinPoolSize(long minPoolSize) {
		if(minPoolSize != 0) {
			this.minPoolSize = minPoolSize;
		}
	}

	public long getMaxPoolSize() {
		return maxPoolSize;
	}

	public void setMaxPoolSize(long maxPoolSize) {
		if(maxPoolSize != 0) {
			this.maxPoolSize = maxPoolSize;
		}
	}

	public long getWaitTimes() {
		return waitTimes;
	}

	public void setWaitTimes(long waitTimes) {
		if(waitTimes != 0) {
			this.waitTimes = waitTimes;
		}
	}
	
}
