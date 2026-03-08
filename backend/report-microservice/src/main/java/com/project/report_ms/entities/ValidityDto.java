package com.project.report_ms.entities;

import com.project.report_ms.models.Loan;

public class ValidityDto {

    private Loan loan;

    private String state;

    public void setLoan(Loan loan) {
        this.loan = loan;
    }

    public void setState(String state) {
        this.state = state;
    }
}
