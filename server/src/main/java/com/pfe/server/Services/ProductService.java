package com.pfe.server.Services;

import com.pfe.server.Models.Product;
import com.pfe.server.Repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository ProductRepo;
    public List<Product> getAllProducts() {
        return ProductRepo.findAll();
    }
}
