package com.panfeng.film.domain;

import java.io.Serializable;

import org.joda.time.LocalDate;
import org.joda.time.LocalTime;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.paipianwang.pat.common.entity.json.LocalDateDeserializer;
import com.paipianwang.pat.common.entity.json.LocalDateSerializer;
import com.paipianwang.pat.common.entity.json.LocalTimeDeserializer;
import com.paipianwang.pat.common.entity.json.LocalTimeSerializer;

public abstract class BaseObject implements Serializable{

	private static final long serialVersionUID = -6136604804861783042L;
	
	public String toString() {
		final GsonBuilder builder = new GsonBuilder();
		builder.registerTypeAdapter(LocalDate.class, new LocalDateSerializer());
		builder.registerTypeAdapter(LocalTime.class, new LocalTimeSerializer());
		final Gson gson = builder.create();
		return gson.toJson(this);
	}

	public <T> T fromString(final String json, final Class<T> T) {
		final GsonBuilder builder = new GsonBuilder();
		builder.registerTypeAdapter(LocalDate.class, new LocalDateDeserializer());
		builder.registerTypeAdapter(LocalTime.class, new LocalTimeDeserializer());
		final Gson gson = builder.create();
		return gson.fromJson(json, T);
	}

}
