package com.panfeng.film.util;


import com.paipianwang.pat.common.entity.BaseEntity;
/**
 * mail模板
 */
public class Mail extends BaseEntity{

	private static final long serialVersionUID = 1L;
	
	/**
     * 邮件主题
     */
	private String subject = null;
	/**
     * Email发送的内容
     */
	private String content = null;
	private String mailType = null;
	private String createTime = null;
	private String updateTime = null;
	
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getMailType() {
		return mailType;
	}
	public void setMailType(String mailType) {
		this.mailType = mailType;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}
}
