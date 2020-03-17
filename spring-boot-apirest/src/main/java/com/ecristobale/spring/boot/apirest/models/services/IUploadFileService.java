package com.ecristobale.spring.boot.apirest.models.services;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface IUploadFileService {

	public Resource loadFile(String filename) throws MalformedURLException;
	public String uploadFile(MultipartFile file) throws IOException;
	public boolean deleteFile(String filename);
	public Path getPath(String filename);
}
