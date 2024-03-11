package com.pfe.server.Services;

import com.azure.core.credential.AzureNamedKeyCredential;
import com.azure.core.util.BinaryData;
import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Objects;
import java.util.UUID;

@Service
public class AzureBlobStorageService {

    @Value("${spring.cloud.azure.storage.blob.account-name}")
    private String accountName;

    @Value("${spring.cloud.azure.storage.blob.account-key}")
    private String accountKey;

    @Value("${spring.cloud.azure.storage.blob.container-name}")
    private String containerName;

    @Value("${spring.cloud.azure.storage.blob.endpoint}")
    private String endpoint;

    public String uploadImage(MultipartFile file) throws IOException {
        BlobServiceClient blobServiceClient = createBlobServiceClient();

        BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);

        String blobName = generateBlobName(Objects.requireNonNull(file.getOriginalFilename()));

        BlobClient blobClient = containerClient.getBlobClient(blobName);

        blobClient.upload(BinaryData.fromStream(file.getInputStream()).toStream(), file.getSize());

        return blobClient.getBlobUrl();
    }

    public void deleteImage(String imageUrl) {
        BlobServiceClient blobServiceClient = createBlobServiceClient();

        BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);

        String blobName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);

        BlobClient blobClient = containerClient.getBlobClient(blobName);

        blobClient.delete();
    }

    public String getDefaultImage() {
        return endpoint + "/" + containerName + "/default.jpg";
    }

    private BlobServiceClient createBlobServiceClient() {
        return new BlobServiceClientBuilder()
                .endpoint(endpoint)
                .credential(new AzureNamedKeyCredential(accountName, accountKey))
                .buildClient();
    }

    private String generateBlobName(String originalFilename) {
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        return UUID.randomUUID() + extension;
    }
}

