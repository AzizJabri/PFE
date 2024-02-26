package com.pfe.server.Repositories;

import com.pfe.server.Models.Category;
import com.pfe.server.Models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory_Id(Long categoryId);
}
