package com.pfe.server.Controllers;

import com.pfe.server.Models.Cart;
import com.pfe.server.Models.CartItem;
import com.pfe.server.Models.Product;
import com.pfe.server.Models.User;
import com.pfe.server.Payloads.Request.AddCartItem;
import com.pfe.server.Services.CartItemService;
import com.pfe.server.Services.CartService;
import com.pfe.server.Services.ProductService;
import com.pfe.server.Services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Objects;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/cart")
public class CartController {
    private final CartService cartService;
    private final CartItemService cartItemService;
    private final UserService userService;
    private final ProductService productService;

    @GetMapping("/")
    public Cart getCart(Principal principal) {
        User user = userService.getUserByEmail(principal.getName());
        return cartService.getCartByUserId(user.getId());
    }

    @PostMapping("/")
    public Cart addCartItem(Principal principal, @RequestBody AddCartItem cartItemDAO) {
        User user = userService.getUserByEmail(principal.getName());
        Cart cart = cartService.getCartByUserId(user.getId());
        Product product = productService.getProductById(cartItemDAO.getProductId()).orElse(null);

        if (product == null) {
            return null; // Handle the case when product is not found
        }

        Optional<CartItem> existingItem = cart.getCartItems().stream()
                .filter(item -> Objects.equals(item.getProduct().getId(), product.getId()))
                .findFirst();

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            cartItemService.increaseQuantity(item, cartItemDAO.getQuantity());
        } else {
            CartItem newItem = new CartItem(product, cartItemDAO.getQuantity(), cart);
            cartItemService.addCartItem(newItem);
        }

        //Update total and return updated cart
        cart.setTotal(calculateCartTotal(cart));
        cartService.saveCart(cart);
        // Fetch the updated cart (after saving changes)
        cart = cartService.getCartByUserId(user.getId());

        return cart;
    }

    // Method to calculate cart total
    private double calculateCartTotal(Cart cart) {
        return cart.getCartItems().stream()
                .mapToDouble(item -> item.getProduct().getPrice() * item.getQuantity())
                .sum();
    }

    @DeleteMapping("/")
    public void clearCart(Principal principal) {
        User user = userService.getUserByEmail(principal.getName());
        Cart cart = cartService.getCartByUserId(user.getId());
        cart.getCartItems().clear();
        cart.setTotal(0);
        cartService.saveCart(cart);
    }

    @DeleteMapping("/{id}")
    public void deleteCartItem(Principal principal, @PathVariable Long id) {
        User user = userService.getUserByEmail(principal.getName());
        Cart cart = cartService.getCartByUserId(user.getId());

        CartItem item = cartItemService.getCartItemById(id).orElse(null);

        if (item == null) {
            return; // Handle the case when item is not found
        }

        cartItemService.deleteCartItem(item);
        cart.setTotal(calculateCartTotal(cart));
        cartService.saveCart(cart);
    }

    @PatchMapping("/{id}")
    public Cart updateCartItem(Principal principal, @PathVariable Long id, @RequestBody int quantity ) {
        System.out.println(quantity + " " + id);
        User user = userService.getUserByEmail(principal.getName());
        Cart cart = cartService.getCartByUserId(user.getId());

        CartItem item = cartItemService.getCartItemById(id).orElse(null);

       if (item == null) {
            return null; // Handle the case when item is not found
        }

        cartItemService.updateQuantity(item, quantity);
        cart.setTotal(calculateCartTotal(cart));

        cartService.saveCart(cart);
        cart = cartService.getCartByUserId(user.getId());

        return cart;
    }







}
