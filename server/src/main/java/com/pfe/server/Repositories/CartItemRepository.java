package com.pfe.server.Repositories;

import com.pfe.server.Models.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long>{
    List<CartItem> findByCartId(int cartId);


}
