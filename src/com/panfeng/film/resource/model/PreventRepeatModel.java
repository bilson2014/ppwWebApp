package com.panfeng.film.resource.model;

import java.util.Map;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.panfeng.film.domain.BaseObject;

/**
 * 每个session 拥有一份 rtoken : this
 * 
 * @author wang
 *
 */
public class PreventRepeatModel extends BaseObject {

	private static final long serialVersionUID = 8459920504152155274L;

	private Map<String, CurrentTokenVal> runningList;

	public PreventRepeatModel() {
		super();
	}

	public Map<String, CurrentTokenVal> getRunningList() {
		return runningList;
	}

	public void setRunningList(Map<String, CurrentTokenVal> runningList) {
		this.runningList = runningList;
	}

	/**
	 * 储存当前页面运行状态
	 * 
	 * @author wang
	 *
	 */
	public class CurrentTokenVal {
		private String token;
		private ConcurrentLinkedQueue<String> urlList;
		private long st; // starttime

		public CurrentTokenVal() {
			super();
		}

		public CurrentTokenVal init(String token) {
			this.urlList = new ConcurrentLinkedQueue<String>();
			this.st = System.currentTimeMillis();
			this.token = token;
			return this;
		}

		public ConcurrentLinkedQueue<String> getUrlList() {
			return urlList;
		}

		public void setUrlList(ConcurrentLinkedQueue<String> urlList) {
			this.urlList = urlList;
		}

		public long getSt() {
			return st;
		}

		public void setSt(long st) {
			this.st = st;
		}

		public String getToken() {
			return token;
		}

		public void setToken(String token) {
			this.token = token;
		}
	}
}
