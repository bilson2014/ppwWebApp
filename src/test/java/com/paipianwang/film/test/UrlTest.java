package com.paipianwang.film.test;

import org.junit.Test;

public class UrlTest {
	
	@Test
	public void test() {
		String dest = "“”额外热“”";
		dest = dest.replaceAll("“+", "\"").replaceAll("”+", "\"");
		System.err.println(dest);
	}
}
