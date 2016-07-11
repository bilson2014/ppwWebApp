package com.panfeng.film.service;

import javax.servlet.http.HttpServletRequest;

import com.panfeng.film.resource.model.Team;

public interface ProviderThirdLogin {
	boolean login(Team team, HttpServletRequest request);
}
