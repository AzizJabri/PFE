package com.pfe.server.Services;

import com.pfe.server.Models.Address;
import com.pfe.server.Repositories.AddressRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AddressService {
    @Autowired
    private final AddressRepository addressRepository;

    public void deleteAddress(Long id) {
        addressRepository.deleteById(id);
    }

    public void updateAddress(Address address) {
        addressRepository.save(address);
    }

    public void addAddress(Address address) {
        addressRepository.save(address);
    }

    public Address getAddress(Long id) {
        return addressRepository.findById(id).orElse(null);
    }

    public java.util.List<Address> getAllAddresses(String email) {
        return addressRepository.findAllByProfileUserEmail(email).orElse(null);
    }

    public Address getAddress(String email, Long id) {
        return addressRepository.findByProfileUserEmailAndId(email, id).orElse(null);
    }
}
