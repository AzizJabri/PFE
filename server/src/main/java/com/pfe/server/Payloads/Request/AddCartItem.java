package com.pfe.server.Payloads.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AddCartItem {
    private Long productId;

    private int quantity;
}
