package com.pfe.server.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String description ;
    private double price;


    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Image> images;

    public Product(String name, String description, double price, List<Image> images) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.images = images;
    }
}

