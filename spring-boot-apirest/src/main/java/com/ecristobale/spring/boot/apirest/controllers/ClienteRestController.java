package com.ecristobale.spring.boot.apirest.controllers;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ecristobale.spring.boot.apirest.models.entity.Cliente;
import com.ecristobale.spring.boot.apirest.models.services.IClienteService;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class ClienteRestController {

	@Autowired
	IClienteService clienteService;
	
	private final Logger log = LoggerFactory.getLogger(ClienteRestController.class);
	
	@GetMapping("/clientes")
	public List<Cliente> index() {
		return clienteService.findAll();
	}
	
	@GetMapping("/clientes/page/{page}")
	public Page<Cliente> index(@PathVariable Integer page) {
		return clienteService.findAll(PageRequest.of(page, 4));
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
	public ResponseEntity<?> create(@Valid @RequestBody Cliente cliente, BindingResult result) {
		Cliente newCliente = null;
		Map<String, Object> response = new HashMap<>();
		
		if(result.hasErrors()) {
			List<String> errors = result.getFieldErrors().stream()
					.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage()
					).collect(Collectors.toList());
			
			response.put("errors", errors);
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}
		
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
	public ResponseEntity<?> update(@Valid @PathVariable Long id, @RequestBody Cliente cliente,
			BindingResult result) {
		Cliente clienteActual = clienteService.findById(id);
		Cliente clienteUpdated = null;
		Map<String, Object> response = new HashMap<>();
		
		if(result.hasErrors()) {
			List<String> errors = result.getFieldErrors().stream()
					.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage()
					).collect(Collectors.toList());
			
			response.put("errors", errors);
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}
		
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
	public ResponseEntity<?> delete(@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();
		
		try{
			Cliente cliente = clienteService.findById(id);
			deletePreviousPhoto(cliente);
			clienteService.delete(id);
		} catch(DataAccessException dae) {
			response.put("mensaje", "Error al eliminar en la base de datos.");
			response.put("error", dae.getMessage().concat(": ").concat(dae.getMostSpecificCause().getMessage()));
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "El cliente se eliminó con éxito");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@PostMapping("/clientes/upload")
	public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file, @RequestParam("id") Long id){
		Map<String, Object> response = new HashMap<>();
		Cliente cliente = clienteService.findById(id);
		if(!file.isEmpty()) {
			String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename().replace(" ", "");
			// filePath: is relative path, for absolute: C://Temp//uploads .. \\opt\\uploads
			Path filePath = Paths.get("uploads").resolve(filename).toAbsolutePath();
			log.info(filePath.toString());
			try {
				Files.copy(file.getInputStream(), filePath);
			} catch (IOException e) {
				response.put("mensaje", "Error al subir la imagen: " + filename);
				response.put("error", e.getMessage().concat(": ").concat(e.getCause().getMessage()));
				return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			
			deletePreviousPhoto(cliente);
			
			cliente.setPhoto(filename);
			clienteService.save(cliente);
			
			response.put("cliente", cliente);
			response.put("mensaje", "Has subido correctamente la imagen: " + filename);
		}
		
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}
	
	@GetMapping("/uploads/img/{filename:.+}")
	public ResponseEntity<Resource> showPhoto(@PathVariable String filename) {
		Path filePath = Paths.get("uploads").resolve(filename).toAbsolutePath();
		log.info(filePath.toString());
		Resource resource = null;
		try {
			resource = new UrlResource(filePath.toUri());
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		if(!resource.exists() && !resource.isReadable()) {
			throw new RuntimeException("Error al cargar la imagen: " + filename);
		}
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"");
		return new ResponseEntity<>(resource, headers, HttpStatus.OK);
	}

	private void deletePreviousPhoto(Cliente cliente) {
		String oldFilename = cliente.getPhoto();
		if(oldFilename != null && oldFilename.length() > 0) {
			Path oldFilePath = Paths.get("uploads").resolve(oldFilename).toAbsolutePath();
			File oldPhotoFile = oldFilePath.toFile();
			if(oldPhotoFile.exists() && oldPhotoFile.canRead()) oldPhotoFile.delete();
		}
	}
}
