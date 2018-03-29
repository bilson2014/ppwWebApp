package com.panfeng.film.resource.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * 专题页处理
 *
 */
@RestController
public class SpecialController {

	@RequestMapping("/special/{page}.html")
	public ModelAndView specialPage(@PathVariable("page") final String page,final HttpServletRequest request) {

		return new ModelAndView("/salesman/special/"+page);
	}
	
	@RequestMapping("/special")
	public ModelAndView indexPage(final HttpServletRequest request) {

		return new ModelAndView("/salesman/special/index");
	}
}
