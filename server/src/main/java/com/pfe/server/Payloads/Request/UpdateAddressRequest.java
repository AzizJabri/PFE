package com.pfe.server.Payloads.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateAddressRequest {
    private String street;
    private String city;
    private String state;
    private String country;
    private String postalCode;
}
