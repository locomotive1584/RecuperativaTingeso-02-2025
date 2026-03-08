package com.project.ingress_ms.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "inputs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class IngressEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    @Column(unique = true, nullable = false)
    private String numDoc;

    @Column(nullable = false)
    private long amount;

    public long getAmount() {
        return amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public Long getId() {
        return id;
    }

    public String getNumDoc() {
        return numDoc;
    }
}
