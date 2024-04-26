package com.pfe.server.Controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class KubernetesController {


    @Value("${HOSTNAME}")
    private String hostname;
    @RequestMapping("/")
    public String index() {
        return "Greetings from Spring Boot! My hostname is: " + hostname;
    }
}
