package com.pfe.server.Controllers;

import com.pfe.server.Models.OrderItems;
import com.pfe.server.Models.Orders;
import com.pfe.server.Models.Product;
import com.pfe.server.Models.User;
import com.pfe.server.Payloads.Request.OrderItemRequest;
import com.pfe.server.Payloads.Request.OrderRequest;
import com.pfe.server.Services.CartService;
import com.pfe.server.Services.OrdersService;
import com.pfe.server.Services.ProductService;
import com.pfe.server.Services.UserService;
import jdk.jfr.ContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/orders")
public class OrdersController {
    @Autowired
    private OrdersService ordersService;
    @Autowired
    UserService userService;
    @Autowired
    private ProductService productService;
    @Autowired
    CartService cartService;
    @GetMapping("/")
    public ResponseEntity<List<Orders>> getAllOrders(Principal principal) {
        User user = userService.getUserByEmail(principal.getName());
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(ordersService.getOrdersByUserId(user.getId()));
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Orders>> getAllOrders() {
        return ResponseEntity.ok(ordersService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Orders> getOrderById(@PathVariable Long id, Principal principal) {
        User user = userService.getUserByEmail(principal.getName());
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        Optional<Orders> optionalOrder = ordersService.getOrderById(id);
        if (optionalOrder.isPresent()) {
            Orders order = optionalOrder.get();
            if (order.getUser().getId().equals(user.getId()) || user.getRoles().stream().anyMatch(role -> role.getName().name().equals("ADMIN"))) {
                return ResponseEntity.ok(order);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Orders> updateOrder(@PathVariable Long id, @RequestBody OrderRequest orderRequest) {
        Orders updatedOrder = ordersService.updateOrder(id, orderRequest);
        if (updatedOrder != null) {
            return ResponseEntity.ok(updatedOrder);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        ordersService.deleteOrder(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}