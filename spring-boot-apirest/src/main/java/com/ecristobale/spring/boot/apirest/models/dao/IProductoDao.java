package com.ecristobale.spring.boot.apirest.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.ecristobale.spring.boot.apirest.models.entity.Producto;

public interface IProductoDao extends CrudRepository<Producto, Long> {

//	@Query("select p from Producto p where p.nombre like %?1%")
//	public List<Producto> findByNombre(String term);

//	public List<Producto> findByNombreStartingWithIgnoreCase(String term);

	public List<Producto> findByNombreContainingIgnoreCase(String term);
}
