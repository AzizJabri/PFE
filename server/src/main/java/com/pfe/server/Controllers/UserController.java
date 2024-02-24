package com.pfe.server.Controllers;


import com.pfe.server.Models.ERole;
import com.pfe.server.Models.Role;
import com.pfe.server.Models.User;
import com.pfe.server.Repositories.RoleRepository;
import com.pfe.server.Repositories.UserRepository;
import com.pfe.server.Security.Services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @GetMapping("/me")
    public ResponseEntity<?> getUserDetails(Principal user) {
        System.out.println(user);
        return ResponseEntity.ok(userRepository.findByEmail(user.getName()).orElse(null));
    }

    @PostMapping("/promote")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> promoteUser(@RequestParam String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        //add admin role to current roles assigned
        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        user.getRoles().add(adminRole);
        userRepository.save(user);
        return ResponseEntity.ok("User promoted to admin");
    }

    @PostMapping("/demote")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> demoteUser(@RequestParam String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        //remove admin role from current roles assigned
        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        user.getRoles().remove(adminRole);
        userRepository.save(user);
        return ResponseEntity.ok("User demoted from admin");
    }

    @PostMapping("/delete")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@RequestParam String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        userRepository.delete(user);
        return ResponseEntity.ok("User deleted");
    }

    // change current user encoded password
    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestParam String oldPassword, @RequestParam String newPassword, Principal user) {
        User currentUser = userRepository.findByEmail(user.getName()).orElse(null);
        if (currentUser == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        if (!encoder.matches(oldPassword, currentUser.getPassword())) {
            return ResponseEntity.badRequest().body("Old password is incorrect");
        }
        currentUser.setPassword(encoder.encode(newPassword));
        userRepository.save(currentUser);
        return ResponseEntity.ok("Password changed successfully");
    }
}
