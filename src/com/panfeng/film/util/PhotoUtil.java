package com.panfeng.film.util;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.imageio.ImageIO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.panfeng.film.resource.model.PhotoCutParam;

/**
 * 图片处理 工具类
 */
public class PhotoUtil {

	public static Logger logger = LoggerFactory.getLogger("error");
	/**
	 * 图片裁剪
	 */
	public static boolean cutPhoto(final InputStream is,final PhotoCutParam param,final File file,final String extName){
		
		if(is != null && param != null){
			try {
				final BufferedImage image = ImageIO.read(is);
				
				final int x = param.getX();
				
				final int y = param.getY();
				
				final int x2 = param.getX2();
				
				final int y2 = param.getY2();
				
				final int width = param.getWidth();
				
				final int height = param.getHeight();
				
				final int originalWidth = param.getOriginalWidth();
				
				final int originalHeight = param.getOriginalHeight();
				
				if(width <=0 || height <= 0) return false;
				
				if(originalWidth <= 0 || originalHeight <= 0) return false;
				
				if(x <= 0 || x > originalWidth) return false;
				
				if(x2 <= 0 || x2 > originalWidth) return false;
				
				if(y <= 0 || y > originalHeight) return false;
				
				if(y2 <= 0 || y2 > originalHeight) return false;
				
				final double scale_level_x = ((double)image.getWidth()) / ((double)originalWidth);
				
				final double scale_level_y = ((double)image.getHeight()) / ((double)originalHeight);
				
				final int adjusted_x = (int) (x * scale_level_x);
				
				final int adjusted_y = (int) (y * scale_level_y);
				
				final int adjusted_width = (int) (width * scale_level_x);
				
				final int adjusted_height = (int) (height * scale_level_y);
				
				final BufferedImage croppedImage = image.getSubimage(adjusted_x, adjusted_y, adjusted_width, adjusted_height);
				
				final ByteArrayOutputStream cropped_os = new ByteArrayOutputStream();
				
				ImageIO.write(croppedImage, extName, cropped_os);
				
				final InputStream cropped_is = new ByteArrayInputStream(cropped_os.toByteArray());
				
				final OutputStream os = new FileOutputStream(file);
				
				int bytesRead = 0;
				
				byte[] buffer = new byte[1024];
				
				while ((bytesRead = cropped_is.read(buffer, 0, 1024)) != -1) {
					os.write(buffer, 0, bytesRead);
				}
				
				os.close();
				
				cropped_is.close();
				
				cropped_os.close();
				
				is.close();
				
			} catch (IOException e) {
				logger.error("image cutting error ...");
				e.printStackTrace();
			}
			
		}else{
			logger.error("photo inputStream is null ...");
			return false;
		}
		return true;
	}
}
