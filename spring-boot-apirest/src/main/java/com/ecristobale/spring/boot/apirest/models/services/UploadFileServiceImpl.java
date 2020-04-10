package com.ecristobale.spring.boot.apirest.models.services;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ecristobale.spring.boot.apirest.models.dao.IImgPerfilDao;
import com.ecristobale.spring.boot.apirest.models.entity.ImgPerfil;

@Service
public class UploadFileServiceImpl implements IUploadFileService {
	
	@Autowired
	private IImgPerfilDao imgPerfilDao;
	
//	private static final String PATH_UPLOADS = "uploads";
	private final Logger log = LoggerFactory.getLogger(UploadFileServiceImpl.class);

//	Load file (DB storage) 
	@Override
	public ImgPerfil loadFile(String filename) throws MalformedURLException {
		return imgPerfilDao.findByFilename(filename);
	}

	@Override
	public Resource loadFileDefaultImage(String filename) throws MalformedURLException {
		Path filePath = Paths.get("src/main/resources/static/images").resolve("not-photo.png").toAbsolutePath();
		Resource resource = new UrlResource(filePath.toUri());
		log.error("Error al cargar la imagen: " + filename);
		return resource;
	}

//	Upload file (DB storage)
	@Override
	@Transactional
	public String uploadFile(MultipartFile file) throws IOException {
		String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename().replace(" ", "");
		ImgPerfil imgPerfil = new ImgPerfil();
		imgPerfil.setFilename(filename);
		imgPerfil.setImg(file.getBytes());
		imgPerfil.setFileType(file.getContentType());
		imgPerfilDao.save(imgPerfil);
		log.info(filename);
		return filename;
	}

	@Override
	@Transactional
	public boolean deleteFile(String oldFilename) {
		if(oldFilename != null && oldFilename.length() > 0) {
			Long deleted = imgPerfilDao.deleteByFilename(oldFilename);
			return deleted == 1;
		}
		return false;
	}

//	Upload file (folder storage) 
//	@Override
//	public String uploadFile(MultipartFile file) throws IOException {
//		String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename().replace(" ", "");
//		Path filePath = getPath(filename);
//		log.info(filePath.toString());
//		Files.copy(file.getInputStream(), filePath);
//		return filename;
//	}

//	Load file (folder storage) 
//	@Override
//	public Resource loadFile(String filename) throws MalformedURLException {
//		Path filePath = getPath(filename);
//		log.info(filePath.toString());
//		Resource resource = new UrlResource(filePath.toUri());
//
//		if(!resource.exists() && !resource.isReadable()) {
//			filePath = Paths.get("src/main/resources/static/images").resolve("not-photo.png").toAbsolutePath();
//
//			resource = new UrlResource(filePath.toUri());
//
//			log.error("Error al cargar la imagen: " + filename);
//		}
//		return resource;
//	}

//	Delete file (folder storage)
//	@Override
//	public boolean deleteFile(String oldFilename) {
//		if(oldFilename != null && oldFilename.length() > 0) {
//			Path oldFilePath = Paths.get("uploads").resolve(oldFilename).toAbsolutePath();
//			File oldPhotoFile = oldFilePath.toFile();
//			if(oldPhotoFile.exists() && oldPhotoFile.canRead()) {
//				oldPhotoFile.delete();
//				return true;
//			}
//		}
//		return false;
//	}

//	@Override
//	public Path getPath(String filename) {
//		// Relative path, for absolute: C://Temp//uploads .. \\opt\\uploads
//		return Paths.get(PATH_UPLOADS).resolve(filename).toAbsolutePath();
//	}

}
