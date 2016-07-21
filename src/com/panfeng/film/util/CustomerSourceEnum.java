package com.panfeng.film.util;

public enum CustomerSourceEnum {
	QUDAO("渠道", 1), TUIGUANG("推广", 2), ZIZHUYANFA("自主开发", 3), HUIDONG("活动", 4), TUIJIAN("推荐", 5);

	private String name;
	private int index;

	private CustomerSourceEnum(String name, int index) {
		this.name = name;
		this.index = index;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

}
