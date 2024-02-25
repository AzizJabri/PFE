package com.pfe.server.Controllers;

import com.pfe.server.Models.Address;
import com.pfe.server.Payloads.Request.UpdateAddressRequest;
import com.pfe.server.Services.AddressService;
import com.pfe.server.Services.ProfileService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/addresses")
@AllArgsConstructor
public class AddressesController {
    @Autowired
    private final AddressService addressService;

    @Autowired
    private final ProfileService profileService;

    @GetMapping("/")
    public ResponseEntity<?> getAddresses(Principal principal) {
        return ResponseEntity.ok(addressService.getAllAddresses(principal.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAddress(Principal principal, @PathVariable Long id) {
        return ResponseEntity.ok(addressService.getAddress(principal.getName(), id));
    }

    @PostMapping("/")
    public ResponseEntity<?> addAddress(Principal principal, @RequestBody UpdateAddressRequest updateAddressRequest) {
        Address address = new Address(updateAddressRequest.getStreet(), updateAddressRequest.getCity(), updateAddressRequest.getState(), updateAddressRequest.getCountry(), updateAddressRequest.getPostalCode(), profileService.getProfile(principal.getName()).orElse(null));
        addressService.addAddress(address);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAddress(Principal principal, @PathVariable Long id) {
        if (addressService.getAddress(principal.getName(), id) == null) {
            return ResponseEntity.notFound().build();
        }
        addressService.deleteAddress(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAddress(Principal principal, @PathVariable Long id, @RequestBody UpdateAddressRequest updateAddressRequest) {
        if (addressService.getAddress(principal.getName(), id) == null) {
            return ResponseEntity.notFound().build();
        }
        //update only the fields that are not null
        Address address = new Address(updateAddressRequest.getStreet(), updateAddressRequest.getCity(), updateAddressRequest.getState(), updateAddressRequest.getCountry(), updateAddressRequest.getPostalCode(), profileService.getProfile(principal.getName()).orElse(null));
        address.setId(id);
        addressService.updateAddress(address);
        return ResponseEntity.ok().build();
    }


}
