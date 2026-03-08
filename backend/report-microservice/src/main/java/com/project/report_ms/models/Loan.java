package com.project.report_ms.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Loan {

    private Long id;

    private LocalDate initialDate;

    private LocalDate agreedDate;

    private Long toolId;

    private Long unitId;

    private Long clientId;

    public LocalDate getAgreedDate() {
        return agreedDate;
    }

    public Long getClientId() {
        return clientId;
    }

    public Long getId() {
        return id;
    }

    public LocalDate getInitialDate() {
        return initialDate;
    }

    public Long getToolId() {
        return toolId;
    }

    public Long getUnitId() {
        return unitId;
    }
}
