package com.project.report_ms.models;

public class Client {

    private Long id;

    private String name;

    private String contact;

    private String rut;

    private String state;

    private String email;

    public String getContact() {
        return contact;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getState() {
        return state;
    }

    public String getRut() {
        return rut;
    }
}
