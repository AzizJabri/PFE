package com.pfe.server.Repositories;

import com.pfe.server.Models.Orders;
import com.pfe.server.Models.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.redis.core.RedisHash;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrdersRepository extends JpaRepository<Orders,Long> {
    List<Orders> findByUserId(Long userId);

    @Query("SELECT o.user FROM Orders o GROUP BY o.user ORDER BY COUNT(o) DESC")
    List<User> findMostRepetitiveUserId(Pageable pageable);

}
