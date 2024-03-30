package com.pfe.server.Services;

import com.pfe.server.Models.EStatus;
import com.pfe.server.Models.OrderItems;
import com.pfe.server.Models.Orders;
import com.pfe.server.Models.Product;
import com.pfe.server.Payloads.Request.OrderItemRequest;
import com.pfe.server.Payloads.Request.OrderRequest;
import com.pfe.server.Repositories.OrdersRepository;
import com.pfe.server.Repositories.ProductRepository;
import jakarta.persistence.EnumType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrdersService {
    @Autowired
    private OrdersRepository ordersRepository;
    @Autowired
    private ProductService productService;
    public List<Orders> getAllOrders() {
        return ordersRepository.findAll();
    }

    public List<Orders> getOrdersByUserId(Long userId) {
        return ordersRepository.findByUserId(userId);
    }

    public Optional<Orders> getOrderById(Long id) {
        return ordersRepository.findById(id);
    }

    public Orders createOrder(Orders order) {
        return ordersRepository.save(order);
    }

    public Orders updateOrder(Long id, OrderRequest orderRequest) {
        Optional<Orders> optionalOrder = ordersRepository.findById(id);
        if (optionalOrder.isPresent()) {
            Orders order = optionalOrder.get();
            order.setStatus(EStatus.valueOf(orderRequest.getStatus()));

            order.getOrderItems().clear();

            List<OrderItemRequest> orderItemRequests = orderRequest.getOrderItems();
            if (orderItemRequests != null) {
                for (OrderItemRequest itemRequest : orderItemRequests) {
                    OrderItems orderItem = new OrderItems();
                    orderItem.setQuantity(itemRequest.getQuantity());
                    orderItem.setPrice(itemRequest.getPrice());

                    // Find product by ID and set it to the order item
                    Long productId = itemRequest.getProduct_id();
                    Optional<Product> optionalProduct = productService.getProductById(productId);
                    if (optionalProduct.isPresent()) {
                        orderItem.setProduct(optionalProduct.get());
                        orderItem.setOrder(order); // Set the order to establish the relationship
                        order.getOrderItems().add(orderItem);
                    } else {
                        // Log a warning message for the missing product
                        System.out.println("Product with ID " + productId + " not found.");
                    }
                }
            }

            // Save the updated order
            return ordersRepository.save(order);
        } else {
            // Log a warning message for the missing order
            System.out.println("Order with ID " + id + " not found.");
            return null;
        }
    }


    public void deleteOrder(Long id) {
        ordersRepository.deleteById(id);
    }
}
