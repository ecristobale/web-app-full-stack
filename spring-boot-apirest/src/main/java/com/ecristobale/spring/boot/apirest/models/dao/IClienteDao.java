package com.ecristobale.spring.boot.apirest.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.ecristobale.spring.boot.apirest.models.entity.Cliente;

public interface IClienteDao extends CrudRepository<Cliente, Long> {

}
