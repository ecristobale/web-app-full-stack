package com.ecristobale.spring.boot.apirest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecristobale.spring.boot.apirest.models.entity.Cliente;
import com.ecristobale.spring.boot.apirest.models.services.IClienteService;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class ClienteRestController {

	@Autowired
	IClienteService clienteService;
	
	@GetMapping("/clientes")
	public List<Cliente> index() {
		return clienteService.findAll();
	}
}
