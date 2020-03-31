package com.ecristobale.spring.boot.apirest.models.services;

import com.ecristobale.spring.boot.apirest.models.entity.Usuario;

public interface IUsuarioService {

	public Usuario findByUsername(String username);
}
