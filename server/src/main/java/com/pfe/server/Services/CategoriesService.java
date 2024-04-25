package com.pfe.server.Services;

import com.pfe.server.Models.Category;
import com.pfe.server.Repositories.CategoriesRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CategoriesService {
    private final CategoriesRepository categoriesRepository;

    public void deleteCategory(Long id) {
        categoriesRepository.deleteById(id);
    }

    public void addCategory(Category category) {
        categoriesRepository.save(category);
    }

    public void updateCategory(Category category) {
        categoriesRepository.save(category);
    }

    public Category getCategory(Long id) {
        Optional<Category> categoryOptional = categoriesRepository.findById(id);
        return categoryOptional.orElseThrow(() -> new IllegalArgumentException("Category not found with id: " + id));
    }

    public Category getCategoryByName(String name) {
        return categoriesRepository.findByName(name).orElse(null);
    }

    public List<Category> getCategories() {
        return categoriesRepository.findAll();
    }

    public List<Category> getTopCategories() {
        List<Category> categories =  categoriesRepository.findByOrderByProductsAsc();
        return categories.subList(0, Math.min(categories.size(), 3));
    }
}
