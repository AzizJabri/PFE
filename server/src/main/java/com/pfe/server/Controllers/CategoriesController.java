package com.pfe.server.Controllers;

import com.pfe.server.Models.Category;
import com.pfe.server.Payloads.Request.CreateCategoryRequest;
import com.pfe.server.Services.CategoriesService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/categories")
public class CategoriesController {
    private final CategoriesService categoriesService;


    @GetMapping("/")
    public List<Category> getCategories() {
        return categoriesService.getCategories();
    }

    @GetMapping("/{id}")
    public Category getCategory(@PathVariable String id) {
        return categoriesService.getCategory(Long.valueOf(id));
    }

    @PostMapping("/")
    @PreAuthorize("hasRole('ADMIN')")
    public void addCategory(@RequestBody CreateCategoryRequest category) {
        categoriesService.addCategory(new Category(category.getName(), category.getDescription()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void updateCategory(@PathVariable String id, @RequestBody Category category) {
        category.setId(Long.valueOf(id));
        categoriesService.updateCategory(category);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteCategory(@PathVariable String id) {
        categoriesService.deleteCategory(Long.valueOf(id));
    }

    @GetMapping("/top")
    public List<Category> getTopCategories() {
        return categoriesService.getTopCategories();
    }
    @GetMapping("/name/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String getCategoryByName(@PathVariable Long id){
        return categoriesService.findCategoryNameById(id);
    }
}
