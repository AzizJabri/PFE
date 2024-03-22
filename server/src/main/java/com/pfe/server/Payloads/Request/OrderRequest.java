package com.pfe.server.Payloads.Request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class OrderRequest {
    private String status;
    private List<OrderItemRequest> orderItems;


}
