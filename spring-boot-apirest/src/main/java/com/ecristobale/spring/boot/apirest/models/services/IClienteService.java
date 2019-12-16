package com.ecristobale.spring.boot.apirest.models.services;

import java.util.List;

import com.ecristobale.spring.boot.apirest.models.entity.Cliente;

public interface IClienteService {

	public List<Cliente> findAll();
}
