package com.pfe.server.Controllers;

import com.pfe.server.Models.Category;
import com.pfe.server.Models.Image;
import com.pfe.server.Models.Product;
import com.pfe.server.Payloads.Request.CreateProductRequest;
import com.pfe.server.Services.CategoriesService;
import com.pfe.server.Services.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.pfe.server.Services.ImageService;


import java.io.IOException;
import java.sql.SQLOutput;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    private ImageService imageService;

    @Autowired
    private CategoriesService categoriesService;

    @GetMapping("/")
    public Page<Product> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
                               @RequestParam(defaultValue = "10") int size, @RequestParam(required = false, defaultValue = "") String name, @RequestParam(required = false , defaultValue = "") String category) {
        if (!name.isEmpty()) {
            return productService.getProductsByName(name, page, size);
        } else if (!category.isEmpty()) {
            return productService.getProductsByCategory(Long.valueOf(category), page, size);
        } else {
            return productService.getAllProducts(page, size);
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.getProductById(id);
        return product.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> saveProduct(@ModelAttribute CreateProductRequest product) throws IOException {
        System.out.println(product.getCategory());
        Product newProduct = new Product(product.getName(), product.getDescription(), product.getPrice());

        // Check if the category ID is not null
        if (product.getCategory() == null) {
            System.out.println("Category ID cannot be null");
            return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
        }

        // Retrieve the category by ID
        Category category = categoriesService.getCategory(product.getCategory());

        // Check if the category exists
        if (category == null) {
            System.out.println("Category not found with ID: " + product.getCategory());
            return new ResponseEntity<>( HttpStatus.NOT_FOUND);
        }

        newProduct.setCategory(category);
        newProduct.setImages(new ArrayList<>());

        String url = imageService.uploadImage(product.getImage());
        Image newImage = new Image(url, product.getName(), newProduct);
        newProduct.getImages().add(newImage);

        Product result = productService.saveProduct(newProduct);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        Optional<Product> existingProduct = productService.getProductById(id);

        if (existingProduct.isPresent()) {
            Product result = productService.updateProduct(id, updatedProduct);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (productService.getProductById(id).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{id}/images")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> addImageToProduct(@PathVariable Long id, @RequestParam MultipartFile image) throws IOException {
        Optional<Product> product = productService.getProductById(id);

        if (product.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        //validate multipart file is image
        if (!Objects.requireNonNull(image.getContentType()).startsWith("image")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        String url = imageService.uploadImage(image);
        Image newImage = new Image(url, product.get().getName(), product.get());
        product.get().getImages().add(newImage);
        productService.saveProduct(product.get());

        return new ResponseEntity<>(product.get(), HttpStatus.OK);

    }
}
