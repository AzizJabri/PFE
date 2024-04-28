package com.pfe.server.Services;

import com.pfe.server.Models.*;
import com.pfe.server.Repositories.CartRepository;
import com.pfe.server.Repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class CartService {
    CartRepository cartRepository;
    UserRepository userRepository;
    ProductService productService;

    public Cart getCartByUserId(Long userId) {
        if (cartRepository.findByUserId(userId) == null) {
            User user = userRepository.findById(userId).orElse(null);
            Cart cart = new Cart();
            cart.setUser(user);
            return cartRepository.save(cart);
        }
        return cartRepository.findByUserId(userId);
    }

    public Orders createOrderFromCart(User user) {
        Cart cart = getCartByUserId(user.getId());
        if (cart.getCartItems().isEmpty()) {
            return null;
        }
        Orders order = new Orders();
        order.setUser(user);
        order.setStatus(EStatus.PENDING);
        for(CartItem cartItem : cart.getCartItems()) {
            order.getOrderItems().add(
                    new OrderItems(cartItem.getQuantity(), cartItem.getProduct().getPrice(),order, cartItem.getProduct()
            ));
            productService.decreaseStock(cartItem.getProduct(), cartItem.getQuantity());
        }
        cartRepository.save(cart);
        return order;
    }

    public void saveCart(Cart cart) {
        cartRepository.save(cart);
    }


}
