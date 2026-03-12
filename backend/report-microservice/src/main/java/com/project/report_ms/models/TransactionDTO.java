package com.project.report_ms.models;

import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonFormat;

public class TransactionDTO {

    private boolean isEgress;

    private Long id;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate date;

    private String docType;

    private String numDoc;

    private String reason;

    private long amount;

    @Override
    public String toString() {
        return "TransactionDTO{" +
                "amount=" + amount +
                ", isEgress=" + isEgress +
                ", id=" + id +
                ", date=" + date +
                ", docType='" + docType + '\'' +
                ", numDoc='" + numDoc + '\'' +
                ", reason='" + reason + '\'' +
                '}';
    }

    public long getAmount() {
        return amount;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getDocType() {
        return docType;
    }

    public void setDocType(String docType) {
        this.docType = docType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isEgress() {
        return isEgress;
    }

    public void setEgress(boolean egress) {
        isEgress = egress;
    }

    public String getNumDoc() {
        return numDoc;
    }

    public void setNumDoc(String numDoc) {
        this.numDoc = numDoc;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
