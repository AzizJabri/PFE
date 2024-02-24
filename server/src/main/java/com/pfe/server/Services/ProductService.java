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

    public Product getProduct(Long id) {
        return ProductRepo.findById(id).orElse(null);
    }

    public void addProduct(Product product) {
        ProductRepo.save(product);
    }

    public void updateProduct(Product product) {
        ProductRepo.save(product);
    }

    public void deleteProduct(Long id) {
        ProductRepo.deleteById(id);
    }
}
