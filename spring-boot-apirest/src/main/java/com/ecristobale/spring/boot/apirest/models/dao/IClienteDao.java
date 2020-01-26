package com.ecristobale.spring.boot.apirest.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecristobale.spring.boot.apirest.models.entity.Cliente;

public interface IClienteDao extends JpaRepository<Cliente, Long> {

}
