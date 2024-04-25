package com.pfe.server.Repositories;

import com.pfe.server.Models.Orders;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrdersRepository extends JpaRepository<Orders,Long> {
    List<Orders> findByUserId(Long userId);
    @Query("SELECT o.user.id FROM Orders o GROUP BY o.user.id ORDER BY COUNT(o) DESC")
    List<Long> findMostRepetitiveUserId();

}
