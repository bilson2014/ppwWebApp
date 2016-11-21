package com.panfeng.film.service.impl;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;

import com.panfeng.film.resource.model.CostCalculate;
import com.panfeng.film.service.CostCalculateService;

@Service
public class CostCalculateServiceImpl implements CostCalculateService{

	@Override
	public int dealCost(int[][] typeAddTeam, CostCalculate calculate) {
		int videoType = calculate.getVideoType();
		int team = calculate.getTeam();
		int equipment = calculate.getEquipment();
		int actor = calculate.getActor();
		int animation = calculate.getAnimation();
		int time = calculate.getTime();
		int total = 0;
		total += typeAddTeam[videoType][team];
		switch (equipment) {
		case 1:
			total += 10000;
			break;
		case 2:
			total += 20000;
			break;
		}
		switch (actor) {
		case 2:
			total += 5000;
			break;
		case 3:
			total += 10000;
			break;
		}
		switch (animation) {
		case 1:
			total += 30000;
			break;
		case 2:
			total += 20000;
			break;
		case 3:
			total += 10000;
			break;
		}
		
		switch (time) {
		case 1:
			BigDecimal bTotal = new BigDecimal(Integer.valueOf(total));
			BigDecimal cheng = new BigDecimal(Double.valueOf(1.3));
			total = bTotal.multiply(cheng).intValue();
			break;
		case 2:
			bTotal = new BigDecimal(Integer.valueOf(total));
			cheng = new BigDecimal(Double.valueOf(1.5));
			total = bTotal.multiply(cheng).intValue();
			break;
		}
		return total;
	}

}
