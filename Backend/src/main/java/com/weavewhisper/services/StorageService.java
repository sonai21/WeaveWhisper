package com.weavewhisper.services;

import org.springframework.web.multipart.MultipartFile;

import com.weavewhisper.dtos.ApiResponse;

public interface StorageService {
	ApiResponse uploadFile(MultipartFile file);
	byte[] downloadFile(String fileName);
	ApiResponse deleteFile(String fileName);
}
