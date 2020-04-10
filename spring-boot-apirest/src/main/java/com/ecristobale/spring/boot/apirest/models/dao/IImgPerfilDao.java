package com.ecristobale.spring.boot.apirest.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecristobale.spring.boot.apirest.models.entity.ImgPerfil;

public interface IImgPerfilDao extends JpaRepository<ImgPerfil, Long> {
	
	Long deleteByFilename(String filename);
	
	ImgPerfil findByFilename(String filename);
}
