package com.pfe.server.Services;

import com.pfe.server.Models.Product;
import com.pfe.server.Payloads.Request.UpdateProductRequest;
import com.pfe.server.Repositories.ProductRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoriesService categoriesService;
    @Cacheable("Products")
    public Page<Product> getAllProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAllByOrderByIdAsc(pageable);
    }

    @Cacheable(value = "Products", key = "#id")
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Page<Product> getProductsByName(String name, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findByNameIsContainingIgnoreCase(name, pageable);
    }

    public Page<Product> getProductsByCategory(Long category, int page , int size){
        Pageable pageable = PageRequest.of(page,size);
        return productRepository.findByCategory_Id(category, pageable);
    }
    @Caching(evict = {
            @CacheEvict(value = "Products", allEntries = true)
    })
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Caching(put = {
            @CachePut(value = "Products", key = "#id")
    }, evict = {
            @CacheEvict(value = "Products", allEntries = true)
    })
    public Product updateProduct(Long id, UpdateProductRequest updatedProduct) {
        Product existingProduct = productRepository.findById(id).orElse(null);

        if (existingProduct != null) {
            existingProduct.setName(updatedProduct.getName());
            existingProduct.setDescription(updatedProduct.getDescription());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setCategory(categoriesService.getCategory(updatedProduct.getCategory()));

            return productRepository.save(existingProduct);
        }

        return null;
    }

    @Caching(evict = {
            @CacheEvict(value = "Products", key = "#id"),
            @CacheEvict(value = "Products", allEntries = true)
    })
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
  
    public Page<Product> getProductsByCategoryId(Long categoryId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findByCategory_Id(categoryId, pageable);

    }
    public List<Object[]> countProductsByCategoryId() {
        return productRepository.countProductsByCategoryId();
    }
    public String findProductNameById(Long id) {
        Optional<Product> productOptional = productRepository.findById(id);
        if (productOptional.isPresent()) {
            return productOptional.get().getName();
        } else {
            throw new RuntimeException("Product not found");
        }
    }
    public Long countAllProducts() {
        return productRepository.count();
    }
}

