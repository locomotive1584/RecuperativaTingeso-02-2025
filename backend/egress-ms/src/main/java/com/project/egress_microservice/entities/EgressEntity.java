package com.project.egress_microservice.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "outputs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EgressEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    @Column(nullable = false)
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate date;

    @Column(nullable = false)
    private String docType;

    @Column(unique = true, nullable = false)
    private String numDoc;

    @Column(nullable = false)
    private String reason;

    @Column(nullable = false)
    private long amount;

    public long getAmount() {
        return amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public String getDocType() {
        return docType;
    }

    public Long getId() {
        return id;
    }

    public String getNumDoc() {
        return numDoc;
    }

    public String getReason() {
        return reason;
    }
}
