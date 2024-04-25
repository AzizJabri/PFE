package com.pfe.server.Repositories;

import com.pfe.server.Models.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RedisHash("Address")
public interface AddressRepository extends JpaRepository<Address, Long> {
    Optional<List<Address>> findAllByProfileUserEmail(String email);
    Optional<Address> findByProfileUserEmailAndId(String email, Long id);

}
