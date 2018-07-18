package com.livestreaming.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

import com.livestreaming.properties.OAuthProperties;


@Configuration
@PropertySource(value="classpath:oauthconfig.properties")
public class OauthConfiguration {

	@Autowired
	private Environment environment;

	
	@Bean
	public OAuthProperties appProperties() {
		OAuthProperties bean = new OAuthProperties();
	
		bean.setConsumerKey(environment.getProperty("oauth.consumer.key"));
		bean.setConsumerSecret(environment.getProperty("oauth.consumer.secret"));
		bean.setAccessToken(environment.getProperty("oauth.access.token"));
		bean.setAccessSecret(environment.getProperty("oauth.access.secret"));
		return bean;
	}
	
}
