package com.pfe.server.Repositories;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pfe.server.Models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    void deleteByEmail(String email);


    Boolean existsByEmail(String email);


    @NotNull Optional<User> findById(Long Id);

}