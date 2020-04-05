package com.ecristobale.spring.boot.apirest.models.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ecristobale.spring.boot.apirest.models.entity.Cliente;
import com.ecristobale.spring.boot.apirest.models.entity.Factura;
import com.ecristobale.spring.boot.apirest.models.entity.Region;

public interface IClienteService {

	public List<Cliente> findAll();

	public Page<Cliente> findAll(Pageable pageable);
	
	public Cliente findById(Long id);
	
	public Cliente save(Cliente cliente);
	
	public void delete(Long id);
	
	public List<Region> findAllRegions();
	
	public Factura findFacturaById(Long id);
	
	public Factura save(Factura factura);
	
	public void deleteFactura(Long id);
}
