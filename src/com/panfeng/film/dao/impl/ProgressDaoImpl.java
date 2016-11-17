package com.panfeng.film.dao.impl;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.panfeng.film.dao.ProgressDao;
import com.panfeng.film.domain.GlobalConstant;
import com.panfeng.film.util.DataUtil;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.Transaction;

@Repository
public class ProgressDaoImpl implements ProgressDao {

	@Autowired
	private final JedisPool pool = null;
	
	public void updateProgress(String progress, HttpServletRequest request) {
		
		Jedis jedis = null;
		try {
			final String sessionId = request.getSession().getId();
			jedis = pool.getResource();
			Transaction tx = jedis.multi();
			tx.hset(DataUtil.md5(sessionId), GlobalConstant.PROCESS_STATUS, progress);
			tx.exec();
		} catch (Exception e) {
			// do something for logger
		} finally {
			if(jedis != null){
				jedis.disconnect();
				jedis.close();
			}
		}
		
	}

	public String getProgress(final HttpServletRequest request) {
		Jedis jedis = null;
		try {
			final String sessionId = request.getSession().getId();
			jedis = pool.getResource();
			return jedis.hget(DataUtil.md5(sessionId), GlobalConstant.PROCESS_STATUS);
		} catch (Exception e) {
			// do something for logger
		} finally {
			if(jedis != null){
				jedis.disconnect();
				jedis.close();
			}
		}
		
		return null;
	}
	
	
}
