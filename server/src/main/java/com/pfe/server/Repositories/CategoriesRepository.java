package com.pfe.server.Repositories;

import com.pfe.server.Models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RedisHash("Category")
public interface CategoriesRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String name);

    //get top 3 categories with most products
    List<Category> findByOrderByProductsAsc();
    Category findCategoryById(Long id);

}
