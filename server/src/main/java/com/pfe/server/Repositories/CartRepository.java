package com.pfe.server.Repositories;

import com.pfe.server.Models.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.stereotype.Repository;

@Repository
@RedisHash("Cart")
public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByUserId(Long userId);
}
