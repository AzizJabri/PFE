package com.pfe.server.Controllers;

import com.pfe.server.Models.Product;
import com.pfe.server.Services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.awt.print.Pageable;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;
    @GetMapping("/")
    @CrossOrigin(origins = "*")
    public ResponseEntity<List<Product>> getAllProducts(Pageable pageable) {
        return new ResponseEntity<>(productService.getAllProducts(), HttpStatus.OK);
    }
}
