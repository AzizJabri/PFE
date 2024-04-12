package com.pfe.server.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.stereotype.Repository;

import com.pfe.server.Models.ERole;
import com.pfe.server.Models.Role;


@Repository
@RedisHash("Role")
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}