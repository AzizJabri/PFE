package com.pfe.server.Controllers;

import com.pfe.server.Models.Cart;
import com.pfe.server.Models.CartItem;
import com.pfe.server.Services.CartService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/Cart")
public class CartController {
    @Autowired
    private CartService Cartservice;
    @GetMapping("/{username}")
    public ResponseEntity<Cart> getCart(@PathVariable String username) {
        Cart cart = Cartservice.getCartForUser(username);
        if (cart == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(cart);
    }

    @PostMapping("addtocart/add")
    public ResponseEntity<String> addToCart(@RequestParam String email, @RequestParam Long productId, @RequestParam String productName, @RequestParam int quantity) {
        CartItem cartItem = new CartItem();
        cartItem.setProductId(productId);
        cartItem.setProductName(productName);
        cartItem.setQuantity(quantity);

        Cartservice.addToCartForUser(email, cartItem);

        return ResponseEntity.ok("Item added to cart successfully");
    }
}
