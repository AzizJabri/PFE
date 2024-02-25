package com.pfe.server.Payloads.Request;

import com.pfe.server.Models.Address;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class UpdateProfileRequest {
    private String firstName;
    private String lastName;
    private String phoneNumber;
}
