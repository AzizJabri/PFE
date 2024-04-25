package com.pfe.server.Repositories;

import com.pfe.server.Models.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.stereotype.Repository;

@Repository
@RedisHash
public interface ImageRepository extends JpaRepository<Image, Long>{
}
