package com.project.report_ms.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Ingress {

    private Long id;

    private LocalDate date;

    private String numDoc;

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
