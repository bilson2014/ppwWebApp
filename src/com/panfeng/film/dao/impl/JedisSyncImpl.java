package com.panfeng.film.dao.impl;

import org.springframework.stereotype.Service;

import com.panfeng.film.dao.JedisSync;

import redis.clients.jedis.Jedis;

/**
 * 
 * @author wang
 *
 */
@Service
public class JedisSyncImpl implements JedisSync {
	private static int KEY_TIMEOUT = 60 * 60; // one hour

	public synchronized boolean acquire(Jedis jedis, String key) {
		return acquire(jedis, key, "1", KEY_TIMEOUT);
	}

	public synchronized boolean acquire(Jedis jedis, String key, int timeout) {
		return acquire(jedis, key, "1", timeout);
	}

	public synchronized boolean acquire(Jedis jedis, String key, String value, int timeout) {
		Long res = jedis.setnx(key, value);
		if (res != null && res == 1) {
			jedis.expire(key, timeout);
			return true;
		}
		return false;
	}

	public synchronized void release(Jedis jedis, String key) {
		jedis.del(key);
	}

}
