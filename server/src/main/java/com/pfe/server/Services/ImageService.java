package com.pfe.server.Services;

import com.pfe.server.Models.Image;
import com.pfe.server.Repositories.ImageRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@AllArgsConstructor
public class ImageService {
    @Autowired
    private final ImageRepository imageRepository;

    @Autowired
    private final AzureBlobStorageService azureBlobStorageService;

    public String uploadImage(MultipartFile file) throws IOException {
        return azureBlobStorageService.uploadImage(file);
    }

    public void deleteImage(String imageUrl) {
        azureBlobStorageService.deleteImage(imageUrl);
    }

    public String getDefaultImage() {
        return azureBlobStorageService.getDefaultImage();
    }




}
