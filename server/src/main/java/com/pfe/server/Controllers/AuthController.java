package com.pfe.server.Controllers;

import com.pfe.server.Models.*;
import com.pfe.server.Payloads.Request.LoginRequest;
import com.pfe.server.Payloads.Request.RegisterRequest;
import com.pfe.server.Payloads.Responses.JwtResponse;
import com.pfe.server.Payloads.Responses.MessageResponse;
import com.pfe.server.Repositories.RoleRepository;
import com.pfe.server.Repositories.UserRepository;
import com.pfe.server.Security.Jwt.JwtUtils;
import com.pfe.server.Security.Services.UserDetailsImpl;
import com.pfe.server.Services.ImageService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {
    AuthenticationManager authenticationManager;
    UserRepository userRepository;
    RoleRepository roleRepository;
    PasswordEncoder encoder;
    JwtUtils jwtUtils;

    ImageService imageService;


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String accessToken = jwtUtils.generateAccessToken(authentication);
        String refreshToken = jwtUtils.generateRefreshToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(
                accessToken,
                refreshToken,
                userDetails.getId(),
                userDetails.getEmail(),
                roles
                )
        );
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<Role> roles = new HashSet<>();

        roles.add(roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found.")));

        user.setRoles(roles);
        //set profile with default values
        Profile profile = new Profile(signUpRequest.getEmail().split("@")[0], "", "", user, new HashSet<>(), imageService.getDefaultImage());

        user.setCart(new Cart(user));

        user.setProfile(profile);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshAccessToken(@RequestParam String refreshToken) {
        if (!jwtUtils.isRefreshToken(refreshToken)) {
            return ResponseEntity.badRequest().body(new MessageResponse("Invalid refresh token"));
        }

        String email = jwtUtils.getEmailFromJwtToken(refreshToken);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        UserDetailsImpl userDetails = UserDetailsImpl.build(user);
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());

        String newAccessToken = jwtUtils.generateAccessToken(authentication);
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return ResponseEntity.ok(new JwtResponse(
                newAccessToken,
                refreshToken,
                userDetails.getId(),
                userDetails.getEmail(),
                roles
        ));

    }

    //create admin user with default values
    @PostMapping("/createAdmin")
    public ResponseEntity<?> createAdmin() {
        if (userRepository.existsByEmail("azizjb.business@gmail.com")) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Initial admin already created!"));
        }

        User user = new User("azizjb.business@gmail.com",
                encoder.encode("superstrongpassword"));

        Set<Role> roles = new HashSet<>();

        roles.add(roleRepository.findByName(ERole.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found.")));

        roles.add(roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found.")));

        user.setRoles(roles);
        //set profile with default values
        Profile profile = new Profile("Mohamed Aziz", "Jabri", "93617984", user, new HashSet<>(), imageService.getDefaultImage());
        user.setProfile(profile);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Admin created successfully!"));

    }

}
