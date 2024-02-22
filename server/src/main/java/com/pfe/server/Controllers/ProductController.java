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

import java.util.List;

@RestController
@RequestMapping("/api/Products")
public class ProductController {
    @Autowired
    private ProductService ProdService;
    @GetMapping("/getAllProduct")
    @CrossOrigin(origins = "*")
    public ResponseEntity<List<Product>> getAllProduct() {
        List<Product> Product = ProdService.getAllProducts();
        return new ResponseEntity<>(Product, HttpStatus.OK);
    }
}
