package com.pfe.server.Payloads.Request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItemRequest {
    private int quantity;
    private double price;
    private Long product_id;


}
