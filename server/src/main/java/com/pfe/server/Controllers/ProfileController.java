package com.pfe.server.Controllers;

import com.pfe.server.Payloads.Request.UpdateAddressRequest;
import com.pfe.server.Payloads.Request.UpdateProfileRequest;
import com.pfe.server.Security.Services.UserDetailsImpl;
import com.pfe.server.Security.Services.UserDetailsServiceImpl;
import com.pfe.server.Services.AddressService;
import com.pfe.server.Services.ImageService;
import com.pfe.server.Services.ProfileService;
import com.pfe.server.Services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.pfe.server.Models.Profile;
import com.pfe.server.Models.Address;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

@RestController
@RequestMapping("/api/v1/profile")
@AllArgsConstructor
public class ProfileController {
    @Autowired
    private final ProfileService profileService;
    @Autowired
    private final AddressService addressService;
    @Autowired
    private final ImageService imageService;

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

    @PostMapping("/image")
    public ResponseEntity<Profile> updateProfileImage(Principal principal, @RequestParam MultipartFile image) throws IOException {
        Profile profile = profileService.getProfile(principal.getName()).orElse(null);
        if (profile == null) {
            return ResponseEntity.notFound().build();
        }
        String oldImage = profile.getImage();
        profile.setImage(imageService.uploadImage(image));
        imageService.deleteImage(oldImage);
        return ResponseEntity.ok(profileService.updateProfile(profile));
    }





}
