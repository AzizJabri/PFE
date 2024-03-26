package com.pfe.server.Services;

import com.pfe.server.Models.Cart;
import com.pfe.server.Models.User;
import com.pfe.server.Repositories.CartRepository;
import com.pfe.server.Repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CartService {
    CartRepository cartRepository;
    UserRepository userRepository;

    public Cart getCartByUserId(Long userId) {
        if (cartRepository.findByUserId(userId) == null) {
            User user = userRepository.findById(userId).orElse(null);
            Cart cart = new Cart();
            cart.setUser(user);
            return cartRepository.save(cart);
        }
        return cartRepository.findByUserId(userId);
    }

    public void saveCart(Cart cart) {
        cartRepository.save(cart);
    }


}
