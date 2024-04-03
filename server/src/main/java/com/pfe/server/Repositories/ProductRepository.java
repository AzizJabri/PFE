package com.pfe.server.Repositories;

import com.pfe.server.Models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends PagingAndSortingRepository<Product, Long>, JpaRepository<Product, Long>{

  Page<Product> findAllByOrderByIdAsc(Pageable pageable);

  Page<Product> findByCategory_Id(Long categoryId, Pageable pageable);

  Page<Product> findByNameIsContainingIgnoreCase(String name, Pageable pageable);


}
