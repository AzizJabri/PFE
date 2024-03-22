package com.pfe.server.Services;

import com.pfe.server.Models.CartItem;
import com.pfe.server.Repositories.CartItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class CartItemService {
    ProductService productService;
    CartItemRepository cartItemRepository;

    public void deleteCartItem(CartItem cartItem) {
        cartItemRepository.delete(cartItem);
    }

    public void addCartItem(CartItem cartItem) {
        cartItemRepository.save(cartItem);
    }

    public void increaseQuantity(CartItem cartItem, int quantity) {
        cartItem.setQuantity(cartItem.getQuantity() + quantity);
        cartItemRepository.save(cartItem);
    }

    public void decreaseQuantity(CartItem cartItem, int quantity) {
        if (cartItem.getQuantity() > quantity) {
            cartItem.setQuantity(cartItem.getQuantity() - quantity);
            cartItemRepository.save(cartItem);
        } else {
            cartItemRepository.delete(cartItem);
        }
    }

    public Optional<CartItem> getCartItemById(Long id) {
        return cartItemRepository.findById(id);
    }

    public void updateQuantity(CartItem cartItem, int quantity) {
        cartItem.setQuantity(quantity);
        cartItemRepository.save(cartItem);
    }
}
