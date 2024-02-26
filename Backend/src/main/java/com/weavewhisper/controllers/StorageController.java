package com.weavewhisper.controllers;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.weavewhisper.dtos.ApiResponse;
import com.weavewhisper.services.StorageService;

@RestController
@RequestMapping("/api/storage")
public class StorageController {

	@Autowired
	private StorageService storageService;

	@PostMapping("/upload")
	public ResponseEntity<?> uploadFile(@RequestParam(value = "file") MultipartFile file) {
		ApiResponse apiRes = storageService.uploadFile(file);
		return ResponseEntity.status(HttpStatus.OK).body(apiRes);
	}

	@GetMapping("/view/{fileName}")
	public ResponseEntity<?> downloadFile(@PathVariable String fileName) {

		byte[] data = storageService.downloadFile(fileName);
		ByteArrayResource resource = new ByteArrayResource(data);
		return ResponseEntity.ok().contentLength(data.length).header("Content-type", "image/jpeg")
				.header("Content-disposition", "inline; filename=\"" + fileName + "\"").body(resource);
	}

	@DeleteMapping("/delete/{fileName}")
	public ResponseEntity<?> deleteFile(@PathVariable String fileName) {
		ApiResponse apiRes = storageService.deleteFile(fileName);

		return ResponseEntity.status(HttpStatus.OK).body(apiRes);
	}
}
