package com.project.report_ms.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Ingress {

    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate date;

    private String numDoc;

    private long amount;

    public long getAmount() {
        return amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public String getNumDoc() {
        return numDoc;
    }
}
