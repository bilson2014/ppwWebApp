package com.panfeng.film.resource.controller;

import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.panfeng.film.resource.model.Leader;

@RestController
public class LeaderController {

	@RequestMapping(value = "/infoStepOne", method = { RequestMethod.GET })
	public ModelAndView leaderOne(ModelMap model) {
		Leader leader = new Leader();
		leader.setTeamName("");
		leader.setTeamNature(0);
		leader.setAddress("");
		leader.setBusiness("");
		leader.setCertificateUrl("");
		leader.setEstablishDate("");
		leader.setIdCardbackUrl("");
		leader.setIdCardfrontUrl("");
		leader.setOfficialSite("");
		leader.setScale("");
		leader.setSkill("");
		leader.setTeamCity("");
		leader.setTeamDescription("");
		leader.setTeamPhotoUrl("");
		leader.setTeamProvince("");;
		model.addAttribute("leader", leader);
		return new ModelAndView("providerFlow/infoStepOne", model);
	}
	
	@RequestMapping(value = "/infoStepTwo", method = { RequestMethod.GET })
	public ModelAndView leaderTwo(ModelMap model) {
		Leader leader = new Leader();
		leader.setEmail("");
		leader.setLinkman("");
		leader.setPhoneNumber("");
		leader.setQq("");
		leader.setWebchat("");
		model.addAttribute("leader", leader);
		return new ModelAndView("providerFlow/infoStepTwo", model);
	}
}