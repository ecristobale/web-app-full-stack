package com.ecristobale.spring.boot.apirest.auth;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;

import com.ecristobale.spring.boot.apirest.models.entity.Usuario;
import com.ecristobale.spring.boot.apirest.models.services.IUsuarioService;

@Component
public class TokenAditionalInfo implements TokenEnhancer {

	@Autowired
	IUsuarioService usuarioService;
	
	@Override
	public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
		Usuario usuario = usuarioService.findByUsername(authentication.getName());
		
		Map<String, Object> info = new HashMap<>();
		info.put("aditional_info", "user: " + authentication.getName());
		info.put("user", usuario.getId() + ": " + usuario.getUsername());
		
		((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(info);
		return accessToken;
	}

}
