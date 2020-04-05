package com.ecristobale.spring.boot.apirest.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.ecristobale.spring.boot.apirest.models.entity.Factura;

public interface IFacturaDao extends CrudRepository<Factura, Long> {

}
