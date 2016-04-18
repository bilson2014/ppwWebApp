package com.panfeng.film.test;
import java.io.IOException;
import java.util.List;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.CookieStore;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultConnectionKeepAliveStrategy;
import org.apache.http.impl.client.DefaultRedirectStrategy;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.cookie.BasicClientCookie;
import org.junit.Test;

import com.panfeng.film.util.HttpUtil;


public class entitytest extends BaseTest{

	public static CloseableHttpClient httpClient = null;
	public static HttpClientContext context = null;
	public static CookieStore cookieStore = null;
	public static RequestConfig requestConfig = null;

	private  void init() {
		context = HttpClientContext.create();
		cookieStore = new BasicCookieStore();
		
		addCookie("JSESSIONID","71C66D8CB30B04C173F118990CB5AD6D","192.168.1.119","/");
		
		// 配置超时时间（连接服务端超时1秒，请求数据返回超时2秒）
		requestConfig = RequestConfig.custom().setConnectTimeout(120000)
				.setSocketTimeout(60000).setConnectionRequestTimeout(60000)
				.build();
		// 设置默认跳转以及存储cookie
		httpClient = HttpClientBuilder.create()
				.setKeepAliveStrategy(new DefaultConnectionKeepAliveStrategy())
				.setRedirectStrategy(new DefaultRedirectStrategy())
				.setDefaultRequestConfig(requestConfig)
				.setDefaultCookieStore(cookieStore).build();
		
			

			
//			context = HttpClientContext.create();
//			cookieStore = new BasicCookieStore();
//			
//			addCookie("JSESSIONID","0EC5F78D942752839C760964F94DAD90","192.168.1.119","/");
//			
//			// 配置超时时间（连接服务端超时1秒，请求数据返回超时2秒）
//			requestConfig = RequestConfig.custom().setConnectTimeout(120000)
//					.setSocketTimeout(60000).setConnectionRequestTimeout(60000)
//					.build();
//			// 设置默认跳转以及存储cookie
//			httpClient = HttpClientBuilder.create()
//					.setKeepAliveStrategy(new DefaultConnectionKeepAliveStrategy())
//					.setRedirectStrategy(new DefaultRedirectStrategy())
//					.setDefaultRequestConfig(requestConfig)
//					.setDefaultCookieStore(cookieStore).build();
			
	}
	
	public static CloseableHttpResponse get(String url) throws ClientProtocolException, IOException {  
        HttpGet httpget = new HttpGet(url);  
        CloseableHttpResponse response = httpClient.execute(httpget, context);  
        try {  
            cookieStore = context.getCookieStore();  
            List<Cookie> cookies = cookieStore.getCookies();  
            for (Cookie cookie : cookies) {  
            	System.out.println("key:" + cookie.getName() + "  value:" + cookie.getValue());
            }  
        } finally {  
            response.close();  
        }  
        return response;  
    } 
	public static void addCookie(String name, String value, String domain, String path) {  
        BasicClientCookie cookie = new BasicClientCookie(name, value);  
        cookie.setDomain(domain);  
        cookie.setPath(path);  
        cookieStore.addCookie(cookie);  
    }  
	@Test
	public void test(){
//		init();
//		try {
//			get("http://192.168.1.119:8081/index");
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
		
		HttpUtil.httpPost("http://localhost:8081/portal/product/static/listWithCondition", null,null);
	}

}
