package com.pfe.server;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest // Use this annotation to load the entire application context for testing
@AutoConfigureMockMvc // Use this annotation to auto-configure the MockMvc object
public class ServerApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    // Integration test for a REST endpoint
    @Test
    public void testGetProductsEndpoint() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/products/"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"));
    }

}