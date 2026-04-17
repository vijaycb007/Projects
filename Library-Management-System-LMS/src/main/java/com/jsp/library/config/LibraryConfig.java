package com.jsp.library.config;

import javax.persistence.EntityManager;
import javax.persistence.Persistence;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@Configuration
@ComponentScan(basePackages = "com.jsp.library")
public class LibraryConfig {
	@Bean
	public RequestMappingHandlerMapping createHandlerMapping() {
		return new RequestMappingHandlerMapping();
	}
	
	@Bean
	public InternalResourceViewResolver createViewResolver() {
		return new InternalResourceViewResolver("/WEB-INF/views/",".jsp");
	}
	
	@Bean
	public EntityManager createEntityManager() {
		return Persistence.createEntityManagerFactory("vijay").createEntityManager();
	}
}
