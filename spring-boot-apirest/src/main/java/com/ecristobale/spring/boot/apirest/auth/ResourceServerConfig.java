package com.ecristobale.spring.boot.apirest.auth;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

//Serves the requested page after token validation
@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter{
		
	// Security rules of our resources endpoints
	@Override
	public void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers(HttpMethod.GET, "/api/clientes", "/api/clientes/page/**", "/api/uploads/img/**").permitAll() // public route
//			.antMatchers(HttpMethod.GET, "/api/clientes/{id}").hasAnyRole("ADMIN", "USER")
//			.antMatchers(HttpMethod.POST, "/api/clientes/upload").hasAnyRole("ADMIN", "USER")
//			.antMatchers(HttpMethod.POST, "/api/clientes").hasRole("ADMIN")
//			.antMatchers("/api/clientes/**").hasRole("ADMIN")
			.antMatchers("/h2-console/**").permitAll()
			.anyRequest().authenticated() // all other urls can be access by any authenticated role
			.and().headers().frameOptions().sameOrigin(); //allow use of frame to same origin urls. routes need authentication
	}
	
}
