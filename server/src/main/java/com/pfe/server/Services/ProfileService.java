package com.pfe.server.Services;

import com.pfe.server.Models.Profile;
import com.pfe.server.Repositories.ProfileRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class ProfileService {
    @Autowired
    private final ProfileRepository profileRepository;

    public Optional<Profile> getProfile(String email) {
        return profileRepository.findByUserEmail(email);
    }

    public Profile updateProfile(Profile profile) {
        return profileRepository.save(profile);
    }


}
