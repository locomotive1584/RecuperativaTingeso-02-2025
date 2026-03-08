package com.project.report_ms.models;

import java.time.LocalDate;

public class Devolution {

    private Long id;

    private LocalDate devolutionDate;

    private Long loanId;

    public LocalDate getDevolutionDate() {
        return devolutionDate;
    }

    public Long getId() {
        return id;
    }

    public Long getLoanId() {
        return loanId;
    }
}
