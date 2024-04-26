package com.pfe.server.Repositories;

import com.pfe.server.Models.OrderItems;
import com.pfe.server.Models.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.redis.core.RedisHash;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RedisHash("OrderItems")

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface Order_itemsRepository extends JpaRepository<OrderItems,Long> {
    @Query("SELECT oi.product.id, COUNT(oi.product.id) AS repetitionCount " +
            "FROM OrderItems oi " +
            "GROUP BY oi.product.id " +
            "ORDER BY repetitionCount DESC " +
            "LIMIT 5")
    List<Object[]> findTop5ProductsByRepetitionCount();

    @Query("SELECT SUM(o.price) FROM OrderItems o")
    Double sumAllPrices();
   


}
