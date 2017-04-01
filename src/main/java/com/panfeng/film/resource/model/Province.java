package com.panfeng.film.resource.model;

import com.paipianwang.pat.common.entity.BaseEntity;
/**
 * 级联“省”
 * @author wang
 *
 */
public class Province extends BaseEntity {

	private static final long serialVersionUID = -9199573140181925699L;

	private String provinceID; // 省ID
	private String provinceName;// 省名

	public String getProvinceID() {
		return provinceID;
	}

	public void setProvinceID(String provinceID) {
		this.provinceID = provinceID;
	}

	public String getProvinceName() {
		return provinceName;
	}

	public void setProvinceName(String provinceName) {
		this.provinceName = provinceName;
	}

}
