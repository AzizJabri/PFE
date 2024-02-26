package com.pfe.server.Services;

import com.pfe.server.Models.Product;
import com.pfe.server.Repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository ProductRepo;
    public List<Product> getAllProducts() {
        return ProductRepo.findAll();
    }


    public Optional<Product> getProductById(Long id) {
        return ProductRepo.findById(id);
    }

    public Product saveProduct(Product product) {
        return ProductRepo.save(product);
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        Product existingProduct = ProductRepo.findById(id).orElse(null);

        if (existingProduct != null) {
            existingProduct.setName(updatedProduct.getName());
            existingProduct.setDescription(updatedProduct.getDescription());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setCategory(updatedProduct.getCategory());
            existingProduct.setImages(updatedProduct.getImages());

            return ProductRepo.save(existingProduct);
        }

        return null;
    }

    public void deleteProduct(Long id) {
        ProductRepo.deleteById(id);
    }
    public List<Product> getProductsByCategoryId(Long categoryId) {
        return ProductRepo.findByCategory_Id(categoryId);
    }
}

