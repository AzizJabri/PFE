package com.pfe.server.Services;

import com.pfe.server.Models.User;
import com.pfe.server.Repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {
    @Autowired
    private final UserRepository userRepository;

    public List<User> GetAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    public void deleteUserByEmail(String email) {
        userRepository.deleteByEmail(email);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }


    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword()); // Set the password
            user.setRoles(updatedUser.getRoles());
            return userRepository.save(user);
        }).orElse(null);
    }
    public Long getNewUserCountLastWeek() {
        LocalDateTime startDate = LocalDate.now().minusDays(7).atStartOfDay();
        LocalDateTime endDate = LocalDate.now().atStartOfDay().plusDays(1).minusNanos(1);
        return userRepository.countByCreatedDateBetween(startDate, endDate);
    }

}