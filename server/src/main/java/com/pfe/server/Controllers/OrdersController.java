package com.pfe.server.Controllers;

import com.pfe.server.Models.OrderItems;
import com.pfe.server.Models.Orders;
import com.pfe.server.Models.Product;
import com.pfe.server.Models.User;
import com.pfe.server.Payloads.Request.OrderItemRequest;
import com.pfe.server.Payloads.Request.OrderRequest;
import com.pfe.server.Services.OrdersService;
import com.pfe.server.Services.ProductService;
import com.pfe.server.Services.UserService;
import jdk.jfr.ContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
    @GetMapping
    public ResponseEntity<List<Orders>> getAllOrders() {
        List<Orders> orders = ordersService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Orders> getOrderById(@PathVariable Long id) {
        Optional<Orders> order = ordersService.getOrderById(id);
        return order.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/")
    public ResponseEntity<Orders> createOrder(@RequestBody OrderRequest orderRequestDTO, Principal principal) {
        try {
            // Retrieve the user by email from the UserDetails object
            User user = userService.getUserByEmail(principal.getName());
            if (user == null) {
                return ResponseEntity.notFound().build();
            }

            // Create new Orders instance
            Orders order = new Orders();
            order.setStatus(orderRequestDTO.getStatus());
            order.setUser(user);

            List<OrderItemRequest> orderItemsDTO = orderRequestDTO.getOrderItems();
            if (orderItemsDTO == null || orderItemsDTO.isEmpty()) {

                System.out.println("orderItems feha moshkla");
                return ResponseEntity.badRequest().build();
            }

            for (OrderItemRequest itemDTO : orderItemsDTO) {
                OrderItems orderItem = new OrderItems();
                orderItem.setQuantity(itemDTO.getQuantity());
                orderItem.setPrice(itemDTO.getPrice());

                Long productId = itemDTO.getProduct_id();
                System.out.println(productId);
                if (productId != null) {
                    Optional<Product> optionalProduct = productService.getProductById(productId);
                    if (optionalProduct.isPresent()) {
                        Product product = optionalProduct.get();
                        orderItem.setProduct(product);

                        // Set the orderItem's order
                        orderItem.setOrder(order); // This line is crucial

                        // Add the orderItem to the order's list of orderItems
                        order.getOrderItems().add(orderItem);
                    } else {
                        // Log a warning message for the missing product
                        System.out.println("Product with ID " + productId + " not found.");
                        return ResponseEntity.notFound().build();
                    }
                } else {

                    System.out.println("Product ID is null.");
                    return ResponseEntity.badRequest().build();
                }
            }

            Orders createdOrder = ordersService.createOrder(order);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<Orders> updateOrder(@PathVariable Long id, @RequestBody OrderRequest orderRequest) {
        Orders updatedOrder = ordersService.updateOrder(id, orderRequest);
        if (updatedOrder != null) {
            return ResponseEntity.ok(updatedOrder);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        ordersService.deleteOrder(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}