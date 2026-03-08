package com.project.bill_microservice.models;

public class Tool {

    private Long id;

    private String name;

    private String category;

    private int stock;

    private int repositionCost;

    private int dailyCost;

    private int dailyFine;

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getDailyCost() {
        return dailyCost;
    }

    public void setDailyCost(int dailyCost) {
        this.dailyCost = dailyCost;
    }

    public int getDailyFine() {
        return dailyFine;
    }

    public void setDailyFine(int dailyFine) {
        this.dailyFine = dailyFine;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getRepositionCost() {
        return repositionCost;
    }

    public void setRepositionCost(int repositionCost) {
        this.repositionCost = repositionCost;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }
}
