package com.pfe.server.Repositories;

import com.pfe.server.Models.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RedisHash("Orders")
public interface OrdersRepository extends JpaRepository<Orders,Long> {
    List<Orders> findByUserId(Long userId);
}
