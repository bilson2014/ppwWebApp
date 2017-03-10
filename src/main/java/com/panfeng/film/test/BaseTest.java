package com.panfeng.film.test;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext.xml"})
public abstract class BaseTest{
	

	@Test
	public void test() throws UnsupportedEncodingException{
		final String url = "www.apaipian.com:8080/provider/portal";
		final String encodeUrl = URLEncoder.encode(url, "UTF-8");
		System.err.println(encodeUrl);
	}
	
	
}
