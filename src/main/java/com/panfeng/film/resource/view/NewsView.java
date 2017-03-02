package com.panfeng.film.resource.view;

public class NewsView extends Pagination {

	private static final long serialVersionUID = 4923161285696056L;

	private Integer category;

	private int page;// 当前页

	private int rows;// 每页显示记录数

	public Integer getCategory() {
		return category;
	}

	public void setCategory(Integer category) {
		this.category = category;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getRows() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

}
