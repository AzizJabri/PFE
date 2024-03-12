package com.pfe.server.Services;

import com.pfe.server.Models.Cart;
import com.pfe.server.Models.CartItem;
import com.pfe.server.Models.User;
import com.pfe.server.Repositories.CartItemRepository;
import com.pfe.server.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private CartItemRepository CartItemRepo;
    public Cart getCartForUser(String email) {
        Optional<User> userr = userRepo.findByEmail(email);
        if (userr == null) {
            return null;
        }
        User user = userr.get();
        return user.getCart();

    }
    public void addToCartForUser(String email, CartItem cartItem) {
        Optional<User> Userr = userRepo.findByEmail(email);
        if (Userr.isEmpty()) {
            return;
        }

        User user = Userr.get();
        Cart cart = user.getCart();
        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            user.setCart(cart);
        }
        cartItem.setCart(cart);

        CartItemRepo.save(cartItem);
    }
}
