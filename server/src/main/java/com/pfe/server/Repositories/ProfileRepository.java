package com.pfe.server.Repositories;

import com.pfe.server.Models.Address;
import com.pfe.server.Models.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
@RedisHash("Profile")
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> findByUserEmail(String email);

}
