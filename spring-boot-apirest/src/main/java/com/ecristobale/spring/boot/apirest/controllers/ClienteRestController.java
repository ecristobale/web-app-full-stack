package com.ecristobale.spring.boot.apirest.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
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
	
	@GetMapping("/clientes/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {
		Cliente cliente = null;
		Map<String, Object> response = new HashMap<>();
		try {
			cliente = clienteService.findById(id);
		} catch(DataAccessException dae) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos.");
			response.put("error", dae.getMessage().concat(": ").concat(dae.getMostSpecificCause().getMessage()));
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(cliente == null) {
			response.put("mensaje", "El cliente ID: ".concat(id.toString())
					.concat(" no existe en la base de datos."));
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(cliente, HttpStatus.OK);
	}
	
	@PostMapping("/clientes")
	public ResponseEntity<?> create(@RequestBody Cliente cliente) {
		Cliente newCliente = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			newCliente = clienteService.save(cliente);
		} catch(DataAccessException dae) {
			response.put("mensaje", "Error al realizar la inserción en la base de datos.");
			response.put("error", dae.getMessage().concat(": ").concat(dae.getMostSpecificCause().getMessage()));
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("mensaje", "El cliente ha sido creado con éxito");
		response.put("cliente", newCliente);
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}
	
	@PutMapping("/clientes/{id}")
	public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Cliente cliente) {
		Cliente clienteActual = clienteService.findById(id);
		Cliente clienteUpdated = null;
		Map<String, Object> response = new HashMap<>();
		
		if(clienteActual == null) {
			response.put("mensaje", "Error al actualizar. El cliente ID: ".concat(id.toString())
					.concat(" no existe en la base de datos."));
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		}
		
		try {
			clienteActual.setNombre(cliente.getNombre());
			clienteActual.setApellido(cliente.getApellido());
			clienteActual.setEmail(cliente.getEmail());
			clienteActual.setCreatedAt(cliente.getCreatedAt());
			
			clienteUpdated = clienteService.save(clienteActual);
		} catch(DataAccessException dae) {
			response.put("mensaje", "Error al actualizar en la base de datos.");
			response.put("error", dae.getMessage().concat(": ").concat(dae.getMostSpecificCause().getMessage()));
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("mensaje", "El cliente ha sido actualizado con éxito");
		response.put("cliente", clienteUpdated);
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/clientes/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		clienteService.delete(id);
	}
}
