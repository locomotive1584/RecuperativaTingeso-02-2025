package com.project.report_ms.models;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Egress {

    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate date;

    private String docType;

    private String numDoc;

    private String reason;

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

    public String getNumDoc() {
        return numDoc;
    }

    public String getReason() {
        return reason;
    }
}
