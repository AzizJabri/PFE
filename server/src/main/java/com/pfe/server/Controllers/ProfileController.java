package com.pfe.server.Controllers;

import com.pfe.server.Payloads.Request.UpdateAddressRequest;
import com.pfe.server.Payloads.Request.UpdateProfileRequest;
import com.pfe.server.Security.Services.UserDetailsImpl;
import com.pfe.server.Security.Services.UserDetailsServiceImpl;
import com.pfe.server.Services.AddressService;
import com.pfe.server.Services.ProfileService;
import com.pfe.server.Services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.pfe.server.Models.Profile;
import com.pfe.server.Models.Address;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/profile")
@AllArgsConstructor
public class ProfileController {
    @Autowired
    private final ProfileService profileService;
    @Autowired
    private final AddressService addressService;

    @GetMapping("/")
    public ResponseEntity<Profile> getProfile(Principal principal) {
        System.out.println(principal.getName()  + " is the principal")  ;
        return ResponseEntity.ok(profileService.getProfile(principal.getName()).orElse(null));
    }

    @PutMapping("/")
    public ResponseEntity<Profile> updateProfile(Principal principal, @RequestBody UpdateProfileRequest updateProfileRequest) {
        Profile profile = profileService.getProfile(principal.getName()).orElse(null);
        if (profile == null) {
            return ResponseEntity.notFound().build();
        }
        profile.setFirstName(updateProfileRequest.getFirstName());
        profile.setLastName(updateProfileRequest.getLastName());
        profile.setPhoneNumber(updateProfileRequest.getPhoneNumber());
        return ResponseEntity.ok(profileService.updateProfile(profile));
    }




}
