package com.pfe.server.Payloads.Request;

import com.pfe.server.Models.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateProductRequest {
    private String name;
    private String description;
    private double price;
    private Long category;
    private int stock;
    private boolean is_visible;

    private MultipartFile image;

}
