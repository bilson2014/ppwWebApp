package com.panfeng.film.service;

import com.panfeng.film.resource.model.CostCalculate;

public interface CostCalculateService {

	int dealCost(int[][] typeAddTeam, int[][] typeAddEquipment, CostCalculate calculate);
	
	

}
