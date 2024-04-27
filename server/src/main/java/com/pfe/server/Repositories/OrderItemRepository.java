package com.pfe.server.Repositories;

import com.pfe.server.Models.OrderItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface OrderItemRepository extends JpaRepository<OrderItems,Long> {
    @Query("SELECT p, COUNT(oi.product.id) AS repetitionCount " +
            "FROM OrderItems oi " +
            "JOIN oi.product p " +
            "GROUP BY p " +
            "ORDER BY repetitionCount DESC " +
            "LIMIT 5")
    List<Object[]> findTop5ProductsByRepetitionCount();

    @Query("SELECT SUM(o.price) FROM OrderItems o")
    Double sumAllPrices();
   


}
